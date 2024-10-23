import axios from 'axios';
import store from '@/store';

export default function setup() {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        store.dispatch('oauth/signOut', null, {root: true});
      }
      return Promise.reject(error.response);
    }
  );
}
