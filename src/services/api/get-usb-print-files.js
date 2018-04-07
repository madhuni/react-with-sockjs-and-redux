import axios from 'axios';

const getUsbPrintFiles = (callback) => {
  axios.get('usbfiles/usblist/')
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

export default getUsbPrintFiles;