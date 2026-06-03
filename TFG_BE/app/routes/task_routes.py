from flask import Blueprint, jsonify, g, request
from models.task_model import Task
from utils.middleware import token_required

task_bp=Blueprint(Task,__name__)

@task_bp.route ('/api/projecttasks', methods=['GET'])
@token_required
def  getprojecttasks():
    project_tasks = Task.getTaskbyProject(g.pid)
    serialized_tasks=[task.to_dic() for tasks in project_tasks]
    return jsonify(serialized_tasks), 200

@task_bp.route('api/tasks', method=['POST'])
@token_required
def createprojecttask():
    data=request.get_json()
    data.get('taskname')
    data.get('pid')
    data.get('startdate')
    data.get('targetdate')
    data.get('taskpri')
    data.get('weight')
    data.get('status')
try:
    new_task=Task.createTask(
        
    )