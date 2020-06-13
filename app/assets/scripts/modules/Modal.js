class Modal {
  constructor() {
    this.injectHTML();
    this.closeIcon = document.querySelector(".modal__close");
    this.modal = document.querySelector(".modal");

    this.events();
  }

  events() {
    // listen for close click
    this.closeIcon.addEventListener("click", () => this.closeModal());

    // listen for esc click
    document.addEventListener("keyup", (e) => this.keyboardClose(e));

    window.onpopstate = function () {
      document.querySelector(".modal").classList.remove("modal--visible");
      document.querySelector("body").classList.remove("blocked");
    };
  }

  injectHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="modal">
        <div class="modal__close">X</div>
        <div class="modal__inner">
          <h2 class="section-title section-title--blue section-title--less-margin">
            <img src="assets/images/icons/mail.svg" class="section-title__icon" /> Get in <strong>Touch</strong>
          </h2>
          <div class="wrapper wrapper--narrow">
            <p class="modal__description">
              We will have an online order system in place soon. Until then, connect with us on any of the platforms
              below!
            </p>
          </div>

          <div class="social-icons">
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook" /></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter" /></a>
            <br />
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram" /></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube" /></a>
          </div>
        </div>
      </div>`
    );
  }

  openModal(e) {
    this.modal.classList.add("modal--visible");
    document.querySelector("body").classList.add("blocked");
    history.pushState({ modal: 1 }, "modal", "?modal");
  }

  closeModal() {
    this.modal.classList.remove("modal--visible");
    document.querySelector("body").classList.remove("blocked");
    history.back();
  }

  keyboardClose(e) {
    if (e.keyCode == 27 || e.keyCode == 8) {
      this.closeModal();
    }
  }
}

export default Modal;
