import request from '@/helpers/request';

export const getDates = (params) => request({ url: '/dates', params });
