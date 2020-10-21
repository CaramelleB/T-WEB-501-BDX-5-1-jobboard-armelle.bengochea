from flask import Flask, request
from src.app import app
from src.controllers.jobber import jobber
from src.controllers.recruiter import recruiter
from src.controllers.company import company
from src.controllers.announcement import announcement
from src.controllers.constant import constant
from src.controllers.login import login
from src.controllers.applyment import applyment


app.register_blueprint(jobber, url_prefix='/api/jobber')
app.register_blueprint(recruiter, url_prefix='/api/recruiter')
app.register_blueprint(company, url_prefix='/api/company')
app.register_blueprint(announcement, url_prefix='/api/announcement')
app.register_blueprint(constant, url_prefix='/api/constant')
app.register_blueprint(login, url_prefix='/api/login')
app.register_blueprint(applyment, url_prefix='/api/applyment')


if __name__ == '__main__':
    app.run(debug=True)
