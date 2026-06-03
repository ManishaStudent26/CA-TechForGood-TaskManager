from flask import Blueprint, jsonify, request, g
from models.availability_model import Availability
from utils.middleware import token_required
from utils.errorHandling import ValidationError, ResourceNotFoundError, FailedToCreate

availability_bp=Blueprint('availability',__name__)

@availability_bp.route('/api/availability/<int:uid>', method=['GET'])
@token_required
def getAvailabilitybyUID():
    data = request.get_json
    uid=data.get('uid')
    get_availability = Availability.getAvailability(uid)
    volunteer_availability=[availabilty.to_dict() for availability in get_availability]
    return jsonify(volunteer_availability),200

@availability_bp.route('/api/availabiliy/<int:uid>', method=['POST'])
@token_required
def create_new_project():
    data = request.get_json
    uid=data.get('uid')
    year=data.get('year')
    week=data.get('week')
    hours=data.get('hours')

    if not uid or not year or not week or not hours:
        raise ValidationError()
    try:
        new_availability= Availability.setAvailability(
            uid=uid,
            year=year
            week=week
            hours=hours
        )
        return jsonify(new_availability.to_dict()),201
    except: ValueError
    raise FailedToCreate()
@
