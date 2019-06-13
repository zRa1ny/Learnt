var IssueModel = BaseModel.extend({
  objectClass: 'file'
})
var IssueCollection = BaseCollection.extend({
  model: IssueModel
})
var IssueItemView = Backbone.View.extend({
  _template: _.template($('#issue-item-view').html()),
  tagName: 'a',
  className: 'list-group-item',
  attributes: {
    href: '#new'
  },
  render: function () {
    var json = this.model.toJSON()
    this.$el.html(this._template(json))
    return this
  }
})
var IssueCollectionView = BaseCollectionView.extend({
  el: '#issue-list',
  subView: IssueItemView,
  initialize: function () {
    this._initialize()
  }
})
var PageIssueList = BasePage.extend({
  el: '#page-issue-list',
  initialize: function () {
    this.IssueCollection = new IssueCollection()
    this.IssueCollectionView = new IssueCollectionView({
      collection: this.IssueCollection
    })
    this.IssueCollection.fetch({
      reset: true
    })
  }
})
var PageIssueCreate = BasePage.extend({
  el: '#page-issue-create'
})
var PageIssueEdit = BasePage.extend({
  el: '#page-issue-edit'
})
var AppRouter = Backbone.Router.extend({
  initialize: function () {
    this.PageIssueList = new PageIssueList()
    this.PageIssueCreate = new PageIssueCreate()
    this.PageIssueEdit = new PageIssueEdit()
  },
  routes: {
    'issue/:id': 'issueEdit',
    "new": 'issueCreate',
    '': 'issueList'
  },
  issueEdit(id) {
    console.log(id)
    this.hideAllPages()
    this.PageIssueEdit.show()
  },
  issueCreate() {
    console.log('creat')
    this.hideAllPages()
    this.PageIssueCreate.show()
  },
  issueList() {
    this.hideAllPages()
    this.PageIssueList.show()
  },
  hideAllPages() {
    this.PageIssueEdit.hide()
    this.PageIssueCreate.hide()
    this.PageIssueList.hide()
  }
})
new AppRouter()
Backbone.history.start()