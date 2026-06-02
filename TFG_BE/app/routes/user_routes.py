import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)
from flask import Blueprint, jsonify, request
from models.user_models import User
from utils.middleware import token_required

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

@user_bp.route('/user', methods=['POST'])
@token_required
def create_user():
    data = request.get_json()
    email=data.get('email')
    password_hash=data.get('password_hash')
    name=data.get('name')
    role=data.get('role')
    if not email or not password_hash or not name or not role:
        return jsonify({"error": "Missing fields for update"}), 400
    try:
        new_user = User.createU
    