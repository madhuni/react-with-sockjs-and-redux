import axios from 'axios';

const getLocalPrintFiles = (callback) => {
  axios.get('astroprint/print-files')
    .then(res => {
      console.log(res.data);
      callback(res);
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

export default getLocalPrintFiles;