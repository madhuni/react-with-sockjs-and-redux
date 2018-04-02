import axios from 'axios';

import extrudeFilament from './extrude-filament';

const switchTool = (tool) => {
  const data = {
    command: 'select',
    tool: tool
  };
  axios.post('printer/tool', data)
    .then(res => {
      console.log(res);
      // extruding the Filament when the Tool is changed successfully
      extrudeFilament();
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