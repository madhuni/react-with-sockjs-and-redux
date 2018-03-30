import axios from 'axios';

const homeExtruderBed = (command, axes) => {
  const data = {
    command: command,
    axes: axes
  };
  axios.post('printer/printhead', data)
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

export default homeExtruderBed;