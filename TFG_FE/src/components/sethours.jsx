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

export function AddHours({uid}){
  console.log("Form received pid:", {uid});
  const [hours, setHours] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [year, setYear]= React.useState('')
  const[week, setWeek]= React.useState('')
  const handleChange = (event) => {
    setYear(event.target.value);};
    const handleWeekChange=(event) => {
    setWeek(event.target.value);};
  const handleClickOpen = () => {
    setOpen(true);}

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async(event)=> {
    event.preventDefault();
    try{
      const response = await fetch(`http://localhost:5000/api/availability/${uid}/`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({items})})
      if(response.ok){
      handleClose();
      {alert('Action was saved');}}}
    catch(error){
      console.error('Error saving', error)}};
    const YearData = [
  { id: 2026, name: '2026' },
  { id: 2027, name: '2027' },
  { id: 2028, name: '2028' },
  { id: 2029, name: '2029'}
];
    const WeekData= Array.from({ length: 52 }, (_, index) => {
  const weekNum = index + 1;
  return {
    id: weekNum,
    name: `Week ${weekNum}`
  };
});

return(
    <React.Fragment>
           <Button variant="outlined" onClick={handleClickOpen}>
            Add Hours
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Available Hours</DialogTitle>
            <DialogContent sx={{ pt: 2, minWidth: 300 }}>
    <FormControl fullWidth>
  <InputLabel id="years input">Select Volunteer</InputLabel>
  <Select labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={year}
          onChange={handleChange}
          label="Year">
    
    {items.map((item) => (
      
      <MenuItem key={item.uid} value={item.uid}>
        {item.name}
        
      </MenuItem>))}
      
  </Select>
  <InputLabel id="demo-simple-select-outlined-label">Select Volunteer</InputLabel>
  <Select labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={week}
          onChange={handleChange}
          label="Year">
    
    {items.map((item) => (
      
      <MenuItem key={item.uid} value={item.uid}>
        {item.name}
        
      </MenuItem>))}
      
  </Select>
   <Select labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={week}
          onChange={handleChange}
          label="Year">
    
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
</React.Fragment>);
}