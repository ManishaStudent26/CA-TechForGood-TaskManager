from flask import Blueprint, jsonify, request, g
from models.project_model import Project
from utils.middleware import token_required
from utils.errorHandling import ValidationError

projects_bp = Blueprint('projects', __name__)

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
        raise ValidationError({"Missing required fields: project_name, project_start, or project_end"})
        
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
    success = Project.deleteProject(pid)
    
    if success:
        return jsonify({"message": f"Project {pid} successfully deleted."}), 200
    else:
        return jsonify({"error": "Project not found or unauthorized access."}), 404