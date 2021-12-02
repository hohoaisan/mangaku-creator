import { ArrowBack, Refresh } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import PropsType from 'prop-types';

const Error = ({ message, children, goBack, refresh }) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
  >
    <Box component="div" mb={2}>
      <Box mb={1}>
        <Typography sx={{ color: 'error.main' }}>{message}</Typography>
      </Box>
      {children}
    </Box>
    <Box component="div" display="flex" gap={3}>
      {goBack && (
        <Box>
          <IconButton>
            <ArrowBack />
          </IconButton>
        </Box>
      )}
      {refresh && (
        <Box>
          <IconButton onClick={refresh}>
            <Refresh />
          </IconButton>
        </Box>
      )}
    </Box>
  </Box>
);

Error.propTypes = {
  message: PropsType.string,
  children: PropsType.node,
  goBack: PropsType.bool,
  refresh: PropsType.func
};

export default Error;
