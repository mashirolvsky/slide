export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlide(distX) {
    this.dist.movedPosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.65;
    return this.dist.finalPosition - this.dist.movement;
  }
  onStart(e) {
    let movetype;
    if (e.type === "mousedown") {
      e.preventDefault();
      this.dist.startX = e.clientX;
      movetype = "mousemove";
    } else {
      this.dist.startX = e.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wrapper.addEventListener(movetype, this.onMove, { passive: true });
  }

  onMove(e) {
    const pointerPosition =
      e.type === "mousemove" ? e.clientX : e.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(e) {
    const movetype = e.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(movetype, this.onMove, { passive: true });
    this.dist.finalPosition = this.dist.movedPosition;
    this.switchSlideOnEnd();
  }

  switchSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      console.log(this.index);
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      console.log(this.index);
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map(element => {
      const position = this.slidePosition(element);
      return {
        element,
        position,
      };
    });
  }

  slideIndexNav(index) {
    let slideLength = index.length + 1;
    this.index = {
      prev: index ? index - 1 : slideLength,
      active: index,
      next: index === slideLength ? slideLength - 1 : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slideIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }
  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
