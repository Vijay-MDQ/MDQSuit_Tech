import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { factorydepartment, get_project_manager, methodGet } from "../../API_Service/API_Links";
import axios from "axios";

export default function TeamChipInput({ setTeamMember , teamMember}) {

    const [options, setOptions] = useState([]);
    const [auth, setAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState();
    const [color, setColor] = useState();
    const [input, setInput] = useState(false);

    useEffect(() => {
        axios({
            method: methodGet,
            url: get_project_manager,
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
                console.log("chip1", err);
            });
    }, []);



    return (
        <Box>
            <Autocomplete
                id="tags-filled"
                key={input}
                onChange={(event, value) => {
                    setTeamMember(value.DepartmentId)
                }}
                options={[options]}
                getOptionLabel={(option)=>option.Department}
                value={teamMember}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        label="Dept Selection"
                        placeholder="Favorites"
                        fullWidth
                    />
                )}
            />

        </Box>
    );
}