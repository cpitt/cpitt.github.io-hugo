class Typer {
  constructor(options){
    this.options = Object.assign(this.defaults, options || {})

    this.elem = document.querySelector(this.options.elementSelector);
    if(this.options.stringsElemSelector){
      this._initStrings(this.options.stringsElemSelector);
    }
    this._addCursor();
    this.strings = this.options.strings;

    this.currentStringIndex = 0;
    this.rotateStrings();
  }

  rotateStrings(index){
    index = index || 0;
    setTimeout(()=>{ this.type(this.strings[this.currentStringIndex]); }, 500)
  }

  type(string, charPos){
    charPos = charPos || 0;
    this.elem.innerHTML = string.substring(0, charPos);
    if(string.length > charPos){
      setTimeout(()=>{
        this.type(string, ++charPos);
      }, 200)
    } else {
      if(this.currentStringIndex < this.strings.length -1){
        setTimeout(()=>{  this.backspace() }, 1000)
      }
    }
  }

  backspace(){
    let string = this.elem.innerHTML;
    if(string.length > 0){
      setTimeout(()=>{
        this.elem.innerHTML = string.substr(0, string.length-1);
        this.backspace();
      }, 100);
    } else {
      if(this.currentStringIndex < this.strings.length - 1){
        this.currentStringIndex++;
        this.rotateStrings()
      } else {
        this.currentStringIndex = 0;
      }
    }
  }


  defaults = {
    strings: [],
    elementSelector: null,
    stringsElemSelector: null,
  }

  _initStrings(stringsElemSelector, stringsElemParseFunc){
    let stringsElem = document.querySelectorAll(stringsElemSelector);
    if ( stringsElem.length > 1 ){
      stringsElem[0].parentElement.style.display = 'none';
    } else {
      stringsElem.style.display = 'none';
    }
    this.options.strings = Array.from(stringsElem).map((elem)=>{
      return elem.innerHTML;
    })
  }
  _addCursor(){
    let cursorHtml= `<span class=\'typer-cursor\'>_<\span>`;
    this.elem.insertAdjacentHTML('afterend', cursorHtml);
  }
}


var typer = new Typer({ elementSelector: '.typer', stringsElemSelector: '.typer-items li' });

document.querySelector('.avatar').classList.add('hidden')
document.querySelector('.social').classList.add('hidden')

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(()=>{
    document.querySelector('.avatar').classList.remove('hidden')
    document.querySelector('.avatar').classList.add('animated', 'bounce')
    document.querySelector('.social').classList.remove('hidden')
    document.querySelector('.social').classList.add('animated', 'fadeInUp')
  }, 500)
});
