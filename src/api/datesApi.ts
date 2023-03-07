import request from '@/helpers/request';
import { ParamsModel } from '@/types';

interface DateParams extends ParamsModel {
  month: string;
}

export const getDates = (params: DateParams) => request({ url: '/dates', params });
