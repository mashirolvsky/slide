import { SlideNav } from "./modules/slide.js";

const slide = new SlideNav(".slide", ".slide-wrapper", "active");
slide.init();

slide.addArrow(".prev", ".next");

slide.addControl();

console.log(slide);
