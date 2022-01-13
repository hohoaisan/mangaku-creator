// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} target="_blank" underline="hover">
      hohoaisan
    </Typography>
    <Typography variant="subtitle2" component={Link} target="_blank" underline="hover">
      &copy; Trường Đại học Sư phạm Kỹ thuật Đà Nẵng
    </Typography>
  </Stack>
);

export default AuthFooter;
