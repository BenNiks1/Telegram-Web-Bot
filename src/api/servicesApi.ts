import request from '@/helpers/request';
import { ParamsModel } from '@/types';

export const getDCList = (params: ParamsModel) => request({ url: '/dealers', params });

export const getServicesList = (params: ParamsModel) =>
  request({ url: '/services', params });
