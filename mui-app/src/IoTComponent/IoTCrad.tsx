
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Edit, LocationOn } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import grey from '@mui/material/colors/grey';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export default function BasicCrad(props) {
  if(props.data!==undefined){
    return (
      <Card sx={{}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <ListItem>
          <ListItemAvatar>
            <img src="https://mui.com/static/branding/product-core-light.svg" alt="" loading="lazy" width="36" height="36"/>
          </ListItemAvatar>
          <ListItemText primary={
            <Typography variant="h5">{props.data.sensor_value}</Typography>
          } secondary={props.data.sensor_name} />
        </ListItem>
          </CardContent>
      </Card>
    )
  }
}