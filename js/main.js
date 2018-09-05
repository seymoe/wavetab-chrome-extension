//添加事件句柄，移除事件句柄
var eventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  }
}

//取class值的函数
function getByClass(oParent, sClass) {
  var oElem = oParent.getElementsByTagName('*');
  var aResult = [];
  for (var i = 0; i < oElem.length; i++) {
    if (oElem[i].className == sClass) {
      aResult.push(oElem[i]);
    }
  }
  return aResult;
}
//取id值的函数
function getById(id) {
  return document.getElementById(id);
}

//随机数据
var quoteArray = [
  {
    "quote": "The happiest women, like the happiest nations, have no history.",
    "author": "George Eliot"
  },
  {
    "quote": "An immature person may achieve great success in a carreer but never in a marriage.",
    "author": "Benjamin Spock"
  },
  {
    "quote": "One is easily fooled by that which one love.",
    "author": "Moliere"
  },
  {
    "quote": "It is hard for the human soul not to love something ,and our mind must of necessity be drawn to some kind of affection.",
    "author": "Jerome"
  },
  {
    "quote": "Men are April when they woo,December when they wed;maids are May when they are maids,but the sky changes when they are wives.",
    "author": "Shakespear"
  },
  {
    "quote": "Marriage is like life in this --that it is field of battle ,and not a bed of roses.",
    "author": "robert Stevenson"
  },
  {
    "quote": "Man's love is of man's life a thing apart,'Tis woman's whole existence.",
    "author": "byron"
  },
  {
    "quote": "There is hardly any activity,any enterprise ,which is started with such tremendous hopes and expectations,and yet which fails so regularly,as love.",
    "author": "erich fromm"
  },
  {
    "quote": "Sweetest joy ,the wildest woe is love.",
    "author": "philip bailey"
  },
  {
    "quote": "Love triumphs over everything. Love has no age, no limit and no death.",
    "author": "John Galsworthy"
  },
  {
    "quote": "Human nature is so constructed that it gives affection most readily to those who seem least to demand it.",
    "author": "Bertrand Russell"
  },
  {
    "quote": "Love lives in cottages as well as in courts. ",
    "author": "George Herbert"
  },
  {
    "quote": "Love is ever matter of comedies, and how and then of tragedies.",
    "author": "Bacon"
  },
  {
    "quote": "If you'd be loved, be worthy to be loved.",
    "author": "Ovid"
  },
  {
    "quote": "Love is ever matter of comedies, and how and then of tragedies.",
    "author": "Bacon"
  },
  {
    "quote": "If you'd be loved, be worthy to be loved.",
    "author": "Ovid"
  },
  {
    "quote": "It's difficult to know at what moment love begins; it is less difficult to know that it has begun.",
    "author": "H.W.Longfellow"
  },
  {
    "quote": "Gravitation is not responsible for people falling in love.",
    "author": "Albert Einstein"
  },
  {
    "quote": "Friendship is love without his wings.",
    "author": "George Gordon Byron"
  },
  {
    "quote": "Friendship is like earthenware: once broken, it can be mended; love is like a mirror: once broken, that ends it.",
    "author": "Josh Billings"
  },
  {
    "quote": "First love is only a little foolishness and a lot of curiosity.",
    "author": "George Bernard Shaw"
  },
  {
    "quote": "Every man is a poet when he is in love.",
    "author": "Plato"
  },
  {
    "quote": "Absence to love is what wind is to fire. It extinguishes the small; it inflames the great.",
    "author": "Roger de Bussy-Rabutin"
  }
];
/*波浪开始*/
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var step = 0;
var recta = ["rgba(0,222,255, 0.05)", "rgba(0,222,255, 0.1)", "rgba(0,222,255, .15)"];
var wave = document.getElementById("wave");
var ctx = wave.getContext("2d");
wave.width = wave.parentNode.offsetWidth;
wave.height = wave.parentNode.offsetHeight;
var w = wave.width;
var h = wave.height;

wave.style.cssText = "position: absolute;top:0;left:0;z-index: 1";

function waver() {
  ctx.clearRect(0, 0, w, h);
  //角度增加一度
  step += 2.5;
  for (var i = 0; i < recta.length; i++) {
    ctx.fillStyle = recta[i];
    //角度转换成弧度
    var angle = (step + i * 45) * Math.PI / 180;
    //矩形高度的变化量
    var deltaHeight = Math.sin(angle) * 45;
    //矩形高度的变化量(右上顶点)
    var deltaHeightRight = Math.cos(angle) * 45;

    ctx.beginPath();
    ctx.moveTo(0, h / 2 + deltaHeight);
    //右上顶点
    ctx.lineTo(w, h / 2 + deltaHeightRight);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.lineTo(0, h / 2 + deltaHeight);
    ctx.closePath();
    ctx.fill();
  };
  requestAnimFrame(waver);
};

waver();
/*波浪结束*/

window.onload = function () {
  var like = getById("like");
  var newQuote = getById("newQuote");
  var musicIcon = getById("musicIcon");
  var music = getById("music");

  randomQuote();
  var timer = setInterval(randomQuote, 15000);
  eventUtil.addHandler(newQuote, "click", randomQuote);
  // eventUtil.addHandler(musicIcon, "click", playMusic);
  likeFun();
};

//随机切换引用函数
function randomQuote() {
  var quoteText = getById("quoteText"),
    quoteAuthor = getById("quoteAuthor"),
    newQuote = getById("newQuote"),
    wrapper = getById("wrapper"),
    quoteLeft = getById("quoteLeft"),
    quoteLen = quoteArray.length,
    randomNumber = 0;

  randomNumber = Math.floor(Math.random() * quoteLen);
  quoteText.innerHTML = quoteArray[randomNumber].quote;
  quoteAuthor.innerHTML = "-- " + quoteArray[randomNumber].author;

  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  wrapper.style.cssText = "transition:background-color 1s; background-color: rgb(" + r + "," + g + "," + b + ")";
  quoteText.style.cssText = "transition:color 1s; color: rgb(" + r + "," + g + "," + b + ")";
  quoteAuthor.style.cssText = "transition:color 1s; color: rgb(" + r + "," + g + "," + b + ")";
  newQuote.style.cssText = "transition:background-color 1s; background-color: rgb(" + r + "," + g + "," + b + ")";
  quoteLeft.style.cssText = "transition:color 1s;  color: rgb(" + r + "," + g + "," + b + ")";
  like.style.cssText = "transition:color 1s;  color: rgb(" + r + "," + g + "," + b + ")";
}

//点击音乐暂停和播放
function playMusic() {
  if (!music.paused) {
    music.pause();
    musicIcon.className = "icon-volume-off";

  } else {
    music.play();
    musicIcon.className = "icon-volume-up";
  }
}
