function timeout(callback) {
  setTimeout(() => callback("Xisma"), 1000);
}

function describeDate(year, month = 0, day = 1) {
  const currDate = new Date();
  const date = new Date(year, month, day);
  let description;

  if(date.getFullYear() === currDate.getFullYear()) {
    description = "this year";
  } else if(date > currDate) {
    description = "future";
  } else {
    description = "past";
  }

  return description;
}

export {
  timeout, 
  describeDate
};
