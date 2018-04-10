import axios from 'axios';

const getGcodeData = (callback, filename) => {
  /**
     * Fetching the Initial Data once the App component is mounted
     * 
     * Once the initial data is fetched, this value will be set to
     * the State in our Redux Store.
    */

  /* Array of fileNames for testing purposes */
  // const fileNames = [
  //   '3hr_print.gcode',
  //   '2hr_print.gcode',
  //   '3min_print.gcode',
  //   'ERAY_electron_testing.gcode',
  //   'ERAY_20mmTestCuberepaired.gcode',
  //   'ERAY_darthvader_lowpoly_body.gcode',
  //   'RAY_InceptionTopFinal.gcode',
  //   'Chess_Board_dual.gcode'
  // ];

  axios.get('/gcode_data/local/' + filename)
    .then(res => {
      // console.log(res.data);
      callback(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log(err);
      }
    });
};

export default getGcodeData;