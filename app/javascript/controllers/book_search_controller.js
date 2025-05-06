import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="book-search"
export default class extends Controller {
  static targets = ["q", "title", "author", "error", "results", "spinner", "button", "success"]

  async search(e) {
    e.preventDefault()
    this.errorTarget.textContent = ""
    this.successTarget.classList.add("visually-hidden")
    this.#showSpinner(true)
    this.#toggleButton(true)

    const q = this.qTarget.value.trim()
    if (!q) {
      this.#doneLoading()
      this.errorTarget.textContent = "キーワードを入力してください"
      return
    }

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`)
      const json = await res.json()
      const doc = json.docs && json.docs[0]

      if (doc) {
        const title = doc.title || ""
        const author = (doc.author_name && doc.author_name[0])
        this.titleTarget.value = title
        this.authorTarget.value = author
        this.successTarget.textContent = `検索に成功しました。タイトル「${title}」、著者「${author}」を設定しました。`
        this.successTarget.classList.remove("visually-hidden")
      } else {
        this.errorTarget.textContent = "該当する書籍が見つかりませんでした"
      }
    } catch (err) {
      console.error(err)
      this.errorTarget.textContent = "検索に失敗しました。後でもう一度試してください。"
    } finally {
      this.#doneLoading()
    }
  }

  #showSpinner(show) {
    this.spinnerTarget.classList.toggle("visually-hidden", !show)
  }

  #toggleButton(disabled) {
    this.buttonTarget.disabled = disabled
  }

  #doneLoading() {
    this.#showSpinner(false)
    this.#toggleButton(false)
  }
}
