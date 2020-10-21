from src.app import app
from functools import wraps
from flask_jwt_extended import (
    JWTManager, verify_jwt_in_request, create_access_token,
    get_jwt_claims
)

app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
# app.config['JWT_TOKEN_LOCATION'] = ['cookies']
# app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
# app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
# app.config['JWT_COOKIE_CSRF_PROTECT'] = False

jwt = JWTManager(app)


def jobber_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['type'] != 1:
            return {"msg": 'Jobbers only!'}, 403
        else:
            return fn(*args, **kwargs)
    return wrapper


def recruiter_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['type'] != 2:
            return {"msg": 'Recruiters only!'}, 403
        else:
            return fn(*args, **kwargs)
    return wrapper


def company_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['type'] != 3:
            return {"msg": 'Companys only!'}, 403
        else:
            return fn(*args, **kwargs)
    return wrapper


def recruiter_company_require(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['type'] == 3 or claims['type'] == 2:
            return fn(*args, **kwargs)
        else:
            return {"msg": 'Companys or Recruiters only!'}, 403
    return wrapper


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return {"identity": identity}
