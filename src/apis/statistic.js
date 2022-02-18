/* eslint-disable import/prefer-default-export */
import axios from './_axios/axios';
import * as StatisticAPI from './_endpoints/statistic';

export const getStatisticOverall = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: StatisticAPI.STATISTIC_OVERALL
    })
    .then((res) => res.data);
  return result;
};
