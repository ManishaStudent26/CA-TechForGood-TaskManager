import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import {InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../auth/AuthContext';
import { api } from '../api/api'

export function ProjectFormDialog({refreshProjects }) {
  const {uid}=useAuth()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(event)=> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const project_name = formJson.project_name;
    const project_start=formJson.project_start;
    const project_end=formJson.project_end;
    const newProject={
      uid:uid,
      project_name:formJson.project_name,
      project_start:formJson.project_start,
      project_end:formJson.project_end
    }
    try{
      const response = await fetch('http://localhost:5000/api/projects',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newProject)})
      if(response.ok){alert('Project was saved');
      if (refreshProjects) {
    refreshProjects();
  }
      handleClose();}
    }catch(error){
      console.error('Error saving', error)}
  };



  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a new project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in a project name and a start and end date.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="newproject_form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="projectname"
              label="Project Name"
              name="project_name"
              type="projectname"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="project start"
              label="Start Date"
              name="project_start"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
            required
            margin="dense"
              id="project end"
              label="End Date"
              name="project_end"
              type="date"
              fullWidth
              variant="standard"/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="newproject_form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export function CreateTaskForm({pid,refreshTasks}){
  console.log("Form received pid:", pid);
 const [open, setOpen] = React.useState(false);
 const [taskpriority, TaskPriorityChangeEvent] = React.useState('LOW');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTaskSubmit =async(event)=>{
    event.preventDefault();
  const formData=new FormData(event.currentTarget)
  const formJson =Object.fromEntries(formData.entries())
  const TaskValues=
  {taskname:formJson.taskname,
    startdate:formJson.startdate,
    targetdate:formJson.targetdate,
    taskpri:formJson.taskpri,
    weight:parseFloat(formJson.task_weight),/*AI FIX */
    progress:0.0,
    status:"Planned",
    pid:parseInt(pid)}
    console.log("Clean extracted data object:", formJson);
    try{ const response =await fetch('http://localhost:5000/api/tasks',{ method: 'POST', headers: {'Content-Type':'application/json'}, body:JSON.stringify(TaskValues)});
      if (response.ok)
      handleClose()/*AI edit */
      {alert('Task was saved')};
      refreshTasks();
    } 
    catch (error) {
      console.error('Error saving:', error);}};
    return(
      <React.Fragment>
       <Button variant="outlined" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form onSubmit={handleTaskSubmit} id="newtask_form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="taskname"
              label="Taskname"
              name="taskname"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="startdate"
              label="Start Date"
              name="startdate"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
            required
            margin="dense"
              id="targetdate"
              label="Targetdate"
              name="targetdate"
              type="date"
              fullWidth
              variant="standard"/>
            <FormControl fullWidth variant="standard" margin="dense" required>
    <InputLabel id="priority-label">Condition</InputLabel>
    <Select
      labelId="priority-label"
      name="taskpri"
      value={taskpriority} 
      onChange={(e) => TaskPriorityChangeEvent(e.target.value)}
    >
      <MenuItem value="LOW">LOW </MenuItem>
      <MenuItem value="MED">MED </MenuItem>
      <MenuItem value="HIGH">HIGH</MenuItem>
    </Select></FormControl>
    {/*THIS FIELD BELOW WAS AI MADE will be adjusted for hours part*/}
    <TextField
  required
  margin="dense"
  id="task-weight"
  label="Task Weight"
  name="task_weight" // 🌟 Maps to formJson.task_weight
  type="number"      // 🌟 Forces numeric keyboard/input behavior
  fullWidth
  variant="standard"
  inputrops={{ 
    step: "0.01",    // 🌟 Allows decimals (e.g., 1.25, 5.50)
    min: "0"         // Optional: Prevents negative numbers
  }}
/>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="newtask_form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>);
    };