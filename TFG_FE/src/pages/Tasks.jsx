import React, { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab, Button} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api'

export default function TaskView() {
    const { pid } = useParams();
console.log("pid:", { pid });
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const[contributors,setContributors]=useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState("1");
    const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);};
    const getTasks=()=>{
      setLoading(true);
      api.tasks.getByProject(pid)
      .then((data)=>{ setTasks(data)
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

      useEffect(()=>{
        if(!pid){
          console.log("No param id needed to add param statement")
          setLoading(false);
          return;
        }
        else{getTasks();}
      },[pid]);
      useEffect(()=>{getContributors()},[pid,]);

  const taskColumns=[
    {field:"assignowner"},
    {field:"taskid"},
    {field:"taskname"},
    {field:"taskowner"},
    {field:"projectname"},
    {field:"startdate"},
    {field:"targetdate"},
    {field:"taskpri"},
    {field:"weight"},
    {field:"progress"},
    {field:"status"},
    {field:"overdue"},
    {field:"edit"},
    {field:"delete"}
  ]

  const contriColumns=[
    {field:"contributor_id"},
    {field:"project_id"},
    {field:"uid"},
    {field:"name"}
  ]

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
      <TabPanel value="1">
        <CreateTaskForm></CreateTaskForm>

            <DataGrid
            rows={tasks}
            columns={taskColumns}
            getRowId={(row) => row.taskid}
            />

      </TabPanel>
      <TabPanel value="2">
        <DataGrid
            rows={contributors}
            columns={contriColumns}
            getRowId={(row) => row.uid}
            />
      </TabPanel>
    </TabContext>
          </Box>
          );
          }