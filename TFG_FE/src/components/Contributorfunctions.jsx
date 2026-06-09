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
import Select, { SelectChangeEvent } from '@mui/material/Select';

export function addVolunteertoProject(pid){
  const [volunteer, setVolunteer] = React.useState('');
  cont [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    set(event.target.value);};
  
  /*Everything in this const AI suggested and applied */
  const response =await fetch('http://localhost:5000/api/allusers',{method:'GET'})
      .then((data)=>{setItems(data)
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


return
    <React.Fragment>
           <Button variant="outlined" onClick={handleClickOpen}>
            Add Volunteer to Project/Event
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Volunteer</DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
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
</Dialog>
</React.Fragment>
};