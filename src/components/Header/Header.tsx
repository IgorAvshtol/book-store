import { useState } from 'react';
import i18n from 'i18next';
import { NavLink } from 'react-router-dom';

import { AppBar, Box, MenuItem, Select, SelectChangeEvent, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';

import { Switcher } from './Switcher';
import { ModalComponent } from './ModalComponent';


const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerLinks: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  lang: {
    width: '30px',
    height: '20px',
  }
});

export function Header() {

  const classes = useStyles();

  const currentLang = localStorage.getItem('i18nextLng');

  const [lang, setLang] = useState(currentLang!);

  const handleChange = (e: SelectChangeEvent) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#52a952' }}>
          <Toolbar className={classes.toolbar}>
            <Box className={classes.headerLinks}>
              <Select value={lang} onChange={handleChange} sx={{ width: '150px' }}>
                <MenuItem value={'ru'}>Русский</MenuItem>
                <MenuItem value={'eng'}>English</MenuItem>
              </Select>
              <Switcher/>
              <NavLink to="/">
                <HomeIcon sx={{ color: 'white' }} fontSize={'large'}/>
              </NavLink>
            </Box>
            <Box>
              <ModalComponent/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
  );
}