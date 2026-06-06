import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ProjectFormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event)=> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formDat.entries());
    const project_name = formJson.project_name;
    const project_start=formJson.project_start;
    const project_end=formJson.project_end;
    console.log(email);
    handleClose();
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
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="projectname"
              label="Project Name"
              name="projectname"
              type="projectname"
              fullWidth
              variant="standard"
            />
            <TextField
            autoFocus
              required
              margin="dense"
              id="project_start"
              name="startdate"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
            autoFocus
            required
            margin="dense"
              id="project_start"
              name="startdate"
              type="date"
              fullWidth
              variant="standard"/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="new project form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}