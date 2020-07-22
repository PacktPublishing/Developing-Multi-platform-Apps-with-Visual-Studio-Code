from flask import Flask, request

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"

@app.route('/notifications', methods=['POST'])
def getNotifications():
    message = Mail(
    from_email="donotreply@jos.com",
    to_emails=request.json['toemail'],
    subject=request.json['subject'],
    html_content=request.json['body'])
    try:
        sg = SendGridAPIClient("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")
        response = sg.send(message)
    except Exception as e:
        print(e)
        

app.run()