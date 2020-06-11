import "../styles/styles.css";

import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

let mobileMenu = new MobileMenu();
let revealOnScroll = new RevealOnScroll();
let stickyHeader = new StickyHeader();

if (module.hot) {
  module.hot.accept();
}
