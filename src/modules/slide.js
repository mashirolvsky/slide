export default class Slide {
  constructor(wrapper, slide) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }
  moveSlide(posiX) {
    this.dist.movedPosition = posiX;
    this.slide.style.transform = `translate3d(${posiX}px, 0, 0)`;
  }
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.84;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(e) {
    if (e.type === "mousedown") return this.onMouseEvent(e);
    if (e.type === "touchstart") return this.onTouchEvent(e);
  }

  onMouseEvent(e) {
    e.preventDefault();
    this.dist.startX = e.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onTouchEvent(e) {
    this.dist.startX = e.changedTouches[0].clientX;
    this.wrapper.addEventListener("touchmove", this.onMove, { passive: true });
  }

  onMove(e) {
    const eventType =
      e.type === "mousemove" ? e.clientX : e.changedTouches[0].clientX;
    const lastPosition = this.updatePosition(eventType);
    this.moveSlide(lastPosition);
  }

  onEnd(e) {
    const moveType = e.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movedPosition;
  }
  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart, {
      passive: true,
    });
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd, { passive: true });
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return margin;
  }

  slideConfig() {
    this.slideArr = [...this.slide.children].map(item => {
      const position = this.slidePosition(item);
      return {
        position,
        item,
      };
    });
    console.log(this.slideArr);
  }

  init() {
    this.slideConfig();
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
