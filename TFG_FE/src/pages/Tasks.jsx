  import React, { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api'
import { useAuth } from '../auth/AuthContext';

export default function TaskView(pid) {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const[contributors,setContributors]=useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const[taskTab, setTaskTab]=useState([])
    const getTasks=()=>{

      setLoading(true);
      api.tasks.getByTask(pid)
      .then((data)=>{
        setTasks(data)
        setLoading(false)
      })
      .catch((err)=> {
        setErrorMessage(err.message || 'Failed to fetch tasks');
        setLoading(false)
      })
      };



    const getContributors=()=>{
      setLoading(true);
      api.contributors.getByProject(pid)
      .then((data)=>{
        setContributors(data)
        setLoading(false)
      })
      const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

    };

  return (
  <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
    Tasks and Project Contributors
    </Typography>
    <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Tasks" value="Tasks"/>
            <Tab label="Contributors" value="Contri"/>
          </Tabs>
          <Box>
          {activeTab===0&&(<Box sx={{ p: 3, mt: 4, bgcolor: '#1e1e1e', borderRadius: 2 }}>
          <Typography variant="h6">This is a Test</Typography>
          <Typography variant="body2" sx={{ color: '#aaa', mt: 1 }}>
            Test test test.
          </Typography></Box>)}
          </Box>
          </Box>
          );
          }