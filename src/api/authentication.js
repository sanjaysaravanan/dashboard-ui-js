/* eslint-disable import/prefer-default-export */
import { dashboardInstance } from '../axios.config';

export const loginUser = (payload) => dashboardInstance.post('/users/login', payload);
