import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(current_dir))
from flask import Blueprint, jsonify, request
from models.user_models import User
from utils.middleware import token_required
from utils.errorHandling import ValidationError, ResourceNotFoundError

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/user', methods=['GET'])
@token_required
def getUserbyEmail():
    email_input = request.args.get('email')
    if not email_input:
        raise ValidationError("Missing required 'email' query parameter.")

    current_user = User.getUserbyEmail(email_input)

    if current_user:
        return jsonify({
            "uid": current_user.uid,
            "email": current_user.email,
            "name": current_user.name,
            "role": current_user.role
        }), 200
    else:
        raise ResourceNotFoundError()


@user_bp.route('/user', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    email = data.get('email')
    password_hash = data.get('password_hash')
    name = data.get('name')
    
    if not email or not password_hash or not name:
        raise ValidationError("Missing fields for user creation.")
        
    try:
        new_user = User.createUser(
            email=email,
            password_hash=password_hash,
            name=name
        )
        # Fixed: Changed new_user.to.dict() to new_user.to_dict()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        # Fixed: Updated descriptive error log from project to user
        return jsonify({"error": "Failed to create user", "details": str(e)}), 500


@user_bp.route('/user/search', methods=['GET'])
def getUserbyID():
    getuid = request.args.get('uid')
    if not getuid:
        raise ValidationError("Missing required 'uid' query parameter.")
        
    userinfo = User.getUserbyID(getuid)

    if userinfo:
        return jsonify({
            "uid": userinfo.uid,
            "email": userinfo.email,
            "name": userinfo.name,
            "role": userinfo.role
        }), 200
    else:
        raise ResourceNotFoundError()


@user_bp.route('/user/<int:uid>', methods=['PUT']) # Fixed: method -> methods
def UpdateUser(uid):
    data = request.get_json() or {}

    email = data.get('email')
    name = data.get('name')
    role = data.get('role')

    if not email or not name or not role:
        raise ValidationError("Missing required fields for update.")

    # Fixed: Match exact case signature from model -> EditUser
    user_update = User.EditUser(
        uid=uid,
        email=email,
        name=name,
        role=role
    )
    
    if user_update:
        return jsonify({"message": f"User {uid} successfully updated."}), 200
    else:
        raise ResourceNotFoundError()
    
    
@user_bp.route('/user/<int:uid>', methods=['DELETE']) # Fixed: method -> methods
def DelUser(uid):
    # Note: Flask validates <int:uid> from the path. No need to manually check 'if not uid'
    user_del = User.DelUser(uid)
    
    if user_del:
        # Fixed: Removed formatting colon typo inside string payload dictionary key
        return jsonify({"message": f"User {uid} successfully removed."}), 200
    else:
        raise ResourceNotFoundError()


@user_bp.route('/allusers', methods=['GET'])
def GetUsers():
    users = User.getAllUser()
    
    if users is None:
        return jsonify([]), 200
        
    # AI Fixed: Safely serialize users list using to_dict() if model returns object instances
    # If your model returns raw dicts, you can change this to just: return jsonify(users), 200
    serialized_users = [user_bp.to_dict() for user_bp in users]
    return jsonify(serialized_users), 200