import request from '@/helpers/request';
import { ParamsModel } from '@/types';

interface ServicesParams extends ParamsModel {
	city: string;
}

export const getDCList = (params: ParamsModel) => request({ url: '/dealers', params });

export const getServicesList = (params: ServicesParams) =>
	request({ url: '/services', params });
