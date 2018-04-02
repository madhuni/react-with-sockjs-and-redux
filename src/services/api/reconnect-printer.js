import axios from 'axios';

const reconnectPrinter = (tool, temp) => {
  axios.get('connection')
    .then(res => {
      // console.log(res);
      const ports = Object.keys(res.data.options.ports);
      // console.log(ports);
      const port = ports[0];
      const data = {
        command: "connect",
        port: port,
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
          } else {
            console.log(error);
          }
        });
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    });
};

export default reconnectPrinter;