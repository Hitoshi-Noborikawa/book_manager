import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="book-search"
export default class extends Controller {
  static targets = ["q", "title", "author", "error"]

  async search(e) {
    e.preventDefault()
    this.errorTarget.textContent = ""

    const query = this.qTarget.value.trim()
    if (!query) {
      this.errorTarget.textContent = "キーワードを入力してください"
      return
    }

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      const json = await res.json()
      const doc = json.docs && json.docs[0]

      if (doc) {
        this.titleTarget.value = doc.title || ""
        this.authorTarget.value = (doc.author_name && doc.author_name[0])
        this.errorTarget.textContent = ""
      } else {
        this.titleTarget.value = ""
        this.authorTarget.value = ""
        this.errorTarget.textContent = "該当する書籍が見つかりませんでした"
      }
    } catch (err) {
      console.error(err)
      this.errorTarget.textContent = "検索に失敗しました。後でもう一度試してください。"
    }
  }
}
