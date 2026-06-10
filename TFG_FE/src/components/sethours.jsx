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
  const [hours, setHours] = React.useState('1');
  const [open, setOpen] = React.useState(false);
  const [year, setYear]= React.useState('2026');
  const [week, setWeek]= React.useState('1');

  const handleChange = (event) => { setYear(event.target.value); };
  const handleWeekChange = (event) => { setWeek(event.target.value); };
  const handleHourChange = (event) => { setHours(event.target.value); };

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const items = {
      year: String(year), 
      week: parseInt(week), 
      hours: parseFloat(hours),
    };
    
    // AI FIX: Changed from stringify() to JSON.stringify() to prevent execution crash
    console.log("Clean extracted data object", JSON.stringify(items));
    
    try {
      const response = await fetch(`http://localhost:5000/api/availability/${uid}`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(items)
      });
      if(response.ok){
        handleClose();
        alert('Action was saved');
      }
    } catch(error) {
      console.error('Error saving', error);
    }
  };

  const YearData = [
    { id: 2026, name: '2026' },
    { id: 2027, name: '2027' },
    { id: 2028, name: '2028' },
    { id: 2029, name: '2029'}
  ];

  const WeekDate = [
    { id: 1, name: "1" }, { id: 2, name: "2" }, { id: 3, name: "3" },
    { id: 4, name: " 4" }, { id: 5, name: "5" }, { id: 6, name: "6" },
    { id: 7, name: "7" }, { id: 8, name: "8" }, { id: 9, name: "9" },
    { id: 10, name: "10" }, { id: 11, name: "11" }, { id: 12, name: "12" },
    { id: 13, name: "13" }, { id: 14, name: "14" }, { id: 15, name: "15" },
    { id: 16, name: "16" }, { id: 17, name: "17" }, { id: 18, name: "18" },
    { id: 19, name: "19" }, { id: 20, name: "20" }, { id: 21, name: "21" },
    { id: 22, name: "22" }, { id: 23, name: "23" }, { id: 24, name: "24" },
    { id: 25, name: "25" }, { id: 26, name: "26" }, { id: 27, name: "27" },
    { id: 28, name: "28" }, { id: 29, name: "29" }, { id: 30, name: "30" },
    { id: 31, name: "31" }, { id: 32, name: "32" }, { id: 33, name: "33" },
    { id: 34, name: "34" }, { id: 35, name: "35" }, { id: 36, name: "36" },
    { id: 37, name: "37" }, { id: 38, name: "38" }, { id: 39, name: "39" },
    { id: 40, name: "40" }, { id: 41, name: "41" }, { id: 42, name: "42" },
    { id: 43, name: "43" }, { id: 44, name: "44" }, { id: 45, name: "45" },
    { id: 46, name: "46" }, { id: 47, name: "47" }, { id: 48, name: "48" },
    { id: 49, name: "49" }, { id: 50, name: "50" }, { id: 51, name: "51" },
    { id: 52, name: "52" }
  ];

  const HoursData = [
    { id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4'},
    { id: 5, name: '5' }, { id: 6, name: '6' }, { id: 7, name: '7' }, { id: 8, name: '8'}
  ];

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Hours
      </Button>
      
      {/* FIX: Removed paperprops to prevent Vite compile issues */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Available Hours</DialogTitle>
        
        {/* AI FIX: Wrapped content in a native form tag to securely catch the submit event */}
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 5, minWidth: 350 }}>
            
            <FormControl fullWidth variant="standard" margin="dense" required>
              <InputLabel id="yearsinput">Year</InputLabel>
              <Select 
                native
                labelId="yearsinput"
                id="year"
                name='year'
                value={year}
                onChange={handleChange}
                label="Year"
              >
                {YearData.map((yr) => (
                  <option key={yr.id} value={yr.name}>{yr.name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="standard" margin="dense" required>
              <InputLabel id="WeekSet">Week</InputLabel>
              <Select 
                native
                labelId="WeekSet"
                id='week'
                name='week'
                value={week}
                onChange={handleWeekChange}
                label="Week"
              >
                {WeekDate.map((wk) => (
                  <option key={wk.id} value={wk.name}>{wk.name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="standard" margin="dense" required>
              <InputLabel id="HoursSet">Hours</InputLabel>
              <Select
                native 
                labelId="HoursSet"
                id='hour'
                name="hours"
                value={hours}
                onChange={handleHourChange}
                label="Hours"
              >
                {HoursData.map((hr) => (
                  <option key={hr.id} value={hr.id}>{hr.name}</option>
                ))}
              </Select>
            </FormControl>

          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}