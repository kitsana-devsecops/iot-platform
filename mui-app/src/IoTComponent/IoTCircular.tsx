import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: pink[300],
    },
  },
});

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number, label : string},
) {

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="subtitle2">
        {props.label}
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        
        <CircularProgress size={115} thickness={8} variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function CircularStatic(props) {
  const [progress, setProgress] = React.useState(60);
  return <CircularProgressWithLabel value={props.value} color={props.color} label={props.label}/>;
}