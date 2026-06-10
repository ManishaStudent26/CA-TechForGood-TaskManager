import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../auth/AuthContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function AddVolunteertoTask({pid, taskid, refreshTasks}){
  console.log("Form received uid,cid &taskid:", pid, taskid);
  const [volunteer, setVolunteer] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setVolunteer(event.target.value);};
  const handleClickOpen = () => {
    setOpen(true);}

  const handleClose = () => {
    setOpen(false);
  };
const handleSubmit = async(event)=> {
    event.preventDefault();

    try{
        values=
    {uid:volunteer.uid,
    cid:volunteer.cid,
    pid:pid,
    taskid:taskid

        }
      const response = await fetch(`'/api/setOwner'`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)})
      if(response.ok){
      handleClose();
      {alert('Action was saved');}
      refreshTasks();}}
    catch(error){
      console.error('Error saving', error)}
  };
React.useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${pid}/contributors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchUsers();
}, []);



return(
    <React.Fragment>
           <Button variant="outlined" onClick={handleClickOpen}>
            Add Volunteer to Project/Event
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Volunteer</DialogTitle>
            <DialogContent sx={{ pt: 2, minWidth: 300 }}>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-outlined-label">Select Volunteer</InputLabel>
  <Select labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={volunteer}
          onChange={handleChange}
          label="Volunteer">
    
    {items.map((item) => (
      
      <MenuItem key={item.uid} value={item.uid}>
        {item.name}
        
      </MenuItem>))}
  </Select>
</FormControl>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <Button onClick={handleSubmit}>Submit</Button>
</DialogActions>
</Dialog>
</React.Fragment>)
};