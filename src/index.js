import Slide from "./modules/slide.js";

const slide = new Slide(".slide", ".slide-wrapper", "active");
slide.init();

slide.changeSlide(5);
