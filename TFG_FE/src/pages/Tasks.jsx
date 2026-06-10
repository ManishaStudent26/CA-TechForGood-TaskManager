import React, { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box, Paper, Typography, Chip, Tabs, Tab, Button} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api'
import { CreateTaskForm } from '../components/Createforms';
import { TaskDeleteButton } from '../components/DeleteButtons';
import { AddVolunteertoProject } from '../components/Contributorfunctions';
import { AddVolunteertoTask } from '../components/AssignOwner';
import { useAuth } from '../auth/AuthContext';

export default function TaskView() {
    const {user}=useAuth
    const { pid } = useParams();
console.log("pid:", { pid });
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const[contributors,setContributors]=useState([]);
    const [taskLoading, setTaskLoading] = useState(true);
    const[contriLoading, setContriLoading]=useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState("1");
    const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);};
    const getTasks=()=>{
      setTaskLoading(true);
      api.tasks.getByProject(pid)
      .then((data)=>{ setTasks(data)
        setTaskLoading(false)
      })
      .catch((err)=> {
        setErrorMessage(err.message || 'Failed to fetch tasks');
        setTaskLoading(false)
      })
      };

    const getContributors=()=>{
      setContriLoading(true);
      api.contributors.getByProject(pid)
      .then((data)=>{
        setContributors(data)
        setContriLoading(false)
      })};

      useEffect(()=>{
        if(!pid){
          console.log("No param id needed to add param statement")
          setTaskLoading(false);
          return;
        }
        else{getTasks();}
      },[pid]);
      useEffect(()=>{getContributors()},[pid,]);

  const taskColumns=[
    {field:"assignowner",renderCell:params=>(<AddVolunteertoTask taskid={params.row.taskid} pid={pid} refreshTasks={getTasks}/>)},
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
    {field:"delete", width:90, renderCell:params=>(<TaskDeleteButton taskid={params.row.taskid} pid={pid} refreshTasks={getTasks}/>)}
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
    <Button onClick={() => navigate(`/dashboard/`)}>Back to Dashboard</Button>
    <TabContext value={activeTab}>
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> 
      <TabList onChange={handleTabChange}>
        <Tab label="Tasks" value="1"/>
        <Tab label="Contributors" value="2"/>
      </TabList>
      </Box>
      <TabPanel value="1">
        <CreateTaskForm pid={pid} refreshTasks={ getTasks} />

            <DataGrid
            rows={tasks}
            columns={taskColumns}
            getRowId={(row) => row.taskid}
            />

      </TabPanel>
      <TabPanel value="2">
        <AddVolunteertoProject pid={pid} refreshContributors={getContributors}/>
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