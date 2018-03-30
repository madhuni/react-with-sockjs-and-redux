import axios from 'axios';

const pauseCancelPrint = (action) => {
  const data = {
    command: action,
  };

  axios.post('job', data)
    .then(res => {
      console.log(res);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        // return error.response;
      } else {
        console.log(error);
      }
    });
};

export default pauseCancelPrint;