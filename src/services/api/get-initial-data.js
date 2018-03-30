import axios from 'axios';

const getInitialData = (callback) => {
  /**
     * Fetching the Initial Data once the App component is mounted
     * 
     * Once the initial data is fetched, this value will be set to
     * the State in our Redux Store.
    */
  axios.get('http://192.168.1.106:5000/')
    .then(res => {
      // console.log(res);
      callback(res);
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log(err);
      }
    });
};

export default getInitialData;