var friendField = require("../data/friends");

module.exports = function (app) {

  //display a JSON of all possible friends
  app.get("/api/friends", function (req, res) {
    res.json(friendField);
  });

  //handles incoming survey results
  app.post("/api/friends", function (req, res) {
    let incomingFriend = req.body;
    let yourNewFriend = { name: "??" };
    let smallestDiff = 100;
    let currentDiff = 100;
    //loops through each friend
    for (let i = 0; i < friendField.length; i++) {
      //loops through that friend's scores
      for (let j = 0; j < friendField[i].scores.length; j++) {
        //gets the non-neg difference between existing and new response and adds to currentDiff
        let friendScore = friendField[i].scores[j];
        let yourScore = incomingFriend.scores[j];
        //resets currentDiff to the sum difference on each friend's first score
        if (j === 0) {
          currentDiff = Math.abs(parseInt(friendScore) - parseInt(yourScore));
          console.log("checking for " + friendField[i].name);
        }
        //adds subsequent score differences to currentDiff
        else {
          currentDiff += Math.abs(parseInt(friendScore) - parseInt(yourScore));
        }
      }
      if (currentDiff < smallestDiff) {
        smallestDiff = currentDiff;
        yourNewFriend.name = friendField[i].name;
        yourNewFriend.photo = friendField[i].photo;
      }
      else {
        console.log(friendField[i].name + " was not as good a match as " + yourNewFriend.name);
      }
    }
    //adds you to the array
    friendField.push(incomingFriend);
    //and returns your best match from the array
    console.log(yourNewFriend.name);
    res.json(yourNewFriend);
  });
}