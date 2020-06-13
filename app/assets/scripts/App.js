import "../styles/styles.css";
import "lazysizes";

import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
import { set } from "lodash";

let mobileMenu = new MobileMenu();
let revealOnScroll = new RevealOnScroll();
let stickyHeader = new StickyHeader();

//modal handler
let modal;

function modalImportSuccess(x) {
  modal = new x.default();
  setTimeout(() => modal.openModal(), 20);
}

function modalImportError() {
  console.log("There was a problem");
}

document.querySelectorAll(".open-modal").forEach((el) =>
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeof modal == "undefined") {
      e.preventDefault();
      import("./modules/Modal").then(modalImportSuccess).catch(modalImportError);
    } else {
      modal.openModal();
    }
  })
);

if (module.hot) {
  module.hot.accept();
}
