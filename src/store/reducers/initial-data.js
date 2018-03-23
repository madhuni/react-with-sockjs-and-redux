/**
 * In Reducer first of all initializing the state of the application
 */
const initializeState = {
  initialData: null
};

const reducer = (state = initializeState, action) => {
  switch (action.type) {
    case 'ADD_INITIAL_DATA':
      console.log('fn is running in reducer');
      console.log(action.value);
      return {
        ...state,
        initialData: action.value
      };
      break;

    default:
      break;
  }
  return state;
};

export default reducer;