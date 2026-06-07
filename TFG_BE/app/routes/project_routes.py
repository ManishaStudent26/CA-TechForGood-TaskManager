from flask import Blueprint, jsonify, request, g
from models.project_model import Project
from utils.middleware import token_required
from utils.errorHandling import ValidationError
from datetime import datetime

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/api/projects', methods=['GET','OPTIONS'])
@token_required
def get_manager_projects():
    if request.method == 'OPTIONS':
        return jsonify({"message": "Preflight OK"}), 200
    if not hasattr(g, 'uid') or g.uid is None:
        return jsonify({"error": "Session identity could not be verified by middleware."}), 500
    uid = g.uid
    manager_projects = Project.getProjectbyManager(uid)
    serialized_projects = [project.to_dict() for project in manager_projects]
    return jsonify(serialized_projects), 200

@projects_bp.route('/api/projects', methods=['POST'])
def create_new_project():
    print("🎯 React successfully reached the Python backend!")
    data = request.get_json()
    uid = data.get('uid')
    project_name = data.get('project_name')
    project_start_str = data.get('project_start')
    project_end_str = data.get('project_end')
    
    try:
    # Convert the strings into actual Python date objects before saving
        project_start = datetime.strptime(project_start_str, '%Y-%m-%d').date() if project_start_str else None
        project_end = datetime.strptime(project_end_str, '%Y-%m-%d').date() if project_end_str else None
    except ValueError as e:
        print(f"Date formatting failed: {e}")
    # This print will tell you exactly if the format was wrong
    
    if not project_name or not project_start or not project_end:
        raise ValidationError("Missing required fields: project_name, project_start, or project_end")
        
    try:
        new_project = Project.createProject(
            project_owner=uid,
            project_name=project_name,
            project_start=project_start,
            project_end=project_end
        )
        return jsonify(new_project.to_dict()), 201
    except Exception as e:
        return jsonify({"error": "Failed to create project", "details": str(e)}), 500

@projects_bp.route('/api/projects/<int:pid>', methods=['PUT'])
def update_existing_project(pid):
    data = request.get_json()
    
    project_name = data.get('project_name')
    project_start = data.get('project_start')
    project_end = data.get('project_end')
    
    if not project_name or not project_start or not project_end:
        return jsonify({"error": "Missing fields for update"}), 400
        
    success = Project.editProject(
        pid=pid,
        project_name=project_name,
        project_start=project_start,
        project_end=project_end
    )
    
    if success:
        return jsonify({"message": f"Project {pid} successfully updated."}), 200
    else:
        return jsonify({"error": "Project not found or unauthorized access."}), 404

@projects_bp.route('/api/projects/<int:pid>', methods=['DELETE'])
def delete_existing_project(pid):
    success = Project.deleteProject(pid)
    
    if success:
        return jsonify({"message": f"Project {pid} successfully deleted."}), 200
    else:
        return jsonify({"error": "Project not found or unauthorized access."}), 404