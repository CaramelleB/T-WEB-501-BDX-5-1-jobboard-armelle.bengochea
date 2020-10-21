from src.app import bcrypt
from src.utils.connect import connection
from flask import request, jsonify, Response, Blueprint, g
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)
from src.utils.request import *


class LoginModel():

    __tablename__ = 'login'

    def __init__(self, data):
        self.email = data.get('email')
        self.password = self.__generate_hash(data.get('password'))
        self.type = data.get('type')

    def update(self, data):
        for key, item in data.items():
            if key == 'password':
                self.password = self.__generate_hash(value)
        setattr(self, key, item)
        session.commit()

    def __generate_hash(self, password):
        if password is not None:
            return bcrypt.generate_password_hash(password, rounds=10)\
                .decode("utf-8")

    def check_hash(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def signup(self):
        login_req = (
            "INSERT INTO login SET email = %s, "
            "password = %s, type = %s"
        )
        return (login_req, (
                self.email,
                self.password,
                self.type
                ))

    def login(self, pw):

        req = "SELECT * FROM login WHERE email = %s"
        resp = do_get(req, self.email)
        data = resp['data'][0]

        if type(resp['data']) is not str:
            authenticated_user = bcrypt.check_password_hash(
                data['password'],
                pw
            )
            if authenticated_user:
                access_token = create_access_token(
                    identity={
                        "email": data['email'],
                        "password": data['password'],
                        "type": data['type']
                    },
                    user_claims={
                        "email": data['email'],
                        "type": data['type']
                    }
                )
                if data['type'] == 1:
                    jobber_req = (
                        "SELECT * FROM users "
                        "INNER JOIN jobbers "
                        "ON jobbers.user_id = users.id "
                        "WHERE login_id = %s"
                    )
                    user = do_get(jobber_req, data['id'])['data'][0]
                elif data['type'] == 2:
                    recruiter_req = (
                        "SELECT * FROM users "
                        "WHERE login_id = %s"
                    )
                    user = do_get(recruiter_req, data['id'])['data'][0]
                elif data['type'] == 3:
                    company_req = (
                        "SELECT * FROM companies "
                        "WHERE login_id = %s"
                    )
                    user = do_get(company_req, data['id'])['data'][0]
                else:
                    user = data
                # set_access_cookies(resp, access_token)
                print(user)
                return jsonify(
                    access_token=access_token,
                    user_id=user['id'],
                    type=data['type']
                )
        return resp
