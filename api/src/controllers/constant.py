from flask import request, jsonify, Response, Blueprint, g
from src.models.constant import ConstantModel

constant = Blueprint('constant', __name__)


@constant.route('/activity_field', methods=['GET'])
def get_activity_field():
    try:
        return ConstantModel().get_activity_field(), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@constant.route('/activity_area', methods=['GET'])
def get_activity_area():
    try:
        return ConstantModel().get_activity_area(), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@constant.route('/contract', methods=['GET'])
def get_contract():
    try:
        return ConstantModel().get_contract(), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400
