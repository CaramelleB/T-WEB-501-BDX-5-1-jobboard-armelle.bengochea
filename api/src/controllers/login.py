from flask import request, jsonify, Response, Blueprint, g
from src.models.login import LoginModel


login = Blueprint('login', __name__)


@login.route('/', methods=['POST'])
def get_login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.json
    if not data['email']:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not data['password']:
        return jsonify({"msg": "Missing password parameter"}), 400

    return LoginModel(data).login(data.get('password')), 200
