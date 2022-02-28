import { useContext } from 'react';

import { Switch } from '@mui/material';

import { ColorModeContext } from '../../App';


export function Switcher() {

  const colorMode = useContext(ColorModeContext);

  return (
      <Switch  onClick={colorMode.toggleColorMode}/>
  );
}