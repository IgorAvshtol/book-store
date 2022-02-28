import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  ddBlock: {
    width: '230px',
    height: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed',
  }
});

export function DragDropBlock({ setFieldValue }: any) {

  const { t } = useTranslation();

  const classes = useStyles();

  const [drag, setDrag] = useState(false);
  const [uploadFile, setUploadFile] = useState('');

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileName = e.dataTransfer.files[0].name;
    setFieldValue('file', file);
    setUploadFile(fileName);
  };

  return (
      <Box className={classes.ddBlock}>
        {
          uploadFile
              ? <div>{uploadFile}</div>
              : <div>{drag ? t('form.drop') : t('form.drag')}</div>
        }
        {
          drag
              ? <TextField
                  style={{ opacity: 0 }}
                  name="image"
                  variant="standard"
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                  onDrop={(e) => onDropHandler(e)}
                  value={undefined}
              />
              : <TextField
                  style={{ opacity: 0 }}
                  variant="standard"
                  name="image"
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragOver={(e) => dragStartHandler(e)}
                  value={undefined}
              />
        }
      </Box>
  );
}