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
import { Form } from 'react-router-dom';



export function AddHours({uid}){
  console.log("Form received uid:", {uid});
  const [hours, setHours] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [year, setYear]= React.useState('')
  const[week, setWeek]= React.useState('')
  const handleChange = (event) => {
    setYear(event.target.value);};
    const handleWeekChange=(event) => {
    setWeek(event.target.value);};
const handleHourChange=event=>{
    setHours(event.target.value);};

  const handleClickOpen = () => {
    setOpen(true);}

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async(event)=> {
    event.preventDefault();
    const items = {
     year: year, 
     week: week, 
     hours: parseFloat(hours),
   };
    console.log("Clean extracted data object", stringify(items))
    try{
      const response = await fetch(`http://localhost:5000/api/availability/${uid}/`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(items)})
      if(response.ok){
      handleClose();
      {alert('Action was saved');}}}
    catch(error){
      console.error('Error saving', error)}};



    const YearData = [
  { id: 2026, name: '2026' },
  { id: 2027, name: '2027' },
  { id: 2028, name: '2028' },
  { id: 2029, name: '2029'}];

  /*Const WeekData is AI */    
const WeekDate = [
  { id: 1, name: "Week 1" },
  { id: 2, name: "Week 2" },
  { id: 3, name: "Week 3" },
  { id: 4, name: "Week 4" },
  { id: 5, name: "Week 5" },
  { id: 6, name: "Week 6" },
  { id: 7, name: "Week 7" },
  { id: 8, name: "Week 8" },
  { id: 9, name: "Week 9" },
  { id: 10, name: "Week 10" },
  { id: 11, name: "Week 11" },
  { id: 12, name: "Week 12" },
  { id: 13, name: "Week 13" },
  { id: 14, name: "Week 14" },
  { id: 15, name: "Week 15" },
  { id: 16, name: "Week 16" },
  { id: 17, name: "Week 17" },
  { id: 18, name: "Week 18" },
  { id: 19, name: "Week 19" },
  { id: 20, name: "Week 20" },
  { id: 21, name: "Week 21" },
  { id: 22, name: "Week 22" },
  { id: 23, name: "Week 23" },
  { id: 24, name: "Week 24" },
  { id: 25, name: "Week 25" },
  { id: 26, name: "Week 26" },
  { id: 27, name: "Week 27" },
  { id: 28, name: "Week 28" },
  { id: 29, name: "Week 29" },
  { id: 30, name: "Week 30" },
  { id: 31, name: "Week 31" },
  { id: 32, name: "Week 32" },
  { id: 33, name: "Week 33" },
  { id: 34, name: "Week 34" },
  { id: 35, name: "Week 35" },
  { id: 36, name: "Week 36" },
  { id: 37, name: "Week 37" },
  { id: 38, name: "Week 38" },
  { id: 39, name: "Week 39" },
  { id: 40, name: "Week 40" },
  { id: 41, name: "Week 41" },
  { id: 42, name: "Week 42" },
  { id: 43, name: "Week 43" },
  { id: 44, name: "Week 44" },
  { id: 45, name: "Week 45" },
  { id: 46, name: "Week 46" },
  { id: 47, name: "Week 47" },
  { id: 48, name: "Week 48" },
  { id: 49, name: "Week 49" },
  { id: 50, name: "Week 50" },
  { id: 51, name: "Week 51" },
  { id: 52, name: "Week 52" }
];
console.log("--- DROPDOWN CHECK ---", WeekDate);
  const HoursData =[
     { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4'},
   { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8'}


  ];

return(
  
    <React.Fragment>
           <Button variant="outlined" onClick={handleClickOpen}>
            Add Hours
          </Button>
          <Dialog open={open} onClose={handleClose}paperprops={{
    component: 'form',       // <-- AI FIX:Tells the dialog to behave as a form
    onSubmit: handleSubmit,  // <--AI FIx Binds your existing submit handler
  }}>
            <DialogTitle>Add Available Hours</DialogTitle>
            <DialogContent sx={{ pt: 5, minWidth: 350 }}>
    <FormControl fullWidth variant="standard" margin="dense" required>
  <InputLabel id="yearsinput">Year</InputLabel>
  <Select native
  labelId="years"
          id="year"
          name='year'
          value={year}
          onChange={handleChange}
          label="Year">
    
    {YearData.map((YearData) => (
      
      <option key={YearData.id} value={YearData.name}>
        {YearData.name}
        
      </option>))}
      
  </Select>
  </FormControl>
  <FormControl fullWidth variant="standard" margin="dense" required>
  <InputLabel id="WeekSet" >Week</InputLabel>
  <Select 
  native
  labelId="WeekSet"
          id='week'
          name='week'
          value={week}
          onChange={handleWeekChange}
          label="Week">
        {WeekDate.map((weeknr) => (
      
      <option key={weeknr.id} value={weeknr.name}>{weeknr.name}
      </option>))}
      </Select>
      </FormControl>
      <FormControl>
        <Select
        native 
        labelId="WeekSet"
          id='hour'
          name="hours"
          value={hours}
          onChange={handleHourChange}
          label="hours">
      {HoursData.map((HoursData) => (
      
      <option key={HoursData.id} value={HoursData.id} >
        {HoursData.name}
        
      </option>))}
      </Select>
              </FormControl>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <Button type="submit" >Submit</Button>
</DialogActions>
</Dialog>
</React.Fragment>);
}