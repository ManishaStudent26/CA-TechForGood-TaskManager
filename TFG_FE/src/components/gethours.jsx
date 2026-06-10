import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function availabilityTable(uid) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

React.useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/availability/<int:uid>', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchAvailability();
}, []);
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
            <TableCell align="right">Week</TableCell>
            <TableCell align="right">hrs&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={`${row.year}-${row.week}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.year}
              </TableCell>
              <TableCell>{row.year}</TableCell>
      <TableCell>Week {row.week}</TableCell>
      <TableCell align="right">{row.hours} hrs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <p style={{ margin: '16px 0' }}>[ Your MUI Table component goes here ]</p>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setTableOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);
}