import React from 'react';
import { ButtonBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add as AddIcon } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dashed',
    width: 180,
    height: 250
  }
}));

const ImageUploadToggle = (props) => {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.root} {...props}>
      <AddIcon />
    </ButtonBase>
  );
};

export default ImageUploadToggle;
