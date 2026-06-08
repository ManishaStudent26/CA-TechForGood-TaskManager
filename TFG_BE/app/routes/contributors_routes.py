from flask import Blueprint, jsonify, request
from models.contributors_models import Contributor
from utils.middleware import token_required
from flask import Blueprint, jsonify, request
from models.contributors_models import Contributor
from utils.middleware import token_required
from utils.errorHandling import ValidationError, ResourceNotFoundError, FailedToCreate

contributors_bp = Blueprint('contributors', __name__)

@contributors_bp.route('/api/projects/<int:pid>/contributors', methods=['GET'])
@token_required
def get_project_contributors(pid):
    contributors = Contributor.getContributorbyProject(pid)
    
    # If your model returns a list of dictionaries directly:
    if contributors is not None:
        return jsonify(contributors), 200
        
    # Alternate approach if your model returns class objects:
    # serialized_contributors = [c.to_dict() for c in contributors]
    # return jsonify(serialized_contributors), 200
    
    raise ResourceNotFoundError()


@contributors_bp.route('/api/projects/<int:pid>/contributors', methods=['POST'])
@token_required
def add_project_contributor(pid):
    data = request.get_json() or {}
    uid = data.get('uid')
    
    if not uid:
        raise ValidationError()
        
    new_contributor = Contributor.addContributortoProject(pid, uid)
    
    if not new_contributor:
        raise FailedToCreate()
        
    # If your model returns the dictionary of the newly created contributor row directly:
    return jsonify(new_contributor), 201

    # Alternate approach if your model returns a instantiated class instance:
    # return jsonify(new_contributor.to_dict()), 201


@contributors_bp.route('/api/contributors/<int:cid>', methods=['DELETE'])
@token_required
def remove_project_contributor(cid):
    success = Contributor.removeContributorfromProject(cid)
    
    if not success:
        raise ResourceNotFoundError()
        
    return jsonify({"message": "Contributor successfully deleted."}), 200

contributors_bp = Blueprint('contributors',__name__)

@contributors_bp.route('/api/projects/<int:pid>/contributors', methods=['GET'])
@token_required
def get_project_contributors(pid):
    projectContributors = Contributor.getContributorbyProject(pid)
    serialized_contributors = [contributor.to_dict() for contributor in projectContributors]
    return jsonify(serialized_contributors), 200

@contributors_bp.route('/api/projects/<int:pid>/contributors', methods=['POST'])
@token_required
def add_project_contributor(pid):
    data = request.get_json() or {}
    uid = data.get('uid')
    
    if not uid:
        raise ValidationError()
        
    new_contributor = Contributor.addContributortoProject(pid, uid)
    return jsonify(new_contributor.to_dict()), 201

@contributors_bp.route('/api/contributors/<int:cid>', methods=['DELETE'])
@token_required
def remove_project_contributor(cid):
    success = Contributor.removeContributorfromProject(cid)
    
    if not success:
        raise ResourceNotFoundError()
        
    return jsonify({"message": "Contributor successfully deleted."}), 200