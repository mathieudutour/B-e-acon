var beacons = [];

function scan() {
  if (estimote) {
    function onBeaconsRanged(beaconInfo) {
      beacons = [];

      for (var i in beaconInfo.beacons) {
        // Insert beacon into table of found beacons.
        // Filter out beacons with invalid RSSI values.
        var beacon = beaconInfo.beacons[i];
        if (beacon.rssi < 0) {
          beacons.push(beacon.major);
        }
      }
      //console.log('onBeaconsRanged: ' + JSON.stringify(beacons));
      Session.set("beaconIds", JSON.stringify(beacons));
    }

    function onError(errorMessage) {
      console.log('Ranging beacons did fail: ' + errorMessage);
    }

    // Request permission from user to access location info.
    // This is needed on iOS 8.
    estimote.beacons.requestAlwaysAuthorization();

    // Start ranging beacons.
    estimote.beacons.startRangingBeaconsInRegion({},
      // Empty region matches all beacons
      // with the Estimote factory set UUID.
      onBeaconsRanged,
      onError);
  }
}

Meteor.startup(function() {
  console.log('scan');
  scan();
});
