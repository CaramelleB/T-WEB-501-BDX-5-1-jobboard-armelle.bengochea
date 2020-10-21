from flask import request, jsonify, Response, Blueprint, g
from src.models.login import LoginModel
from src.utils.request import *


class RecruiterModel():

    __tablename__ = 'recruiters'

    def __init__(self, data={}):
        if len(data) != 0:
            self.login = LoginModel(data)
            self.first_name = data.get('first_name')
            self.last_name = data.get('last_name')

    def create_recruiter(self):
        user_req = (
            "INSERT INTO users SET login_id = LAST_INSERT_ID(), "
            "first_name = %s, last_name = %s, "
            "created_at = CURDATE()"
        )
        signup = self.login.signup()
        resp = do_post(
            (
                signup[0],
                user_req
            ),
            (
                signup[1],
                (
                    self.first_name,
                    self.last_name
                )
            )
        )
        return resp

    def get_recruiters(self):
        req = (
            "SELECT * FROM users "
            "INNER JOIN login "
            "USING(id) "
            "WHERE login.type=2 "
        )
        resp = do_get(req)
        return jsonify(resp)

    def get_recruiter(self, id):
        req = (
            "SELECT * FROM login "
            "INNER JOIN users "
            "ON login.id = users.login_id "
            "WHERE users.id = %s "
            "AND login.type = 2"
        )
        resp = do_get(req, id)
        return jsonify(resp)

    def delete_recruiter(self, id):
        req = (
            "DELETE recruiters, login, users "
            "FROM users "
            "INNER JOIN login "
            "ON users.login_id = login.id "
            "INNER JOIN recruiters "
            "ON users.id = recruiters.user_id "
            "WHERE users.id = %s"
        )
        resp = do_delete(req, id)
        return resp

    def update_recruiter(self, id):
        req = (
            "UPDATE users SET "
            "first_name = %s, last_name = %s "
            "WHERE users.id = %s"
        )
        resp = do_put(req, (self.first_name, self.last_name, id))
        return resp

    def get_recruiter_companies(self, id):
        req = (
            "SELECT * FROM recruiters "
            "INNER JOIN companies "
            "USING(id) "
            "WHERE user_id = %s"
        )
        resp = do_get(req, id)
        return jsonify(resp)

    def get_recruiter_applyments(self, id):
        req = (
            "SELECT * FROM job_applyment "
            "INNER JOIN job_announcement "
            "ON job_applyment.job_id = job_announcement.id "
            "INNER JOIN jobbers "
            "ON job_applyment.jobber_id = jobbers.id "
            "INNER JOIN users "
            "ON users.id = jobbers.id "
            "INNER JOIN companies "
            "ON job_announcement.company_id = companies.id "
            "INNER JOIN recruiters "
            "ON recruiters.company_id = companies.id "
            "INNER JOIN activity_field "
            "ON job_announcement.activity_field_id = activity_field.id "
            "INNER JOIN contract_type "
            "ON job_announcement.contract_type_id = contract_type.id "
            "WHERE recruiters.user_id = %s "
            "AND job_announcement.deleted = 0"
        )
        resp = do_get(req, id)
        return jsonify(resp)
