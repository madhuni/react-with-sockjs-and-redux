import axios from 'axios';

const jogging = (axes, direction, speed) => {
  const data = {
    command: "jog",
  };
  data[axes] = direction * speed;

  axios.post('printer/printhead', data)
    .then(res => {
      console.log(res.config.data);
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

export default jogging;