import request from '@/helpers/request';

export const getSlotsList = (params) => request({ url: '/slots', params });
