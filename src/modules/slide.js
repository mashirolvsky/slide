export class Slide {
  cosntructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  onStart(e) {
    e.preventDefault();
  }

  addSlideEvents() {
    this.wrapper.addEventListener("click", this.onStart);
  }

  init() {
    this.addSlideEvents();
    return this;
  }
}
