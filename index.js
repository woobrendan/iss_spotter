const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchCoordsByIP('72.140.13.217', (err, data) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log(data)
// })

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// })

// fetchISSFlyOverTimes({"latitude": 43.957, "longitude": -78.9804}, (error, flyTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned fly over times:', flyTimes);
// });

const getTimes = function(obj) {
  if (!obj) {
    return console.log('Error: Did not get Fly Over Times properly');
  }
  for (let pass of obj) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  getTimes(passTimes);
});

module.exports = {getTimes};