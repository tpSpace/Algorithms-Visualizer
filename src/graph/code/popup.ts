const warn = document.getElementsByClassName('warning')[0] as HTMLDivElement;
const FADE_IN_TIME = 1000; //ms
const FADE_OUT_TIME = 1000;
const APPEAR_TIME = 8000;


export default function createText(message: string, color: string) {
  warn.textContent = message;
  warn.style.color = color;
  warn.style.opacity = '0';
  warn.style.top = '-50px';

  fadeIn(warn, FADE_IN_TIME);

  // Fade out after 10 seconds with 2 second fade-out time
  setTimeout(function() {
    fadeOut(warn, FADE_OUT_TIME);
  }, APPEAR_TIME);
}

function fadeIn(element: HTMLElement, duration: number) {
  var interval = 10;
  var opacity = 0;
  var targetOpacity = 1;
  var delta = (interval / duration) * (targetOpacity - opacity);

  var timer = setInterval(function() {
    opacity += delta;
    element.style.opacity = String(opacity);

    if (opacity >= targetOpacity) {
      clearInterval(timer);
      animate(element, 'rise', FADE_IN_TIME);
    }
  }, interval);
}

function fadeOut(element: HTMLElement, duration: number) {
  var interval = 10;
  var opacity = 1;
  var targetOpacity = 0;
  var delta = (interval / duration) * (opacity - targetOpacity);

  var timer = setInterval(function() {
    opacity -= delta;
    element.style.opacity = String(opacity);

    if (opacity <= targetOpacity) {
      clearInterval(timer);
      animate(element, 'fall', FADE_OUT_TIME);
    }
  }, interval);
}

function animate(element: HTMLElement, direction: string, duration: number) {
  var interval = 10;
  var start = parseInt(element.style.top);
  var end:number;

  if (direction === 'rise') {
    end = 0;
  } else {
    end = -50;
  }

  var delta = (interval / duration) * (end - start);

  var timer = setInterval(function() {
    start += delta;
    element.style.top = String(start) + 'px';

    if ((direction === 'rise' && start >= end) || (direction === 'fall' && start <= end)) {
      clearInterval(timer);
    }
  }, interval);
}
