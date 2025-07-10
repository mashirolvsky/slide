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
    this.wrapper.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.65;
    return this.dist.finalPosition - this.dist.movement;
  }
  onStart(e) {
    e.preventDefault();
    this.dist.startX = e.clientX;
    console.log(this.dist.startX);
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(e) {
    const finalPosition = this.updatePosition(e.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(e) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.dist.finalPosition = this.dist.movedPosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
