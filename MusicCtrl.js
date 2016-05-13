angular.module('myApp', []);

angular.module('myApp').config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

angular.module('myApp').controller('MusicCtrl', function($scope, $http, $timeout){
  var mapMusics = [];
  var allWords = [];
  var startedExp = false;

  // ---------------------- Musica --------------------------------------
  $http.get('/static/musicas.json').success(function(data) {
    $scope.musicas = data.musicas || [];
  });

  $scope.startMusic = function() {
    $scope.smell();
    // beap();
    for(var i = 0; i < $scope.musicas.length; ++i) {
      play($scope.musicas[i])
    }
  }

  function beap() {
    var audio = new Audio("/sons/START SOUND.mp3");
    audio.play();
  }

  function play(musica) {
    allWords = allWords.concat(musica.words);

    var audio = new Audio(musica.url);

    var id = $timeout(function(audio) {
      console.log("Music: " + musica.url);
      audio.loop = musica.loop;
      audio.volume = musica.volume;

      if(musica.feading)
        audio.onplay = feadingin.bind(this, audio);

      audio.play();

      if (musica.duration != -1)
        stop(audio, musica.duration);

    }.bind(this, audio), musica.start);

    var mapMusic = {
      "words": musica.words,
      'audio': audio,
      'timeID': id
    };

    mapMusics.push(mapMusic);
  }

  function stop(audio, timeout) {
    $timeout(function() {
      console.log("Stop Music: " + audio.src);
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    }, timeout);
  }

  function playByWord(word) {
    for (var i = 0; i < mapMusics.length; ++i) {
      if (mapMusics[i].words.indexOf(word) != -1) {
        console.log("Stop Music: " + mapMusics[i].audio.src);
        var audio = mapMusics[i].audio;
        clearTimeout(mapMusics[i].timeID);

        audio.currentTime = 0;
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }
  }

  function feadingin(element) {
    $(element).prop("volume", 0.0);
    $(element).on("timeupdate", function() {
        $(this).stop().animate({volume: element.volume}, 10000);
    });
  }

  function feadingout(element) {
    $(element).prop("volume", 1.0);
    $(element).on("timeupdate", function() {
        $(this).stop().animate({volume: element.volume}, 10000);
    });
  }

  // ---------------------- Speak --------------------------------------
  $scope.messages = [];
  $scope.recognition = null

  // function _start() {
  $scope.recognition = new webkitSpeechRecognition();
  $scope.recognition.lang = 'pt-BR';
  $scope.recognition.continuous = true;
  $scope.recognition.interimResults = true;

  $scope.recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var sentence = event.results[i][0].transcript;

        if (!startedExp && sentence.indexOf("começar") != -1) {
          startedExp = true;
          $scope.startMusic();
        }

        var words = sentence.toLowerCase().split(" ");

        for (var i = 0; i < words.length; ++i) {
          if (allWords.indexOf(words[i].toLowerCase()) != -1) {
            playByWord(words[i]);
            break;
          }
        }

        console.log(sentence);
        break;
      }
    }
  }

  $scope.recognition.start();

  $scope.recognition.onend = function () {
    console.log("to saindo da voz");
    $scope.recognition.start();
  }

  // ---------------------- Smell --------------------------------------
  $scope.smell = function() {
    $http.get('/smell');
  }

});

// Se a musica acaba eu do um rezete nela.
