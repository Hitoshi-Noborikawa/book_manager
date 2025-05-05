import { Controller } from "@hotwired/stimulus"
import { Modal } from "bootstrap"

// Connects to data-controller="modal"
export default class extends Controller {
  static values = { selector: String }
  
  connect() {
    this.modalEl = document.querySelector(this.selectorValue)
    this.bsModal = new Modal(this.modalEl, { backdrop: 'static' })
    this.element.addEventListener("turbo:frame-load", () => this.open())
  }

  open() {
    this.bsModal.show()
  }

  close() {
    this.bsModal.hide()
  }
}
