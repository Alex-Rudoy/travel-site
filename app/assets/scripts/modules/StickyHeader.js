import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header");
    this.pageSections = document.querySelectorAll(".page-section");
    this.scrollThrottle = throttle(this.runOnScroll, 100).bind(this);
    this.browserHeight = window.innerHeight;
    this.resizeDebounce = debounce(this.resizeTracker, 333).bind(this);
    this.previousScrollY = window.scrollY;

    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle).bind(this);
    window.addEventListener("resize", this.resizeDebounce).bind(this);
  }

  runOnScroll() {
    this.determineScrollDirection();

    if (window.scrollY > 60) {
      this.siteHeader.classList.add("site-header--dark");
    } else {
      this.siteHeader.classList.remove("site-header--dark");
    }

    this.pageSections.forEach((el) => this.menuItemHighlight(el));
  }

  determineScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = "down";
    } else {
      this.scrollDirection = "up";
    }
    this.previousScrollY = window.scrollY;
  }

  menuItemHighlight(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if (
        (scrollPercent < 18 && scrollPercent > -30 && this.scrollDirection == "down") ||
        (scrollPercent < 33 && this.scrollDirection == "up")
      ) {
        let matchingLink = el.getAttribute("data-matching-link");
        document
          .querySelectorAll(`.header-menu a:not(${matchingLink})`)
          .forEach((el) => el.classList.remove("is-current-link"));
        document.querySelector(matchingLink).classList.add("is-current-link");
      }
    }
    if (window.scrollY < 600) {
      document.querySelectorAll(`.header-menu a`).forEach((el) => el.classList.remove("is-current-link"));
    }
  }

  resizeTracker() {
    this.browserHeight = window.innerHeight;
  }
}

export default StickyHeader;
