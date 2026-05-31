import jwt
from flask import Blueprint, jsonify, request, g
from functools import wraps

from config.settings import Config
from models.project_model import Project  

projects_bp = Blueprint('projects', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Access denied. Missing or malformed token."}), 401
        
        token = auth_header.split(" ")[1]
        
        try:
            decoded_payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            logged_in_uid = decoded_payload.get('user_id')
            
            if not logged_in_uid:
                return jsonify({"error": "Invalid token payload: User ID missing."}), 401
            
            g.user_id = logged_in_uid
            
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Your login session has expired. Please log in again."}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid authentication token."}), 401
            
        return f(*args, **kwargs)
    return decorated

@projects_bp.route('/api/projects', methods=['GET'])
@token_required
def get_manager_projects():
    manager_projects = Project.getProjectbyManager(g.user_id)
    serialized_projects = [project.to_dict() for project in manager_projects]
    return jsonify(serialized_projects), 200

@projects_bp.route('/api/projects', methods=['POST'])
@token_required
def create_new_project():
    data = request.get_json()
    
    project_name = data.get('project_name')
    project_start = data.get('project_start')
    project_end = data.get('project_end')
    
    if not project_name or not project_start or not project_end:
        return jsonify({"error": "Missing required fields: project_name, project_start, or project_end"}), 400
        
    try:
        new_project = Project.createProject(
            project_owner=g.user_id,
            project_name=project_name,
            project_start=project_start,
            project_end=project_end
        )
        return jsonify(new_project.to_dict()), 201
    except Exception as e:
        return jsonify({"error": "Failed to create project", "details": str(e)}), 500

@projects_bp.route('/api/projects/<int:pid>', methods=['PUT'])
@token_required
def update_existing_project(pid):
    data = request.get_json()
    
    project_name = data.get('project_name')
    project_start = data.get('project_start')
    project_end = data.get('project_end')
    
    if not project_name or not project_start or not project_end:
        return jsonify({"error": "Missing fields for update"}), 400
        
    success = Project.editProject(
        pid=pid,
        project_owner=g.user_id,
        project_name=project_name,
        project_start=project_start,
        project_end=project_end
    )
    
    if success:
        return jsonify({"message": f"Project {pid} successfully updated."}), 200
    else:
        return jsonify({"error": "Project not found or unauthorized access."}), 404

@projects_bp.route('/api/projects/<int:pid>', methods=['DELETE'])
@token_required
def delete_existing_project(pid):
    success = Project.deleteProject(pid=pid, project_owner=g.user_id)
    
    if success:
        return jsonify({"message": f"Project {pid} successfully deleted."}), 200
    else:
        return jsonify({"error": "Project not found or unauthorized access."}), 404