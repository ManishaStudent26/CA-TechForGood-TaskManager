from config.settings import Config
from flask import jsonify, request, g
from functools import wraps
import jwt

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == 'OPTIONS':
            return f(*args, **kwargs)

        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Access denied. Missing or malformed token."}), 401
        
        token = auth_header.split(" ")[1]
        
        try:
            decoded_payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            
            # Look for both variations just in case the token was signed older
            logged_in_uid = decoded_payload.get('uid')
            
            if not logged_in_uid:
                return jsonify({"error": "Invalid token payload: User ID missing."}), 401
            
            # 🌟 Assign to both properties so no route crashes!
            g.uid = logged_in_uid
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Your login session has expired. Please log in again."}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid authentication token."}), 401
            
        return f(*args, **kwargs)
    return decorated