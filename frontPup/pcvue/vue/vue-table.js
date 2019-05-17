define([
  'require',
  'vue',
  'jQuery',
  'vueDomainPool',
  'vueBsTable'
], function (require, Vue, $, domainPool) {
  'use strict'
  Vue.component('cig-table', {
    props: ['columns', 'ajaxOptions', 'config', 'pageSize', 'loadingMessage', 'tableStyle'],
    template: '<bs-table ref="table"\
                :table-style="tableStyle"\
                :config="config"\
                :columns="columns"\
                :loading="loading"\
                :rows="rows"\
                :loading-message="loadingMessage"\
                :pager="pager"\
                @selectchange="selectChange"\
                @cellclick="cellclick"\
                @sorted="loadRows"\
                @pagerchange="loadRows">\
            </bs-table>',
    data: function () {
      return {
        loading: true,
        rows: [],
        pager: {
          total: 0,
          page: 1,
          size: this.pageSize || 10
        },
        ajax: null
      }
    },
    mounted: function () {
      this.loadRows()
    },
    watch: {
      ajaxOptions: function () {
        var pager = {
          total: 0,
          page: 1,
          size: this.pageSize || 10
        }
        if (this.pager.size) {
          pager.size = this.pager.size
        }
        this.pager = pager
        this.loadRows()
      }
    },
    methods: {
      cellclick: function (clickCell) {
        this.$emit('cellclick', clickCell)
      },
      selectChange: function () {
        this.$emit('selectchange')
      },
      loadRows: function () {
        this.$refs.table.resetState()
        var isValidOption = false
        if (this.ajaxOptions) {
          isValidOption = false
          for (var key in this.ajaxOptions) {
            if (this.ajaxOptions.hasOwnProperty(key)) {
              isValidOption = true
              break
            }
          }
        }
        if (!isValidOption) {
          return
        }
        if (this.ajax) {
          this.ajax.abort()
        }
        var ajaxOptions = $.extend({
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
        }, this.ajaxOptions)
        var sort = this.$refs.table.sort
        ajaxOptions.url = mixUrl(ajaxOptions.url, {
          offset: (this.pager.page - 1) * this.pager.size,
          limit: this.pager.size,
          orderby: (sort.type != 'default') ? sort.field : '',
          ordertype: (sort.type != 'default') ? sort.type : ''
        })
        // this.pageSize = this.pager.size; //页面条数不要子组件修改 VUE警告
        ajaxOptions.success = this.getRowsSuccess.bind(this)
        ajaxOptions.error = this.getRowsError.bind(this)
        this.loading = true
        this.ajax = $.ajax(ajaxOptions)

        function mixUrl (url, param) {
          var rquery = (/\?/)
          return url + (rquery.test(url) ? '&' : '?') + $.param(param)
        }
      },
      getRowsSuccess: function (res) {
        this.loading = false
        this.ajax = null
        if (res.success && res.data) {
          if (this.config.isRowSpan) {
            var filterColumns = {}
            for (var i = 0; i < this.columns.length; i++) {
              if (this.columns[i].isRowSpan) {
                filterColumns[this.columns[i].field] = {
                  key: this.columns[i].rowSpanKey ? this.columns[i].rowSpanKey : this.columns[i].field,
                  value: null
                }
              }
            }
            var rows = res.data.rows
            for (var j = 0; j < rows.length; j++) {
              for (var k in filterColumns) {
                if (filterColumns[k].value == null || filterColumns[k].value != rows[j][filterColumns[k].key]) {
                  filterColumns[k].value = rows[j][filterColumns[k].key]
                  rows[j][k] = {
                    value: rows[j][k],
                    isFirst: true,
                    rows: 1
                  }
                  filterColumns[k].index = j
                } else {
                  rows[filterColumns[k].index][k].rows++
                }
              }
            }
            this.$set(this, 'rows', rows)
          } else {
            this.$set(this, 'rows', res.data.rows)
          }
          this.$set(this.pager, 'total', res.data.total)
          this.$emit('pagerdatachange', res.data)
          // this.rows = res.data.rows;
          // this.pager.total = res.data.total;
        } else {
          this.getRowsError()
        }
      },
      getRowsError: function () {
        this.loading = false
        this.ajax = null
        this.$set(this, 'rows', [])
        this.$set(this.pager, 'total', 0)
        this.$set(this.pager, 'page', 1)
        // this.rows = [];
        // this.pager.total = 0;
        // this.pager.page = 1;
      }
    },
    computed: {
      checkList: function () {
        return this.$refs.table.checkList
      },
      selectedRow: function () {
        return this.$refs.table.selectedRow
      }
    }
  })
  Vue.component('cig-eplat-table', {
    props: ['columns', 'ajaxOptions', 'config', 'pageSize', 'loadingMessage'],
    template: '<bs-table ref="table"\
                :config="config"\
                :columns="columns"\
                :loading="loading"\
                :rows="rows"\
                :loading-message="loadingMessage"\
                :pager="pager"\
                @selectchange="selectChange"\
                @sorted="loadRows"\
                @pagerchange="loadRows">\
            </bs-table>',
    data: function () {
      return {
        loading: true,
        rows: [],
        pager: {
          total: 0,
          page: 1,
          size: this.pageSize || 10
        },
        ajax: null
      }
    },
    mounted: function () {
      this.loadRows()
    },
    watch: {
      ajaxOptions: function () {
        this.pager = {
          total: 0,
          page: 1,
          size: this.pageSize || 10
        }
        this.loadRows()
      }
    },
    methods: {
      selectChange: function () {
        this.$emit('selectchange')
      },
      loadRows: function () {
        this.$refs.table.resetState()
        var isValidOption = false
        if (this.ajaxOptions) {
          isValidOption = false
          for (var key in this.ajaxOptions) {
            if (this.ajaxOptions.hasOwnProperty(key)) {
              isValidOption = true
              break
            }
          }
        }
        if (!isValidOption) {
          return
        }
        if (this.ajax) {
          this.ajax.abort()
        }
        var ajaxOptions = $.extend({}, this.ajaxOptions)
        var sort = this.$refs.table.sort
        ajaxOptions.url = mixUrl(ajaxOptions.url, {
          pageNo: this.pager.page,
          pageSize: this.pager.size,
          orderby: (sort.type != 'default') ? sort.field : '',
          ordertype: (sort.type != 'default') ? sort.type : ''
        })
        ajaxOptions.success = this.getRowsSuccess.bind(this)
        ajaxOptions.error = this.getRowsError.bind(this)
        this.loading = true
        this.ajax = $.ajax(ajaxOptions)

        function mixUrl (url, param) {
          var rquery = (/\?/)
          return url + (rquery.test(url) ? '&' : '?') + $.param(param)
        }
      },
      getRowsSuccess: function (res) {
        this.loading = false
        this.ajax = null
        if (res.success && res.data) {
          if (this.config.isRowSpan) {
            var filterColumns = {}
            for (var i = 0; i < this.columns.length; i++) {
              if (this.columns[i].isRowSpan) {
                filterColumns[this.columns[i].field] = {
                  key: this.columns[i].rowSpanKey ? this.columns[i].rowSpanKey : this.columns[i].field,
                  value: null
                }
              }
            }
            var rows = res.data.rows
            for (var j = 0; j < rows.length; j++) {
              for (var k in filterColumns) {
                if (filterColumns[k].value == null || filterColumns[k].value != rows[j][filterColumns[k].key]) {
                  filterColumns[k].value = rows[j][filterColumns[k].key]
                  rows[j][k] = {
                    value: rows[j][k],
                    isFirst: true,
                    rows: 1
                  }
                  filterColumns[k].index = j
                } else {
                  rows[filterColumns[k].index][k].rows++
                }
              }
            }
            this.$set(this, 'rows', rows)
          } else {
            this.$set(this, 'rows', res.data.rows)
          }
          this.$set(this.pager, 'total', res.data.total)
          this.$emit('pagerdatachange', res.data)
          // this.rows = res.data.rows;
          // this.pager.total = res.data.total;
        } else {
          this.getRowsError()
        }
      },
      getRowsError: function () {
        this.loading = false
        this.ajax = null
        this.$set(this, 'rows', [])
        this.$set(this.pager, 'total', 0)
        this.$set(this.pager, 'page', 1)
        // this.rows = [];
        // this.pager.total = 0;
        // this.pager.page = 1;
      }
    },
    computed: {
      checkList: function () {
        return this.$refs.table.checkList
      },
      selectedRow: function () {
        return this.$refs.table.selectedRow
      }
    }
  })
  var helper = {
    getDomainDisplayComponent: function (field, domainName) {
      return {
        props: ['row'],
        mixins: [
          helper.getDomainMixin(domainName)
        ],
        template: '<span>{{text}}</span>',
        computed: {
          text: function () {
            var value = this.row[field]
            return domainPool.getTextByValue(this.domain, value)
          }
        }
      }
    },
    getDomainDisplayMultiComponent: function (field, domainName) {
      return {
        props: ['row'],
        mixins: [
          tableHelper.getDomainMixin(domainName)
        ],
        template: '<span>{{text}}</span>',
        computed: {
          text: function () {
            var value = this.row[field] ? this.row[field].split(',') : []
            var text = ''
            for (var i = 0; i < value.length; i++) {
              if (i != 0) text += ','
              text += domainPool.getTextByValue(this.domain, value[i])
            }
            return text
          }
        }
      }
    },
    getDomainMixin: function (domainName) {
      return {
        data: function () {
          var domains = domainPool.getDomainOptions([domainName])
          return {
            domain: domains[domainName]
          }
        }
      }
    }
  }
  return {
    helper: helper
  }
})
