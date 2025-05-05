import { application } from "./application"
import ModalController from "./modal_controller"
import BookSearchController from "./book_search_controller"
application.register("modal", ModalController)
application.register("book-search", BookSearchController)
