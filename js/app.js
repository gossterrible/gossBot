// Require annyang
const annyang = require('annyang');
// requre electron
const shell = require('electron').shell;
var child = require('child_process').execFile;
var executablePath = "C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe";

/*child(executablePath, function(err, data) {
    if(err){
       console.error(err);
       return;
    }

    console.log(data.toString());
});*/
// bot configurations
var CONFIG = {
    appName: 'GOSS',
    userName: 'Goss',
    //Bot personality
    voiceRecognitionLanguage: 'en-UK',
    voiceSpeakingLanguage: 'UK English Male',

    resHello: "hello",
    resSearch: search,
    redTime:currentTime,
    resquote : quote,
    reqWeather :weather,
    redRadio: radio,
    reqStop:stop,
    redNews:news,
    redMails:emails,
    resName: "You can call me Goss",
    resGreeting: ["Hello dear,how can I help you ?", "Hi dear what can i do for you ?", "Hi how are doing?"],
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
//get a random bible quote
var quote =function(){
   var url = 'http://labs.bible.org/api/?passage=votd&type=json';
                       $.ajax({
                         type: 'GET',
                         url: url,
                         async: false,
                         jsonpCallback: 'bibleApi',
                         contentType: "application/json",
                         dataType: 'jsonp'
                       });
                     };
                     var bibleApi = function(data) {
                       var book = data[0].bookname;
                       var  chapter = data[0].chapter;
                       var verse =data[0].verse;
                       var  text = data[0].text;
                      document.getElementById('caption').textContent = book +"   "+chapter +"  "+verse +"  " +text;
                      say(document.getElementById('caption').strings);

};
//get weather infomation
var weather =function(){
  var url2 = "http://api.wunderground.com/api/a0b51a3c87e2d6a2/conditions/q/hangzhou.json";
  $.ajax({
    type: 'GET',
    url: url2,
    async: false,
    jsonpCallback: 'weatherApi',
    contentType: "application/json",
    dataType: 'jsonp'
  });
};
//get request weather
var weatherApi = function(data) {
  var icon_replace = $("icon").attr("src");
  var location = data.current_observation.display_location.city;
  var  temp = data.current_observation.temp_c;
  var description =data.current_observation.icon;
  var  icon = data.current_observation.icon;
  document.getElementById('weather-app').style.display = "flex";
  document.getElementById('location').textContent =location;
  console.log(location);
  document.getElementById('temperature').textContent =temp+"℃";
  console.log(temp);
  document.getElementById('description').textContent =description;
  console.log(description);
  say("it is "+temp+" degrees today in "+location+",with a "+description+" sky.")
  setTimeout(function(){ $('.weather-app').fadeOut() }, 10000);
};
// say Hello
var hello = function() {
    console.log(CONFIG.resHello);
    document.getElementById('caption').textContent = CONFIG.resHello;
    say(CONFIG.resHello);

  };
  // say name
var name = function() {
      console.log(CONFIG.resName);
      document.getElementById('caption').textContent = CONFIG.resName;
      say(CONFIG.resName);
  };
//say greetings
var greeting = function() {
    resGreeting = randomSentence(CONFIG.resGreeting)
    console.log(resGreeting);
    document.getElementById('caption').textContent = resGreeting;
    say(resGreeting);
  };
//say goodbye
var googbye = function() {
    resGoodbye = randomSentence(CONFIG.resGoodbye)
    console.log(resGoodbye);
    document.getElementById('caption').textContent = resGoodbye;
    say(resGoodbye);
  };
//moment library to fomat time
var moment = moment();

var currentTime = function(){
    console.log(moment.format("MMMM Do YYYY, h:mm a"));
    document.getElementById('caption').textContent = moment.format("MMMM Do YYYY, h:mm a");
    say(moment.format("MMMM Do YYYY, h:mm a"));
}
//say a joke
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

//repeat last sentence
var repeatLastSentence = function(){
    say(lastSentence);
};
//play some radio
var radio =function(){
  var shell = require('electron').shell;
  event.preventDefault();
  shell.openExternal('http://pinghot.qq.com/pingd?dm=y.qq.com.hot&url=/&hottag=Y_NEW.INDEX.TOPLIST.PLAY4&hotx=9999&hoty=9999&rand=94038');
  shell.openExternal('http://y.qq.com/portal/player.html');
  say('Music for your soul')
};
//stop previous activity an promt user your are ready
var stop =function(){
  $('.radio-content', window.parent.document).remove();
  say("What else can i do for you?");
}
//get current news
var news=function(){
    var shell = require('electron').shell;
       event.preventDefault();
      shell.openExternal('http://chancancode.github.io/hn-reader/');
    say('ok. these is what is hot today on hacker news');
}
var emails=function(){
  var shell = require('electron').shell;
     event.preventDefault();
    shell.openExternal('https://mail.google.com/mail/u/0/#inbox');
  say('ok. these are your mails');
}
var search =function(tag){
  var shell = require('electron').shell;
  event.preventDefault();
  shell.openExternal('https://www.google.com/search?q=' + tag);
  say('These are the result i could find')
}
//verbose commands configurations
var commands = {
  'Search for *tag':search,
  'what is hot (Shom me some)(today)':news,
  '(shom me my) emails':emails,
  'stop (playing)':stop,
  'play some(music)(radio)' :radio,
  'how is the weather(today)':weather,
  'what is your name': name,
  'show me a bible (quote)(verse)':quote,
  'hello': hello,
  'good (morning)(evening)(afternoon) ': greeting,
  'goodbye': googbye,
  '(please)(date)(what time is it?) what is the time': currentTime,
  'tell me a joke(make me laugh)': jokes,
  'repeat(please)(what did you say)(louder)': repeatLastSentence,
};
//get text to speach ready
if (annyang) {
  annyang.setLanguage(CONFIG.voiceRecognitionLanguage)
  annyang.addCommands(commands);
  annyang.start();
  console.log('Voice recognition ready');
  $('.loading').fadeIn();
}
var lastSentence = null;
//callback for lastSentence
function say(msg, callback) {
  console.log('Pause Goss');
  console.log('Saying: ' + msg);
  $('.loading').fadeOut();
  lastSentence=msg;
  annyang.abort();
//error with module
  function voiceErrorCallback() {
      console.log("Voice error");
  }

  function voiceEndCallback() {
      console.log('Resume Goss');
      $('.loading').fadeIn()
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
/*
var utter = new SpeechSynthesisUtterance();
utter.text = 'Hello World';
utter.onend = function(event) { console.log('Speech complete'); }
speechSynthesis.speak(utter);
*/
