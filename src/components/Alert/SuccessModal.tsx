import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { AppRootStateType } from '../../store/store';
import { actionsAlert } from '../../store/alert/alertActions';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SuccessModal() {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const success = useSelector<AppRootStateType, boolean>(state => state.alert.success);
  const error = useSelector<AppRootStateType, boolean>(state => state.alert.error);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    success && setOpenSuccessAlert(true);

    error && setOpenErrorAlert(true);

    setTimeout(() => {
      dispatch(actionsAlert.setSuccess(false));
      dispatch(actionsAlert.setError(false));
      setOpenSuccessAlert(false);
      setOpenErrorAlert(false);
    }, 2000);
  }, [success, error]);


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenErrorAlert(false);
  };

  return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={success ? openSuccessAlert : openErrorAlert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={success ? 'success' : 'error'} sx={{ width: '100%' }}>
            {success ? t('form.done') : t('form.error')}
          </Alert>
        </Snackbar>
      </Stack>
  );
}