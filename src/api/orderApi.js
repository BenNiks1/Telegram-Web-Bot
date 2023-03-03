import request from '@/helpers/request';

export const postOrder = (data) => request({ url: '/booking/', method: 'POST', data });
