import {Box,Button,Card,Grid,TextField,Typography, Container} from "@mui/material";
import React, { useEffect , useState  } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { add_amount, getAllEmployeeName, getAllSiteProject, get_available_balance, get_department, get_factory_employees, methodGet, methodPost } from '../../API_Service/API_Links';
import { appendData } from '../../Variables/Variables';
import SnackBar from "../SnackBar";

export default function AccountExpense({setValue}) {

  const [EmployeeNameList, setEmployeeNameList] = useState([]);
  const [SelectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [SelectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [AddedAmount, setAddedAmount] = useState('');
  const [Balance, setBalance] = useState('');
  const [ProjectList , setProjectList] = useState([]);
  const [selectedProjectList , setSelectedProjectList] = useState('');
  const [ProjectDesc, setProjectDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [Dept , setDept] = useState([]);
  const [ selectedDept , setSelectedDept] = useState('');


// GET PROJECTS
  useEffect(() => {
     axios({
       method: methodGet,
       url: getAllSiteProject,
     })
       .then((res) => {
         if (res.data.error) {
           setMessage(res.data.message);
           setStatus(false);
           setColor(false);
         } else {
           setMessage(res.data.message);
           setProjectList(res.data.data);
           setStatus(true);
           setColor(true);
         }
       })
       .catch((err) => {
         alert("Oops something went wrong " + err);
         console.log("chip1",err);
       });
 }, []);




//  GET EMPLOYEE AND EMPID
     useEffect(() => {
    axios({
          method:'GET',
          url: getAllEmployeeName,
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
        } else {
          setMessage(res.data.message);
          setEmployeeNameList(res.data.data);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
  }, []);


//  GET EMPLOYEE BALANCE
     useEffect(() => {
    if(SelectedEmployeeId !== '' || SelectedEmployeeId !== null || SelectedEmployeeId !== undefined){
    const sendData = new FormData();
    sendData.append("ProjectName", selectedProjectList);
    sendData.append("EmployeeId", SelectedEmployeeId);
    axios({
      method: methodPost,
      url: get_available_balance,
      data: sendData,
    })
      .then((res) => {
        if (res.data.error) {
          setMessage(res.data.message);
          setStatus(false);
          setColor(false);
          setBalance(0.00);
        } else {
          setMessage(res.data.message);
          setBalance(res.data.data.AvailableBalance);
          setStatus(true);
          setColor(true);
        }
      })
      .catch((err) => {
        alert("Oops something went wrong " + err);
      });
    }
  }, [SelectedEmployeeId]);



// Add Amount
      const serverData = {
        EmployeeId: SelectedEmployeeId,
        ProjectName:selectedProjectList,
        Descriptions:ProjectDesc,
        Amount:AddedAmount
      }
      const sendData = appendData(serverData);
  const AddMoneyToWallet = () =>{
     axios({
          method:'POST',
          url: add_amount,
          data:sendData
      }).then(res => {
          if (res.data.error) {
              setMessage(res.data.message)
              setOpen(true)
              setStatus(false)
              setColor(false)
          } else {
              setMessage(res.data.message)
              setOpen(true)
              setStatus(true)
              setColor(true)
              setValue('2')
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }


  return (
    <Box>
      <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color}  />
    <Container>
   <Box component={Card} p={4}>


        <Box
        sx={{
        border: "1px solid black",
        p: 4,
        borderColor: "#d2cbcb;",
        borderRadius: "4px",
        ":hover": { boxShadow: 2 },
        mt: 5,
        }}
    >
      <Grid container rowSpacing={2}>

      <Grid item xs={12} sm={12} md={4} lg={4}>
      <Box mb={3}>
      <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Select Project</Typography>
      </Box>
        <Box mt={1}>
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={selectedProjectList}
      options={ProjectList.map((i)=>i.projectCode)}
      onChange={(event, value) => setSelectedProjectList(value)}
      size='small' 
      sx={{width:250}}
      renderInput={(params) => <TextField fontSize='small'  color='secondary' {...params} label="-- Select Project --" />}
        />
        </Box>
        </Box>
         </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Select User</Typography>
      </Box>
        <Box mt={1}>
        <Autocomplete
      disablePortal
      size='small'
      id="combo-box-demo"
      options={EmployeeNameList}
      getOptionLabel={(option) => `${option.EmployeeName} (${option.EmployeeId})`}
      onChange={(event, value)=>setSelectedEmployeeId(value.EmployeeId)}
      sx={{width:250}}
      renderInput={(params) => <TextField  color='secondary' {...params} label="-- Select User --" />}
        />
        </Box>
        </Box>
        </Grid>

     <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Balance(₹)</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="EmployeeName" 
        label="Balance(₹)" variant="outlined" 
        size='small'  
        color='secondary'
          sx={{width:250}}
          InputLabelProps={{
            shrink:true
          }}
        value={Balance}        
      />
        </Box>
        </Box>
        </Grid>


             <Grid item xs={12} sm={12} md={4} lg={4}>
      <Box mb={3}>
      <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Add Money(₹)</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="amount" 
        label="Add Money(₹)" variant="outlined" 
        size='small'  
        color='secondary'
        sx={{width:250}}
        value={AddedAmount}
        onChange={(e) => setAddedAmount(e.target.value)}        
      />
        </Box>
        </Box>
         </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8}>
        <Box mb={3}>
        <Box>
      <Typography sx={{fontSize: 17, fontWeight: 700, color: '#616e80'}}>Comments</Typography>
      </Box>
        <Box mt={1}>
        <TextField   
        id="amount" 
        label="Description" variant="outlined" 
        size='small'  
        color='secondary'
        fullWidth
        value={ProjectDesc}
        onChange={(e) => setProjectDesc(e.target.value)}        
      />
        </Box>
        </Box>
        </Grid>

        </Grid>
 
      <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box display='flex' justifyContent='center' py={2}>
        <Button onClick={AddMoneyToWallet} variant='contained' color='secondary' fullWidth>Add Money in Wallet</Button>
      </Box>
      </Grid>
      </Grid>

      </Box>


      </Box>
    </Container>
    </Box>
  )
}
