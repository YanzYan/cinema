//angular.module('starter.services', [])

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

app.factory('Cinema', function($http){
    var cinemas=[{
      id: 0,
      name: '金逸影城（张江店）',
      address: '上海市浦东新区碧波路635号传奇广场2层碧波路传奇广场传奇广场2层碧波路传奇广场',
      distance: '1.5km',
      price: 30
    },{
      id: 1,
      name: '金逸新恒星影城（大悦城店）',
      address: '上海市闸北区西藏北路166号传奇广场2层碧波路传奇广场传奇广场2层碧波路传奇广场',
      distance: '720m',
      price: 30
    }];
    return {
      all: function(){
        return cinemas;
      },
      get: function(cinemaId){
        for (var i=0;i<cinemas.length;i++){
          if(cinemas[i].id == cinemaId){
            return cinemas[i];
          }
        }
        return null;
      }
    }
})
