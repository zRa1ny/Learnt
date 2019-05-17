define([
  'require',
  'vue',
  'jQuery',
  'vueDomainPool',
  'vueBsList',
  'vueBsPop',
  'css!cssTableFilter',
  'vueCigSelect'
], function (require, Vue, $, domainPool) {
  'use strict'
  /**
   * 通用查询条件，按照filters的设置进行
   * props:
   *  filters {name:"gender",text:"性别",all:true,type:"options",options:[{text:"男",value:"01"}]}
   *      type="options", options:[{text:"",value:""}]
   *      type="domain", all:true, domainName:"",options:[] //options = [] 必须写，后面会自动获取并填充
   *      type="custom", data:{}, component:"<input v-model='valueProxy' :value='valueProxy' :data='filter'>" //用data属性接收filter,用model双向绑定选中值
   *  value
   * events:
   *  valueChange
   */
  var tmpOptionsComponent = {
    props: ['data', 'value'],
    data: function () {
      var allItem = this.data.allItem || {
        text: '全部',
        value: ''
      }
      var valueProxy = this.value
      if (this.data.multi === true) {
        if (this.value == allItem.value && !(this.value && this.value.constructor == Array)) {
          valueProxy = this.data.options.map(function (option) {
            return option.value
          })
        }
      };
      return {
        itemComponent: {
          template: '<a>{{item.text}}</a>'
        },
        valueProxy: valueProxy,
        allItem: allItem
      }
    },
    watch: {
      value: function () {
        if (this.multi) {
          if ($.isArray(this.value)) {
            this.valueProxy = this.value
          } else if (this.value == this.allItem.value) {
            this.valueProxy = this.data.options.map(function (option) {
              return option.value
            })
          }
        } else {
          this.valueProxy = this.value
        }
      },
      'data.options': function () {
        if (this.multi) {
          if (this.value == this.allItem.value && !(this.value && this.value.constructor == Array)) {
            this.valueProxy = this.data.options.map(function (option) {
              return option.value
            })
          }
        }
      }
    },
    template: '<div :class="{clearfix:true, \'table-filter-options\':true, \'table-filter-options-multi\':multi}">\
            <ul v-if="data.all">\
                <li v-if="multi" :class="{active:selectAllMulti}">\
                    <div class="checkbox">\
                        <label>\
                            <input type="checkbox" v-model="selectAllMulti"/>\
                            <a >{{allItem.text}}</a>\
                        </label>\
                    </div>\
                </li>\
                <li v-if="!multi" :class="{active:selectAll}">\
                    <a href="javascript:;" @click="clickAll">{{allItem.text}}</a>\
                </li>\
            </ul>\
            <bs-list \
                v-model="valueProxy" \
                @input="input" \
                panel="ul"\
                value-path="value"\
                item-class=""\
                :multi="multi"\
                :data="data.options"\
                :item-component="itemComponent"\
                ></bs-list>\
            </div>',
    methods: {
      clickAll: function () {
        this.valueProxy = this.allItem.value
        this.$emit('input', this.valueProxy)
      },
      input: function () {
        if (this.multi) {
          if (this.selectAllMulti) {
            this.$emit('input', this.allItem.value)
          } else {
            this.$emit('input', this.valueProxy)
          }
        } else {
          this.$emit('input', this.valueProxy)
        }
      }
    },
    computed: {
      selectAllMulti: {
        get: function () {
          return (this.valueProxy && this.valueProxy.length == this.data.options.length)
        },
        set: function (val) {
          if (val) {
            this.valueProxy = this.data.options.map(function (option) {
              return option.value
            })
            this.$emit('input', this.allItem.value)
          } else {
            this.valueProxy = []
            this.$emit('input', this.valueProxy)
          }
        }
      },
      selectAll: function () {
        return this.value == this.allItem.value
      },
      multi: function () {
        // return false;
        return this.data && this.data.multi === true
      }
    }
  }
  var cigFilterComponent = {
    props: {
      filters: {
        type: Array,
        default: []
      },
      value: {},
      domainAjaxOptions: {
        default: false
      },
      mode: {
        type: String,
        default: 'default'
      },
      popModel: {
        type: Boolean,
        default: false
      }
    },
    template: '<div :class="[{\'table-filter\':mode==\'default\',\'table-filter-inline\':mode==\'limit\'}]">\
                <template v-if="mode==\'default\'" v-for="(filter,index) in filters">\
                    <div class="sl-wrap">\
                        <div class="sl-key"><span>{{filter.text}}</span></div>\
                        <div class="sl-value">\
                        <template v-if="getFilterComponentName(filter,index) == \'multiSelect\'" >\
                            <span :is="getFilterComponentName(filter,index)" \
                                    :ref="filter.name"\
                                    v-model="valueProxy[filter.name]" \
                                    :value="valueProxy[filter.name]" \
                                    @input="input"\
                                    :data="filter"></span>\
                        </template>\
                        <template v-else-if="getFilterComponentName(filter,index) == \'selectTree\'" >\
                            <z-select-tree \
                                :ref="filter.name"\
                                v-model="valueProxy[filter.name]" \
                                :data="filter.options"\
                                :node-component="filter.nodeComponent"\
                                :nodes-path="filter.nodesPath"\
                                :value-key="filter.valueKey"\
                                :show-key="filter.showKey"\
                                :value="valueProxy[filter.name]" \
                                @input="input">\
                            </z-select-tree>\
                        </template>\
                        <template v-else>\
                            <div :class="{\'sl-v-list\':filter.type != \'custom\'}">\
                                <span :is="getFilterComponentName(filter,index)" \
                                    :ref="filter.name"\
                                    v-model="valueProxy[filter.name]" \
                                    :value="valueProxy[filter.name]" \
                                    @input="input"\
                                    :data="filter"></span>\
                            </div>\
                         </template>\
                        </div>\
                    </div>\
                </template>\
                <template v-if="mode==\'limit\'" v-for="(filterWrap,index) in outFilterWrapers">\
                    <label class="control-label">{{filterWrap.filter.text}}</label>\
                    <template v-if="(getFilterComponentName(filterWrap.filter,filterWrap.filterIndex) == \'tmpOptionsSelectMode\'||getFilterComponentName(filterWrap.filter,filterWrap.filterIndex) == \'multiSelect\')" >\
                        <span\
                            :is="getFilterComponentName(filterWrap.filter,filterWrap.filterIndex)" \
                            :ref="filterWrap.filter.name"\
                            v-model="valueProxy[filterWrap.filter.name]" \
                            @input="input"\
                            :data="filterWrap.filter">\
                    </template>\
                    <template v-else-if="getFilterComponentName(filterWrap.filter,filterWrap.filterIndex) == \'selectTree\'" >\
                        <div class="form-control">\
                            <z-select-tree \
                                :ref="filterWrap.filter.name"\
                                v-model="valueProxy[filterWrap.filter.name]" \
                                :data="filterWrap.filter.options"\
                                :node-component="filterWrap.filter.nodeComponent"\
                                :nodes-path="filterWrap.filter.nodesPath"\
                                :value-key="filterWrap.filter.valueKey"\
                                :show-key="filterWrap.filter.showKey"\
                                :value="valueProxy[filterWrap.filter.name]" \
                                @input="input">\
                            </z-select-tree>\
                        </div>\
                    </template>\
                    <div v-else class="form-control">\
                        <span :is="getFilterComponentName(filterWrap.filter,filterWrap.filterIndex)" \
                            :ref="filterWrap.filter.name"\
                            v-model="valueProxy[filterWrap.filter.name]" \
                            @input="input"\
                            :data="filterWrap.filter">\
                    </div>\
                </template>\
                <bs-pop v-if="mode==\'pop\'" type="lg" v-model="popModelProxy" title="高级搜索">\
                    <div :class="[\'table-filter\']">\
                        <template v-for="(filter,index) in filters">\
                            <div class="sl-wrap">\
                                <div class="sl-key"><span>{{filter.text}}</span></div>\
                                <div class="sl-value">\
                                    <template v-if="getFilterComponentName(filter,index) == \'multiSelect\'" >\
                                        <span :is="getFilterComponentName(filter,index)" \
                                                :ref="filter.name"\
                                                v-model="valueProxy[filter.name]" \
                                                :value="valueProxy[filter.name]" \
                                                :data="filter"></span>\
                                    </template>\
                                    <template v-else-if="getFilterComponentName(filter,index) == \'selectTree\'" >\
                                        <z-select-tree \
                                            :ref="filter.name"\
                                            :data="filter.options"\
                                            :node-component="filter.nodeComponent"\
                                            :nodes-path="filter.nodesPath"\
                                            :value-key="filter.valueKey"\
                                            v-model="valueProxy[filter.name]" \
                                            :value="valueProxy[filter.name]" \
                                            :show-key="filter.showKey">\
                                        </z-select-tree>\
                                    </template>\
                                    <template v-else>\
                                        <div :class="{\'sl-v-list\':filter.type != \'custom\'}">\
                                            <span :is="getFilterComponentName(filter,index)" \
                                                :ref="filter.name"\
                                                v-model="valueProxy[filter.name]" \
                                                :value="valueProxy[filter.name]" \
                                                :data="filter"></span>\
                                        </div>\
                                    </template>\
                                </div>\
                            </div>\
                        </template>\
                    </div>\
                    <!--<div class="form-horizontal form-group-sm form-filter-group">\
                        <div class="box-body">\
                            <div class="row" v-for="filterRow in filtersRows">\
                                <dl v-for="filterWrap in filterRow" :class="[\'dl-horizontal\',filterWrap.class]">\
                                    <dt>\
                                        <label class="control-label">{{filterWrap.filter.text}}</label>\
                                    </dt>\
                                    <dd>\
                                        <template v-if="getFilterComponentName(filterWrap.filter,filterWrap.filterIndex) == \'tmpOptionsPopMode\'" >\
                                            <span\
                                                :is="getFilterComponentName(filterWrap.filter,filterWrap.filterIndex)" \
                                                :ref="filterWrap.filter.name"\
                                                v-model="valueProxy[filterWrap.filter.name]" \
                                                :data="filterWrap.filter">\
                                        </template>\
                                        <div v-else class="form-control">\
                                            <span :is="getFilterComponentName(filterWrap.filter,filterWrap.filterIndex)" \
                                                :ref="filterWrap.filter.name"\
                                                v-model="valueProxy[filterWrap.filter.name]" \
                                                :data="filterWrap.filter">\
                                        </div>\
                                    </dd>\
                                </dl>\
                            </div>\
                        </div>\
                    </div>-->\
                    <template slot="footer">\
                        <button type="button" class="btn btn-success" @click="resetFilter">重置</button>\
                        <button type="button" class="btn btn-primary" @click="commitFilter">确定</button>\
                    </template>\
                </bs-pop>\
            </div>',
    components: {
      tmpOptions: tmpOptionsComponent,
      tmpOptionsSelectMode: {
        props: ['data', 'value'],
        data: function () {
          var allItem = this.data.allItem || {
            text: '全部',
            value: ''
          }
          return {
            itemComponent: {
              template: '<a>{{item.text}}</a>'
            },
            allItem: allItem
          }
        },
        watch: {},
        template: '<select v-model="valueProxy" class="form-control">\
                    <option v-if="data.all" :value="allItem.value">{{allItem.text}}</option>\
                    <option v-for="item in data.options" :value="item.value">{{item.text}}</option>\
                    </select>',
        methods: {},
        computed: {
          valueProxy: {
            get: function () {
              return this.value
            },
            set: function (v) {
              this.$emit('input', v)
            }
          }
        }
      },
      multiSelect: {
        props: ['data', 'value'],
        data: function () {
          return {}
        },
        watch: {
          'valueProxy': function () {
            this.$nextTick(function () {

            })
          }
        },
        template: '<cig-select ref="yymselect" :name="data.name" v-model="valueProxy"\
                                    :options="data.options" :multiple="data.multi">\
                                    </cig-select>',
        methods: {},
        computed: {
          valueProxy: {
            get: function () {
              return this.value
            },
            set: function (v) {
              this.$emit('input', v)
            }
          }
        }
      }
    },
    data: function () {
      return {
        valueProxy: this.value
      }
    },
    computed: {
      popModelProxy: {
        get: function () {
          return this.popModel
        },
        set: function (v) {
          this.$emit('popmodelchange', v)
        }
      },
      outFilterWrapers: function () {
        return this.filters.map(function (filter, index) {
          return {
            filter: filter,
            filterIndex: index
          }
        }).filter(function (filterWraper) {
          return filterWraper.filter.isOut
        }) || []
      },
      filtersRows: function () {
        var rows = []
        var row = []
        rows.push(row)
        var allowColumn = 2
        this.filters.forEach(function (filter, index) {
          var colSpan = filter.colSpan || 1
          if (row.length + colSpan <= allowColumn) {} else {
            row = []
            rows.push(row)
          }
          row.push({
            filter: filter,
            class: 'col-sm-' + (6 * colSpan),
            filterIndex: index
          })
        })
        return rows
      }
    },
    watch: {
      value: {
        handler: function (val) {
          this.valueProxy = depClone(this.value)
        },
        deep: true
      },
      popModel: function (val) {
        if (val) {
          this.valueProxy = depClone(this.value)
        }
      }
    },
    beforeCreate: function () {
      var filters = this.$options.propsData.filters
      var getFilterComponentName = this.$options.methods.getFilterComponentName.bind(this)
      filters.forEach(function (filter, index) {
        if (filter.type == 'custom') {
          var name = getFilterComponentName(filter, index)
          var customComponent = filter.component
          var tempComponent
          switch (typeof (customComponent)) {
            case 'string':
              tempComponent = {
                template: customComponent,
                props: ['data', 'value'],
                data: function () {
                  return {
                    valueProxy: this.value
                  }
                },
                watch: {
                  value: function () {
                    this.valueProxy = this.value
                  }
                },
                methods: {
                  'input': function () {
                    (typeof (this.valueProxy) === 'object' || this.value != this.valueProxy) && this.$emit('input', this.valueProxy)
                  }
                }
              }
              break
            case 'object':
            default:
              tempComponent = customComponent
              break
          }
          this.$options.components[name] = tempComponent
        } else if (filter.type == 'domain') {
          this.$set(filter, 'options', [])
        }
      }, this)
    },
    mounted: function () {
      var filters1 = this.filters.filter(function (filter) {
        return filter.type == 'domain'
      })
      if (filters1.length > 0) {
        var domainNames = filters1.map(function (filter) {
          return filter.domainName
        })
        var isValidOptions = typeof (this.domainAjaxOptions) === 'object'
        if (isValidOptions) {
          isValidOptions = false
          for (var key in this.domainAjaxOptions) {
            if (this.domainAjaxOptions.hasOwnProperty(key)) {
              isValidOptions = true
              break
            }
          }
        }
        if (!isValidOptions) {
          var data = domainPool.getDomainOptions(domainNames)
          filters1.forEach(function (filter) {
            if (data[filter.domainName]) {
              this.$set(filter, 'options', data[filter.domainName])
            }
          }, this)
        } else {
          var ajaxOptions = $.extend({}, this.domainAjaxOptions)
          ajaxOptions.data = $.extend({
            domainNames: domainNames.join(',')
          }, ajaxOptions.data)
          ajaxOptions.success = this.getDomainsOptionsSuccess.bind(this, filters1)
          ajaxOptions.error = this.getDomainsOptionsError.bind(this, filters1)
          $.ajax(ajaxOptions)
        }
      }
    },
    methods: {
      getDomainsOptionsSuccess: function (filters, res) {
        if (res.success) {
          var data = res.data
          filters.forEach(function (filter) {
            if (data[filter.domainName]) {
              this.$set(filter, 'options', data[filter.domainName])
            }
          }, this)
        } else {
          this.getDomainsOptionsError(filters)
        }
      },
      getDomainsOptionsError: function (filters, res) {},
      getFilterComponentName: function (filter, index) {
        switch (filter.type) {
          case 'options':
            // return "tmpOptions";
            return this.mode == 'limit' ? (filter.multi ? 'multiSelect' : 'tmpOptionsSelectMode') : 'tmpOptions'
          case 'domain':
            // return "tmpOptions";
            return this.mode == 'limit' ? (filter.multi ? 'multiSelect' : 'tmpOptionsSelectMode') : 'tmpOptions'
          case 'selectTree':
            return 'selectTree'
        }
        return 'tmp' + this._uid + '_' + index
      },
      input: function () {
        this.$emit('input', this.valueProxy)
      },
      commitFilter: function () {
        this.popModelProxy = false
        this.$emit('input', this.valueProxy)
      },
      resetFilter: function () {
        console.log(this.value)
        this.valueProxy = depClone(this.value)
        this.$emit('initfiter', this.valueProxy)
      }
    }
  }
  var depClone = function (data) {
    return JSON.parse(JSON.stringify(data))
  }
  Vue.component('cig-table-filter', cigFilterComponent)
  return {
    cigFilterComponent: cigFilterComponent
  }
})
