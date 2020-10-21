from flask import request, jsonify, Response, Blueprint, g
from src.utils.token import company_required
from src.models.recruiter import RecruiterModel

recruiter = Blueprint('recruiter', __name__)


@recruiter.route('/', methods=['POST'])
def create_recruiter():
    try:
        data = request.json
        return RecruiterModel(data).create_recruiter(), 201
    except Exception as e:
        return f"Problem inserting into db: {str(e)}", 400


@recruiter.route('/', methods=['GET'])
@company_required
def get_recruiters():
    try:
        return RecruiterModel().get_recruiters(), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@recruiter.route('/<id>', methods=['GET'])
def get_recruiter(id):
    try:
        return RecruiterModel().get_recruiter(id), 200
    except Exception as e:

        return f"Problem finding into db: {str(e)}", 400


@recruiter.route('/<id>', methods=['PUT'])
def update_recruiter(id):
    try:
        data = request.json
        return RecruiterModel(data).update_recruiter(id), 200
    except Exception as e:
        return f"Problem updating into db: {str(e)}", 400


@recruiter.route('/<id>', methods=['DELETE'])
def delete_recruiter(id):
    try:
        return RecruiterModel().delete_recruiter(id), 200
    except Exception as e:
        return f"Problem deleting into db: {str(e)}", 400


@recruiter.route('/<id>/companies', methods=['GET'])
def get_recruiter_companies(id):
    try:
        return RecruiterModel().get_recruiter_companies(id), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@recruiter.route('/<id>/applyments', methods=['GET'])
def get_recruiter_applyments(id):
    try:
        return RecruiterModel().get_recruiter_applyments(id), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400
