import { useTranslation } from 'react-i18next';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Typography from '@mui/material/Typography';
import { Box, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import { ICurrentUserPublications, IUpdateData } from '../../../store/collections/collectionsTypes';


const useStyles = makeStyles({
  iconsBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  iconsBlockResponse: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

type IconContentType = {
  book: ICurrentUserPublications
  edit: boolean
  handleChange: any
  handleBlur: any
  values: IUpdateData
  touched: any
  errors: any
  sections: string[]
}

export function IconContentForm({
                              book,
                              edit,
                              handleBlur,
                              handleChange,
                              touched,
                              values,
                              errors,
                              sections
                            }: IconContentType) {

  const smallQuery = useMediaQuery('(max-width:1045px)');

  const classes = useStyles();

  const { t } = useTranslation();

  return (
      <Box className={smallQuery ? classes.iconsBlockResponse : classes.iconsBlock}>
        <Box className={classes.iconBlock}>
          <CoPresentIcon fontSize={'large'}/>
          <Typography gutterBottom component="div">
            {edit
                ? <div>
                  <TextField
                      style={{ marginTop: 10 }}
                      name="author"
                      label={t('form.authors')}
                      variant="filled"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.author}
                  />
                  {touched.author && errors.author && <p>{errors.author}</p>}
                </div>
                : book.authors
            }
          </Typography>
        </Box>
        <Box className={classes.iconBlock}>
          <AutoStoriesIcon fontSize={'large'}/>
          {edit
              ? <div>
                <TextField
                    style={{ marginTop: 10 }}
                    name="pages"
                    label={t('form.pages')}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pages}
                />
                {touched.pages && errors.pages && <p>{errors.pages}</p>}
              </div>
              : <Typography gutterBottom component="div">
                {book.pages}
              </Typography>
          }
        </Box>
        <Box className={classes.iconBlock}>
          <ContentPasteSearchIcon fontSize={'large'}/>
          {
            edit
                ? <Select style={{ marginTop: 10 }} name="section" value={values.section}
                          onChange={handleChange}
                >
                  {
                    sections.map(select => {
                      return (
                          <MenuItem value={select}>{select}</MenuItem>
                      );
                    })
                  }
                </Select>
                : <Typography gutterBottom component="div">
                  {book.section}
                </Typography>
          }
        </Box>
      </Box>
  );
}