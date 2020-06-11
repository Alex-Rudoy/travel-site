import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class RevealOnScroll {
  constructor() {
    this.featureItems = document.querySelectorAll(".feature-item");
    this.testimonialItems = document.querySelectorAll(".testimonial");
    this.scrollThrottle = throttle(this.scrollTo, 200).bind(this);
    this.browserHeight = window.innerHeight;
    this.resizeDebounce = debounce(this.resizeTracker, 333);
    this.itemsToReveal = this.featureItems.length + this.testimonialItems.length;

    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener("resize", this.resizeDebounce);
  }

  scrollTo() {
    this.featureItems.forEach((el) => {
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if (scrollPercent < 90 && el.classList.contains("feature-item--hidden")) {
        el.classList.remove("feature-item--hidden");
        this.itemsToReveal--;
      }
    });
    this.testimonialItems.forEach((el) => {
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if (scrollPercent < 90 && el.classList.contains("testimonial--hidden")) {
        el.classList.remove("testimonial--hidden");
        this.itemsToReveal--;
      }
    });
    if (this.itemsToReveal == 0) {
      window.removeEventListener("scroll", this.scrollThrottle);
    }
  }

  resizeTracker() {
    this.browserHeight = window.innerHeight;
    console.log(this.browserHeight);
  }
}

export default RevealOnScroll;
