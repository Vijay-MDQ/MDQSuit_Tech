import React, { useEffect, useState } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { get_factory_employees, methodPost } from "../../API_Service/API_Links";

export default function ProjectManagerChip({
    input,
    setStaffMember,
    RoleId,
    staffMember
}) {
    const [options, setOptions] = useState([]);
    const [auth, setAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState();
    const [color, setColor] = useState();

    useEffect(() => {
        if (RoleId !== null) {
            const sendData = new FormData();
            sendData.append("DepartmentId", RoleId);

            axios({
                method: methodPost,
                url: get_factory_employees,
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
                        setOptions(res.data.data);
                        setOpen(true);
                        setStatus(true);
                        setColor(true);
                    }
                })
                .catch((err) => {
                    alert("Oops something went wrong " + err);
                    console.log("chip2", err);
                });
        }
        else {
            setOptions([]);
        }
    }, [RoleId]);


    return (
        <Box>
            <Autocomplete
                multiple
                id="tags-filled"
                key={input}
                value={staffMember}
                onChange={(event, value) => {
                    if (value && value.length > 0 && value[0].EmployeeId) {
                        setStaffMember(value[0].EmployeeId)
                    }
                }}
                options={options}
                getOptionLabel={(option) => `${option.EmployeeName} (${option.EmployeeId})`}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        label="Staff Selection"
                        placeholder="Favorites"
                        fullWidth
                    />
                )}
            />
        </Box>
    );
}
