import React, { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab, Button} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api'
import { useAuth } from '../auth/AuthContext';

export default function TaskView(pid) {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const[contributors,setContributors]=useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState("1");
    const[taskTab, setTaskTab]=useState([])
    const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);};
    const handletaskTabs=(event,newValue)=>{
    setTaskTab(newValue);};
    const getTasks=()=>{
      setLoading(true);
      api.tasks.getByTask(pid)
      .then((data)=>{        setTasks(taskdata)
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
      })};

  return (
  <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
    Tasks and Project Contributors
    </Typography>
    <TabContext value={activeTab}>
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
      <TabList onChange={handleTabChange}>
        <Tab label="Tasks" value="1"/>
        <Tab label="Contributors" value="2"/>
      </TabList>
      </Box>
      <TabPanel value="1">Hello</TabPanel>
      <TabPanel value="2">Hi</TabPanel>
    </TabContext>
          </Box>
          );
          }