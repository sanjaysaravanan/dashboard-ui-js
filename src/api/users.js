import { dashboardInstance } from '../axios.config';

export const createUser = (payload) => dashboardInstance.post('/users/create-user', payload);

export const getUser = (email) => dashboardInstance.get(`/users/${email}`);

export const deleteUser = (email) => dashboardInstance.delete(`/users/${email}`);
