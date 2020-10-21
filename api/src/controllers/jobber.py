from flask import request, Blueprint
from src.utils.token import jobber_required
from src.models.jobber import JobberModel
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_claims
)


jobber = Blueprint('jobber', __name__)


@jobber.route('/', methods=['POST'])
def create_jobber():
    try:
        data = request.json
        return JobberModel(data).create_jobber(), 201
    except Exception as e:
        return f"Problem inserting into db: {str(e)}", 400


@jobber.route('/<id>', methods=['GET'])
@jobber_required
def get_jobber(id):
    try:
        jobber = JobberModel().get_jobber(id)
        claims = get_jwt_claims()
        email_jobber = jobber.get_json()['data'][0]['email']
        if email_jobber == claims['email']:
            return jobber
        else:
            return {"msg": "Wrong Jobber !"}
        return 'ok'
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@jobber.route('/<id>', methods=['DELETE'])
@jobber_required
def delete_jobber(id):
    try:
        return JobberModel().delete_jobber(id), 200
    except Exception as e:
        return f"Problem deleting into db: {str(e)}", 400


@jobber.route('/<id>', methods=['PUT'])
@jobber_required
def update_jobber(id):
    try:
        data = request.json
        return JobberModel(data).update_jobber(id), 200
    except Exception as e:
        return f"Problem updating into db: {str(e)}", 400


@jobber.route('/<id>/applyment', methods=['GET'])
def get_jobber_applyments(id):
    try:
        return JobberModel().get_jobber_applyments(id), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400
