import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { signup } from '../../store/auth/authThunk';
import { AppRootStateType } from '../../store/store';
import { actionsAuth } from '../../store/auth/authActions';

const useStyles = makeStyles({
  signUpForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
});

export function SignUp() {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector<AppRootStateType, string>(state => state.auth.error);

  const loading = useSelector((state: AppRootStateType) => state.auth.loading);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(actionsAuth.setLoadingAC(true));
    dispatch(signup({ email, password, firstName }));
  };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(actionsAuth.setErrorAC(''));
        dispatch(actionsAuth.setLoadingAC(false));
      }
    };
  }, [error, dispatch]);

  const onChangeFirstNameHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };
  const onChangeEmailHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePasswordHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
      <Box id="modal-modal-description">
        <form onSubmit={submitHandler} className={classes.signUpForm}>
          <Typography variant="h6" gutterBottom component="div">
            {t('description.part5')}
          </Typography>
          {error}
          <TextField
              name="firstName"
              label={t('description.part6')}
              value={firstName}
              onChange={onChangeFirstNameHandler}
              variant="filled"
          />
          <TextField
              style={{ marginTop: 10 }}
              name="email"
              label={t('description.part7')}
              value={email}
              onChange={onChangeEmailHandler}
              variant="filled"
          />
          <TextField
              style={{ marginTop: 10 }}
              name="password"
              label={t('description.part8')}
              value={password}
              onChange={onChangePasswordHandler}
              variant="filled"
          />
          <div style={{ paddingTop: 15 }}>
            <Button sx={{ background: '#52a952' }} type="submit"
                    variant="contained">{loading ? `${t('description.part11')}` : `${t('description.part3')}`}</Button>
          </div>
        </form>
      </Box>
  );
}