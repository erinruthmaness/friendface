var friendField = require("../data/friends");

module.exports = function (app) {

  //display a JSON of all possible friends
  app.get("/api/friends", function (req, res) {
    res.json(friendField);
  });

  //handles incoming survey results
  app.post("/api/friends", function (req, res) {
    var incomingFriend = req.body;
    var smallestDiff = 100;
    var diffIndex;
    //loops through each friend
    for (var i = 0; i < friendField.length; i++) {
      var currentDiff = 100;
      //loops through that friend's scores
      for (var j = 0; j < friendField[i].scores.length; j++) {
        //gets the non-neg difference between existing and new response and adds to currentDiff
        currentDiff += Math.abs(parseInt(friendField[i].scores[j]) - parseInt(incomingFriend[i].scores[j]));
        if (currentDiff < smallestDiff) {
          //keeps track of who has the smallest difference
          smallestDiff = currentDiff;
          diffIndex = i;
        }
      }
    }

    friendField.push(incomingFriend);

    var yourNewFriend = friendField[diffIndex]
    console.log("your new friend is " + yourNewFriend.name);
  });
}