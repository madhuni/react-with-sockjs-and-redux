import axios from 'axios';

const reconnectPrinter = (tool, temp) => {
  const data = {
    command: "connect",
    port: "/dev/cu.usbmodem1411",
    baudrate: "115200",
    autoconnect: true
  };

  axios.post('connection', data)
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

export default reconnectPrinter;