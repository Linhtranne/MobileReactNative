import axios from 'axios';

const API_URL = 'https://nest-api-public.ixe-agent.io.vn/api/v1/positions';

export const getPositions = async (token?: string) => {
  const res = await axios.get(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const getPositionDetail = async (id: number, token: string) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createPosition = async (data: any, token: string) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updatePosition = async (id: number, data: any, token: string) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deletePosition = async (id: number, token: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
