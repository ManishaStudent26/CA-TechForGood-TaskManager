import os
from flask import Blueprint, jsonify
from utils.errorHandling import ResourceNotFoundError
from newsapi import NewsApiClient

news_bp = Blueprint('news', __name__)
newsapi = NewsApiClient(api_key=os.getenv('api_key'))

@news_bp.route('/api/getnews', methods=['GET'])
def getNews():
    get_news = newsapi.get_top_headlines(category='technology')
    if get_news['status'] == 'ok':
        return jsonify(get_news['articles'[:5]]), 200
    