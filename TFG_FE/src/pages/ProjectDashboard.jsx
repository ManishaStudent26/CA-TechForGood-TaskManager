import { useAuth } from '../auth/AuthContext';
import React, { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import ProjectFormDialog from '../components/Createforms'


export default function ProjectDashboard(){
  const {uid} = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); // Fixed: Tracks projects instead of tasks
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    // Safety check: Don't fetch if the manager's User ID hasn't loaded yet
    if (!uid) {
      setErrorMessage("User session not found. Please log in again.");
      setLoading(false);
      return;
    };

setLoading(true);
    
    // 🌟 FIXED: Calling the exact function from your api.js and passing the uid
    api.projects.getAllByManager(uid)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message || 'Failed to fetch projects');
        setLoading(false);
      });
  }, [uid]);// AI fix: Tracks uid updates safely

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // AI Fixed: Rebuilt columns to map perfectly to your Python Project dictionary keys
  const columns= [
    { field: 'pid', headerName: 'Project ID', width: 120},
    { field: 'project_name', headerName: 'Project Name', flex: 1, minWidth: 200},
    {
      field: 'project_status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => {
        // AI:Fallback safety matching your backend logic state handling
        const status = params.value || 'In Progress';
        let color = 'default';
        if (status === 'In Progress') color = 'primary';
        if (status === 'Completed') color = 'success';
        if (status === 'Upcoming') color = 'warning';
        return <Chip label={status} color={color} size="small" />;
      }
    },
    { field: 'opentasks', headerName: 'Open Tasks Count', width: 160, type: 'number'},
    { field: 'project_start', headerName: 'Start Date', width: 150 },
    { field: 'project_end', headerName: 'End Date', width: 150 },
    {field:'edit',
      headername:'', 
      width:150, 
      renderCell:params=><button>Edit</button>},
    {field: 'delete', width:150, renderCell:params=><button>Delete</button>}
  ];

  // Fixed: Filters row rows based on project data attributes rather than task attributes
  const filteredRows = projects.filter((row) => {
    const status = row.project_status || 'In Progress';
    
    if (activeTab === 0) return true; // "All Projects"
    if (activeTab === 1) return status === 'In Progress';
    if (activeTab === 2) return status === 'Upcoming';
    if (activeTab === 3) return status === 'Completed';
    return true;
  });

  if (loading) return <Box sx={{ p: 4 }}><Typography>Loading projects workspace...</Typography></Box>;
  if (errorMessage) return <Box sx={{ p: 4 }}><Typography color="error">Error: {errorMessage}</Typography></Box>;

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Manager Project Workspace
      </Typography>
      <ProjectFormDialog/>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="All Projects" />
        <Tab label="In Progress" />
        <Tab label="Upcoming" />
        <Tab label="Completed" />
      </Tabs>
      
      <Box sx={{ height: 400, width: '100%' }} component={Paper} elevation={2}>
        <DataGrid
          rows={filteredRows} 
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          // Fixed: Targets 'pid' matching the unique identifier sent by your Python backend model
          getRowId={(row) => row.pid} 
          // Clicking a row safely redirects the manager to view that specific project's task layout
          //TO BE FIXED!!
          onRowClick={(params) => navigate(`/tasks/${params.id}`)}
          sx={{ cursor: 'pointer', border: 'none' }}
        />
      </Box>
    </Box>
  );}