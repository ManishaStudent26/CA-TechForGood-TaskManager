import datetime
import jwt
from flask import jsonify # 🌟 Added this import
from models.user_models import User
from config.settings import Config
from werkzeug.security import check_password_hash

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User.getUserbyEmail(email)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401
    
    # Verify the password hash against user password property
    is_valid = check_password_hash(user._password_hash, password)
    if not is_valid:
        return jsonify({"error": "Invalid email or password"}), 401
        
    payload = {
        "uid": user.uid,  
        "role": user.role,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=2)
    }
    
    # 🌟 SAFE ENCODING: Generate the token string securely
    token = jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")
    
    # 🌟 LEGACY BACKUP: If PyJWT returned a bytes object, cast it safely to a string
    if isinstance(token, bytes):
        token = token.decode('utf-8')

    # 🌟 FIX FLASK ROUTE COMPATIBILITY: Wrap responses in jsonify()
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "uid": user.uid, # Good practice to provide this here too!
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200