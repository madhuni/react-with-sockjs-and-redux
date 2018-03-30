import axios from 'axios';

const switchTool = (tool) => {
  const data = {
    command: 'select',
    tool: tool
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

export default switchTool;