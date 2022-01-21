const { nextISSTimesForMyLocation } = require("./iss_promised");
const { getTimes } = require('./index');

// fetchMyIP()
// .then(fetchCoordsByIP)
// .then(fetchISSFlyOverTimes)
// .then((body) => console.log('result:', body))

// .catch((error) => console.log('Error:', error));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    getTimes(passTimes);
  })
  // .catch((error) => {
  //   console.log('Error:', error.message)
  // });
