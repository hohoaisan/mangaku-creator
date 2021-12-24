import React from 'react';
import { Stack } from '@mui/material';
import { Star } from '@mui/icons-material';
import PropsType from 'prop-types';

const Rating = ({ rating }) => {
  const rounded = Math.round(rating);
  return (
    <Stack direction="row">
      <Star color={rounded >= 1 ? 'warning' : 'default'} />
      <Star color={rounded >= 2 ? 'warning' : 'default'} />
      <Star color={rounded >= 3 ? 'warning' : 'default'} />
      <Star color={rounded >= 4 ? 'warning' : 'default'} />
      <Star color={rounded >= 5 ? 'warning' : 'default'} />
    </Stack>
  );
};

Rating.propTypes = {
  rating: PropsType.number
};

export default Rating;
