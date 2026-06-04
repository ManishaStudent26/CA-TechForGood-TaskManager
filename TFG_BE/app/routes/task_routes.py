from flask import Blueprint, jsonify, g, request
from models.task_model import Task
from utils.middleware import token_required
from utils.errorHandling import ValidationError, FailedToCreate

task_bp=Blueprint('tasks',__name__)

@task_bp.route ('/api/projecttasks<int:pid>', methods=['GET'])
@token_required
def  getprojecttasks(pid):
    project_tasks = Task.getTaskbyProject(pid)
    serialized_tasks=[project_task.to_dict() for project_task in project_tasks]
    return jsonify(serialized_tasks), 200

@task_bp.route('/api/tasks', methods=['POST'])
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

    if not taskname or not startdate or not taskpri or not status:
        raise ValidationError({})
    try:
        new_task = Task.createTask(
            taskname=taskname,
            pid=pid,
            startdate=startdate,
            targetdate=targetdate,
            taskpri=taskpri,
            weight=weight,
            status=status
        )
        return jsonify(new_task.to_dict()), 201
    except Exception as e:
        return jsonify({"error": "Failed to create task", "details": str(e)}), 500
    
@task_bp.route('/api/task', methods=(['GET']))
@token_required
def getusertasks():
    usertasks= Task.getTaskbyContributor(g.uid)
    serialized_tasks=[usertask.to_dict() for usertask in usertasks]
    return jsonify(serialized_tasks), 200

@task_bp.route('/api/tasks/<int:taskid>', methods=['PUT'])
@token_required
def updatetask(taskid):
    data=request.get_json()
    taskname=data.get('taskname')
    startdate=data.get('startdate')
    targetdate=data.get('targetdate')
    taskpri=data.get('taskpri')
    weight=data.get('weight')
    status=data.get('status')
    if not taskname or not startdate or not taskpri or not status:
        raise ValidationError({})
    try:
        update_task=Task.editTask(
            taskid=taskid,
            taskname=taskname,
            startdate=startdate,
            targetdate=targetdate,
            taskpri=taskpri,
            weight=weight,
            status=status)
        return jsonify(update_task.to_dict()), 201
    except Exception as e:
        raise FailedToCreate({})
    
@task_bp.route('/api/tasks', methods=['DELETE'])
@token_required
def deltask(taskid):
    data=request.get_json()
    taskid=data.get('taskid')
    success = Task.delTask(taskid)
    if success:
        return jsonify({"message": f"Task {taskid} successfully deleted."}), 200
    else:
        return jsonify({"error": "Task not found or unauthorized access."}), 404


@task_bp.route('/api/setOwner',methods=['PUT'])
@token_required
def assignowner():
    data=request.get_json()
    taskid=data.get('taskid')
    cid=data.get('cid')
    uid=data.get('uid')
    success= Task.assignTaskOwner(uid, taskid,cid)
    if success:
        return jsonify({"message:""Processed"})
    else:
        raise FailedToCreate({})