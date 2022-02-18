import React from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import CommentCountCard from './CommentCountCard';
import ViewCountCard from './ViewCountCard';
import OverallViewChart from './OverallViewChart';
import { gridSpacing } from 'store/constant';
import { useQuery } from 'react-query';
import { STATISTIC_OVERALL } from 'query/queryKeys';
import { getStatisticOverall } from 'apis/statistic';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import Error from 'ui-component/api-process/Error';
import Spinner from 'ui-component/api-process/Spinner';

const Dashboard = () => {
  const { isLoading, data, isFetched, isError, error, refetch } = useQuery(STATISTIC_OVERALL, getStatisticOverall);
  if (isFetched && isError) {
    const message = getAPIErrorMessage(error);
    return <Error refresh={refetch} message={message} />;
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} xs={12}>
            <ViewCountCard isLoading={isLoading} value={data?.total?.viewCount} />
          </Grid>
          <Grid item lg={6} xs={12}>
            <CommentCountCard isLoading={isLoading} value={data?.total?.commentCount} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <OverallViewChart isLoading={isLoading} value={data?.dates} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
