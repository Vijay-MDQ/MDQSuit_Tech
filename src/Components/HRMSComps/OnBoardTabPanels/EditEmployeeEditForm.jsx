import React, { useEffect, useState } from 'react'
import {Box,Button,Card,Grid,TextField,Typography, Container, Autocomplete, InputAdornment, IconButton} from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { add_employee_details, add_factory_project, get_department, get_employee_detail, methodPost } from "../../../API_Service/API_Links";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../../Variables/Variables';
import SnackBar from '../../SnackBar';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate} from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Heading from '../../Heading';
import Breadcrumbs from '../../Breadcrumbs';

export default function  EditEmployeeEditForm({id}) {


    const [showPassword, setShowPassword] = useState(true);
    const { formState: { errors }, handleSubmit, register } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const [EmployeeType, setEmployeeType] = useState('');
    const [EmployeeId , setEmployeedId] = useState(location.state.EmployeeId);
    const [Password , setPassword] = useState('');
    const [UserName, setUserName] = useState('');
    const [EmployeeName , setEmployeeName] = useState(location.state.EmployeeName);
    const [Profile , setProfile] = useState('');
    const [JoinDate , setJoinDate] = useState('');
    const [GroupCompany ,setGroupCompany] = useState('');
    const [Department, setDepartment] = useState('');
    const [Designation, setDesignation] = useState('')
    const [Role, setRole] = useState('')
    const [Gender , setGender] = useState('')
    const [Blood, setBlood] = useState('')
    const [AdhaarNo, setAdhaarNo] = useState('')
    const [Age , setAge] = useState('')
    const [DOB , setDOB] = useState('')
    const [Email , setemail] = useState('')
    const [PersonalPh, setPersonalPh] = useState('')
    const [PermanentAddress, setpermanentAddress] = useState('')
    const [PresentAddress, setpresentAddress] = useState('')
    const [Institute , setInstitute] = useState('')
    const [HighLevel, setHighLevel] = useState('')
    const [Course , setCourse] = useState('')
    const [JoinYear , setJoinYear] = useState('')
    const [PassingYear , setPassingYear] = useState('')
    const [Result , setResult] = useState('')
    const [BankName, setBankName] = useState('')
    const [BranchName, setBranchName] = useState('')
    const [AccountNo , setAccountNo] = useState('')
    const [ConfirmAccountNo, setConfirmAccountNo] = useState('')
    const [IFSC , setIFSC] = useState('')
    const [Holder , setHolder] = useState('')
    const [AdhaarCard, setAdhaarCard] = useState('')
    const [PANCard , setPANCard] =useState('')
    const [BloodReport , setBloodReport] = useState('');
    const [DL , setDL] = useState('')
    const [EducationCert, setEducationCart] = useState('')
    const [EmployeeCV , setEmployeeCV] = useState('')
    const [ExpYear , setExpYear] = useState('')
    const [PANno, setPANno]= useState('')
    const [PassportNo, setPassportNo] = useState('')
    const [DLNumber, setDLNumber] = useState('')
    const [DLExp , setDLExp] = useState('')
    const [DLBatch, setDLBatch] = useState('')
    const [HealthRelated , setHealthRelated] = useState('')
    const [EmergencyName, setEmergencyName] = useState('')
    const [EmergencyContact, setEmergencyContact] = useState('')
    const [Referred , setReferred] = useState('')
    const [ReferralContact, setReferralContact] = useState('')
    const [FatherName, setFatherName] = useState('')
    const [MotherName, setMontherName] = useState('')
    const [Marital , setMarital] = useState('')
    const [Spouse , setSpouse] = useState('')
    const [KidsName, setKidsName] = useState('')
    const [AdditonalContact, setAdditionalContact] = useState('')
    const [Insurance , setInsurance] = useState('')
    const [ExpLetter, setExpLetter] = useState('')
    const [RelieveLetter, setRelieveLetter] = useState('')
    const [OfferLetter, setOfferLetter] = useState('')
    const [remarks , setRemarks] = useState('')
    const [departmentList , setDepartmentList] = useState([]);
    const [courseCompletion,setCourseCompletion] = useState('')
    const [Degree,setDegree] = useState('');
    const [ComplainceRemarks, setComplainceRemarks] = useState('');
    const [Complaince,setComplaince] = useState('');
    const [Reporting, setReporting]= useState('');
    const [Kid1Name, setKid1Name] = useState('')
    const [Kid2Name, setKid2Name] = useState('')




    const getParticularEmployeeData = () =>{
    const sendData = new FormData()
    sendData.append('EmployeeName', EmployeeName)
    sendData.append('EmployeeId', EmployeeId)
      axios({
          method:'POST',
          url: get_employee_detail,
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
                setEmployeeType(res.data.data.employeeType)
                setProfile(res.data.data.profileImage)
                setJoinDate(res.data.data.dateOfJoining)
                setGroupCompany(res.data.data.groupCompany)
                setDepartment(res.data.data.department)
                setDesignation(res.data.data.designation)
                setRole(res.data.data.role)
                setGender(res.data.data.gender)
                setBlood(res.data.data.bloodGroup)
                setAdhaarNo(res.data.data.aadharNum)
                setAge(res.data.data.age)
                setDOB(res.data.data.dateOfBirth)
                setemail(res.data.data.email)
                setPersonalPh(res.data.data.personalPhoneNum)
                setpermanentAddress(res.data.data.permanentAddress)
                setpresentAddress(res.data.data.presentAddress)
                setInstitute(res.data.data.instituteName)
                setHighLevel(res.data.data.highestLevel)
                setCourse(res.data.data.course)
                setJoinYear(res.data.data.yearOfJoining)
                setPassingYear(res.data.data.yearOfPassing)
                setResult(res.data.data.result)
                setBankName(res.data.data.bankName)
                setBranchName(res.data.data.branchName)
                setAccountNo(res.data.data.accountNo)
                setIFSC(res.data.data.IFSCcode)
                setHolder(res.data.data.accountHolder)
                setAdhaarCard(res.data.data.aadharCard)
                setPANCard(res.data.data.panCard)
                setDL(res.data.data.drivingLicense)
                setBloodReport(res.data.data.bloodReport)
                setEducationCart(res.data.data.educationalCertificate)
                setEmployeeCV(res.data.data.employeeCV)
                setExpYear(res.data.data.yearsOfExperience)
                setPANno(res.data.data.panNum)
                setPassportNo(res.data.data.passportNum)
                setDLNumber(res.data.data.drivingLicenseNum)
                setDLExp(res.data.data.drivingLicenseExpiration)
                setDLBatch(res.data.data.drivingLicenseBatch)
                setHealthRelated(res.data.data.healthIssues)
                setEmergencyName(res.data.data.emergencyContactName)
                setEmergencyContact(res.data.data.emergencyContactNum)
                setReferred(res.data.data.employeeReferredBy)
                setReferralContact(res.data.data.referralContactNum)
                setFatherName(res.data.data.fatherName)
                setMontherName(res.data.data.motherName)
                setMarital(res.data.data.maritalStatus)
                setSpouse(res.data.data.spouseName)
                setKidsName(res.data.data.kidsName)
                setAdditionalContact(res.data.data.additionalContactDetails)
                setInsurance(res.data.data.insurance)
                setExpLetter(res.data.data.experienceLetter)
                setRelieveLetter(res.data.data.relievingLetter)
                setOfferLetter(res.data.data.offerLetter)
                setRemarks(res.data.data.remarks)
                setCourseCompletion(res.data.data.isCourseCompleted)
                setDegree(res.data.data.degree)
                setComplainceRemarks(res.data.data.complainceRemarks)
                setComplaince(res.data.data.isComplaince)
                setReporting(res.data.data.reportingTo)
                setKid1Name(res.data.data.kidsName1)
                setKid2Name(res.data.data.kidsName2)

          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }

    useEffect(()=>{
   getParticularEmployeeData();
    },[])

    const serverData = {
        employeeName:EmployeeName,
        email:Email,
        employeeType:EmployeeType,
        department : Department,
        designation:Designation,
        role: Role,
        gender: Gender,
        bloodGroup:Blood,
        aadharNum: AdhaarNo,
        age: Age,
        groupCompany: GroupCompany,
        dateOfBirth: DOB,
        dateOfJoining: JoinDate,
        personalPhoneNum: PersonalPh,
        presentAddress: PresentAddress,
        permanentAddress: PermanentAddress,
        instituteName: Institute,
        highestLevel:HighLevel,
        course:Course,
        yearOfJoining:JoinYear,
        yearOfPassing:PassingYear,
        result:Result,
        aadharCard:AdhaarCard,
        panCard:PANCard,
        drivingLicense:DL,
        bloodReport:BloodReport,
        educationalCertificate:EducationCert,
        employeeCV:EmployeeCV,
        insurance:Insurance,
        experienceLetter:ExpLetter,
        relievingLetter:RelieveLetter,
        offerLetter:OfferLetter,
        bankName:BankName,
        branchName:BranchName,
        accountNo:AccountNo,
        confirmAccountNo:ConfirmAccountNo,
        IFSCcode:IFSC,
        accountHolder:Holder,
        yearsOfExperience:ExpYear,
        panNum:PANno,
        passportNum:PassportNo,
        drivingLicenseNum:DLNumber,
        drivingLicenseExpiration:DLExp,
        drivingLicenseBatch:DLBatch,
        healthIssues:HealthRelated,
        emergencyContactName:EmergencyName,
        emergencyContactNum:EmergencyContact,
        employeeReferredBy:Referred,
        referralContactNum:ReferralContact,
        fatherName:FatherName,
        motherName:MotherName,
        maritalStatus:Marital,
        spouseName:Spouse,
        kidsName1:Kid1Name,
        kidsName2:Kid2Name,
        additionalContactDetails:AdditonalContact,
        EmployeeId:EmployeeId,
        isCourseCompleted:courseCompletion,
        isComplaince:Complaince,
        complainceRemarks:ComplainceRemarks,
        degree:Degree,
        profileImage:Profile,
        reportingTo:Reporting,
    }
    const sendData = appendData(serverData);
    const onSubmit = () => {
        if (!navigator.onLine) {
            setMessage('Your internet is in Offline')
            setOpen(true)
            setStatus(false)
            setColor(false)
        } else {
            axios({
              method: methodPost,
              url: add_employee_details,
              data: sendData,
            })
              .then((res) => {
                if (res.data.error) {
                  setMessage(res.data.message);
                  setOpen(true);
                  setStatus(false);
                  setColor(false);
                } else {
                  setMessage(res.data.message);
                  setOpen(true);
                  setStatus(true);
                  setColor(true);
                  navigate(-1);
                }
              })
              .catch((err) => {
                alert("Oops something went wrong " + err);
              });
        }

    }


       useEffect(()=>{
      axios({
          method:'GET',
          url: get_department,
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
              setDepartmentList(res.data.data);
          }
      }).catch(err => {
          alert('Oops something went wrong ' + err)
      });
    }
    ,[])



     const cancelClick = () =>{
        navigate(-1);
     }

  return (
    <Box>


       <Box py={2} px={1}>
    <Breadcrumbs 
    previous={'Home'}
    current={'onBoard'}
    link1={`/home`}
    link2={'/home/HRMS/onboard'}
    currentSection={'Edit Employee'}
    
    />
    </Box>

    <Container>
      <Box py={3}>
      <Heading  title={'Update Employee Information'}/>
      </Box>
    </Container>



       <Box p={3} sx={{ height:'90%'}} display="flex" alignItems="center">     
       <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color} />    
                                      
           <Box py={4} sx={{ px: 5, backgroundColor:'#EDF4F4', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>

          <Grid container justifyContent='center' sx={{ textAlign: 'center' }}>
          <Grid item lg={12} sm={12} xl={12} xs={12} md={12} mt={3}>
                <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={EmployeeType}
            options={['Factory Employee', 'Site Helpers' , 'Site Employee' ,'Office Employee']}
            onChange={(index, value)=>setEmployeeType(value)}
            renderInput={(params) => ( 
            <TextField {...params} label="Employee Type"
            sx={{ width: "100%" }} variant="outlined"
            size="small" color="secondary"
                />
                 )}
            />
          </Grid>
          </Grid>


{
    EmployeeType === 'Factory Employee' ?
        <Grid container justifyContent='center' sx={{ textAlign: 'center' }}  spacing={4}  >
             <Grid item lg={6} xl={6}>
              
                {/* Personal Info */}
                            
                <Box  sx={{ border:"1px solid black" , p:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2}, mt:5 }} >
                <Box sx={{ pb: 4 ,textAlign:'left'}}><h5>BASIC INFOMRATION</h5></Box>
                 <Grid container justifyContent='space-evenly' spacing={2}  >

                             <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField 
                                fullWidth 
                                id="ProjectName"
                                 label="Employee ID" 
                                 variant="outlined" 
                                 size='small'
                                 disabled
                                 color='secondary'
                                value={EmployeeId}
                            />
                            </Grid>

                              <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField
                                 fullWidth
                                  id="ProjectName" 
                                  label="Employee Name" 
                                  variant="outlined" 
                                  size='small'
                                  color='secondary'
                                  value={EmployeeName}
                                  InputLabelProps={{ shrink: true }}
                                 onChange={(e) => setEmployeeName(e.target.value)}
                            />
                            </Grid>

                               <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Profile Picture" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setProfile(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                                <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField
                                 fullWidth 
                                 id="Services" 
                                  type='date' 
                                  label="Date Of Joining"
                                   variant="outlined"
                                    size='small'
                                    color='secondary'
                                    value={JoinDate}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setJoinDate(e.target.value)}
                                />
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                                <TextField  
                                 fullWidth 
                                 id="firstName" 
                                 label="Group Company" 
                                 variant="outlined" 
                                size='small' 
                                color='secondary'
                                 value={GroupCompany}
                                    InputLabelProps={{shrink: true,}}
                                onChange={(e) => setGroupCompany(e.target.value)}                                  
                                />
                            </Grid>

                      <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={Department}
                        options={departmentList.map((i)=>i.Department)}
                        onChange={(event, value)=>setDepartment(value)}
                        renderInput={(params) => ( <TextField {...params} label="Department"
                        sx={{ width: "100%" }} variant="outlined"
                        size="small" color="secondary"
                          />
                        )}
                      />
                    </Grid>

                    <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Designation" 
                        variant="outlined" 
                       size='small' 
                      color='secondary'
                        value={Designation}
                        InputLabelProps={{shrink: true,}}
                      onChange={(e) => setDesignation(e.target.value)}                                  
                    />
                    </Grid>

                    
                    <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                      <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Role" 
                        variant="outlined" 
                       size='small' 
                      color='secondary'
                      value={Role}
                        InputLabelProps={{shrink: true,}}
                      onChange={(e) => setRole(e.target.value)}                                  
                    />
                    </Grid>

                    <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={Reporting}
                        options={departmentList.map((i)=>i.Department)}
                        onChange={(event, value)=>setReporting(value)}
                        renderInput={(params) => ( <TextField {...params} label="Reporting To"
                        sx={{ width: "100%" }} variant="outlined"
                        size="small" color="secondary"
                          />
                        )}
                      />
                    </Grid>

                     <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={['Male', 'Female', 'Prefer Not to Say']}
                        value={Gender}
                        onChange={(event, value)=>setGender(value)}
                        renderInput={(params) => ( <TextField {...params} label="Gender"
                        sx={{ width: "100%" }} variant="outlined"
                        size="small" color="secondary"
                          />
                        )}
                      />
                    </Grid>
                            
                     <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Blood Group" 
                        variant="outlined" 
                        size='small'  
                        color='secondary'
                         value={Blood}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setBlood(e.target.value)}                   
                        />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField 
                        fullWidth 
                        id="firstName" 
                        label="Adhaar No"
                        variant="outlined"
                        size='small'  
                        color='secondary'
                         value={AdhaarNo}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setAdhaarNo(e.target.value)}                     
                        />
                        </Grid>

                      <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth
                        id="firstName"
                        label="Age"
                        variant="outlined"
                        size='small' 
                        type='tel'
                        color='secondary'
                        value={Age}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setAge(e.target.value)}                   
                        />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                        <TextField 
                        fullWidth 
                        id="Services" 
                         type='date' 
                         label="Date Of Birth" 
                         variant="outlined" 
                         size='small'
                         color='secondary'
                         value={DOB}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setDOB(e.target.value)}
                    />
                     </Grid>

                      <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                       <TextField  
                        fullWidth 
                        id="firstName"
                        label="Email ID"
                        type='email'
                        variant="outlined"
                        size='small' 
                         color='secondary'
                         value={Email}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setemail(e.target.value)}                   
                        />
                        </Grid>
                          <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Years Of Exp."
                              variant="outlined" 
                              size='small'
                              type='tel'
                              color='secondary'
                               value={ExpYear}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setExpYear(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Personal Mobile No"
                            variant="outlined"
                            type='tel'
                             size='small'
                             color='secondary'
                              value={PersonalPh}
                          InputLabelProps={{shrink: true,}}
                            onChange={(e) => setPersonalPh(e.target.value)}
                            />
                        </Grid>
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={Complaince}
                        options={['Complaince', 'Non-Complaince']}
                        onChange={(event, value)=>setComplaince(value)}
                        renderInput={(params) => ( <TextField {...params} label="Complaince/Non-Complaince"
                        sx={{ width: "100%" }} variant="outlined"
                        size="small" color="secondary"
                          />
                        )}
                      />
                        </Grid>
                             <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Complaince Remarks"
                            variant="outlined"
                            type='tel'
                             size='small'
                             color='secondary'
                              value={ComplainceRemarks}
                          InputLabelProps={{shrink: true,}}
                            onChange={(e) => setComplainceRemarks(e.target.value)}
                            />
                        </Grid>
                         

                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} mt={4}>
                        <Box pb={1} sx={{textAlign:'left'}}><h5>ADDRESS INFOMRATION</h5></Box>
                         </Grid>

                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 1  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Permanent Address" 
                        variant="outlined"  
                        size='small'  
                        color='secondary'
                        value={PermanentAddress}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setpermanentAddress(e.target.value)}                       
                        />
                        </Grid>

                       <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName"
                        label="Present Address"
                        variant="outlined"  
                        size='small' 
                        color='secondary'
                        value={PresentAddress}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setpresentAddress(e.target.value)}                       
                        />
                        </Grid>

                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12} mt={5} >
                        <Box sx={{ pb: 3 ,textAlign:'left'}}><h5>EDUCATION INFOMRATION</h5></Box>
                         </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Name Of the Institute" 
                        variant="outlined"
                        size='small' 
                        color='secondary'
                        value={Institute}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setInstitute(e.target.value)}                       
                        />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Highest Level"
                        variant="outlined" 
                        size='small'  
                        color='secondary'
                        value={HighLevel}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setHighLevel(e.target.value)}                    
                        />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField 
                         fullWidth
                          id="firstName"
                           label="Course/Stream" 
                           variant="outlined" 
                            size='small' 
                             color='secondary'
                             value={Course}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setCourse(e.target.value)}                   
                        />
                        </Grid>

                         <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                         <TextField 
                         fullWidth
                          id="firstName"
                           label="Course Completion" 
                           variant="outlined" 
                            size='small' 
                             color='secondary'
                              value={courseCompletion}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setCourseCompletion(e.target.value)}                   
                        />
                        </Grid>

                         <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={Degree}
                        options={['UG', 'PG', 'HIGH SCHOOL']}
                        onChange={(event, value)=>setDegree(value)}
                        renderInput={(params) => ( <TextField {...params} label="UG/PG"
                        sx={{ width: "100%" }} variant="outlined"
                        size="small" color="secondary"
                          />
                        )}
                      />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                                <TextField  
                                 fullWidth
                                  id="lastName" 
                                  label="Year Of Joining"
                                   variant="outlined" 
                                   size='small' 
                                   type='date'
                                   value={JoinYear}
                                   InputLabelProps={{shrink: true,}}
                                    color='secondary'
                                    onChange={(e) => setJoinYear(e.target.value)}    
                                />
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                                <TextField  
                                 fullWidth 
                                 id="lastName" 
                                 label="Year Of Passing" 
                                 variant="outlined" 
                                size='small'  
                                type='date'
                                value={PassingYear}
                                InputLabelProps={{shrink: true,}}
                                color='secondary'
                                 onChange={(e) => setPassingYear(e.target.value)}
                                    
                                />
                            </Grid>
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                                <TextField 
                                  fullWidth
                                   id="lastName"
                                    label="Result"
                                    variant="outlined" 
                                    size='small' 
                                    color='secondary'
                                     value={Result}
                                   InputLabelProps={{shrink: true,}}
                                    onChange={(e) => setResult(e.target.value)}                                    
                                />
                            </Grid>

                    </Grid>   
                    </Box>      
                    </Grid> 


                   
 {/* (Financial Info) */}

               
                <Grid item lg={6} xl={6}>
               <Box  sx={{ border:"1px solid black" , px:4 , pb:1 ,pt:3 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
               <Box sx={{ pb: 1 ,textAlign:'left' }}>
                   <h5>BANKING INFOMRATION</h5>
               </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Bank Name" 
                             variant="outlined" 
                             size='small'
                             color='secondary'
                              value={BankName}
                          InputLabelProps={{shrink: true,}}
                             onChange={(e) => setBankName(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField
                             fullWidth
                              id="ProjectName"
                               label="Branch Name"
                                variant="outlined" 
                                size='small'
                                color='secondary'
                                value={BranchName}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setBranchName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField
                             fullWidth 
                             id="ProjectName"
                              label="Account No"
                               variant="outlined" 
                               size='small'
                               color='secondary'
                               value={AccountNo}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setAccountNo(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField
                             fullWidth 
                             id="ProjectName"
                            label="Confirm Account No"
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            value={ConfirmAccountNo}
                          InputLabelProps={{shrink: true,}}
                             onChange={(e) => setConfirmAccountNo(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="IFSC Code"
                              variant="outlined"
                               size='small'
                               color='secondary'
                               value={IFSC}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setIFSC(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Account Holder Name" 
                             variant="outlined" 
                             size='small'
                             color='secondary'
                             value={Holder}
                          InputLabelProps={{shrink: true,}}
                            onChange={(e) => setHolder(e.target.value)}
                            />
                        </Grid>

                       <Grid item lg={12} sm={12} xl={12} xs={12} md={12}  mt={1}>
                        <Box sx={{ pb: 1 ,textAlign:'left'}}><h5>PROOF DOCUMENTS</h5></Box>
                         </Grid>

                         <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Adhaar" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setAdhaarCard(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="PAN" 
                            variant="outlined" 
                            size='small'
                            color='secondary'                          
                            type="file"
                            onChange={(e) => setPANCard(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Driver's License" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setDL(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Blood Report" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) =>setBloodReport(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Educational Cert" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setEducationCart(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Employee CV" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setEmployeeCV(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>


                       <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
                        <Box sx={{textAlign:'left'}}><h5>PERSONAL INFOMRATION</h5></Box>
                         </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth
                             id="ProjectName"
                              label="PAN No" 
                              variant="outlined"
                               size='small'
                               color='secondary'
                                value={PANno}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setPANno(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Passport No" 
                             variant="outlined" 
                             size='small'
                             color='secondary' 
                              value={PassportNo}
                          InputLabelProps={{shrink: true,}}                            
                                onChange={(e) => setPassportNo(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Driving License No"
                             variant="outlined" 
                             size='small'
                             color='secondary'
                              value={DLNumber}
                          InputLabelProps={{shrink: true,}}
                             onChange={(e) => setDLNumber(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Driving License Expiration"
                              variant="outlined" 
                              size='small'
                              color='secondary'
                                type='date'
                                value={DLExp}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setDLExp(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Driving License Batch" 
                             variant="outlined" 
                             size='small'
                             value={DLBatch}
                             InputLabelProps={{ shrink: true }}
                             color='secondary'
                                onChange={(e) => setDLBatch(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Health Related Issues" 
                            variant="outlined"
                            value={HealthRelated}
                            InputLabelProps={{ shrink: true }}
                             size='small'
                             color='secondary'
                            onChange={(e) => setHealthRelated(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Emergency ContactName" 
                            variant="outlined"
                             size='small'
                             color='secondary'
                             value={EmergencyName}
                          InputLabelProps={{shrink: true,}}
                             onChange={(e) => setEmergencyName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Emergency Contact No."
                              variant="outlined" 
                              size='small'
                              color='secondary'
                              value={EmergencyContact}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setEmergencyContact(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField
                             fullWidth 
                             id="ProjectName" 
                             label="Employee Referred By"
                              variant="outlined" 
                              size='small'
                              color='secondary'                               
                              value={Referred}
                          InputLabelProps={{shrink: true,}} 
                                onChange={(e) => setReferred(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Referral Contact No."
                              variant="outlined"
                               size='small'
                               color='secondary'                              
                               value={ReferralContact}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setReferralContact(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Father's Name"
                             variant="outlined"
                              size='small'
                              value={FatherName}
                          InputLabelProps={{shrink: true,}}
                              color='secondary'                              
                                onChange={(e) => setFatherName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Mother's Name" 
                            variant="outlined" 
                              value={MotherName}
                          InputLabelProps={{shrink: true,}}
                            size='small'
                            color='secondary'                              
                            onChange={(e) => setMontherName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Marital Status"
                             variant="outlined" 
                             size='small'
                             color='secondary'                               
                              value={Marital}
                          InputLabelProps={{shrink: true,}} 
                            onChange={(e) => setMarital(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Spouse Name" 
                             variant="outlined" 
                             size='small'
                            color='secondary'
                               value={Spouse}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setSpouse(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Kid1 Name"
                             variant="outlined"
                             size='small'
                             color='secondary'
                             value={Kid1Name}
                          InputLabelProps={{shrink: true,}}
                             onChange={(e) => setKid1Name(e.target.value)}
                            />
                        </Grid>

                           <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Kid2 Name"
                             variant="outlined"
                             size='small'
                             color='secondary'
                              value={Kid1Name}
                          InputLabelProps={{shrink: true,}}
                             onChange={(e) => setKid2Name(e.target.value)}
                            />
                        </Grid>

                         <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth
                             id="ProjectName" 
                             label="Additional Contact details" 
                             variant="outlined" 
                             size='small'
                             color='secondary'     
                             value={AdditonalContact}
                             InputLabelProps={{shrink: true,}} 
                             onChange={(e) => setAdditionalContact(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={12} sm={12} xl={12} xs={12} md={12}>
                        <Box sx={{textAlign:'left'}}><h5>OFFER LETTER INFO</h5></Box>
                         </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Insurance" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setInsurance(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Experience Lettter" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setExpLetter(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Relieving Letter" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setRelieveLetter(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                          <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Offer Letter" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                            onChange={(e) => setOfferLetter(e.target.files[0])}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>

                    </Grid>
                    </Box>


                </Grid >
                </Grid>  
                
                :



        <Grid container justifyContent='center' sx={{ textAlign: 'center' }}  spacing={4}  >
             <Grid item lg={6} xl={6}>
              
                {/* Personal Info */}
                            
                <Box  sx={{ border:"1px solid black" , p:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2} ,mt:5  }} >
                <Box sx={{ pb: 3 ,textAlign:'left'}}><h5>SITE HELPER INFOMRATION 1</h5></Box>
                                        <Grid container justifyContent='space-evenly' spacing={2}  >

                     <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField   
                       fullWidth 
                       id="firstName" 
                       label="Labour Name" 
                       variant="outlined" 
                       required 
                       size='small' 
                        color='secondary'
                        value={EmployeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}                     
                        />
                        </Grid>
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                                <TextField  
                                 fullWidth 
                                 id="firstName"
                                label="Employee No" 
                                variant="outlined" 
                                required
                                size='small'
                                color='secondary'
                                value={EmployeeId}
                                onChange={(e) => setEmployeedId(e.target.value)}                                   
                                />
                            </Grid>

                      
    <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Designation" 
                        variant="outlined" 
                       size='small' 
                      color='secondary'
                      value={Designation}
                        InputLabelProps={{shrink: true,}}
                      onChange={(e) => setDesignation(e.target.value)}                                  
                    />
                    </Grid>

                       <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={Reporting}
                        options={departmentList.map((i)=>i.Department)}
                        onChange={(event, value)=>setReporting(value)}
                        renderInput={(params) => ( <TextField {...params} label="Reporting To"
                        sx={{ width: "100%" }} variant="outlined"
                        size="small" color="secondary"
                          />
                        )}
                      />
                    </Grid>


                          <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="projectdocument" 
                            label="Profile Picture" 
                            variant="outlined" 
                            size='small'
                            color='secondary'
                            type="file"
                             InputLabelProps={{shrink: true,}}
                            onChange={(e) => setProfile(e.target.files[0])}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                        <TextField 
                        fullWidth 
                        id="Services" 
                         type='date' 
                         label="Date Of Birth" 
                         variant="outlined" 
                         size='small'
                         color='secondary'
                         value={DOB}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setDOB(e.target.value)}
                    />
                     </Grid>

                         
                         
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Personal Mobile No"
                            variant="outlined"
                             size='small'
                             color='secondary'
                             value={PersonalPh}
                          InputLabelProps={{shrink: true,}}
                            onChange={(e) => setPersonalPh(e.target.value)}
                            />
                        </Grid>

                         <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                       <TextField  
                        fullWidth 
                        id="firstName"
                        label="Remarks"
                        variant="outlined"
                        required
                        size='small'
                        color='secondary'
                        value={remarks}
                        InputLabelProps={{shrink: true,}}
                        onChange={(e) => setRemarks(e.target.value)}                     
                        />
                        </Grid>  


                     <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2  }}  >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Permanent Address" 
                        variant="outlined"  
                        size='small'  
                        color='secondary'
                        value={PermanentAddress}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setpermanentAddress(e.target.value)}                       
                        />
                        </Grid>                

                    </Grid>   
                    </Box>
                    </Grid> 

               
                <Grid item lg={6} xl={6}>              
                <Box  sx={{ border:"1px solid black" , p:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2} ,mt:5  }} >
                <Box sx={{ pb: 3 ,textAlign:'left'}}><h5>SITE HELPER INFOMRATION 2</h5></Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >

                     
 <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField 
                        fullWidth 
                        id="firstName" 
                        label="Adhaar No"
                        variant="outlined"
                        size='small'  
                        color='secondary'
                        value={AdhaarNo}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setAdhaarNo(e.target.value)}                     
                        />
                        </Grid>

                      
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth
                             id="ProjectName"
                              label="PAN No" 
                              variant="outlined"
                               size='small'
                               color='secondary'
                               value={PANno}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setPANno(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                       <TextField  
                        fullWidth 
                        id="firstName" 
                        label="Blood Group" 
                        variant="outlined" 
                        size='small'  
                        color='secondary'
                        value={Blood}
                          InputLabelProps={{shrink: true,}}
                        onChange={(e) => setBlood(e.target.value)}                   
                        />
                        </Grid>

                       <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Health Related Issues" 
                            variant="outlined"
                            value={HealthRelated}
                            InputLabelProps={{ shrink: true }}
                             size='small'
                             color='secondary'
                            onChange={(e) => setHealthRelated(e.target.value)}
                            />
                        </Grid>

              <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Father's Name"
                             variant="outlined"
                              size='small'
                              value={FatherName}
                          InputLabelProps={{shrink: true,}}
                              color='secondary'                              
                                onChange={(e) => setFatherName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Mother's Name" 
                            variant="outlined" 
                            value={MotherName}
                          InputLabelProps={{shrink: true,}}
                            size='small'
                            color='secondary'                              
                            onChange={(e) => setMontherName(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName" 
                            label="Marital Status"
                             variant="outlined" 
                             size='small'
                             color='secondary' 
                             value={Marital}
                          InputLabelProps={{shrink: true,}}                              
                            onChange={(e) => setMarital(e.target.value)}
                            />
                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth 
                            id="ProjectName"
                             label="Emergency Contact No."
                              variant="outlined" 
                              size='small'
                              color='secondary'
                              value={EmergencyContact}
                          InputLabelProps={{shrink: true,}}
                                onChange={(e) => setEmergencyContact(e.target.value)}
                            />
                        </Grid>

                         <Grid item lg={12} sm={12} xl={12} xs={12} md={12} sx={{ py: 2  }}  >
                            <TextField 
                            fullWidth
                             id="ProjectName" 
                             label="Additional Contact details" 
                             variant="outlined" 
                             size='small'
                             color='secondary'     
                              value={AdditonalContact}
                          InputLabelProps={{shrink: true,}}
                             onChange={(e) => setAdditionalContact(e.target.value)}
                            />
                        </Grid>


  

                    </Grid>   
                    </Box>
                    </Grid> 

                </Grid>  

}

                                                           {/* {buttons}  */} 

                <Grid container justifyContent='center' sx={{ textAlign: 'center' ,mt:3 }}>
                        <Grid item lg={6} xl={6} xs={12} >
                            <Grid container justifyContent='space-evenly' alignItems='center'>
                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }} >
                                    <Stack spacing={2} direction="row" >
                                        <Button 
                                        fullWidth 
                                        variant="outlined"
                                        type='submit' 
                                        onClick={onSubmit}
                                        sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': {  borderColor: '#7bc54c', color: '#000000' } }}>Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                        <Button fullWidth variant="outlined" onClick={cancelClick}
                                            type='cancel'sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828' , ':hover': {  borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>
                                            

                                    </Stack>

                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>

            </Box >
            </Box >


            </Box>
  )
}
