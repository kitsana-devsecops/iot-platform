import React, {useEffect, useState,useRef} from "react";
import { styled , alpha} from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//Import IoT Component
//@ts-ignore
import IoTSwitch1  from "./IoTComponent/IoTSwitch1.tsx"
//@ts-ignore
import IoTSwitch2 from "./IoTComponent/IoTSwitch2.tsx"
//@ts-ignore
import IoTCrad from "./IoTComponent/IoTCrad.tsx"
//@ts-ignore
import IoTTable from "./IoTComponent/IoTTable.tsx"
//@ts-ignore
import IoTCircular from "./IoTComponent/IoTCircular.tsx"
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Kitsana.DevSecOps & LoveCoding Blogger
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Dashboard() {

  //Declare a new state variable
  const [node, setNode] = useState(1);
  const [data, setData] = useState("")
  const [ultrasonic1, setUltrasonic1] = useState("")
  const [ultrasonic2, setUltrasonic2] = useState("")
  const [sensor1, setSensor1] = useState(40)
  const [sensor2, setSensor2] = useState(75)
  const [sensor3, setSensor3] = useState(100)
  
  React.useEffect(() => {
    
    async function FetchRestAPIs () {

      try {

        const url = 'http://localhost:8080/sensors'
        const response = await fetch(url);
        const json = await response.json();

        const payload = json.filter(element => element.node_id == node)
        //console.log(payload)

        setUltrasonic1(json.find(element => element.sensor_id == 'u1' && element.node_id == node))
        setUltrasonic2(json.find(element => element.sensor_id == 'u2' && element.node_id == node))

        setData(payload)
        
      } catch (error) {}

    }

    FetchRestAPIs()

    const timer = setInterval(() => {
      FetchRestAPIs()
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [node]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F3F6F9'
      }}
    >
      <AppBar position="relative">
        <Toolbar>
          <CloudQueueIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            IoT Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />

      <Container component="main" sx={{ mt: 4, mb: 2 }}>
        <Box sx={{ flexGrow: 1}}>
          <Grid container spacing={1}>
            <Grid xs={6} md={4}  sx={{maxHeight:'100vh'}}>
              <IoTCrad data={ultrasonic1}/>
            </Grid>
            <Grid xs={6} md={4}>
              <IoTCrad data={ultrasonic2}/>
            </Grid>
            <Grid direction="column" xs={6} md={2}>
              <Stack spacing={0.5}>
                <Item> 
                  <IoTSwitch1 data={{
                    id:"iotsw1",
                    name:"IoTSwitch1"
                  }}
                /> 
                </Item>
                <Item> 
                  <IoTSwitch2 data={{
                    id:"iotsw2",
                    name:"IoTSwitch2"
                  }}/>
                </Item>
              </Stack>
            </Grid>
            <Grid direction="column" xs={6} md={2}>
              <Stack spacing={0.5}>
                <Item> 
                  <IoTSwitch1 data={{
                    id:"iotsw3",
                    name:"IoTSwitch3"
                  }}/> 
                </Item>
                <Item> 
                  <IoTSwitch2 data={{
                    id:"iotsw4",
                    name:"IoTSwitch4"
                  }}/>
                </Item>
              </Stack>
            </Grid>
            <Grid xs={12} md={8}>
              <IoTTable data={data}/>
            </Grid>
            <Grid xs={12} md={4}>
              <Grid container>
                <Grid xs={6} md={6}>
                  <Item>
                    <IoTCircular color='secondary' label='Water in tank 1' value={sensor1}/>
                  </Item>
                </Grid>
                <Grid xs={6} md={6}>
                  <Item>
                    <IoTCircular label='Water in tank 2' value={sensor2} />
                  </Item>
                </Grid>
                <Grid xs={12} md={12}>
                  <Item>
                    <List
                      sx={{ width: '100%', maxWidth: 'auto', bgcolor: 'background.paper'}}
                      aria-label="contacts"
                      subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                          Node ID {node}
                        </ListSubheader>
                      }
                    >
                      <Divider light />
                      <ListItem onClick={() => setNode(1)} disablePadding>
                        <ListItemButton >
                          <ListItemIcon>
                          <img src="https://mui.com/static/branding/product-core-light.svg" alt="" loading="lazy" width="36" height="36"/>
                          </ListItemIcon>
                          <ListItemText primary="Node 1" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem onClick={() => setNode(2)} disablePadding>
                        <ListItemButton >
                          <ListItemIcon>
                          <img src="https://mui.com/static/branding/product-templates-light.svg" alt="" loading="lazy" width="36" height="36"/>
                          </ListItemIcon>
                          <ListItemText  primary="Node 2" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>       
      </Container>
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 1,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}