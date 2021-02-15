class newsModal {
  constructor(title, date, content, authorId) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.authorId = authorId;
  }
}

module.exports.newsModal = newsModal;
