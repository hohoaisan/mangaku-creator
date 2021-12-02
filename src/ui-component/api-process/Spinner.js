import { Box, CircularProgress } from '@mui/material';

const Spinner = () => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <CircularProgress />
  </Box>
);

export default Spinner;
