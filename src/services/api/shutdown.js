import axios from 'axios';

const shutdown = () => {
  const data = { 
    "action": "shutdown",
    "command": "sudo shutdown now"
  };

  axios.post('system', data)
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

export default shutdown;