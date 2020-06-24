class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector(".site-header__menu-icon");
    this.menuContent = document.querySelector(".site-header__menu-content");
    this.siteHeader = document.querySelector(".site-header");
    this.navLink1 = document.querySelector("#our-beginning-link");
    this.navLink2 = document.querySelector("#features-link");
    this.navLink3 = document.querySelector("#testimonials-link");
    this.logo = document.querySelector(".site-header__logo");
    this.events();
  }

  events() {
    this.menuIcon.addEventListener("click", () => this.toggleMenu());
    this.navLink1.addEventListener("click", () => this.toggleMenu());
    this.navLink2.addEventListener("click", () => this.toggleMenu());
    this.navLink3.addEventListener("click", () => this.toggleMenu());
    document.addEventListener("DOMContentLoaded", this.preventFlash.bind(this));
  }

  preventFlash() {
    this.menuContent.classList.add("site-header__menu-content--loaded");
    this.logo.classList.add("site-header__logo--loaded");
  }

  toggleMenu() {
    this.menuContent.classList.toggle("site-header__menu-content--visible");
    this.siteHeader.classList.toggle("site-header--visible");
    this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;
