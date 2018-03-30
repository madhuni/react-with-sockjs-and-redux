import axios from 'axios';

const tempExtruder = (tool, temp) => {
  const data = {
    command: 'target',
    targets: {}
  };
  data.targets[tool] = temp;

  axios.post('printer/tool', data)
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

export default tempExtruder;