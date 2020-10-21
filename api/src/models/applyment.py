from flask import request, jsonify, Response, Blueprint, g
from src.utils.request import *


class ApplymentModel():

    __tablename__ = 'job_applyment'

    def __init__(self, data={}):
        if len(data) != 0:
            self.jobber_id = data.get('id')
            self.job_id = data.get('job_id')
            self.cv = data.get('cv')
            self.skills = data.get('skills')
            self.description = data.get('description')

    def create_applyment(self):
        applyment_req = (
            "INSERT INTO job_applyment SET jobber_id = %s, "
            "job_id = %s, cv = %s, skills = %s, "
            "description = %s, created_at = CURDATE()"
        )
        resp = do_post(
            applyment_req,
            (
                self.jobber_id,
                self.job_id,
                self.cv,
                self.skills,
                self.description
            )
        )
        return resp

    def get_applyment(self, id):
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
                "WHERE job_applyment.id = %s"
            )
        resp = do_get(req, id)
        return jsonify(resp)

    def delete_applyment(self, id):
        req = (
            "DELETE FROM job_applyment " +
            "WHERE id = %s"
        )
        resp = do_delete(req, id)
        return resp
