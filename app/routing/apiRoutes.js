var friendField = require("../data/friends");

module.exports = function (app) {

  //display a JSON of all possible friends
  app.get("/api/friends", function (req, res) {
    res.json(friendField);
  });

  //handles incoming survey results
  app.post("/api/tables", function (req, res) {
    console.log("req body" + req.body);
    friendField.push(req.body);

    //this code won't work bc i dont know what im doing but
    var incomingFriend
    var compArray = [];
    var smallestDiff = 5;
    var diffIndex;
    for (var eachFriend in friendField) {
      var totalDiff;
      for (i = 0; i < incomingFriend.scores.length; i++) {
        totalDiff += Math.abs(friendField[eachFriend].scores[i] - incomingFriend.scores[i]);
      }
      compArray.push(totalDiff);
    }
    for (j = 0; j < compArray.length; j++) {
      if (compArray[j] < smallestDiff) {
        smallestDiff = compArray[j]
        diffIndex = j;
      }
    }

    var yourNewFriend = friendField[diffIndex] //idk how to do this


  });
}