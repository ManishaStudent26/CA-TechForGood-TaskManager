import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'projectName', headerName: 'Project Name', width: 250 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 150,
    renderCell: (params) => {
      const colorMap = { 'In Progress': 'info', 'Pending': 'warning', 'Completed': 'success' };
      return <Chip label={params.value} color={colorMap[params.value] || 'default'} size="small" />;
    }
  },
  { field: 'taskCount', headerName: 'Total Tasks', width: 130, type: 'number' },
  { field: 'dueDate', headerName: 'Deadline', width: 150 },
];

const allRows = [
  { id: 1, projectName: 'Website Redesign', status: 'In Progress', taskCount: 12, dueDate: '2026-06-15' },
  { id: 2, projectName: 'Mobile App API Backend', status: 'Pending', taskCount: 8, dueDate: '2026-07-01' },
  { id: 3, projectName: 'Q2 Security Audit', status: 'Completed', taskCount: 5, dueDate: '2026-05-20' },
];

export default function ProjectsDashboard() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredRows = allRows.filter((row) => {
    if (activeTab === 0) return true; // "All" tab shows everything
    if (activeTab === 1) return row.status === 'In Progress';
    if (activeTab === 2) return row.status === 'Pending';
    if (activeTab === 3) return row.status === 'Completed';
    return true;
  });

  return (
    <Box sx={{ p: 4, maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Projects Overview
      </Typography>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="All Projects" />
        <Tab label="In Progress" />
        <Tab label="Pending" />
        <Tab label="Completed" />
      </Tabs>
      
      <Box sx={{ height: 400, width: '100%' }} component={Paper} elevation={2}>
        <DataGrid
          rows={filteredRows} // 🔥 Only shows rows matching the selected tab
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          onRowClick={(params) => navigate(`/projects/${params.id}`)}
          sx={{ cursor: 'pointer', border: 'none' }}
        />
      </Box>
    </Box>
  );
}