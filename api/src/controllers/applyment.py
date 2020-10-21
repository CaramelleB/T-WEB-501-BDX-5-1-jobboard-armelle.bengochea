from flask import request, jsonify, Response, Blueprint, g
from src.utils.token import jobber_required
from src.models.applyment import ApplymentModel
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_claims
)

applyment = Blueprint('applyment', __name__)


@applyment.route('/', methods=['POST'])
@jobber_required
def create_applyment():
    try:
        data = request.json
        return ApplymentModel(data).create_applyment(), 201
    except Exception as e:
        return f"Problem inserting into db: {str(e)}", 400


@applyment.route('/<id>', methods=['GET'])
def get_applyment(id):
    try:
        return ApplymentModel().get_applyment(id), 200
    except Exception as e:
        return f"Problem inserting into db: {str(e)}", 400


@applyment.route('/<id>', methods=['DELETE'])
@jobber_required
def delete_applyment(id):
    try:
        return ApplymentModel().delete_applyment(id), 200
    except Exception as e:
        return f"Problem deleting into db: {str(e)}", 400
