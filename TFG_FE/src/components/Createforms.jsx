import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../auth/AuthContext';

export default function ProjectFormDialog({refreshProjects }) {
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
}