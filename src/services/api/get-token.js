import axios from 'axios';

const getToken = (callback) => {
  axios.get('http://0.0.0.0:5000/wsToken')
    .then((res) => {
      console.log(res);
      callback();
      // return res;
    })
    .catch((error) => {
      callback();
      if (error.response) {
        console.log(error.response);
        // return error.response;
      } else {
        console.log(error);
      }
      // console.log(error.config);
    });
};

export default getToken;