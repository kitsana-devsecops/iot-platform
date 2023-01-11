import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

async function handleClick(checked,data) {

  let payload = {
    id: data.id,
    name:data.name,
    node:data.node,
    value: (checked?1:0)
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(payload)
  };

  fetch(process.env.REACT_APP_REST_URL+"/states", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function MUISwitchStyle1(props) {

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleClick(event.target.checked,props.data)
  };

  return (
    <FormControlLabel
      control={<Android12Switch onChange={handleChange} checked={props.data.status}/>}
      label={props.data.name}
    />
  );
}

function areEqual(prevProps, nextProps) {
  return prevProps === nextProps;
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

export default React.memo(MUISwitchStyle1, areEqual);
/*To use React.memo, you can wrap your functional component with it and 
pass a comparison function as an argument. The comparison function will 
be used to determine whether the component should re-render or not. If 
the comparison function returns true, the component will re-render. If it 
returns false, the component will not re-render.*/
