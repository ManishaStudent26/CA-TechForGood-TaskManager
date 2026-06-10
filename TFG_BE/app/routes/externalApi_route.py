from flask import Blueprint, jsonify, request
from models.external_model import NewsApiClient
from utils.errorHandling import ResourceNotFoundError

news_bp = Blueprint('availability', __name__)

@news_bp.route('/api/getnews>', methods=['GET']) # Fixed: methods=
def getNews():
    get_news = NewsApiClient.get_top_headlines()
    
    if not get_news:
        raise ResourceNotFoundError()
        
    # Fixed: The model already returns a list of dicts; don't re-call to_dict()
    return jsonify(get_news), 200