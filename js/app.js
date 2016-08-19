// Require annyang
const annyang = require('annyang');
var CONFIG = {
    appName: 'Samantha OS2',
    userName: 'Goss',

    voiceRecognitionLanguage: 'en-UK',
    voiceSpeakingLanguage: 'UK English Male',

    resHello: "hello",

    resName:"You can call me Goss",

    resGreeting: ["hello dear,how can I help you ?", "Hi dear what can i do for you ?", "Hey, how are doing?"],

    resGoodbye: ["goodbye Boniface, it is a pleasure helpling you",　"さぁて、どこへ行こうかしらね。ネットは広大だわ。"],

    resJokes: [ "Programming is like sex: One mistake and you have to support it for the rest of your life.",
    "Software is like sex: It's better when it's free.",
    "Software is like sex: It's never REALLY free.",
    "There are 10 types of people: those who understand binary, and those who get laid.",
    "Why programmers like UNIX: unzip, strip, touch, finger, grep, mount, fsck, more, yes, fsck, fsck, fsck, umount, sleep",
    "If your mom was a collection class, her insert method would be public.",
    "Your momma's so fat that not even Dijkstra is able to find a shortest path around her.",
    "C++ - where your friends have access to your private members.",
    "The only intuitive user interface is the nipple. After that, it's all learned.",
    "What's the difference between software development and sex? In sex, you don't get a bonus for releasing early.",
    "Your momma's so fat, the recursive function calculating her mass causes a stack overflow.",],
}

var hello = function() {
    console.log(CONFIG.resHello);
    document.getElementById('caption').textContent = CONFIG.resHello;
    say(CONFIG.resHello);

  };

var greeting = function() {
    resGreeting = randomSentence(CONFIG.resGreeting)
    console.log(resGreeting);
    document.getElementById('caption').textContent = resGreeting;
    say(resGreeting);
  };

var googbye = function() {
    resGoodbye = randomSentence(CONFIG.resGoodbye)
    console.log(resGoodbye);
    document.getElementById('caption').textContent = resGoodbye;
    say(resGoodbye);
  };

var moment = moment();

var currentTime = function(){
    console.log(moment.format("MMMM Do YYYY, h:mm a"));
    document.getElementById('caption').textContent = moment.format("MMMM Do YYYY, h:mm a");
    say(moment.format("MMMM Do YYYY, h:mm a"));
}

var jokes = function() {
    resJokes = randomSentence(CONFIG.resJokes)
    console.log(resJokes);
    say(resJokes);
    $(function(){
      $(".caption").typed({
        strings: [resJokes],
        typeSpeed: 0
      });
  });
  };
var name = function() {
      resName = randomSentence(CONFIG.resName)
      console.log(resName);
      document.getElementById('caption').textContent = resName;
      say(resName);
  };

var repeatLastSentence = function(){
    say(lastSentence);
};

var commands = {
  'what is your name': name,
  'hello': hello,
  '(hi)(hey)(OK)(hi) (good) (morning) (afternoon) (night) (evening)goss': greeting,
  'goodbye': googbye,
  'time (please)(date)(what is the)(what time is it?)': currentTime,
  'tell me a joke(make me laugh)': jokes,
  'repeat(please)(what did you say)(louder)': repeatLastSentence,
};

if (annyang) {
  annyang.setLanguage(CONFIG.voiceRecognitionLanguage)
  annyang.addCommands(commands);
  annyang.start();
  console.log('Voice recognition ready');
}

var lastSentence = null;

function say(msg, callback) {
  console.log('Pause annyang');
  console.log('Saying: ' + msg);
  lastSentence=msg;
  annyang.abort();

  function voiceErrorCallback() {
      console.log("Voice error");
  }

  function voiceEndCallback() {
      console.log('Resume annyang');
  }

  var parameters = {
      onerror: voiceErrorCallback,
      onend: voiceEndCallback
  }

  responsiveVoice.speak(msg, CONFIG.voiceSpeakingLanguage, parameters);
  annyang.start();
}

function randomSentence(arr) {
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return arr;
}
