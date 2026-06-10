from config.settings import Config

class NewsApiAuth(Config):
    def __init__(self, api_key):
        self.api_key = api_key

    def __call__(self, request):
        request.headers.update(get_auth_headers(self.api_key))
        return request


def get_auth_headers(api_key):
    return {"Content-Type": "Application/JSON", "Authorization": api_key}