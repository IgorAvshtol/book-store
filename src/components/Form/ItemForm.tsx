import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, FormikHelpers } from 'formik';

import { Box, Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { setCollection } from '../../store/collections/collectionsThunk';
import { AppRootStateType } from '../../store/store';
import { SuccessModal } from '../Alert/SuccessModal';
import { DragDropBlock } from './DragDropBlock';


const useStyles = makeStyles({
  formBlock: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    padding: '30px',
    backgroundColor: '#365e36',
    borderRadius: 10,
    textAlign: 'center'
  }
});

interface Values {
  author: string;
  title: string;
  description: string;
  file: any;
  pages: string;
  section: string;
}

export const ItemForm = () => {

  const { t } = useTranslation();

  const classes = useStyles();

  const dispatch = useDispatch();

  const sections = useSelector<AppRootStateType, string[]>(state => state.collection.sections);

  const validationSchema = yup.object().shape({
    author: yup.string().required(t('validation.field')),
    description: yup.string().required(t('validation.field')),
    pages: yup.number().typeError(t('validation.pages_field')).required(t('validation.field')),
  });

  return (
      <div style={{paddingTop:'20px'}}>
        <Formik
            initialValues={{
              author: '',
              title: '',
              description: '',
              file: '',
              pages: '',
              section: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
            ) => {
              dispatch(setCollection(values));
            }}
        >
          {({
              values, errors, touched, handleChange,
              handleBlur, setFieldValue
            }) => (
              <Form>
                <Container fixed className={classes.formBlock}>
                  <Box className={classes.form}>
                    <Typography variant="h5" component="div">
                      {`${t('form.title')}`}
                    </Typography>
                    <div>
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
                    <div>
                      <TextField
                          style={{ marginTop: 10 }}
                          name="title"
                          label={t('form.name')}
                          variant="filled"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                      />
                      {touched.title && errors.title && <p>{errors.title}</p>}
                    </div>
                    <div>
                      <TextField
                          style={{ marginTop: 10 }}
                          name="description"
                          label={t('form.description')}
                          multiline
                          rows={4}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                      />
                      {touched.description && errors.description && <p>{errors.description}</p>}
                    </div>
                    <div style={{marginTop: '10px', display: 'flex', justifyContent:'center'}}>
                      <DragDropBlock setFieldValue={setFieldValue}/>
                    </div>
                    <div>
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
                    <Select style={{ marginTop: 10 }} name="section" value={values.section}
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
                    <div style={{ marginTop: 10 }}>
                      <Button type={'submit'} variant="contained">
                        {t('select.add_book')}
                      </Button>
                    </div>
                  </Box>
                </Container>
              </Form>
          )
          }
        </Formik>
        <SuccessModal/>
      </div>
  );
};