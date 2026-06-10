from controllers import external_auth
from utils.errorHandling import NewsAPIException
import requests

class NewsApiClient(object):
    def __init__(self, api_key):
        self.api_key = external_auth(api_key=api_key)
        self.request_method = requests

    def get_top_headlines(
        self, page=5
    ):

        payload = {
            "country" : "ie",
            "category":"technology",
            "page":5
                   }

        r = self.request_method.get( "https://newsapi.org/v2/top-headlines", auth=self.api_key, timeout=30, params=payload)

        # Check Status of Request
        if r.status_code != requests.codes.ok:
            raise NewsAPIException(r.json())

        return r.json()