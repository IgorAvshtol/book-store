import { useTranslation } from 'react-i18next';

import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';

const useStyles = makeStyles({
  warningBlock: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export function NoAccessPage() {

  const { t } = useTranslation();

  const classes = useStyles();

  return (
      <Container sx={{ paddingTop: '60px', display: 'flex', justifyContent: 'center' }} maxWidth={'xl'}>
        <Box className={classes.warningBlock}>
          <Typography gutterBottom variant="h4" component="div">
            {t('description.part12')}
          </Typography>
        </Box>
      </Container>
  );
}