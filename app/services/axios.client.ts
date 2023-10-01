import Axios from 'axios';

const axios = Axios.create({
  baseURL: window.ENV.API_URL_BASE,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

export default axios
