import axios from 'axios';

const copyUsbFile = (callback, data) => {
  axios.get('usbfiles/copyusb/', {
    params: data
  })
    .then(res => {
      callback(res);
      console.log(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response);
        // return err.response;
      } else {
        console.log(err);
      }
    });
};

export default copyUsbFile;