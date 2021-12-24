import React from 'react';
import { Stack, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete as DeleteIcon } from '@mui/icons-material';
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

const ChapterImageCard = ({ page, url, onRemove, ...props }) => {
  const classes = useStyles({ url });
  return (
    <div className={classes.root} {...props}>
      <div className={classes.icon}>
        <Stack spacing={2} direction="row">
          <Chip label={`Page ${page}`} size="small" onDelete={onRemove} color="info" deleteIcon={<DeleteIcon />} />
        </Stack>
      </div>
    </div>
  );
};

ChapterImageCard.propTypes = {
  page: PropsType.number,
  url: PropsType.string,
  onRemove: PropsType.func
};

export default ChapterImageCard;
