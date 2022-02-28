import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { SignUp } from '../Login/SignUp';
import { AppRootStateType } from '../../store/store';
import { SignIn } from '../Login/SignIn';
import { NavigateMenu } from './NavigateMenu';


const useStyles = makeStyles({
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#365e36',
    borderRadius: '25px',
    padding: '20px',
    outline: ' none'
  },
  authButtons: {
    width: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  authButtonsResp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    cursor: 'pointer',
  },
  lang: {
    width: '30px',
    height: '20px',
    background: 'red',
    color: '#ffffff'
  }
});

export function ModalComponent() {

  const { t } = useTranslation();

  const smallQuery = useMediaQuery('(max-width:550px)');

  const classes = useStyles();

  const authenticated = useSelector<AppRootStateType, boolean>(state => state.auth.authenticated);

  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleSignInButton = () => {
    setOpen(true);
    setSignIn(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSignIn(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [authenticated]);

  return (
      <div>
        <Box>
          {
            authenticated
                ? <NavigateMenu/>
                : <Box className={smallQuery ? classes.authButtonsResp : classes.authButtons}>
                  <Typography onClick={handleOpen} variant={smallQuery ? 'body2' : 'h6'} component="div">
                    {`${t('description.part3')}`}
                  </Typography>
                  <Typography onClick={handleSignInButton} variant={smallQuery ? 'body2' : 'h6'} component="div">
                    {`${t('description.part4')}`}
                  </Typography>
                </Box>
          }
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box className={classes.modal}>
            {signIn ? <SignIn/> : <SignUp/>}
          </Box>
        </Modal>
      </div>
  );
}