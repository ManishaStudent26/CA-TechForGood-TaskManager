import React, { useState, useEffect } from 'react'; // Fixed: Typo hook casing useEFfect corrected
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api'; // Fixed: Added missing import for your API object layers

export default function ProjectDashboard({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState(0); // Fixed: Defined missing active tab state
  const navigate = useNavigate(); // Fixed: Initialized router hook navigation

  useEffect(() => {
    setLoading(true);
    api.tasks.getByProject(projectId)
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setLoading(false);
      });
  }, [projectId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Fixed: Defined MUI DataGrid Columns structure mapping directly to your Flask database dictionary keys
  const columns = [
    { field: 'taskid', headerName: 'ID', width: 90 },
    { field: 'taskname', headerName: 'Task Name', flex: 1, minWidth: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => {
        const status = params.value || 'Upcoming';
        let color = 'default';
        if (status === 'In Progress') color = 'primary';
        if (status === 'Completed') color = 'success';
        if (status === 'Pending' || status === 'Upcoming') color = 'warning';
        return <Chip label={status} color={color} size="small" />;
      }
    },
    { field: 'taskpri', headerName: 'Priority', width: 130 },
    { field: 'targetdate', headerName: 'Due Date', width: 150 }
  ];

  // Fixed: Merged filtering logic securely inside the component body using 'tasks' state
  const filteredRows = tasks.filter((row) => {
    // Standardize casing to avoid string matching mismatches
    const status = row.status || 'Upcoming';
    
    if (activeTab === 0) return true; // "All Tasks"
    if (activeTab === 1) return status === 'In Progress';
    if (activeTab === 2) return status === 'Pending' || status === 'Upcoming';
    if (activeTab === 3) return status === 'Completed';
    return true;
  });

  if (loading) return <Box sx={{ p: 4 }}><Typography>Loading tasks...</Typography></Box>;
  if (errorMessage) return <Box sx={{ p: 4 }}><Typography color="error">Error: {errorMessage}</Typography></Box>;

  // Fixed: Single consolidated UI return statement combining tabs, headers, and grid rendering
  return (
    <Box sx={{ p: 4, maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Project Workspace Tasks
      </Typography>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="All Tasks" />
        <Tab label="In Progress" />
        <Tab label="Pending / Upcoming" />
        <Tab label="Completed" />
      </Tabs>
      
      <Box sx={{ height: 400, width: '100%' }} component={Paper} elevation={2}>
        <DataGrid
          rows={filteredRows} 
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          // Fixed: Tells DataGrid to target 'taskid' as unique index row key mapping fallback if 'id' isn't explicitly sent from back
          getRowId={(row) => row.taskid || row.pid} 
          onRowClick={(params) => navigate(`/tasks/${params.id}`)}
          sx={{ cursor: 'pointer', border: 'none' }}
        />
      </Box>
    </Box>
  );
}