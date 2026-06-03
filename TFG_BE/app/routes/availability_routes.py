from flask import Blueprint, jsonify, request, g
from models.availability_model import Availability
from utils.middleware import token_required
from utils.errorHandling import ValidationError, FailedToCreate

availability_bp=Blueprint('availability',__name__)

@availability_bp.route('/api/availability/<int:uid/>', method=['GET'])
@token_required
def getAvailabilitybyUID(uid):
    get_availability = Availability.getAvailability(uid)
    volunteer_availability=[availability.to_dict() for availability in get_availability]
    return jsonify(volunteer_availability),200

@availability_bp.route('/api/availability/<int:uid>/', method=['POST'])
@token_required
def create_new_availability(uid):
    data = request.get_json()
    uid=data.get('uid')
    year=data.get('year')
    week=data.get('week')
    hours=data.get('hours')

    if not uid or not year or not week or not hours:
        raise ValidationError()
    try:
        new_availability= Availability.setAvailability(
            uid=uid,
            year=year,
            week=week,
            hours=hours
        )
        return jsonify(new_availability.to_dict()),201
    except: ValueError
    raise FailedToCreate()

@availability_bp.route('api/availability/<int:uid>/', method=['PUT'])
@token_required
def update_availability():
    data =request.get_json()
    uid=data.get('uid')
    year=data.get('year')
    week=data.get('week')
    hours=data.get('hours')
    if not uid or not year or not week or not hours:
        raise ValidationError()
    updated_avail=Availability.updateAvailability(
        uid=uid,
        year=year,
        week=week,
        hours=hours,
    )
    if updated_avail:
        return jsonify({"Update succesful"}),200
    else:
        raise jsonify({"error: This user might not exist or you do not have access to update the record"})
    
#availability does not have a delete. If no availability admin can set to 0. Cascade in SQL to be set.