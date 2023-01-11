import * as React from 'react';
import {useState,useRef} from "react";
import { styled } from '@mui/material/styles';

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
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";

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
        Kitsana.DevSecOps
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Dashboard() {

  //Declare a new state variable
  const [node, setNode] = useState(1);
  
  const [sensors, setSensors] = useState("")
  const previousSensors = useRef("");

  const [states , setStates] = useState("")
  const previousStates = useRef("");

  //Declare a new state variable for store sensors data 
  const [ultrasonic1, setUltrasonic1] = useState("")
  const [ultrasonic2, setUltrasonic2] = useState("")
  const [sensor1, setSensor1] = useState(40)
  const [sensor2, setSensor2] = useState(75)
  const [sensor3, setSensor3] = useState(100)

  //Declare a new state variable for store UI states 
  const [uisw1, setUisw1] = useState(null)
  const [uisw2, setUisw2] = useState(null)
  const [uisw3, setUisw3] = useState(null)
  const [uisw4, setUisw4] = useState(null)
  
  React.useEffect(() => {
    
    async function FetchSensorsData () {

      try {

        const sensors_resp = await fetch(process.env.REACT_APP_REST_URL+'/sensors', {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        })

        const sensors_json = await sensors_resp.json();

        //ตรวจสอบการ update ข้อมูล sensors จากบอร์ด ESP8266, ถ้ามีการ update ให้ทำงานตามที่กำหนด
        if (JSON.stringify(previousSensors.current) !== JSON.stringify(sensors_json) && sensors_json.length > 0) {

          setSensors(sensors_json)
          setUltrasonic1(sensors_json.find(element => element.sensor_id == 'u1' && element.node_id == node))
          setUltrasonic2(sensors_json.find(element => element.sensor_id == 'u2' && element.node_id == node))

          previousSensors.current = sensors_json;

        }

      } catch (error) {}

    }

    async function FetchUIStatesData () {

      try {

        const states_resp = await fetch(process.env.REACT_APP_REST_URL+'/states', {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        })
        const states_json = await states_resp.json();

        //ตรวจสอบการ update ข้อมูล UI states, ถ้ามีการ update ให้ทำงานตามที่กำหนด
        if (JSON.stringify(previousStates.current) !== JSON.stringify(states_json) && states_json.length > 0) {

          const uisw1 = states_json.find(element => element.cid == 'iotsw1' && element.nodeid == node)
          const uisw2 = states_json.find(element => element.cid == 'iotsw2' && element.nodeid == node)
          const uisw3 = states_json.find(element => element.cid == 'iotsw3' && element.nodeid == node)
          const uisw4 = states_json.find(element => element.cid == 'iotsw4' && element.nodeid == node)
          
          // console.log('debug sw1: ',uisw1)
          // console.log('debug sw2: ',uisw2)
          // console.log('debug sw3: ',uisw3)
          // console.log('debug sw4: ',uisw4)

          setStates(states_json)
          if(uisw1!==undefined) setUisw1(uisw1.cvalue)
          if(uisw2!==undefined) setUisw2(uisw2.cvalue)
          if(uisw3!==undefined) setUisw3(uisw3.cvalue)
          if(uisw4!==undefined) setUisw4(uisw4.cvalue)
          
          previousStates.current =  states_json;

        }
        
      } catch (error) {}

    }

    //fetch data before render
    FetchUIStatesData()
    FetchSensorsData()

    const timer = setInterval(() => {

      FetchSensorsData()
      FetchUIStatesData()

    }, 200); //interval every 200ms

    return () => {
      clearInterval(timer);
    };

  }, [node]);

  //console.log('re-render')

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
              {/** MUI Card สำหรับแสดงข้อมูล Ultrasonic sensor 1 */}
              <IoTCrad data={ultrasonic1}/>
            </Grid>
            <Grid xs={6} md={4}>
              {/** MUI Card สำหรับแสดงข้อมูล Ultrasonic sensor 2 */}
              <IoTCrad data={ultrasonic2}/>
            </Grid>
            <Grid direction="column" xs={6} md={2}>
              <Stack spacing={0.5}>
                <Item> 
                  {/** MUI Switch 1 สำหรับสั่งงานอุปกรณ์ที่เชื่อมต่อกับบอร์ด ESP8266 */}
                  <IoTSwitch1 data={{
                    id:"iotsw1",
                    name:"IoTSwitch1",
                    node: node,
                    status: (uisw1=='1'?true:false)
                  }}
                /> 
                </Item>
                <Item> 
                  {/** MUI Switch 2 สำหรับสั่งงานอุปกรณ์ที่เชื่อมต่อกับบอร์ด ESP8266 */}
                  <IoTSwitch2 data={{
                    id:"iotsw2",
                    name:"IoTSwitch2",
                    node: node,
                    status: (uisw2=='1'?true:false)
                  }}/>
                </Item>
              </Stack>
            </Grid>
            <Grid direction="column" xs={6} md={2}>
              <Stack spacing={0.5}>
                <Item> 
                  {/** MUI Switch 3 สำหรับสั่งงานอุปกรณ์ที่เชื่อมต่อกับบอร์ด ESP8266 */}
                  <IoTSwitch1 data={{
                    id:"iotsw3",
                    name:"IoTSwitch3",
                    node: node,
                    status: (uisw3=='1'?true:false)
                  }}/>
                </Item>
                <Item> 
                  {/** MUI Switch 4 สำหรับสั่งงานอุปกรณ์ที่เชื่อมต่อกับบอร์ด ESP8266 */}
                  <IoTSwitch2 data={{
                    id:"iotsw4",
                    name:"IoTSwitch4",
                    node: node,
                    status: (uisw4=='1'?true:false)
                  }}/>
                </Item>
              </Stack>
            </Grid>
            <Grid xs={12} md={8}>
              {/** MUI Table สำหรับแสดงข้อมูลที่รับมาจากบอร์ด ESP8266 */}
              <IoTTable data={sensors}/>
            </Grid>
            <Grid xs={12} md={4}>
              <Grid container>
                <Grid xs={6} md={6}>
                  <Item>
                    {/** MUI Progress สำหรับแสดงข้อมูล Sensor */}
                    <IoTCircular color='secondary' label='Water in tank 1' value={sensor1}/>
                  </Item>
                </Grid>
                <Grid xs={6} md={6}>
                  <Item>
                    {/** MUI Progress สำหรับแสดงข้อมูล Sensor */}
                    <IoTCircular label='Water in tank 2' value={sensor2} />
                  </Item>
                </Grid>
                <Grid xs={12} md={12}>
                  <Item>
                    {/** MUI List สำหรับแสดงรายการบอร์ด ESP8266 */}
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