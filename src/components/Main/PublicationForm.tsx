import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { Formik, Form, FormikHelpers } from 'formik';

import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { SuccessModal } from '../Alert/SuccessModal';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

import { editPublication } from '../../store/collections/collectionsThunk';
import { AppRootStateType } from '../../store/store';
import { IconContentForm } from './Item/IconContentForm';
import { ICurrentUserPublications, IUpdateData } from '../../store/collections/collectionsTypes';

const useStyles = makeStyles({
  container: {
    paddingTop: '60px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  containerResponse: {
    paddingTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainImage: {
    maxWidth: '300px',
  },
  descriptionsBlock: {
    paddingTop: '20px',
    width: '60%',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  iconsBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '20px',
    textAlign: 'center'
  }
});

interface IPublication {
  publication: ICurrentUserPublications;
}

export const PublicationForm = ({ publication }: IPublication) => {

  const { t } = useTranslation();

  const classes = useStyles();
  const smallQuery = useMediaQuery('(max-width:777px)');

  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const sections = useSelector<AppRootStateType, string[]>(state => state.collection.sections);

  const validationSchema = yup.object().shape({
    author: yup.string().required(t('validation.field')),
    title: yup.string().required(t('validation.field')),
    description: yup.string().required(t('validation.field')),
    pages: yup.number().typeError(t('validation.pages_field')).required(t('validation.field')),
  });

  const onEditOnButtonClick = (id: string) => {
    setEditMode(true)
  };

  const onEditOffButtonClick = (id: string) => {
    setEditMode(false)
  };

  return (
      <div>
        <Formik
            initialValues={{
              author: publication.authors,
              title: publication.title,
              description: publication.description,
              pages: publication.pages,
              section: publication.section
            }}
            validationSchema={validationSchema}
            onSubmit={(
                values: IUpdateData,
                { setSubmitting }: FormikHelpers<IUpdateData>
            ) => {
              dispatch(editPublication(publication.id, values));
            }}
        >
          {({
              values, errors, touched, handleChange,
              handleBlur
            }) => (
              <Form>
                <Box className={smallQuery ? classes.containerResponse : classes.container}>
                  <img src={publication.imageURL} className={classes.mainImage} alt="book-cover"/>
                  <Box className={classes.descriptionsBlock}>
                    <Box className={classes.iconsBlock}>
                      <IconContentForm
                          book={publication}
                          edit={editMode}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                          touched={touched}
                          errors={errors}
                          sections={sections}
                      />
                    </Box>
                    {
                      editMode
                          ? <div>
                            <TextField
                                style={{ marginTop: 20, textAlign: 'center'}}
                                name="title"
                                label={t('form.name')}
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            {touched.title && errors.title && <p>{errors.title}</p>}
                          </div>
                          : <Typography sx={{paddingTop: '20px', textAlign: 'center'}} variant={'h6'} gutterBottom component="div">
                            {publication.title}
                          </Typography>
                    }
                    <Box className={classes.description}>
                      {
                        editMode
                            ? <div>
                              <TextField
                                  style={{ marginTop: 10 }}
                                  name="description"
                                  label={t('form.description')}
                                  multiline
                                  fullWidth
                                  rows={8}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                              />
                              {touched.description && errors.description && <p>{errors.description}</p>}
                            </div>
                            : <Typography gutterBottom sx={{textAlign: 'center'}} component="div">
                              {publication.description}
                            </Typography>
                      }
                      <div>
                        {
                          editMode
                              ? <EditOffIcon sx={{ paddingTop: '10px' }} fontSize={'large'}
                                             onClick={() => onEditOffButtonClick(publication.id)}/>
                              : <EditIcon sx={{ paddingTop: '10px' }} fontSize={'large'}
                                          onClick={() => onEditOnButtonClick(publication.id)}/>
                        }
                      </div>
                      <div style={{ marginTop: 10 }}>
                        {
                          editMode
                              ? <Button type={'submit'} variant="contained">
                                {t('publications.apply_changes')}
                              </Button>
                              : null
                        }
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Form>
          )
          }
        </Formik>
        <SuccessModal/>
      </div>
  );
};