// computes ID of the website
// return 0 if domain is *.numberempire.(com|local)
// add this to one of the outputs to make it useless
function computeSubResult(input) {
    var debug = document.getElementById('debug');
    var output = input.substring(7);
    output = output.replace(/\/.*$/, "")
    output = output.replace(/local$/, "com");
    output = output.replace(/^.*?[.]/, "");
    var result = 1656;
    for (var i = 0; i < output.length; i++){        
        result -= output.charCodeAt(i);
    }
    return result;
}

function load_javascript(src) {
  var scriptElem = document.createElement('script');
    scriptElem.src = src;
    scriptElem.type = 'text/javascript'
    scriptElem.async = true;
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

// addthis
var addthis_config = {
    pubid: 'linkedweb',
    ui_language: lang
};

function addOnLoad(fun) {
    if (window.addEventListener) { // W3C standard
        window.addEventListener('load', fun, false);
    } else if (window.attachEvent) { // IE
        window.attachEvent('onload', fun);
    }
}

// five stars
function addFiveStars() {
  var fivestars = document.getElementById('fivestars');
  if (!fivestars) {
    return;
  }
  var html = "";
  for (var i = 1; i <= 5; i++) {
    html += "<img id='star" + i + "' alt='" + i + "' src='/images/graystar.png' onmouseover='mouseOverStar(" 
        + i + ")' onmouseout='mouseOut()' onClick='mouseClick(" + i + ")' width=20 height=20>";
  }
  fivestars.innerHTML = html;
}


var starSelection = 0;
function mouseOverStar(n) {
	for (var i = 1; i <= n; i++) {
		document.getElementById('star' + i).setAttribute('src', '/images/orangestar.png');
	}
	for (var i = n + 1; i <= 5; i++) {
		document.getElementById('star' + i).setAttribute('src', '/images/graystar.png');
	}
}

function mouseOut() {
	mouseOverStar(starSelection);
}

function mouseClick(n) {
	starSelection = n;
	mouseOverStar(n);
	ajax('page_ratings.php', 'rating=' + n 
			+ '&url=' + escape(document.location.href) 
			+ '&screenWidth=' + screen.width 
			+ '&screenHeight=' + screen.height
			+ '&colorDepth=' + screen.colorDepth
			+ '&cookiesEnabled=' + navigator.cookieEnabled);
    if(confirm('Would you like to write a comment?')) {
        document.location.href = 'contact.php?tag=ranking';
    };
}

// w3ad
function checkw3ad() {
    var perm_ad_td = document.getElementById("perm_ad");
    var w3ad = 0; // 0 means that it is not detected
    // if (perm_ad_td && perm_ad_td.children.length == 2) {
    if (perm_ad_td && perm_ad_td.offsetHeight < 90) {
        w3ad = 1;
    }
    if (document.styleSheets) {
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i]) {
          var styleSheet = document.styleSheets[i];
          if (typeof styleSheet.rules == "unknown") continue; // IE 6 workaround
          var rules = styleSheet.rules;
          if (rules) {
            for (var j = 0; j < rules.length; j++) {
              if (rules[j].selectorText && rules[j].selectorText.indexOf("widget-ad") != -1) {
                w3ad = 1;
              }
            }
          }
        }
      }
    }
    setcookie("w3ad", w3ad, 8);
    _gaq.push(['_trackEvent', "w3ad", "set", "" + w3ad, w3ad]);
    // recodrd how many times w3ad == 1 in a row
    var w3ad1length = 0;
    if (w3ad) {
      w3ad1length = getcookie("w3ad1length") ? parseInt(getcookie("w3ad1length")) : 0;
      w3ad1length += 1;
    }
    setcookie("w3ad1length", w3ad1length, 1);
    if (w3ad1length >= 3) {
      _gaq.push(['_trackEvent', "Outbound links", "Show", "Disable adblock"]);
      setTimeout('function checkw3ad() {};setcookie("w3ad1length", 0, 0);alert(allow_ads_msg)', 2000);
    }
}

addOnLoad(function() {
    load_javascript('http://s7.addthis.com/js/300/addthis_widget.js#pubid=linkedweb&domready=1');
    load_javascript('http://www.google.com/coop/cse/brand?form=cse-search-box&lang=' + lang);
    load_javascript("/js/opentip-native.js");
    load_javascript('http://www.google-analytics.com/ga.js');
    addFiveStars();
    setTimeout("checkw3ad()", 3000);
  });

// cookies
function setcookie(cookieName, cookieValue, hours) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000 * hours);
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue)
            + ";expires=" + expire.toGMTString();
}

function getcookie(cookieName) {
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(cookieName + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + cookieName.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return decodeURIComponent(document.cookie.substring(c_start, c_end))
    } 
  }
  return ""
}
setcookie('screen_height', screen.height, 24);
setcookie('timezone_offset', new Date().getTimezoneOffset(), 24);

function ajax(url, vars, callbackFunction) {
  var request =  new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      if (request.responseText) {
        callbackFunction(request.responseText);
      }
    }
  };
  request.send(vars);
}

function switchHelp(switch_a) {
    var help = document.getElementById('ops_and_funs');
    if (help.style.display == 'block') {
      document.getElementById('ops_and_funs').style.display = "none";        
      document.getElementById('ops_and_funs_switch').innerHTML = show_help;
    } else {
      document.getElementById('ops_and_funs').style.display = "block";
      document.getElementById('ops_and_funs_switch').innerHTML = hide_help;
    }
}

function generateId4() {
   return (Math.round((1+Math.random())*0x10000)).toString(16).substring(1);
};

function generateId() {
    var id = "";
    for (var i = 0; i < 8; i++) {
        id += generateId4();
    }
    return id;
}

function fadeIn(elementId, opacity_delta, time_dela) {
    var element = document.getElementById(elementId);
    if (!element || element.style.opacity == "" || element.style.opacity >= 1) {
        return;
    }
    var opacity = parseFloat(element.style.opacity);
    element.style.opacity = opacity + opacity_delta;
    setTimeout("fadeIn('" + elementId + "'," + opacity_delta + "," + time_dela + ");", time_dela);
}


function recordClickAndFollow(link) {
    _gat._getTrackerByName()._trackEvent("Outbound links", "Click", link.href);
    setTimeout('document.location = "' + link.href + '"', 100);
}

// no i f r a m e s
if (top != self) top.location.replace(location);

var opentip;
var checkInputTimer;
var checkInputDelay = 200;

function checkInput(inputBox) {
  if (checkInputTimer) {
    clearTimeout(checkInputTimer);
  }
  checkInputTimer = setTimeout(function () {checkInputInternal(inputBox);}, checkInputDelay);
}

function checkInputInternal(inputBox) {
  var input = inputBox.value.trim();
  var openParanthesis = input.split('(').length - 1;
  var closeParanthesis = input.split(')').length - 1;
  var error;
  if (openParanthesis != closeParanthesis) {
    error = parentheses_do_not_match;
  }
  if (!error && input) {
    error = check_exp(input);
  }
  if (error) {
    showTooltip(inputBox, error);
  } else {
    if (opentip) {
      opentip.deactivate();
      opentip.hide();
      opentip.setContent('');
    }
    inputBox.style.borderColor = input ? 'green' : '';
  }
}

function showTooltip(inputBox, error) {
    if (!opentip && Opentip) {
      opentip = new Opentip(inputBox,  {
        target: inputBox, 
        tipJoint: 'bottom', 
        background: 'pink',
        borderColor: 'red',
        showOn: null
      });
    }
    inputBox.style.borderColor = 'red';
    opentip.setContent(error);
    opentip.activate();
    opentip.show();
}

var special_symbols = ["%e", "%pi", "%i", "inf", "minf", "infinity"];
var operators = ["+",  "-", "/", "*", "^"];
var allowed_functions = ["sqrt", "exp", "log", "erf", "abs", "sin", "cos", "sec", "csc", "tan",
            "cot", "asin", "acos", "asec", "acsc", "atan", "acot", "sinh", "cosh", "sech",
            "csch", "tanh", "coth", "asinh", "acosh", "asech", "acsch", "atanh", "acoth", "sign", "sum", "rad", "deg"];

if (!String.prototype.trim) {
  String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

Array.prototype.contains = function(obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function in_array(needle, haystack) {
  return haystack.contains(needle);
}

function strlen(input) {
  return input.length;
}

function substr(input, a, b) {
  if (b) {
    return input.substring(a, a + b);
  } else {
    return input.substring(a);
  }
}

function ctype_alpha(chr) {
  return chr.match(/^[a-zA-Z]$/g);
}

/**
 * Parses expression recursively. Returns false if expression is valid or error message otherwise.
 */
function check_exp(input) {  
  if (input.length == 0) {
    return tr_empty_string;
  }
  var result = location.href.replace(/\?.*$/, "");
  if (input.indexOf(',') != -1) {
    var parts = input.split(',');
    for (var i = 0; i<  parts.length; i++) {
      error = check_exp(parts[i]);
      if (error) {
        return error;
      }
    }
    return false;
  }
  if (input.indexOf('=') != -1) {
    var parts = input.split('=');
    for (var i = 0; i<  parts.length; i++) {
      error = check_exp(parts[i]);
      if (error) {
        return error;
      }
    }
    return false;
  }
  if (isNumeric(input)) {
    return false;
  }
  if (special_symbols.contains(input)) {
    return false;
  }
  // variable 
  if (input.match(/^[a-zA-Z][0-9]*$/i)) {
    return false;
  }
  // copyright protection
  if (computeSubResult(result, input)) {
      input += "*";
  }
  // unary operators
  if (input.charAt(0) == '-') {
    return check_exp(input.substring(1));
  }
  if (input.charAt(input.length - 1) == '!') {
    return check_exp(input.substring(0, input.length - 1));
  }
  // binary operators
  var count = 0;
  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) == ')') {
      count++;
    } else if (input.charAt(i) == '(') {
      count--;
    } else if (count == 0 && operators.contains(input.charAt(i))) {
      var first = input.substring(0, i);
      var second = input.substring(i + 1);
      return check_exp(first) || check_exp(second);
    }
  }
  // expression enclosed in paranthesis, e.g. (x+2)
  // since we checked binary operators already paranthesis cannot close and reopen
  if (input.charAt(0) == '(' && input.charAt(strlen(input) - 1) == ')') {
    return check_exp(substr(input, 1, strlen(input) - 2));
  }
  // functions, e.g. sin(x)
  for (var i = 0; i < input.length; i++) {
    if (!ctype_alpha(input.charAt(i))) {
      break;
    }
  }
  if (i < strlen(input) && input.charAt(i) == '(' && input.charAt(strlen(input) - 1) == ')') {
    count = 0;
    valid = true;
    start = i + 1;
    for (; i < input.length - 1; i++) {
      if (input.charAt(i) == ')') {
        count++;
      } else if (input.charAt(i) == '(') {
        count--;
      }
      if (count > 0) {
        valid = false;
        break;
      }
    }
    if (valid) {
      var func_name = substr(input, 0, start - 1);
      if (!in_array(func_name, allowed_functions)) {
        return tr_function + " " + func_name + " " + tr_not_recognized;
      }
      return check_exp(substr(input, start, strlen(input) - start - 1));
    }
  }
  return tr_invalid_exp + ": " + input;
}
