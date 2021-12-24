import React from 'react';
import { IconButton, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Delete as DeleteIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';

import PropsType from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: ({ url }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'solid',
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: 180,
    height: 250
  }),
  icon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRoot: {
    backgroundColor: '#FFFFFF'
  }
}));

const CoverImageCard = ({ url, onRemove, checked, onCheck, ...props }) => {
  const classes = useStyles({ url });
  return (
    <div className={classes.root} {...props}>
      <div className={classes.icon}>
        <Stack spacing={2}>
          {checked ? (
            <IconButton color="success" classes={{ root: classes.buttonRoot }}>
              <CheckCircleOutlineIcon />
            </IconButton>
          ) : (
            <IconButton classes={{ root: classes.buttonRoot }} onClick={onCheck}>
              <RadioButtonUncheckedIcon />
            </IconButton>
          )}
          <IconButton onClick={onRemove} color="error" classes={{ root: classes.buttonRoot }}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};

CoverImageCard.propTypes = {
  url: PropsType.string,
  onRemove: PropsType.func,
  checked: PropsType.bool,
  onCheck: PropsType.func
};

export default CoverImageCard;
