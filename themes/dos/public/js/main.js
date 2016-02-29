'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Typer = function () {
  function Typer(options) {
    _classCallCheck(this, Typer);

    this.defaults = {
      strings: [],
      elementSelector: null,
      stringsElemSelector: null
    };

    this.options = Object.assign(this.defaults, options || {});

    this.elem = document.querySelector(this.options.elementSelector);
    if (this.options.stringsElemSelector) {
      this._initStrings(this.options.stringsElemSelector);
    }
    this._addCursor();
    this.strings = this.options.strings;

    this.currentStringIndex = 0;
    this.rotateStrings();
  }

  _createClass(Typer, [{
    key: 'rotateStrings',
    value: function rotateStrings(index) {
      var _this = this;

      index = index || 0;
      setTimeout(function () {
        _this.type(_this.strings[_this.currentStringIndex]);
      }, 500);
    }
  }, {
    key: 'type',
    value: function type(string, charPos) {
      var _this2 = this;

      charPos = charPos || 0;
      this.elem.innerHTML = string.substring(0, charPos);
      if (string.length > charPos) {
        setTimeout(function () {
          _this2.type(string, ++charPos);
        }, 200);
      } else {
        if (this.currentStringIndex < this.strings.length - 1) {
          setTimeout(function () {
            _this2.backspace();
          }, 1000);
        }
      }
    }
  }, {
    key: 'backspace',
    value: function backspace() {
      var _this3 = this;

      var string = this.elem.innerHTML;
      if (string.length > 0) {
        setTimeout(function () {
          _this3.elem.innerHTML = string.substr(0, string.length - 1);
          _this3.backspace();
        }, 100);
      } else {
        if (this.currentStringIndex < this.strings.length - 1) {
          this.currentStringIndex++;
          this.rotateStrings();
        } else {
          this.currentStringIndex = 0;
        }
      }
    }
  }, {
    key: '_initStrings',
    value: function _initStrings(stringsElemSelector, stringsElemParseFunc) {
      var stringsElem = document.querySelectorAll(stringsElemSelector);
      if (stringsElem.length > 1) {
        stringsElem[0].parentElement.style.display = 'none';
      } else {
        stringsElem.style.display = 'none';
      }
      this.options.strings = Array.from(stringsElem).map(function (elem) {
        return elem.innerHTML;
      });
    }
  }, {
    key: '_addCursor',
    value: function _addCursor() {
      var cursorHtml = '<span class=\'typer-cursor\'>_<span>';
      this.elem.insertAdjacentHTML('afterend', cursorHtml);
    }
  }]);

  return Typer;
}();

var typer = new Typer({ elementSelector: '.typer', stringsElemSelector: '.typer-items li' });

document.querySelector('.avatar').classList.add('hidden');
document.querySelector('.social').classList.add('hidden');

document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(function () {
    document.querySelector('.avatar').classList.remove('hidden');
    document.querySelector('.avatar').classList.add('animated', 'bounce');
    document.querySelector('.social').classList.remove('hidden');
    document.querySelector('.social').classList.add('animated', 'fadeInUp');
  }, 500);
});