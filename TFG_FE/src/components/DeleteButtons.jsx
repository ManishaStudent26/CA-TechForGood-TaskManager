import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ExportPrint } from '@mui/x-data-grid';

export function ProjectDelete({pid, refreshProjects}){
  console.log("Checking my ID prop inside handleDelete:", pid);
  const [open, setOpen] = React.useState(false);

   const handleOnClick =()=>{
  setOpen(true);};

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete =async(actionType)=>{
    
    
    try{const response = await fetch(`http://localhost:5000/api/projects/${pid}`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json'}})
        if(response.ok){alert('Project was deleted');
        if (refreshProjects) {
        refreshProjects();}
        handleClose();}
        }catch(error){
      console.error('Error saving', error)}
    
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOnClick}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete}>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export function TaskDeleteButton({taskid, pid, refreshTasks}){
  console.log("Checking my ID prop inside handleDelete:", pid);
  const [open, setOpen] = React.useState(false);

   const handleOnClick =()=>{
  setOpen(true);};

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete =async(actionType)=>{try{const response = await fetch(`http://localhost:5000/api/tasks/${taskid}`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json'}})
        if(response.ok){alert('Project was deleted'); handleClose();
        if (refreshTasks) {
        refreshTasks(pid);}}
        }catch(error){
      console.error('Error saving', error)}
    
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOnClick}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete}>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};