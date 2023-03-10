import request from '@/helpers/request';
import { OrderData } from '@/types';

export const postOrder = (data: OrderData) =>
	request({ url: '/booking/', method: 'POST', data });
