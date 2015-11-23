angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {
  Recommendations.init()
    .then(function() {
      $scope.currentSong = Recommendations.queue[0];
      Recommendations.playCurrentSong();
    });
  $scope.sendFeedback = function(bool) {
    if(bool) User.addSongToFavorites($scope.currentSong);
    $scope.currentSong.rated = bool;
    $scope.currentSong.hide = true;

    Recommendations.nextSong();

    $timeout(function() {
    $scope.currentSong = Recommendations.queue[0];
    Recommendations.playCurrentSong();
  }, 250)

  }
  $scope.nextAlbumImg = function() {
    if (Recommendations.queue.length > 1) {
      return Recommendations.queue[1].image_large;
    }
    return '';
  }
})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {
  $scope.favorites = User.favorites;
  $scope.removeSong = function(song,index) {
    User.removeSongFromFavorites(song, index);
  }
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope, Recommendations, User) {
  $scope.favCount = User.favoriteCount;
  $scope.enteringFavorites = function() {
    User.newFavorites = 0;
    Recommendations.haltAudio();
  }
  $scope.leavingFavorites = function() {
    Recommendations.init();
  }
});