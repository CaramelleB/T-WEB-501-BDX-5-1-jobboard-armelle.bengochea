from src.app import bcrypt
from src.utils.connect import connection
from flask import request, jsonify, Response, Blueprint, g
from src.models.login import LoginModel
from src.utils.request import *


class AnnouncementModel():

    __tablename__ = 'job_announcement'

    def __init__(self, data={}):
        if len(data) != 0:
            self.company_id = data.get('company_id')
            self.job_name = data.get('job_name')
            self.recruiter_id = data.get('recruiter_id')
            self.activity_field_id = data.get('activity_field_id')
            self.contract_type_id = data.get('contract_type_id')
            self.localisation = data.get('localisation')
            self.job_start = data.get('job_start')
            self.job_description = data.get('job_description')
            self.additional_information = data.get('additional_information')
            self.missions = data.get('missions')
            self.profile = data.get('profile')
            self.salary = data.get('salary')
            self.deleted = data.get('deleted')

    def create_announcement(self):
        req = (
            "INSERT INTO job_announcement SET "
            "company_id = %s, job_name = %s, recruiter_id = %s, "
            "activity_field_id = %s, contract_type_id = %s, "
            "localisation = %s, job_start = %s, job_description = %s, "
            "additional_information = %s, missions = %s, profile = %s, "
            "salary = %s, vue = 0, created_at = CURDATE(), deleted = FALSE"
        )
        resp = do_post(
            req,
            (
                self.company_id,
                self.job_name,
                self.recruiter_id,
                self.activity_field_id,
                self.contract_type_id,
                self.localisation,
                self.job_start,
                self.job_description,
                self.additional_information,
                self.missions,
                self.profile,
                self.salary
            )
        )
        return resp

    def get_all_announcement(self):
        req = (
            "SELECT * FROM job_announcement "
            "INNER JOIN companies "
            "ON job_announcement.company_id = companies.id "
            "INNER JOIN recruiters "
            "ON job_announcement.recruiter_id = recruiters.id "
            "INNER JOIN activity_field "
            "ON job_announcement.activity_field_id = activity_field.id "
            "INNER JOIN contract_type "
            "ON job_announcement.contract_type_id = contract_type.id "
            "WHERE job_announcement.deleted = FALSE"
        )
        resp = do_get(req)
        return jsonify(resp)

    def get_announcement(self, id):
        req = (
            "SELECT * FROM job_announcement "
            "INNER JOIN companies "
            "ON job_announcement.company_id = companies.id "
            "INNER JOIN recruiters "
            "ON job_announcement.recruiter_id = recruiters.id "
            "INNER JOIN activity_field "
            "ON job_announcement.activity_field_id = activity_field.id "
            "INNER JOIN contract_type "
            "ON job_announcement.contract_type_id = contract_type.id "
            "WHERE job_announcement.id = %s"
        )
        resp = do_get(req, id)
        return jsonify(resp)

    def get_announcement_recruiters(self, id):
        req = (
            "SELECT * FROM job_applyment "
            "INNER JOIN job_announcement "
            "ON job_applyment.job_id = job_announcement.id "
            "INNER JOIN jobbers "
            "ON job_applyment.jobber_id = jobbers.id "
            "WHERE job_announcement.id = %s"
        )
        resp = do_get(req, id)
        return jsonify(resp)

    def delete_announcement(self, id):
        req = (
            "UPDATE job_announcement SET deleted = %s "
            "WHERE job_announcement.id = %s"
        )
        resp = do_patch(req, (self.deleted, id))
        return resp

    def update_announcement(self, id):
        req = (
            "UPDATE job_announcement SET "
            "job_name = %s, activity_field_id = %s, contract_type_id = %s, "
            "localisation = %s, job_start = %s, job_description = %s, "
            "additional_information = %s, missions = %s, profile = %s, "
            "salary = %s WHERE job_announcement = %s"
        )
        resp = do_put(
            req,
            (
                self.job_name,
                self.activity_field_id,
                self.contract_type_id,
                self.localisation,
                self.job_start,
                self.job_description,
                self.additional_information,
                self.missions,
                self.profile,
                self.salary,
                id
            )
        )
        return resp
