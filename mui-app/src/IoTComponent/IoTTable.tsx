import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
  
  const [data, setData] = useState("")
  React.useEffect(() => {
  })
  if(props.data !== ''){
    return (
      <TableContainer component={Paper} sx={{ height: 350 }}>
        <Table  stickyHeader  sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>SensorName</TableCell>
              <TableCell align="right">SensorID</TableCell>
              <TableCell align="right">NodeID</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">DateTime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.date_time}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.sensor_name}
                </TableCell>
                <TableCell align="right">{row.sensor_id}</TableCell>
                <TableCell align="right">{row.node_id}</TableCell>
                <TableCell align="right">{row.sensor_value}</TableCell>
                <TableCell align="right">{row.date_time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}