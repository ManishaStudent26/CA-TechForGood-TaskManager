import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)
from flask import Blueprint, jsonify, g, request
from models.task_model import Task
from utils.middleware import token_required
from utils.errorHandling import ValidationError, ResourceNotFoundError, FailedToCreate
from datetime import datetime, date


task_bp = Blueprint('tasks', __name__)

@task_bp.route('/api/projecttasks/<int:pid>', methods=['GET']) # Fixed: Added missing forward slash / before dynamic block
def getprojecttasks(pid):
    project_tasks = Task.getTaskbyProject(pid)
    serialized_tasks = [task.to_dict() for task in project_tasks]
    return jsonify(serialized_tasks), 200

@task_bp.route('/api/tasks', methods=['POST'])
def createprojecttask():
    data = request.get_json()
    print(data)
    taskname = data.get('taskname')
    pid = data.get('pid')
    starttext = data.get('startdate')
    targettext = data.get('targetdate')
    taskpri = data.get('taskpri')
    progress= data.get('progress')
    weight = data.get('weight')
    status = data.get('status')
    startdate= None
    targetdate=None
    try:
        startdate=datetime.strptime(starttext, '%Y-%m-%d').date() if starttext else None
        targetdate=datetime.strptime(targettext, '%Y-%m-%d').date()if targettext else None
    except ValueError as e:
        print(f"Date formatting failed: {e}")
        return {"error": f"Invalid date format: {e}"}, 400                         
    if not taskname or not startdate or not taskpri or not status:
        raise ValidationError("Missing required fields for task creation.")
    try:
        new_task = Task.createTask(
            taskname=taskname,
            pid=pid,
            startdate=startdate,
            targetdate=targetdate,
            taskpri=taskpri,
            progress=progress,
            weight=weight,
            status=status
        )
        return {"message": "Task created successfully"}, 201
        
    except Exception as e:
        # 🌟 FORCE THE REASON OUT IN THE OPEN:
        print("\n" + "="*40)
        print("🚨 DATABASE INSERTION CRASHED! REASON BELOW:")
        import traceback
        traceback.print_exc()  # This prints the entire internal traceback stack trace
        print("="*40 + "\n")
        
        return {"error": str(e)}, 500
        #return jsonify(new_task.to_dict()), 201
    #except Exception as e:
        #return jsonify({"error": "Failed to create task", "details": str(e)}), 500
    
@task_bp.route('/api/task', methods=['GET'])
@token_required
def getusertasks():
    usertasks = Task.getTaskbyContributor(g.uid)
    serialized_tasks = [task.to_dict() for task in usertasks]
    return jsonify(serialized_tasks), 200

@task_bp.route('/api/tasks/<int:taskid>', methods=['PUT'])
@token_required
def updatetask(taskid):
    data = request.get_json() or {}
    taskname = data.get('taskname')
    starttext = data.get('startdate')
    targettext = data.get('targetdate')
    taskpri = float(data.get('taskpri'))
    weight = float(data.get('weight'))
    status = data.get('status')
    try:
        startdate=datetime.strptime(starttext, '%Y-%m-%d').date()
        targetdate=datetime.strptime(targettext, '%Y-%m-%d').date()
    except ValueError as e:
        print(f"Date formatting failed: {e}")                           
    if not taskname or not startdate or not taskpri or not status:
        raise ValidationError("Missing required fields for task update.")
    try:
        success = Task.editTask(
            taskid=taskid,
            taskname=taskname,
            startdate=startdate,
            targetdate=targetdate,
            taskpri=taskpri,
            weight=weight,
            status=status
        )
        # Fixed: Safely assuming editTask returns a rowcount boolean like your other models
        if success:
            return jsonify({"message": f"Task {taskid} successfully updated."}), 200
        else:
            raise ResourceNotFoundError()
    except Exception as e:
        raise FailedToCreate(f"Database modification failed: {str(e)}")
    
@task_bp.route('/api/tasks/<int:taskid>', methods=['DELETE'])
@token_required
def deltask(taskid):
    success = Task.delTask(taskid)
    if success:
        return jsonify({"message": f"Task {taskid} successfully deleted."}), 200
    else:
        raise ResourceNotFoundError()

@task_bp.route('/api/setOwner', methods=['PUT'])
@token_required
def assignowner():
    data = request.get_json() or {}
    taskid = data.get('taskid')
    cid = data.get('cid')
    uid = data.get('uid')
    
    success = Task.assignTaskOwner(uid, taskid, cid)
    if success:
        return jsonify({"message": "Processed"}), 200 # Fixed: Corrected invalid double quote dictionary parsing syntax
    else:
        raise FailedToCreate("Failed to assign task owner.")