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

export function AddVolunteertoProject(pid){
  const [volunteer, setVolunteer] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    set(event.target.value);};
  const handleClickOpen = () => {
    setOpen(true);}

  const handleClose = () => {
    setOpen(false);
  };
  
  /*Everything in this const AI suggested and applied: handles importing users for dropdown*/
React.useEffect(() => {
  // 1. Define your async logic inside a nested function
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/allusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Convert the stream to JSON data
      const data = await response.json();
      
      // Update your items state with the rows array
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 2. Execute it immediately
  fetchUsers();
}, []); // Keeps it running only once when the modal loads
//END OF AI Coded BLOCK.

return(
    <React.Fragment>
           <Button variant="outlined" onClick={handleClickOpen}>
            Add Volunteer to Project/Event
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Volunteer</DialogTitle>
            <DialogContent sx={{ pt: 2, minWidth: 300 }}>
    <FormControl fullWidth>
  <InputLabel >Select Volunteer</InputLabel>
  <Select>
    {items.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>))}
  </Select>
</FormControl>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <Button onClick={handleClose}>Submit</Button>
</DialogActions>
</Dialog>
</React.Fragment>)
};