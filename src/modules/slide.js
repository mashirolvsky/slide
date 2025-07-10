import debounceScroll from "./debounce-scroll.js";

export class Slide {
  constructor(wrapper, slide) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }
  onStart(e) {
<<<<<<< HEAD
    if (e.type === "mousedown") return this.onMouseEvent(e);
    if (e.type === "touchstart") return this.onTouchEvent(e);
    this.transition(false);
  }

  onMouseEvent(e) {
=======
>>>>>>> parent of 76259b8 (updt-distance: Criação dos calculos de distâncias dos eventos para os slides)
    e.preventDefault();
    console.log("Clicked!");
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onTouchEvent(e) {
    this.dist.startX = e.changedTouches[0].clientX;
    this.wrapper.addEventListener("touchmove", this.onMove, { passive: true });
  }

  onMove(e) {
    console.log("Moved");
  }

  onEnd(e) {
    console.log("Ended");
    this.wrapper.removeEventListener("mousemove", this.onMove);
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
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);

    this.onResize = debounceScroll(this.onResize.bind(this), 200);
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slideConfig();
    this.addResizeEvent();
    this.changeSlide(2);
    return this;
  }
}

export class SlideNav extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper);
    this.bindControlEvent();
  }

  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
    this.createControl();
  }

  addArrowEvent() {
    this.prevElement.addEventListener("click", this.activePrevSlide);
    this.nextElement.addEventListener("click", this.activeNextSlide);
  }

  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";
    this.slideArr.forEach((element, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}"></a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener("click", e => {
      e.preventDefault();
      console.log(index);
      this.changeSlide(index);
      this.activeControlItem();
    });
  }

  activeControlItem() {
    // this.controlArray.forEach(slide => {
    //   return slide.classList.remove(this.activeClass);
    // });
    // this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    console.log(this.controlArray);
    this.controlArray.forEach(this.eventControl);
  }

  bindControlEvent() {
    this.addControl = this.addControl.bind(this);
  }
}
