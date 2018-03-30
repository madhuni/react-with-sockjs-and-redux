import axios from 'axios';

const tempBed = (temp) => {
  const data = {
    command: 'target',
    target: temp
  };

  axios.post('printer/bed', data)
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

export default tempBed;