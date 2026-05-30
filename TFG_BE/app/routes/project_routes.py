import jwt
from flask import Blueprint, jsonify, request

from config.settings import Config
from models.project_model import Project  

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/api/projects', methods=['GET'])
def get_manager_projects():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Access denied. Missing or malformed token."}), 401
    
    token = auth_header.split(" ")[1]
    
    try:
        decoded_payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        logged_in_uid = decoded_payload.get('user_id')
        
        if not logged_in_uid:
            return jsonify({"error": "Invalid token payload: User ID missing."}), 401
        manager_projects = Project.getProjectbyManager(logged_in_uid)
        serialized_projects = [project.to_dict() for project in manager_projects]
        
        return jsonify(serialized_projects), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Your login session has expired. Please log in again."}), 401
        
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid authentication token."}), 401