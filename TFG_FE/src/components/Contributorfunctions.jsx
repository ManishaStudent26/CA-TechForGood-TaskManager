import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../auth/AuthContext';
import { Fragment } from 'react';

export function addVolunteertoProject(pid){

return
    <React.Fragment>
           <Button variant="outlined" onClick={handleClickOpen}>
            Add Task
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a new task</DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
    <FormControl fullWidth>
  <InputLabel >Select Volunteer</InputLabel>
  <Select
    labelId="select-volunteer"
    id=""
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
</DialogContent>
</Dialog>
</React.Fragment>
};