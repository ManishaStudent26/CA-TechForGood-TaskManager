import React, { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab, Button, AppBar} from '@mui/material';
import { AddHours } from '../components/sethours';
import { AvailabilityTable } from '../components/gethours';
import ButtonAppBar from '../components/Topbar'

export default function AdminView(){
     const [volunteer, setVolunteers] = useState([]);
     const [loading, setLoading] = useState(true);
     const [errorMessage, setErrorMessage] = useState('');
    const getVolunteers= async () => {
    try {
      const response = await fetch('http://localhost:5000/allusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setVolunteers(data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    getVolunteers()},[]);

    const columns =[
      {field:'uid', header:'User ID'},
      {field:'email', header:'Email'},
        {field:'name', header:'Name'},
      {field:'setAvailability',header:'Set Hours', renderCell:params=>(<AddHours uid={params.row.uid}/>)},
      {field:'getAvailability',header:'View Hour', renderCell:params=>(<AvailabilityTable uid={params.row.uid}/>)}
    ];
    if (loading) return <Box sx={{ p: 4 }}><Typography>Loading workspace...</Typography></Box>;
    if (errorMessage) return <Box sx={{ p: 4 }}><Typography color="error">Error: {errorMessage}</Typography></Box>;

  return(
    
  <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
    <div><ButtonAppBar></ButtonAppBar></div>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          AdminView
        </Typography>
          <Box sx={{ height: 400, width: '100%' }} component={Paper} elevation={2}>
                <DataGrid
                  rows={volunteer} 
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                  pageSizeOptions={[5, 10]}
                  getRowId={(row) => row.uid} 
                  sx={{ cursor: 'pointer', border: 'none' }}
                />
              </Box>
        </Box>



  );

};