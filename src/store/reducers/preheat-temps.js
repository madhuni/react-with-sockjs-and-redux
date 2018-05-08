const initializeState = {
  tool0TargetTemp: 240,
  tool1TargetTemp: 240,
  bedTargetTemp: 70
};

const reducer = (state = initializeState, action) => {
  if (action.type === 'UPDATE_TOOL0_TARGET') {
    return {
      ...state,
      tool0TargetTemp: action.value
    }
  }
  if (action.type === 'UPDATE_TOOL1_TARGET') {
    return {
      ...state,
      tool1TargetTemp: action.value
    }
  }
  if (action.type === 'UPDATE_BED_TARGET') {
    return {
      ...state,
      bedTargetTemp: action.value
    }
  }

  return state;
};

export default reducer;