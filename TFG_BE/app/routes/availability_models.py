from flask import Blueprint, jsonify, request, g
from models.availability_model import Availability
from utils.middleware import token_required