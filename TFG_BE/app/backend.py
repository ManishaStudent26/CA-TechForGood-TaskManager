from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp 
from routes.auth_routes import auth_bp
from routes.project_routes import projects_bp
from routes.task_routes import task_bp
from routes.availability_routes import availability_bp
from routes.contributors_routes import contributors_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(task_bp)
app.register_blueprint(availability_bp)
app.register_blueprint(contributors_bp)


if __name__ == '__main__':
    app.run(debug=True, port=5000)