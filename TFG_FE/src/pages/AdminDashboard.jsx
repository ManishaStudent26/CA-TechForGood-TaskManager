import React, { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab, Button} from '@mui/material';
import { AddHours } from '../components/sethours';

export default function AdminView(){
     const [volunteer, setVolunteers] = useState([]); // Fixed: Tracks projects instead of tasks
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
      {field:'setAvailability',header:'Set Hours'},
      {field:'getAvailability',header:'View Hour', renderCell:getparams=>(<AddHours uid={params.row.uid}/>)}
    ];
    if (loading) return <Box sx={{ p: 4 }}><Typography>Loading projects workspace...</Typography></Box>;
    if (errorMessage) return <Box sx={{ p: 4 }}><Typography color="error">Error: {errorMessage}</Typography></Box>;

  return(
  <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
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