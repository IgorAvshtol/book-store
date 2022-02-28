import { Box, Button, Container, Grid, TextField, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IComment } from '../../store/collections/collectionsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import { setCommentThunk } from '../../store/collections/collectionsThunk';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { AppRootStateType } from '../../store/store';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
  commentsBlock: {
    padding: '15px 20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  senderInformation: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  senderInformationResponse: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  textBlock: {
    width: '100%',
    height: '400px',
    border: '1px solid grey',
    overflowY: 'auto'
  },
  commentDate: {
    maxWidth: '400px',
    display: 'flex',
    justifyContent: 'space-between',
  }
});

interface ICommentsPage {
  comments?: IComment[];
  id: string
}

export function CommentsPage({ comments, id }: ICommentsPage) {

  const { t } = useTranslation();

  const smallQuery = useMediaQuery('(max-width:550px)');

  const authenticated = useSelector((state: AppRootStateType) => state.auth.authenticated);

  const classes = useStyles();

  const [commentText, setCommentText] = useState('');

  const dispatch = useDispatch();

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentText(e.currentTarget.value);
  };

  const navigate = useNavigate();

  const onClickButtonHandler = () => {
    if (authenticated) {
      dispatch(setCommentThunk(id, commentText));
      setCommentText('');
    } else {
      navigate('/signin');
    }
  };

  return (
      <Container>
        <Grid container justifyContent={'center'} sx={{ height: '600px', marginTop: 5 }}>
          <div className={classes.textBlock}>
            {
                comments && comments.map(text => {
                  return (
                      <div key={text.bookId}>
                        <Box className={classes.commentsBlock}>
                          <Box className={smallQuery ? classes.senderInformationResponse : classes.senderInformation}>
                            <Typography variant="caption" gutterBottom className={classes.commentDate}>
                              {text.author}
                            </Typography>
                            <Typography variant="caption" gutterBottom className={classes.commentDate}>
                              {text.date}
                            </Typography>
                          </Box>
                          <Typography gutterBottom component="div">
                            {text.text}
                          </Typography>
                        </Box>
                      </div>
                  );
                })
            }
          </div>
          <Grid container direction={'column'} alignItems={'flex-end'}>
            <TextField placeholder={t('comments.placeholder')} onChange={onInputChangeHandler} value={commentText} fullWidth
                       maxRows={2} variant={'outlined'}/>
            <Button onClick={onClickButtonHandler}>{t('comments.button')}</Button>
          </Grid>
        </Grid>
      </Container>
  );
}