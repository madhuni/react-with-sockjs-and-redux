import axios from 'axios';
import tempBed from './temp-bed';

const tempBothExtruder = (extrudersValue, bedValue, callback) => {
  const data = {
    command: 'target',
    targets: null
  };
  data.targets = extrudersValue;

  console.log(data);

  axios.post('printer/tool', data)
    .then(res => {
      console.log(res);
      tempBed(bedValue);
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

export default tempBothExtruder;