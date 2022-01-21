const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, res, body) => {
    if (err) return callback(err, null);

    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching IP. Response ${body}`), null);
      return;
    }
    let ipAddress = JSON.parse(body).ip;
    if (!ipAddress) {
      return callback('Error IP not found', null);
    }
    return callback(null, ipAddress);
  });
};

const fetchCoordsByIP = ((ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {
    if (err) return callback(err, null);

    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching coordinates for IP. Response ${body}`), null);
      return;
    }
    let {latitude, longitude} = JSON.parse(body);

    return callback(null, {latitude, longitude});
  });
});

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching fly over times. Response ${body}`), null);
      return;
    }
    let flyTimes = JSON.parse(body).response;
    return callback(null, flyTimes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return callback(err, null);
      }
      fetchISSFlyOverTimes(coords, (err, nextPass) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, nextPass);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };


