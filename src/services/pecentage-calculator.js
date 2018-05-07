export const singlePercentage = (tempObj, targetValue) => {
  let percentage;
  const actualTemp = tempObj.actual;
  const targetTemp = targetValue;

  if (actualTemp > targetTemp) {
    percentage = Math.min(Math.round(((targetTemp / actualTemp) * 100)));
  } else {
    percentage = Math.min(Math.round(((actualTemp / targetTemp) * 100)));
  }

  return isNaN(percentage) ? 0 : percentage;
};

export const overallPercentage = (tempObj, targetObj) => {
  let percentage;
  const totalActualTemp = tempObj.tool0.actual + tempObj.tool1.actual + tempObj.bed.actual;
  const totalTargetTemp = targetObj.tool0 + targetObj.tool1 + targetObj.bed
  if (totalActualTemp > totalTargetTemp) {
    percentage = Math.min(Math.round(((totalTargetTemp / totalActualTemp) * 100)));
  } else {
    percentage = Math.min(Math.round(((totalActualTemp / totalTargetTemp) * 100)));
  }

  return isNaN(percentage) ? 0 : percentage;
};