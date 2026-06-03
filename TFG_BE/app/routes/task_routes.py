from flask import Blueprint, jsonify, g, request
from models.task_model import Task
from utils.middleware import token_required
from utils.errorHandling import ValidationError

task_bp=Blueprint(Task,__name__)

@task_bp.route ('/api/projecttasks', methods=['GET'])
@token_required
def  getprojecttasks():
    project_tasks = Task.getTaskbyProject(g.pid)
    serialized_tasks=[project_task.to_dic() for project_task in project_tasks]
    return jsonify(serialized_tasks), 200

@task_bp.route('api/tasks', method=['POST'])
@token_required
def createprojecttask():
    data=request.get_json()
    taskname=data.get('taskname')
    pid=data.get('pid')
    startdate=data.get('startdate')
    targetdate=data.get('targetdate')
    taskpri=data.get('taskpri')
    weight=data.get('weight')
    status=data.get('status')

    if not taskname or not startdate or not taskpri or not status
        raise ValidationError({})
    try:
        new_task=Task.createTask(
            taskname=taskname,
            pid=g.pid,
            startdate=startdate,
            targetdate=targetdate,
            taskpri=taskpri,
            weight=weight
            status=status)
        return jsonify(new_task.to_dict()), 201
    except Exception as e:
        return jsonify({"error": "Failed to create task", "details": str(e)}), 500
    
@task_bp.route('api/task<int:uid>', method=(['GET']))
@token_required
def getusertasks(uid):
    uid=g.uid
    usertasks= Task.getTaskbyContributor(uid)
    serialized_tasks=[usertask.to_dic() for usertask in usertasks]
    return jsonify(serialized_tasks), 200