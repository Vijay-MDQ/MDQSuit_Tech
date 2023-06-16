import React, { useState } from 'react'
import { Box, Button, Card, Grid, TextField, Typography, Container, Autocomplete, } from "@mui/material";
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { add_factory_project, add_purchase_quotation, getAllEmployeeName, get_department, insertTask, methodPost } from '../../API_Service/API_Links';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { appendData } from '../../Variables/Variables';
import SnackBar from '../SnackBar';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Heading from '../Heading';
import Breadcrumbs from '../Breadcrumbs';
import IconBreadcrumbs from '../Breadcrumbs';

export default function PurchaseSection() {


    const options = ['Project Task', 'Non_Project Task'];

    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [vendor_name1, setVendor_name1] = useState("");
    const [vendor_name2, setVendor_name2] = useState("");
    const [vendor_name3, setVendor_name3] = useState("");
    const [vendor_gst1, setVendor_gst1] = useState('');
    const [vendor_gst2, setVendor_gst2] = useState('');
    const [vendor_gst3, setVendor_gst3] = useState('');
    const [vendor_address1, setVendor_address1] = useState('');
    const [vendor_address2, setVendor_address2] = useState('');
    const [vendor_address3, setVendor_address3] = useState('');
    const [cost1, setCost1] = useState('')
    const [cost2, setCost2] = useState('')
    const [cost3, setCost3] = useState('')
    const [lead_time1, setLead_time1] = useState('')
    const [lead_time2, setLead_time2] = useState('')
    const [lead_time3, setLead_time3] = useState('')
    const [quote_attachment1, setquote_attachment1] = useState('')
    const [quote_attachment2, setquote_attachment2] = useState('')
    const [quote_attachment3, setquote_attachment3] = useState('')
    const location = useLocation();
    const ProjectId = location.state.id;
    const ProjectName = location.state.name;
    const EmployeeId = JSON.parse(localStorage.getItem('EmployeeId'));

    const serverData = {
        ProjectId: ProjectId,
        EmployeeId: EmployeeId,
        VendorName1: vendor_name1,
        VendorGST1: vendor_gst1,
        VendorAddress1: vendor_address1,
        Cost1:cost1,
        LeadTime1: lead_time1,
        VendorName2: vendor_name2,
        VendorGST2: vendor_gst2,
        VendorAddress2: vendor_address2,
        Cost2: cost2,
        LeadTime2: lead_time2,
        VendorName3: vendor_name3,
        VendorGST3: vendor_gst3,
        VendorAddress3: vendor_address3,
        Cost3: cost3,
        LeadTime3: lead_time3,
        QuoteAttachment1: quote_attachment1,
        QuoteAttachment2:quote_attachment2,
        QuoteAttachment3:quote_attachment3
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
                url: add_purchase_quotation,
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
            })
        }

    }

    const cancelClick = () => {
        navigate(-1);
    }



    return (
        <Box>

            <Box py={2} px={1}>
                <IconBreadcrumbs
                    previous={'Home'}
                    current={'Factory Project'}
                    link1={`/home`}
                    link2={'/home/project'}
                    currentSection={'Update Quotation'}

                />
            </Box>

            <Container>
                <Box py={3}>
                    <Heading title={'Update Quotation'} />
                </Box>
            </Container>


            <Box sx={{ height: '90%' }} display="flex" alignItems="center">

                <Box py={4} sx={{ px: 5, backgroundColor: '#EDF4F4', borderRadius: '10px', mx:3 ,  my: 4, boxShadow: 11 }}>

                    <Grid container display="flex" justifyContent='center' sx={{ textAlign: 'center' }} spacing={4} >
                        <Grid item lg={12} xl={12} >

                            <Box sx={{ border: "1px solid black", px: 4, pb: 5, pt: 4, borderColor: '#d2cbcb;', borderRadius: '4px', ':hover': { boxShadow: 2 }, mt: 5 }}>
                                <Box sx={{ pb: 3, textAlign: 'left' }}>
                                    <h5>PURCHASE INFORMATION</h5>
                                    <Typography fontWeight={600} color='#616e80'>Project Name : {ProjectName}</Typography>
                                </Box>

                                <Box sx={{ pb: 3, textAlign: 'left' }}>
                                    <h5>VENDOR 1</h5>
                                </Box>

                                <Grid container justifyContent='space-evenly' spacing={2}  >
                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor_1 Name"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e)=>setVendor_name1(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor GST 1"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_gst1(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor Address 1"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_address1(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Cost 1"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setCost1(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Lead Time 1"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLead_time1(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="projectdocument"
                                            label="Quote Attachment 1"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => setquote_attachment1(e.target.files[0])}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                </Grid>

                                <Box sx={{ pb: 3, textAlign: 'left' }}>
                                    <h5>VENDOR 2</h5>
                                </Box>
                                <Grid container justifyContent='space-evenly' spacing={2}  >
                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor_2 Name"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_name2(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor GST 2"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_gst2(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor Address 2"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_address2(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Cost 2"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setCost2(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Lead Time 2"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLead_time2(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="projectdocument"
                                            label="Quote Attachment 2"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => setquote_attachment2(e.target.files[0])}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                </Grid>

                                <Box sx={{ pb: 3, textAlign: 'left' }}>
                                    <h5>VENDOR 3</h5>
                                </Box>
                                <Grid container justifyContent='space-evenly' spacing={2}  >
                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor_3 Name"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_name3(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor GST 3"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_gst3(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Vendor Address 3"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setVendor_address3(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Cost 3"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setCost3(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="ProjectName"
                                            label="Lead Time 3"
                                            variant="outlined"
                                            size='small'
                                            color='secondary'
                                            onChange={(e) => setLead_time3(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item lg={4} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                                        <TextField
                                            fullWidth
                                            id="projectdocument"
                                            label="Quote Attachment 3"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            type="file"
                                            onChange={(e) => setquote_attachment3(e.target.files[0])}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>


                                </Grid>
                            </Box>


                        </Grid >
                    </Grid>

                    {/* {buttons}  */}

                    <Grid container justifyContent='center' sx={{ textAlign: 'center', mt: 3 }}>
                        <Grid item lg={6} xl={6} xs={12} >
                            <Grid container justifyContent='space-evenly' alignItems='center'>
                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }} >
                                    <Stack spacing={2} direction="row" >
                                        <Button onClick={onSubmit} fullWidth variant="outlined"
                                            type='submit' sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': { borderColor: '#7bc54c', color: '#000000' } }}>Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                        <Button fullWidth variant="outlined" onClick={cancelClick}
                                            type='cancel' sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828', ':hover': { borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>


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
