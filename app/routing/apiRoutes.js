var friendsData = require('../data/friends.js');

function apiRoutes(app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });
  
  app.post('/api/friends', function (req, res) {
     var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };

    var scores = [];
    for (var i = 0; i < req.body.scores.length; i++) {
      scores.push(parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scores;
    
    var scoreComparisionArray = [];
    for (var i = 0; i < friendsData.length; i++) {

      var compared = 0;
      for (var j = 0; j < newFriend.scores.length; j++) {
        compared += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
      }
      scoreComparisionArray.push(compared);
    }

    var bestMatch = 0; 
    for (var i = 1; i < scoreComparisionArray.length; i++) {
      
      if (scoreComparisionArray[i] <= scoreComparisionArray[bestMatch]) {
        bestMatch = i;
      }

    }
    
    var matchFriend = friendsData[bestMatch];


    res.json(matchFriend);

    friendsData.push(newFriend);

  });

}

module.exports = apiRoutes;