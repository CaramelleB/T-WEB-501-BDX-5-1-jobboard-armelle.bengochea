from flask import request, jsonify, Response, Blueprint, g
from src.models.login import LoginModel
from src.utils.request import *


class JobberModel():

    __tablename__ = 'jobbers'

    def __init__(self, data={}):
        if len(data) != 0:
            self.login = LoginModel(data)
            self.first_name = data.get('first_name')
            self.last_name = data.get('last_name')
            self.cv = data.get('cv')
            self.linkedin = data.get('linkedin')
            self.web_site = data.get('web_site')
            self.skills = data.get('skills')
            self.description = data.get('description')

    def create_jobber(self):
        user_req = (
            "INSERT INTO users SET login_id = LAST_INSERT_ID(), "
            "first_name = %s, last_name = %s, created_at = CURDATE(); "
        )
        jobber_req = (
            "INSERT INTO jobbers SET user_id = LAST_INSERT_ID(), "
            "cv = %s, linkedin = %s, "
            "web_site = %s, skills = %s, description = %s; "
        )
        signup = self.login.signup()
        resp = do_post(
            (
                signup[0],
                user_req,
                jobber_req
            ),
            (
                signup[1],
                (
                    self.first_name,
                    self.last_name
                ),
                (
                    self.cv,
                    self.linkedin,
                    self.web_site,
                    self.skills,
                    self.description
                )
            )
        )
        return resp

    def get_jobber(self, id):
        req = (
            "SELECT * FROM jobbers "
            "INNER JOIN users "
            "ON users.id = jobbers.user_id "
            "INNER JOIN login "
            "ON login.id = users.login_id "
            "WHERE jobbers.id = %s"
        )
        resp = do_get(req, id)
        return jsonify(resp)

    def delete_jobber(self, id):
        req = (
            "DELETE jobbers, login, users, job_applyment "
            "FROM jobbers "
            "INNER JOIN job_applyment "
            "ON job_applyment.jobber_id = jobbers.id "
            "INNER JOIN users "
            "ON jobbers.user_id = users.id "
            "INNER JOIN login "
            "ON users.login_id = login.id "
            "WHERE jobbers.id = %s "
        )
        resp = do_delete(req, id)
        return resp

    def update_jobber(self, id):
        jobber_req = (
            "UPDATE jobbers SET "
            "cv = %s, linkedin = %s, "
            "web_site = %s, skills = %s, description = %s "
            f"WHERE jobbers.id = %s"
        )
        user_req = (
            "UPDATE users SET "
            "first_name = %s, last_name = %s "
            "WHERE users.id = "
            f"(SELECT user_id FROM jobbers WHERE id = %s)"
        )
        resp = do_put(
            (
                jobber_req,
                user_req
            ),
            (
                (
                    self.cv,
                    self.linkedin,
                    self.web_site,
                    self.skills,
                    self.description,
                    id
                ),
                (
                    self.first_name,
                    self.last_name,
                    id
                )
            )
        )
        return resp

    def get_jobber_applyments(self, id):
        req = (
            "SELECT * FROM job_applyment "
            "INNER JOIN job_announcement "
            "ON job_applyment.job_id = job_announcement.id "
            "INNER JOIN companies "
            "ON job_announcement.company_id = companies.id "
            "INNER JOIN activity_field "
            "ON job_announcement.activity_field_id = activity_field.id "
            "INNER JOIN contract_type "
            "ON job_announcement.contract_type_id = contract_type.id "
            " WHERE jobber_id = %s"
        )
        resp = do_get(req, id)
        return jsonify(resp)
