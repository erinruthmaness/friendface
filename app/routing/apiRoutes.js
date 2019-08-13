var friendField = require("../data/friends");

module.exports = function (app) {

  //display a JSON of all possible friends
  app.get("/api/friends", function (req, res) {
    res.json(friendField);
  });

  //handles incoming survey results
  app.post("/api/friends", function (req, res) {
    console.log(res.body);
    friendField.push(req.body);
    var incomingFriend = req.body;

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

    var yourNewFriend = friendField[diffIndex] 
    console.log(yourNewFriend);


  });
}