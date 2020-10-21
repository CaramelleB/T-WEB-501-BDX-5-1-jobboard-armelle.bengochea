from flask import request, jsonify, Response, Blueprint, g
from src.utils.request import *


class ConstantModel():

    def get_activity_field(self):
        req = "SELECT * FROM activity_field"
        resp = do_get(req)
        return jsonify(resp)

    def get_activity_area(self):
        req = "SELECT * FROM activity_area"
        resp = do_get(req)
        return jsonify(resp)

    def get_contract(self):
        req = "SELECT * FROM contract_type"
        resp = do_get(req)
        return jsonify(resp)
