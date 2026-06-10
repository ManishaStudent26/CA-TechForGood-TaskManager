import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from flask import Blueprint, jsonify, request, g
from models.availability_model import Availability
from utils.middleware import token_required
from utils.errorHandling import ValidationError, ResourceNotFoundError, FailedToCreate

availability_bp = Blueprint('availability', __name__)

@availability_bp.route('/api/availability/<int:uid>', methods=['GET']) # Fixed: methods=
def getAvailability(uid): # Fixed: Caught URL parameter 'uid'
    # Fixed: No get_json() needed for GET. Grab from URL directly.
    get_availability = Availability.getAvailabilitybyUID(uid)
    
    if not get_availability:
        raise ResourceNotFoundError()
        
    # Fixed: The model already returns a list of dicts; don't re-call to_dict()
    return jsonify(get_availability), 200


@availability_bp.route('/api/availability/<int:uid>', methods=['POST']) # Fixed: typo and methods=
def create_new_availability(uid): # Fixed: Caught URL parameter 'uid'
    data = request.get_json() # Fixed: Added ()
    if not data:
        raise ValidationError()

    year = data.get('year')
    week = data.get('week')
    hours = data.get('hours')

    if not year or not week or not hours:
        raise ValidationError()
        
    try:
        # Fixed: Match exact positional order signature of the model (uid, week, year, hours)
        success = Availability.setAvailability(
            uid=uid,
            week=week,
            year=year,
            hours=hours
        )
        if success:
            return jsonify({"message": "Availability created successfully"}), 201
        else:
            raise FailedToCreate()
    except ValueError: # Fixed: Correct exception handling syntax
        raise FailedToCreate()


@availability_bp.route('/api/availability/<int:uid>', methods=['PUT']) # Fixed: leading slash, methods=, and HTTP verb
def update_availability(uid): # Fixed: Caught URL parameter 'uid'
    data = request.get_json() # Fixed: Added ()
    if not data:
        raise ValidationError()

    year = data.get('year')
    week = data.get('week')
    hours = data.get('hours')
    
    if not year or not week or not hours:
        raise ValidationError()
        
    # Fixed: Match exact positional order signature of the model (uid, week, year, hours)
    updated_avail = Availability.updateAvailability(
        uid=uid,
        week=week,
        year=year,
        hours=hours
    )
    
    if updated_avail:
        return jsonify({"message": "Update successful"}), 200 # Fixed: Set as a proper dictionary mapping
    else:
        # Fixed: Raised custom exception class instead of raising an invalid jsonify object
        raise ResourceNotFoundError()

# availability does not have a delete. If no availability admin can set to 0. Cascade in SQL to be set.