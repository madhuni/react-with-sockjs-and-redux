import axios from 'axios';

const deleteLocalFile = (callback, filename) => {
  axios.delete('files/local/' + filename)
    .then(res => {
      console.log(res);
      callback();
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

export default deleteLocalFile;