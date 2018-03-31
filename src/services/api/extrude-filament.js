import axios from 'axios';

const extrudeFilament = () => {
  const data = {
    command: "extrude",
    amount: 10,
    speed: 3
  };

  axios.post('printer/tool', data)
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

export default extrudeFilament;