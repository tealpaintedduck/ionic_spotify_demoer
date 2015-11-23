angular.module('songhop.services', [])

.factory('User', function() {
  var o = {
    favorites : []
  }

  o.addSongToFavorites = function(song) {
    if(!song) return false;
    o.favorites.unshift(song);
  }

  o.removeSongFromFavorites = function(song, index) {
    if(!song) return false;
    o.favorites.splice(index, 1)
  }

  return o
})

.factory('Recommendations', function($http, SERVER) {
  var o = {
    queue: []
  };

  o.getNextSongs = function() {
    return $http({
      method: 'GET',
      url: SERVER.url + '/recommendations'
    }).success(function(data){
      o.queue = o.queue.concat(data);
    });
  }
  o.nextSong = function() {
    console.log(o.queue);
    o.queue.shift();
    if (o.queue.length < 4) {
      o.getNextSongs();
    }
  }
  return o;
})