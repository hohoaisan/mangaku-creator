import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Stack, Typography, useMediaQuery, Button } from '@mui/material';

// project imports
import AuthWrapper1 from './wrappers/AuthWrapper1';
import AuthCardWrapper from './wrappers/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthRegister from './auth-forms/AuthRegister';
import AuthFooter from 'ui-component/cards/AuthFooter';

import { statusEnum } from 'constants/approvalStatus';

import { useQuery } from 'react-query';
import { getAuthorProfile } from 'apis/profile';
import AuthService from 'services/auth.service';

import strings from 'constants/strings';

const {
  buttons,
  pages: { auth: authStrings }
} = strings;

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const profileAuthor = useQuery('PROFILE_AUTHOR', getAuthorProfile);
  const handleLogout = async () => {
    await AuthService.logout();
  };
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            {authStrings.becomeAuthor}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  {(() => {
                    if (profileAuthor.data?.approval_status === statusEnum.PENDING) {
                      return <Typography textAlign="center">{authStrings.pendingAuthor}</Typography>;
                    }
                    if (profileAuthor.data?.approval_status === statusEnum.APPROVED) {
                      return (
                        <div>
                          <div>
                            <Typography textAlign="center">{authStrings.acceptedAuthor}</Typography>
                          </div>
                        </div>
                      );
                    }
                    if (profileAuthor.data?.approval_status === statusEnum.REJECTED) {
                      return <Typography textAlign="center">{authStrings.rejectedAuthor}</Typography>;
                    }
                    return (
                      <Grid item xs={12}>
                        <AuthRegister />
                      </Grid>
                    );
                  })()}

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Button onClick={handleLogout} fullWidth>
                        {buttons.signout}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
