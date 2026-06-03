from flask import Blueprint, jsonify, request, g
from models.availability_model import Availability
from utils.middleware import token_required
from utils.errorHandling import ValidationError, ResourceNotFoundError

availability_bp=Blueprint('availability',__name__)

@availability_bp.route('/api/availability/<int:uid>', method=['GET'])
@token_required
def getAvailabilitybyUID():
    data = request.get_json
    uid=data.get('uid')
    get_availability = Availability.getAvailability(uid)
    volunteer_availability=[availabilty.to_dict() for availability in get_availability]
    return jsonify(volunteer_availability),200