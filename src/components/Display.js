import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useEffect ,useState} from 'react'

export default function Display() {
  const [state,setState]=useState([])
  const [flag,setflag]=useState(false)
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
    useEffect(() => {
       setState(JSON.parse(localStorage.getItem('Feedback')));
       console.log(JSON.parse(localStorage.getItem('Feedback')));
    }, [flag])
    
    const handledelete=(ind)=>{
        const arr=JSON.parse(localStorage.getItem('Feedback'));
        arr.splice(ind,1)
                localStorage.setItem('Feedback', JSON.stringify(arr));
        setflag(!flag)
    }

    const confirmDelete = () => {
        handledelete(deleteIndex);
        setOpenDialog(false);
    };

    const handleDeleteConfirmation = (ind) => {
        setDeleteIndex(ind);
        setOpenDialog(true);
    };
  return (
    <div>
      <Box style={{ background: "#FFFDD0" ,margin:'30px'}}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4">Feedback Customer Details List</Typography>
        </div>
      </Box>
        <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead sx={{background:'black',color:'white'}}>
         <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
           <TableCell sx={{color:'white'}}>Name</TableCell>
           <TableCell sx={{color:'white'}} align="right">Email</TableCell>
           <TableCell sx={{color:'white'}} align="right">Phone</TableCell>
           <TableCell sx={{color:'white'}} align="right">Quality of service</TableCell>
           <TableCell sx={{color:'white'}} align="right">Quality of Bevarage</TableCell>
           <TableCell sx={{color:'white'}} align="right">Was restaurant clean</TableCell>
           <TableCell sx={{color:'white'}} align="right">Dining experience</TableCell>
           <TableCell sx={{color:'white'}} align="right">Timestamp</TableCell>
           <TableCell sx={{color:'white'}} align="right">Action</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {state && state.map((row,ind) => (
           <TableRow key={ind}>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.phone}</TableCell>
            <TableCell align="right">{row.q1}</TableCell>
             <TableCell align="right">{row.q2}</TableCell>
             <TableCell align="right">{row.q3}</TableCell>
             <TableCell align="right">{row.q4}</TableCell>
             <TableCell align="right">{row.timestamp ? new Date(row.timestamp).toLocaleString() : 'N/A'}</TableCell>
             <TableCell align="right">
                <Button variant='outlined' onClick={()=>handleDeleteConfirmation(ind)}>Delete</Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
   
   <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
     <DialogTitle>Confirm Deletion</DialogTitle>
     <DialogContent>
       Are you sure you want to delete this feedback entry?
     </DialogContent>
     <DialogActions>
       <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
       <Button onClick={confirmDelete} color="error">Delete</Button>
     </DialogActions>
   </Dialog>
    </div>
  )
}