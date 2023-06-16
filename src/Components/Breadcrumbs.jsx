import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { startUrl } from "../Routes";
import { Link } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
}

export default function IconBreadcrumbs(props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
         className='breadLink'
          color="inherit"
          to={props.link1}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {props.previous}
        </Link>
        <Link
          className='breadLink'
          color="inherit"
          to={props.link2}
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {props.current}
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {props.currentSection}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}