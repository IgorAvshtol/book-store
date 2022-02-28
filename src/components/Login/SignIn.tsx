import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { signIn } from '../../store/auth/authThunk';
import { useTranslation } from 'react-i18next';
import { AppRootStateType } from '../../store/store';
import { actionsAuth } from '../../store/auth/authActions';

const useStyles = makeStyles({
  signInForm: {
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export function SignIn() {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const classes = useStyles();

  const error = useSelector<AppRootStateType, string>(state => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signIn({ email, password }));
  };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(actionsAuth.setErrorAC(''));
        dispatch(actionsAuth.setLoadingAC(false));
      }
    };
  }, [error, dispatch]);

  const onChangeEmailHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePasswordHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
      <Box id="modal-modal-description" className={classes.signInForm}>
        <form onSubmit={submitHandler} className={classes.signInForm}>
          <Typography variant="h6" gutterBottom component="div">
            {t('description.part9')}
          </Typography>
          {error}
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
                    variant="contained">{loading ? `${t('description.part11')}` : `${t('description.part4')}`}</Button>
          </div>
        </form>
      </Box>
  );
}