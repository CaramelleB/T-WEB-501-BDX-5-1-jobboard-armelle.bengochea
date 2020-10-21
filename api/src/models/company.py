from flask import request, jsonify, Response, Blueprint, g
from src.models.login import LoginModel
from src.utils.request import *


class CompanyModel():

    __tablename__ = 'company'

    def __init__(self, data={}):
        if len(data) != 0:
            self.login = LoginModel(data)
            self.siren_number = data.get('siren_number')
            self.company_name = data.get('company_name')
            self.logo = data.get('logo')
            self.cover = data.get('cover')
            self.localisation = data.get('localisation')
            self.activity_area_id = data.get('activity_area_id')
            self.year_birth = data.get('year_birth')
            self.number_employees = data.get('number_employees')
            self.description = data.get('description')
            self.web_site = data.get('web_site')
            self.linkedin = data.get('linkedin')
            self.facebook = data.get('facebook')
            self.twitter = data.get('twitter')
            self.status = data.get('status')

    def create_company(self):
        company_req = (
            "INSERT INTO companies SET login_id = LAST_INSERT_ID(), "
            "siren_number=%s, company_name=%s,"
            "logo=%s, cover=%s, localisation=%s, " "activity_area_id=%s, "
            "year_birth=%s, "
            "number_employees=%s, description=%s, "
            "web_site=%s, linkedin=%s, facebook=%s, "
            "twitter=%s, created_at= CURDATE()"
        )
        signup = self.login.signup()
        resp = do_post(
            (
                signup[0],
                company_req,
            ),
            (
                signup[1],
                (
                    self.siren_number,
                    self.company_name,
                    self.logo,
                    self.cover,
                    self.localisation,
                    self.activity_area_id,
                    self.year_birth,
                    self.number_employees,
                    self.description,
                    self.web_site,
                    self.linkedin,
                    self.facebook,
                    self.twitter
                )
            )
        )
        return resp

    def get_companies(self):
        req = (
            "SELECT * FROM companies "
            "INNER JOIN activity_area "
            "ON companies.activity_area_id = activity_area.id "
        )
        resp = do_get(req)
        return jsonify(resp)

    def get_company(self, id):
        req = (
            "SELECT * FROM companies "
            "INNER JOIN activity_area "
            "ON companies.activity_area_id = activity_area.id "
            "WHERE companies.id = %s"
        )
        resp = do_get(req, id)
        return jsonify(resp)

    def delete_company(self, id):
        req = (
            "DELETE recruiters, login, companies "
            "FROM companies "
            "INNER JOIN login "
            "ON companies.login_id = login.id "
            "INNER JOIN recruiters "
            "ON companies.id = recruiters.company_id "
            "WHERE companies.id = %s"
        )
        resp = do_delete(req, id)
        return resp

    def update_company(self, id):
        req = (
            "UPDATE companies SET "
            "logo=%s, cover=%s, localisation=%s, " "activity_area_id=%s, "
            "year_birth=%s, "
            "number_employees=%s, description=%s, "
            "web_site=%s, linkedin=%s, facebook=%s, "
            "twitter=%s"
            "WHERE id = %s"
        )
        resp = do_put(
            req,
            (
                self.logo,
                self.cover,
                self.localisation,
                self.activity_area_id,
                self.year_birth,
                self.number_employees,
                self.description,
                self.web_site,
                self.linkedin,
                self.facebook,
                self.twitter,
                id
            )
        )
        return resp

    def get_company_recruiters(self, id):
        req = (
            "SELECT * FROM recruiters "
            "INNER JOIN users "
            "ON recruiters.user_id = users.id "
            "WHERE company_id = %s"
        )
        resp = do_get(req, id)
        return jsonify(resp)

    def update_company_recruiters_status(self, id, recruiter_id):
        req = (
            "UPDATE recruiters "
            "SET status = %s "
            "WHERE id = %s "
            "AND company_id = %s"
        )
        resp = do_patch(
            req,
            (
                self.status,
                recruiter_id,
                id
            )
        )
        return resp
