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

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let pass of passTimes) {
    let timePass = pass.risetime;
    let date = new Date(timePass);
    console.log(`Next pass at ${date.toUTCString()} for ${pass.duration} seconds!`);
  }
});