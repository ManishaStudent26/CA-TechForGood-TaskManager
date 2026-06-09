from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp 
from routes.auth_routes import auth_bp
from routes.project_routes import projects_bp
from routes.task_routes import task_bp
from routes.availability_routes import availability_bp
from routes.contributors_routes import contributors_bp
from config.settings import Config

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:5173", "http://localhost:5000"],
    "supports_credentials": True
}})
app.config['SECRET_KEY']=Config.JWT_SECRET
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(task_bp)
app.register_blueprint(availability_bp)
app.register_blueprint(contributors_bp)


if __name__ == '__main__':
    app.run(debug=True, port=5000)