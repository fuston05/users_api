import axios from 'axios';


export const axiosWithAuth= () => {

  const token= window.localStorage.getItem('token');

  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: process.env.REACT_APP_API_URL
  });

}// end axiosWithAuth