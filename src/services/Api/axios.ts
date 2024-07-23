import axios from 'axios';
import Cookies from 'js-cookie';
export const baseUrlExport = "http://localhost:3001/unstudio" //need to replace this
export const axiosInstance = axios.create({
  baseURL: baseUrlExport,
});
export const axiosPost = async (
  url:string,
  data:any,
  contentType = 'application/json',
  params = null,
  type:string,
) => {
  let response:any = {};
  let headers = {
    'Content-Type': contentType,
  };
  if (type === 'get') {
    const storedUser = Cookies.get('user');
const user = storedUser ? JSON.parse(storedUser) : null;
    headers['Authorization'] = `Bearer ${user.token}`;
  }
  try {
    const result = await axiosInstance.post(url, data, {
      headers: headers,
      params: params,
      validateStatus: (status) => status >= 200 && status < 500,
    });
    response = result?.data;
    response.status = result?.data?.status;
    response.message = result?.data?.message;
  } catch (e:any) {
    if (e.response && e.response.status === 400) {
      response = e.response.data;
      response.status = e.response.data.status;
      response.message = e.response.data.message;
    } else {
      response.status = false;
      response.message = e?.response?.data?.message
        ? e?.response?.data?.message
        : e?.message
        ? e?.message
        : 'something went wrong';
      response.data = e;
    }
  }
  return response;
};

export const axiosGet = async (url:string, params = {}, contentType = 'application/json') => {
  let response:any = {};
  try {
    const storedUser = Cookies.get('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const result = await axiosInstance.get(url, {
      headers: {
        'Content-Type': contentType,
        'Authorization':`Bearer ${user.token}`
      },
      params,
    });
    response = result.data || {};
    response.status = result?.status <=203;
    response.message = result?.data?.message;
  } catch (e) {
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }
  return response;
};

export const axiosDelete = async (url, contentType = 'application/json') => {
  let response:any = {};
  try {
    const storedUser = Cookies.get('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const result = await axiosInstance.delete(url, {
      headers: {
        'Content-Type': contentType,
        'Authorization':`Bearer ${user.token}`
      },
    });
    response = result.data || {};
    response.status = result?.data?.status;
    response.message = result?.data?.message;
  } catch (e) {
    response.status = false;
    response.message = 'something went wrong';
    response.data = e;
  }
  return response;
};