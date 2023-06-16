import React, { useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete} from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { add_deductions, add_employee_salary, add_factory_project, add_incentives, getAllEmployeeName, get_department, get_employee_name, insertTask, methodPost } from '../../../API_Service/API_Links';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../../Variables/Variables';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function CreateCTCTab({setValue}) {



      const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


   const [Basic , setBasic] = useState('');
   const [Annual , setAnnual] = useState('');
   const [HRA, setHRA] = useState('')
   const [Education , setEducation] = useState('')
   const [Special , setSpecial] = useState('')
   const [PF , setPF] = useState('')
   const [TDS , setTDS] = useState('')
   const [ESI , setESI] = useState('')
   const [Incentive, setIncentive] = useState('')
   const [Carry , setCarry] = useState('')
   const [OthersEarnings, setOthersEarnings] = useState('')
   const [CompanyLoan , setCompanyLoan] = useState('')
   const [SalaryAdvance, setSalaryAdvance] = useState('')
   const [OthersDeductions, setOthersDeductions] = useState('')
   const [Welfare, setWelfare] = useState('')
   const [EmployeeId , setEmployeedId] = useState('');
   const [EmployeeName , setEmployeeName] = useState('');
   const [startDate , setStartDate] = useState(new Date())
   const [endDate, setEndDate] = useState(new Date());
const [EmployeeIdList , setEmployeeIdList] = useState([]);
 
    const handleStartYearChange = (date) => {
    setStartDate(new Date(date));
  };

   const handleEndYearChange = (date) => {
    setEndDate(new Date(date));
  };

    const startYear = startDate.toLocaleDateString('en-US', { year: 'numeric' });
    const endYear = endDate.toLocaleDateString('en-US', { year: 'numeric' });


     useEffect(()=>{
    const sendData = new FormData()
    sendData.append('EmployeeId', EmployeeId)
      axios({
          method:'POST',
          url: get_employee_name,
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
              setEmployeeIdList(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
  },[EmployeeId])

   const selectedName = EmployeeIdList.map((i)=>i.EmployeeName);

 const serverData = {
      EmployeeId:EmployeeId,
      EmployeeName:EmployeeName,
      FromYear:startYear,
      ToYear:endYear,
      AnnualSalary:Annual,
      HouseRentAllowance:HRA,
      EducationalAllowance:Education,
      SpecialAllowance:Special,
      PF:PF,
      TDS:TDS,
      ESI:ESI
          }
    const sendData = appendData(serverData);
    const CreateEarnings = () => {
            axios({
                method: methodPost,
                url: add_employee_salary,
                data: sendData,
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
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }

      const serverData1 = {
      EmployeeId:EmployeeId,
      Incentives:Incentive,
      CarryForward:Carry,
      Others:OthersEarnings,
                }
    const sendData1 = appendData(serverData1);
    const CreateAdditonal = () => {
            axios({
                method: methodPost,
                url: add_incentives,
                data: sendData1,
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
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }


      const serverData2 = {
          EmployeeId:EmployeeId,
          CompanyLoanAmount:CompanyLoan,
          SalaryAdvanceAmount:SalaryAdvance,
          StaffWelfareAmount:Welfare,
          OtherDeductionAmount:OthersDeductions,
                }
    const sendData2 = appendData(serverData2);
    const CreateOtherDeduction = () => {
            axios({
                method: methodPost,
                url: add_deductions,
                data: sendData2,
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

                    setBasic('')
                    setEmployeeName('')
                    setEmployeedId('')
                    setCarry('')
                    setCompanyLoan('')
                    setESI('')
                    setEducation('')
                    setIncentive('')
                    setOthersDeductions('')
                    setOthersEarnings('')
                    setPF('')
                    setSpecial('')
                    setAnnual('')
                    setHRA('')
                    setTDS('')
                    setWelfare('')
                    setSalaryAdvance('')
                    navigate('/home/HRMS/CTC')
                }
            }).catch(err => {
                alert('Oops something went wrong ' + err)
            });
        }


  return (
    <Box>
       <Box sx={{ height:'90%'}} display="flex" alignItems="center">     
        <Box py={4} sx={{ px: 5, backgroundColor: '#EDF4F4', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>
        <Grid container justifyContent='center' sx={{ textAlign: 'center' }}  spacing={4}  >
         <Grid item lg={12} xl={12} >

          <Box  sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
         <Box sx={{ pb: 3 ,textAlign:'left' }}>
          <h5>EMPLOYEE INFORMATION </h5>
          </Box>
              <Grid container justifyContent='space-evenly' spacing={2}  >
                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                        <TextField   
                        id="EmployeeName" 
                        label="Employee ID" 
                        variant="outlined" 
                        size='small'  
                        color='secondary'
                        value={EmployeeId}
                        onChange={(e) => setEmployeedId(e.target.value)}       
                      />
                        </Grid>
                             <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={[...selectedName]}
                            onChange={(event, value)=>setEmployeeName(value)}
                            renderInput={(params) => ( <TextField {...params} 
                            label="Employee Name"
                            InputLabelProps={{shrink:true}}
                            sx={{ width: 220 }} variant="outlined"
                            size="small" color="secondary"
                            />
                            )}
                            />
                        </Grid>
                         <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label='Start Year' 
                            openTo="year"
                            views={['year']}
                            value={startDate}
                            onChange={handleStartYearChange}
                            format="YYYY"
                            inputProps={{
                              style: { textAlign: 'center' },
                            }}
                            renderInput={(props) => <TextField {...props} size='small' type="text" />}
                          />
                        </LocalizationProvider>
                        </Grid>
                             <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label='End Year' 
                              openTo="year"
                              views={['year']}
                              value={endDate}
                              onChange={handleEndYearChange}
                              format="YYYY"
                              inputProps={{
                                style: { textAlign: 'center' },
                              }}
                              renderInput={(props) => <TextField {...props} size='small' type="text" />}
                            />
                          </LocalizationProvider>
                        </Grid>
                    </Grid>
            </Box>

                  
          <Box  sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
         <Box sx={{ pb: 3 ,textAlign:'left' }}>
          <h5>EARNINGS </h5>
          </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2  }} justifyContent='start' >
                            <TextField 
                            id="ProjectName" 
                            label="Annual Salary" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            sx={{width:300}}
                             onChange={(e) => setAnnual(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Basic" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setBasic(e.target.value)}
                            />
                        </Grid>
                             <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="HRA" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setHRA(e.target.value)}
                            />
                        </Grid>
                         <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Educational Allowance" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setEducation(e.target.value)}
                            />
                        </Grid>
                             <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Special Allowance" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setSpecial(e.target.value)}
                            />
                        </Grid>

                         <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2  }} >
                        <Box sx={{textAlign:'left' }}>
                      <h5>DDEDUCTIONS </h5>
                        </Box>
                        </Grid>

                        <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="PF" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setPF(e.target.value)}
                            />
                        </Grid>
                            <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="TDS" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setTDS(e.target.value)}
                            />
                        </Grid>
                            <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="ESI" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setESI(e.target.value)}
                            />
                        </Grid>

                          <Grid item lg={8} sm={8} xl={8} xs={8} md={8} sx={{ py: 2 }} display='flex' justifyContent='center' textAlign='center' >
                          <Stack spacing={2} direction="row" textAlign='center' >
                              <Button  
                              fullWidth 
                              onClick={CreateEarnings}
                              variant="outlined"
                              type='submit'
                             sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': {  borderColor: '#7bc54c', color: '#000000' } }}>
                              CREATE EARNINGS AND DEDUCTIONS
                            </Button>
                          </Stack>

                      </Grid>

                    </Grid>
            </Box>


           <Box  sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
         <Box sx={{ pb: 1 ,textAlign:'left' }}>
          <h5>ADDITIONAL COMPONENTS</h5>
          </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Incentive" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setIncentive(e.target.value)}
                            />
                        </Grid>
                          <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Carry Forward" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setCarry(e.target.value)}
                            />
                        </Grid>
                              <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Others Earnings" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setOthersEarnings(e.target.value)}
                            />
                        </Grid>

                          <Grid item lg={8} sm={8} xl={8} xs={8} md={8} sx={{ py: 2 }} display='flex' justifyContent='center' textAlign='center' >
                          <Stack spacing={2} direction="row" textAlign='center' >
                              <Button  
                              fullWidth 
                              onClick={CreateAdditonal}
                              variant="outlined"
                              type='submit'
                             sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': {  borderColor: '#7bc54c', color: '#000000' } }}>
                              CREATE ADDITIONAL COMPONENTS
                            </Button>
                          </Stack>

                      </Grid>

                    </Grid>
            </Box>
                   
                    <Box  sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
         <Box sx={{ pb: 3 ,textAlign:'left' }}>
          <h5>OTHER DEDUCTIONS</h5>
          </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Company Loan" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setCompanyLoan(e.target.value)}
                            />
                        </Grid>
                         <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Salary Advance" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setSalaryAdvance(e.target.value)}
                            />
                        </Grid>
                            <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Others Deductions" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setOthersDeductions(e.target.value)}
                            />
                        </Grid>

                             <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Welfare" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                             onChange={(e) => setWelfare(e.target.value)}
                            />
                        </Grid>

                          <Grid item lg={8} sm={8} xl={8} xs={8} md={8} sx={{ py: 2 }} display='flex' justifyContent='center' textAlign='center' >
                          <Stack spacing={2} direction="row" textAlign='center' >
                              <Button  
                              fullWidth 
                              onClick={CreateOtherDeduction}
                              variant="outlined"
                              type='submit'
                             sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': {  borderColor: '#7bc54c', color: '#000000' } }}>
                              CREATE OTHER DEDUCTIONS
                            </Button>
                          </Stack>

                      </Grid>

                    </Grid>
            </Box>
                   
                </Grid >
                </Grid>      

            </Box >
           
          
            </Box >


            </Box>
  )
}
