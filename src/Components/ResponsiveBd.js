import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

function ResponsiveBd() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
  return matches
}

export default ResponsiveBd