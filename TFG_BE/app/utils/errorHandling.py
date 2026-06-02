from flask import jsonify

class ValidationError(Exception):
    def __init__(self, message="Required fields are missing or invalid."):
        super().__init__(message)
        self.message = message

class FailedToCreate(Exception):
    def __init__(self, message="Failed to create the new record"):
        super().__init__(message)
        self.message = message

def register_generic_error_handlers(app):
    @app.errorhandler(ValidationError)
    @app.errorhandler(400)
    def handle_bad_request(error):
        message = getattr(error, 'message', getattr(error, 'description', "Bad Request"))
        return jsonify({"status": "error", "error_type": "Validation", "message": str(message)}), 400

    @app.errorhandler(ResourceNotFoundError)
    @app.errorhandler(404)
    def handle_not_found(error):
        message = getattr(error, 'message', getattr(error, 'description', "Resource not found"))
        return jsonify({"status": "error", "error_type": "NotFound", "message": str(message)}), 404

    @app.errorhandler(Exception)
    @app.errorhandler(500)
    def handle_server_error(error):
        return jsonify({
            "status": "error", 
            "error_type": "ServerError", 
            "message": "An internal server error occurred.",
            "details": str(error)
        }), 500