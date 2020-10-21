from flask import request, jsonify, Response, Blueprint, g
from src.utils.token import recruiter_required
from src.models.announcement import AnnouncementModel
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_claims
)

announcement = Blueprint('announcement', __name__)


@announcement.route('/', methods=['POST'])
@recruiter_required
def create_announcement():
    try:
        data = request.json
        return AnnouncementModel(data).create_announcement(), 201
    except Exception as e:
        return f"Problem inserting into db: {str(e)}", 400


@announcement.route('/', methods=['GET'])
def get_all_announcement():
    try:
        return AnnouncementModel().get_all_announcement(), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@announcement.route('/<id>', methods=['GET'])
def get_announcement(id):
    try:
        return AnnouncementModel().get_announcement(id), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400


@announcement.route('/<id>', methods=['PATCH'])
@recruiter_required
def delete_announcement(id):
    try:
        data = request.json
        return AnnouncementModel(data).delete_announcement(id), 200
    except Exception as e:
        return f"Problem deleting into db: {str(e)}", 400


# udpate company_id ???
@announcement.route('/<id>', methods=['PUT'])
@recruiter_required
def update_announcement(id):
    try:
        data = request.json
        return AnnouncementModel(data).update_announcement(id), 200
    except Exception as e:
        return f"Problem updating into db: {str(e)}", 400


@announcement.route('/<id>/applyment', methods=['GET'])
@recruiter_required
def get_announcement_recruiters(id):
    try:
        return AnnouncementModel().get_announcement_recruiters(id), 200
    except Exception as e:
        return f"Problem finding into db: {str(e)}", 400
