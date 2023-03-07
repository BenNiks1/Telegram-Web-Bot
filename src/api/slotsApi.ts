import request from '@/helpers/request';
import { ParamsModel } from '@/types';

export const getSlotsList = (params: ParamsModel) => request({ url: '/slots', params });
