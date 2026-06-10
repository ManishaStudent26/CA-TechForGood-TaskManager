import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import React, { useState, useEffect } from 'react';

export function AvailabilityTable({uid}) {
const [tableOpen, setTableOpen] = React.useState(false);
const [rows, setRows] = React.useState([]);

React.useEffect(() => {
  const fetchAvailability = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/availability/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchAvailability();
}, [uid]);

return (
  <React.Fragment>
    <Button variant="contained" onClick={() => setTableOpen(true)}>
      View Hours
    </Button>

    <Dialog 
      open={tableOpen} 
      onClose={() => setTableOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Hours Log History</DialogTitle>
      
      <DialogContent>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>year</TableCell>
            <TableCell align="left">week</TableCell>
            <TableCell align="right">hrs&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={`${row.year}-${row.week}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.year}</TableCell>
      <TableCell>Week {row.week}</TableCell>
      <TableCell align="right">{row.hours} hrs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setTableOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);
}