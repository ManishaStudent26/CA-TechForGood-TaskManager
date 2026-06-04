import datetime
import jwt
import bcrypt
from models.user_models import User
from config.settings import Config
from werkzeug.security import check_password_hash

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return {"error": "Email and password are required"}, 400
    
    user = User.getUserbyEmail(email)
    if not user:
        return {"error": "Invalid email or password"}, 401
    
    is_valid = check_password_hash(user._password_hash, password)
    if not is_valid:
        return {"error": "Invalid email or password"}, 401
    payload = {
        "uid": user.uid,  # Changed from "user_id" to "uid"
        "role": user.role,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=2)
    }
    token = jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }, 200