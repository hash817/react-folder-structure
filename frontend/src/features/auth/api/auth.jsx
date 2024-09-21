import { api } from "../../../lib/api-client";

// const loginGoogle = async (data, signal) => {
//   console.log(data);
//   return api.get(`/login-google/`, {params:data, signal:signal});
// };

const loginGoogle = async (data, signal) => {
  console.log(data);
  return api.get(`/auth/google/login`, {params:data, signal:signal});
};

const CheckGoogleAccountExist = async (data) => {
  console.log(data)
  return api.get(`/auth/google/check`, {params:data});
}

const registerGoogle = async (data) => {
  console.log(data);
  return api.post(`/auth/google/register`, {data:data});
};


const validateUser = async () => {
  return api.get('/auth/validate')
};

const login = async (data) => {
  return api.post('/login/', data)
}

export const auth = {
  loginGoogle, registerGoogle, CheckGoogleAccountExist, reachGoogle, validateUser, login
};
