import { stat } from "fs";

/**
 * In Reducer first of all initializing the state of the application
 */
const initializeState = {
  socketData: {
    currentState: null,
    printing: false,
    paused: false,
    usbStatus: null,
    printProgress: {},
    job: {},
    gcodeData: null,
    flags: {},
    currentTool: null,
    heatingUp: false,
    temps: {
      bed: {
        actual: null,
        target: null
      },
      tool0: {
        actual: null,
        target: null
      },
      tool1: {
        actual: null,
        target: null
      }
    },
  }
};

const reducer = (state = initializeState, action) => {
  if (action.type === 'UPDATE_SOCKET_DATA') {
    // console.log(action);
    if (action.value.temps[0]) {
      return {
        socketData: {
          ...state.socketData,
          /* Modifying the current state immutably */
          temps: {
            ...state.socketData.temps,
            bed: {
              ...state.socketData.temps.bed,
              actual: action.value.temps[0].bed.actual,
              target: action.value.temps[0].bed.target
            },
            tool0: {
              ...state.socketData.temps.tool0,
              actual: action.value.temps[0].tool0.actual,
              target: action.value.temps[0].tool0.target
            },
            tool1: {
              ...state.socketData.temps.tool1,
              actual: action.value.temps[0].tool1.actual,
              target: action.value.temps[0].tool1.target
            }
          }
        }
      };
    } else {
      return {
        socketData: {
          ...state.socketData,
          currentState: action.value.state.text,
          printProgress: action.value.progress,
          job: action.value.job,
          flags: action.value.state.flags
          // temps: action.value.temps[0],
        }
      };
    }
  }

  if (action.type === 'UPDATE_HEATING_STATUS') {
    // console.log(action);
    return {
      socketData: {
        ...state.socketData,
        heatingUp : action.value
      }
    };
  }

  if (action.type === 'UPDATE_USB_STATUS') {
    return {
      socketData: {
        ...state.socketData,
        usbStatus: action.value
      }
    }
  }

  if (action.type === 'UPDATE_TOOL') {
    if (action.value === 1) {
      return {
        socketData: {
          ...state.socketData,
          currentTool: 'tool1'
        }
      }
    } else if (action.value === 0) {
      return {
        socketData: {
          ...state.socketData,
          currentTool: 'tool0'
        }
      }
    } 
  }
  return state;
};

export default reducer;