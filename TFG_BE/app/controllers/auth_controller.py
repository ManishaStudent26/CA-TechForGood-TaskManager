import datetime
import jwt
import bcrypt
from flask import jsonify
from models.user_models import User
from config.settings import Config

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User.get_by_email(email)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401
    

    is_valid = bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8'))
    if not is_valid:
        return jsonify({"error": "Invalid email or password"}), 401
    
    payload = {
        "user_id": user['id'],
        "role": user['role'],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2) # Matches your '2h' config fallback
    }

    token = jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256") 

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "name": user['name'],
            "email": user['email'],
            "role": user['role']
        }
    }), 200