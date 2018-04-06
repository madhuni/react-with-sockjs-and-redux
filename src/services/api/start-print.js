import axios from 'axios';

const startPrint = (callback, filename) => {
  const data = {
    command: "select",
    print: true
  };

  axios.post('files/local/' + filename, data)
    .then(res => {
      console.log(res);
      callback();
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

export default startPrint;