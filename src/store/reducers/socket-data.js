/**
 * In Reducer first of all initializing the state of the application
 */
const initializeState = {
  socketData: {
    currentState: null,
    boxReachable: 'unreachable', //unreachable, reachable, checking
    online: false,
    printing: false,
    paused: false,
    camera: false,
    usbStatus: false,
    printProgress: {},
    job: {},
    flags: {},
    currentTool: null,
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
    astroprint: {
      status: null
    },
    printer: {
      status: null
    },
    printCapture: null
  }
};

const reducer = (state = initializeState, action) => {
  if (action.type === 'UPDATE_PRINTER_STATE') {
    // console.log(action);
    return {
      socketData: {
        ...state.socketData,
        currentState : action.value
      }
    };
  }

  if (action.type === 'UPDATE_TEMPS') {
    // console.log(action.value);
    return {
      socketData: {
        ...state.socketData,
        temps: action.value
      }
    }
  }

  if (action.type === 'UPDATE_PRINT_PROGRESS') {
    return {
      socketData: {
        ...state.socketData,
        printProgress: action.value
      }
    }
  }

  if (action.type === 'UPDATE_JOB_DETAILS') {
    return {
      socketData: {
        ...state.socketData,
        job: action.value
      }
    }
  }

  if (action.type === 'UPDATE_FLAGS') {
    return {
      socketData: {
        ...state.socketData,
        flags: action.value
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