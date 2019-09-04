
var data = require("../data/friends");

module.exports = function(app) {


app.get("/api/friends", function(req, res) {
    res.json(data);
 });

 app.post("/api/friends", function(req, res) {
     
    var bestMatch = {
         name: "",
         photo: "",
         friendDifference: 1000
     };

     //console.log(req.body);

     var userData = req.body;
     var userScores = userData.scores;

     //console.log(userData.scores);

     var totalDifference = 0;

     for (i=0;i<data.length;i++) {
      //console.log(data[i])
      totalDifference = 0;

      var friendScores = data[i].scores;
      //console.log(data[i].scores);

      for (j=0;j<friendScores.length; j++) {

        totalDifference += Math.abs(userScores[j] - data[i].scores[j]);

        if (totalDifference <= bestMatch.friendDifference) {
             bestMatch.name = data[i].name;
             bestMatch.photo = data[i].photo;
             bestMatch.friendDifference = totalDifference;
        }
      }
     }

     //console.log(bestMatch)
     data.push(userData);

     res.json(bestMatch);
 });

}


