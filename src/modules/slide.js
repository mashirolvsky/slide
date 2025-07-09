import debounceScroll from "./debounce-scroll.js";

export default class Slide {
  constructor(wrapper, slide) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
    this.activeClass = "active";
  }

  transition(active) {
    this.slide.style.transition = active
      ? "transform 152ms cubic-bezier(0.6,0,0,1)"
      : "";
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
    this.transition(false);
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
    this.transition(true);
    this.changeOnEnd();
  }

  changeOnEnd() {
    if (this.dist.movement > 120) {
      this.activeNextSlide();
    } else if (this.dist.movement < 120) {
      this.activePrevSlide();
    }
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart, {
      passive: true,
    });
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd, { passive: true });
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slideIndexNav(index) {
    let last = this.slideArr.length - 1;
    this.index = {
      prev: index ? index - 1 : last,
      active: index,
      next: index === last ? last - last : index + 1,
    };
  }

  slideConfig() {
    this.slideArr = [...this.slide.children].map(item => {
      const position = this.slidePosition(item);
      return { position, item };
    });
  }

  changeSlide(index) {
    const active = this.slideArr[index];
    this.moveSlide(active.position);
    this.slideIndexNav(index);
    this.dist.finalPosition = active.position;
    this.changeActiveClass();
  }

  changeActiveClass() {
    this.slideArr.forEach(slide => {
      return slide.item.classList.remove(this.activeClass);
    });
    this.slideArr[this.index.active].item.classList.add(this.activeClass);
  }

  activePrevSlide() {
    if (this.index.prev === undefined) return;
    this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    if (this.index.next === undefined) return;
    this.changeSlide(this.index.next);
  }

  onResize() {
    setTimeout(() => {
      this.slideConfig();
      this.changeSlide(this.index.active);
    }, 600);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.onResize = debounceScroll(this.onResize.bind(this), 200);
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slideConfig();
    this.addResizeEvent();
    return this;
  }
}
