function asyncFoo(callback) {
  if(callback) {
    setTimeout(() => callback('Xisma'), 1000);
  } else {
    return Promise.resolve('Xisma');
  }
}

export default asyncFoo;