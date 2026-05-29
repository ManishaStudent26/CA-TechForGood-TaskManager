import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)
from flask import Blueprint, jsonify, request
from models.user_models import User

user_bp = Blueprint('user_bp',__name__)

@user_bp.route('/user')
def getUserbyEmail():
    email_input=request.args.get('email')

    current_user = User.getUserbyEmail(email_input)

    if current_user:
        return jsonify({
            "uid": current_user.uid,
            "email": current_user.email,
            "name": current_user.name,
            "role": current_user.role
        })