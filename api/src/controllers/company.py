from flask import request, jsonify, Response, Blueprint, g
from src.utils.token import company_required
from src.models.company import CompanyModel
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_claims
)

company = Blueprint('company', __name__)


@company.route('/', methods=['POST'])
def create_company():
    try:
        data = request.json
        return CompanyModel(data).create_company(), 201
    except Exception as e:
        return f"Problem inserting into db: {str(e)}", 400


@company.route('/', methods=['GET'])
def get_companies():
    try:
        return CompanyModel().get_companies(), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@company.route('/<id>', methods=['GET'])
def get_company(id):
    try:
        return CompanyModel().get_company(id), 200
    except Exception as e:

        return f"Problem finding into db: {str(e)}", 400


@company.route('/<id>', methods=['DELETE'])
@company_required
def delete_company(id):
    try:
        return CompanyModel().delete_company(id), 200
    except Exception as e:
        return f"Problem deleting into db: {str(e)}", 400


@company.route('/<id>', methods=['PUT'])
@company_required
def update_company(id):
    try:
        data = request.json
        return CompanyModel(data).update_company(id), 200
    except Exception as e:
        return f"Problem updating into db: {str(e)}", 400


@company.route('/<id>/recruiters', methods=['GET'])
@company_required
def get_company_recruiters(id):
    try:
        return CompanyModel().get_company_recruiters(id), 200
    except Exception as e:

        return f"Problem finding into db: {str(e)}", 400


@company.route('/<id>/recruiter/<recruiter_id>', methods=['PATCH'])
@company_required
def update_company_recruiters_status(id, recruiter_id):
    try:
        data = request.json
        return CompanyModel(data).get_company_recruiters(id, recruiter_id), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400
