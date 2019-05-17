define([
  'require',
  'vue',
  'jQuery',
  'vuePopComponent',
  'css!cssArea'
], function (require, Vue, $, popComponent) {
  'use strict'

  function isIE () {
    return (!!window.ActiveXObject || 'ActiveXObject' in window)
  }
  var _ie = isIE()
  var ieFixComponent = {
    methods: {
      _updateZoom: function () {
        if (_ie) {
          this.$nextTick(function () {
            var $el = this.$el
            setTimeout(function () {
              // alert(1);
              // $el.style.zoom = $el.style.zoom ? "" : ("1.0" + Math.random().toString().substr(2,3) );
              $el.style.zoom = ('1.01') // + Math.random().toString().substr(2,3) );
              setTimeout(function () {
                $el.style.zoom = ''
              })
            })
            // setTimeout((function(){
            //     alert($el.style.zoom);
            // }).bind(this),200)
          })
        }
      }
    }
  }
  Vue.component('cig-area', {
    mixins: [popComponent, ieFixComponent],
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      valuePath: {
        default: ''
      },
      loading: {
        default: false
      },
      value: {},
      namePath: {
        default: ''
      },
      nodeComponent: {
        default: '<span>{{item}}</span>'
      },
      nodesPath: {
        type: String,
        default: 'nodes'
      },
      groupPath: {
        type: String,
        default: 'group'
      },
      emptyText: {
        type: String,
        default: '请选择'
      },
      emptyValue: {
        type: String,
        default: ''
      },
      join: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        valueProxy: this.value,
        addressDetail: '',
        tabNodes: [],
        selectedNodes: [],
        selectedNode: null,
        tabLevel: 0,
        isopen: false
      }
    },

    template: '\
        <div :class="[{hover:isopen},\'store-selector\']">\
           <div class="text" @click="openPop()" :title="displayName">{{displayName || emptyText}}<b></b></div>\
           <div class="content">\
             <div class="m area-pop">\
               <div class="mt">\
                 <ul class="tab">\
                    <template v-for="(node,index) in selectedNodes">\
                        <li :class="[{\'curr\':!hasChildren(selectedNode) && selectedNode == node}]">\
                            <a href="javascript:;" @click="reselect(index)"><span>{{getName(node)}}</span><i></i></a>\
                        </li>\
                    </template>\
                    <li class="curr" v-if="!selectedNode || hasChildren(selectedNode)">\
                        <a href="javascript:;" @click="selectFolderNode()"><span>请选择</span><i></i></a>\
                    </li>\
                 </ul>\
                 <div class="stock-line"></div>\
               </div>\
               <div class="mc">\
                 <ul class="area-list" v-if="!tabNodesGroups">\
                 <template v-for="(node,index) in tabNodes">\
                      <li><a href="javascript:;" @click="expandNode(node)"><span :is="getComponentName()" :item="node"></span></a></li>\
                 </template>\
                 </ul> \
                 <div v-for="(group,index) in tabNodesGroups" class="clearfix" v-else>\
                    <span class="group" v-if="group.group != \'default\'">{{group.group}}</span>\
                    <ul class="area-list clearfix">\
                        <template v-for="(node,index) in group.nodes">\
                            <li><a href="javascript:;" @click="expandNode(node)"><span :is="getComponentName()" :item="node"></span></a></li>\
                        </template>\
                    </ul>\
                 </div>\
               </div>\
             </div>\
             <div class="all"><a @click="selectAll()">确定</a></div>\
           </div>\
           <div class="close" @click="closePop()"></div>\
         </div>',
    beforeCreate: function () {
      var data = this.$options.propsData.data
      var nodesPath = this.$options.propsData.nodesPath

      function defaultNode (node) {
        if (typeof (node.expand) === 'undefined') {
          node.expand = false
        }
        if (node[nodesPath]) {
          node[nodesPath].forEach(defaultNode)
        }
      }
      if (data) data.forEach(defaultNode)
      var nodeComponent = this.$options.propsData.nodeComponent
      if (!nodeComponent) {
        nodeComponent = '<li>{{item}}</li>'
      }
      var name = 'tmp' + this._uid
      var tempComponent
      switch (typeof (nodeComponent)) {
        case 'string':
          tempComponent = {
            template: nodeComponent,
            props: ['item']
          }
          break
        case 'object':
        default:
          tempComponent = nodeComponent
          tempComponent.props = ['item']
          break
      }
      this.$options.components[name] = tempComponent
    },
    watch: {
      'data': function () {
        this.update()
      },
      'value': function (newVal) {
        if (newVal != this.valueProxy) {
          this.valueProxy = newVal
          this.update()
        }
      },
      'isopen': function () {
        this._updateZoom()
      },
      'tabNodes': function () {
        this._updateZoom()
      }
    },
    mounted: function () {
      this.update()
    },
    computed: {
      displayName: function () {
        return this.selectedNodes.map(function (node) {
          return this.getName(node)
        }, this).join(this.join)
      },
      tabNodesGroups: function () {
        if (this.tabNodes.length == 0 || typeof (this.tabNodes[0][this.groupPath]) === 'undefined') {
          return false
        } else {
          var groups = []
          var groupsMap = {
            default: []
          }
          groups.push({
            group: 'default',
            nodes: groupsMap.default
          })
          this.tabNodes.forEach(function (n) {
            var group = n[this.groupPath]
            if (!group) {
              group = 'default'
            }
            if (!groupsMap[group]) {
              groupsMap[group] = []
              groups.push({
                group: group,
                nodes: groupsMap[group]
              })
            }
            groupsMap[group].push(n)
          }, this)
          if (groups[0].nodes.length == 0) {
            groups.shift()
          }
          return groups
        }
      }
    },
    methods: {
      update: function () {
        this.tabLevel = 0
        var value = this.value
        if (value) {
          this.init(value)
        } else {
          this.expandNode()
        }
      },
      init: function (value) {
        // 通过初始值进行初始化
        this.$set(this, 'selectedNodes', [])
        var findNodeProxy = findNode.bind(this)
        var node = value ? findNodeProxy(this.data, 0, value) : null
        return !!node

        function findNode (nodes, level, value) {
          // 判断现住地，将返回值set进文本框
          // 先判断有无nodes，如果nodes为空，发布环境点击无反应（白若兵）
          if (nodes && nodes.length > 0 && nodes[0].gridName != null) {
            this.$set(this, 'selectedNodes', [{
              id: this.value,
              nodes: [],
              text: this.value,
              name: this.value
            }])
          } else {
            // 常规省市县判断
            for (var i = 0, l = nodes.length; i < l; i++) {
              var node = nodes[i]
              if (this.getValue(node) == value) {
                this.expandNode(node)
                if (this.hasChildren(node)) {
                  this.selectFolderNode(node)
                }
                return node
              } else {
                if (this.hasChildren(node)) {
                  this.expandNode(node)
                  var subNode = findNodeProxy(node[this.nodesPath], level + 1, value)
                  if (subNode) {
                    return subNode
                  } else {
                    this.reselect(level)
                  }
                }
              }
            }
          }
          return null
        }
      },
      getComponentName: function () {
        return 'tmp' + this._uid
      },
      getValue: function (node) {
        var value = node ? (this.valuePath ? node[this.valuePath] : node) : node
        return value
      },
      getName: function (node) {
        var value = node ? (this.namePath ? node[this.namePath] : node) : node
        return value
      },
      hasChildren: function (node) {
        return node && node[this.nodesPath] && node[this.nodesPath].length > 0
      },
      reselect: function (level) {
        if (this.loading) return
        while (this.selectedNodes.length > level) {
          this.selectedNodes.pop()
        }
        this.tabLevel = level - 1
        this.expandNode(this.selectedNodes.pop())
      },
      selectFolderNode: function () {
        var node = this.selectedNodes[this.selectedNodes.length - 1]
        this.selectNode(node)
      },
      selectAll: function () {
        if (!this.selectedNode || this.hasChildren(this.selectedNode)) {
          this.selectFolderNode()
        } else {
          this.reselect(this.selectedNodes.length - 1)
          this.selectFolderNode()
        }
      },
      expandNode: function (node) {
        if (this.loading) return
        if (!node) {
          this.$set(this, 'selectedNodes', [])
          this.selectedNode = null
          this.tabNodes = this.data
          this.tabLevel = 0
        } else {
          if (typeof (node._loaded) === 'undefined' || node._loaded === true) {
            this.selectedNode = node
            if (this.hasChildren(node)) {
              this.tabLevel += 1
              while (this.selectedNodes.length > this.tabLevel) {
                this.selectedNodes.pop()
              }
              this.$set(this.selectedNodes, this.tabLevel - 1, node)
              this.tabNodes = node[this.nodesPath]
            } else {
              this.$set(this.selectedNodes, this.tabLevel, node)
              this.hasLeaf = true
              this.selectNode(node)
            }
          } else {
            this.$emit('expand', node)
          }
        }
      },
      openPop: function () {
        this.$set(this, 'isopen', !this.isopen)
      },
      selectNode: function (node) {
        this.$set(this, 'isopen', false)
        var value = this.getValue(node)
        if (value !== this.valueProxy) {
          this.valueProxy = value
          // 现住地
          if (node && node.addressDetail) {
            this.$emit('getAddressDetail', node.addressDetail)
            this.$emit('getId', node.id)
          }
          this.$emit('input', this.valueProxy ? this.valueProxy : this.emptyValue)
        }
      },
      closePop: function () {
        this.$set(this, 'isopen', false)
      }
    }
  })
  var shareDataCache = {
    insCache: {},
    dataCaches: {},
    getData: function (instance, defaultData) {
      var key = instance.shareDataKey
      if (!shareDataCache.insCache[key]) shareDataCache.insCache[key] = [instance]
      else shareDataCache.insCache[key].push(instance)
      return shareDataCache.dataCaches[key] ? shareDataCache.dataCaches[key] : (shareDataCache.dataCaches[key] = defaultData)
    },
    emit: function (instance) {
      var key = instance.shareDataKey
      if (shareDataCache.insCache[key]) {
        shareDataCache.insCache[key].forEach(function (ins) {
          if (ins !== instance && ins.$emit) {
            ins.$refs.area.update()
            ins.$emit('input', ins.valueProxy)
          }
        })
      }
    },
    expandNode: function (instance, node) {
      var key = instance.shareDataKey
      if (shareDataCache.insCache[key]) {
        shareDataCache.insCache[key].forEach(function (ins) {
          if (ins !== instance && ins.$emit) {
            ins.$refs.area.expandNode(node)
          }
        })
      }
    }
  }
  Vue.component('cig-ajax-area', {
    props: {
      'ajaxOptions': {},
      'emptyText': {
        default: '请选择'
      },
      'emptyValue': {
        default: ''
      },
      'nodeComponent': {
        default: '<span>{{item.name}}</span>'
      },
      'namePath': {
        default: 'name'
      },
      'valuePath': {
        default: 'id'
      },
      value: {},
      'nodesPath': {
        default: 'nodes'
      },
      'isLeafPath': {
        default: ''
      },
      'shareDataKey': {
        default: ''
      },
      rootPid: {
        default: ''
      }
    },
    template: '<cig-area\
            ref="area"\
            :loading="proxy.loading" \
            :data="proxy.areas" \
            :value-path="valuePath" \
            :name-path="namePath" \
            :nodes-path="nodesPath" \
            @input="input" \
            @getAddressDetail="getAddressDetail" \
            @getId="getId" \
            @expand="expandNode" \
            v-model="valueProxy" \
            :value="valueProxy" \
            :empty-text="emptyText"\
            :empty-value="emptyValue"\
            :node-component="nodeComponent" \
                ></cig-area>',
    data: function () {
      var data = {
        valueProxy: this.value,
        proxy: {
          areas: [],
          loading: false
        },
        returnParam: [],
        returnParamName: [],
        nodeLoading: {}
      }
      if (this.shareDataKey) {
        return shareDataCache.getData(this, data)
      } else {
        return data
      }
    },
    watch: {
      'value': function (newVal) {
        this.valueProxy = this.value
      }
    },
    mounted: function () {
      this.loadChildren()
    },
    computed: {
      selectedNode: function () {
        return this.$refs.area.selectedNode
      }
    },
    methods: {
      loadChildren: function (node) {
        var pid = node ? node[this.valuePath] : this.rootPid
        var loadingKey = pid || '_EMPTY_PID_'

        if (this.nodeLoading[loadingKey] == true) return
        this.nodeLoading[loadingKey] = true

        var ajaxOptions = $.extend({}, this.ajaxOptions)

        if (this.returnParam && this.returnParam.length > 0) {
          ajaxOptions.url += '?'
          for (var i = 0; i < this.returnParamName.length; i++) {
            var test = encodeURI(node[this.returnParam[i]])
            ajaxOptions.url += this.returnParamName[i] + '=' + test + '&'
          }
        } else {
          ajaxOptions.url = mixUrl(ajaxOptions.url, {
            pid: pid
          })
        }

        ajaxOptions.success = this.getAreaSuccess.bind(this, node)
        ajaxOptions.error = this.getAreaError.bind(this, node)
        $.ajax(ajaxOptions)
        this.proxy.loading = true

        function mixUrl (url, param) {
          var rquery = (/\?/)
          return url + (rquery.test(url) ? '&' : '?') + $.param(param)
        }
      },
      expandNode: function (node, select) {
        this.loadChildren(node)
        if (select) {
          this.$refs.area.selectFolderNode()
        }
      },
      getIsLeaf: function (node) {
        if (this.isLeafPath) {
          return node[this.isLeafPath]
        } else {
          return false
        }
      },
      getAreaSuccess: function (node, res) {
        this.proxy.loading = false
        var pid = node ? node[this.valuePath] : this.rootPid
        var loadingKey = pid || '_EMPTY_PID_'
        this.nodeLoading[loadingKey] = false
        if (res.success) {
          var areas = res.data || []
          var i = 0
          areas.forEach(function (area) {
            if (i == 0) {
              //
              this.returnParam = area.returnParam
              this.returnParamName = area.returnParamName
              i++
            }
            if (this.getIsLeaf(area)) {
              area._loaded = true
            } else {
              area._loaded = false
              area[this.nodesPath] = new Vue({})
            }
          }, this)
          var componentArea = this.$refs.area
          if (node) {
            this.$set(node, this.nodesPath, areas)
            this.$set(node, '_loaded', true)
          } else {
            // Array.prototype.splice.apply(this.areas,[0,this.areas.length].concat(areas));
            this.$set(this.proxy, 'areas', areas)
          }
          this.$nextTick(function () {
            componentArea.expandNode(node)
            if (this.shareDataKey) {
              shareDataCache.expandNode(this, node)
            }
          })
        } else {
          this.getAreaError(node)
        }
      },
      getAreaError: function (node) {
        this.proxy.loading = false
        var pid = node ? node[this.valuePath] : this.rootPid
        var loadingKey = pid || '_EMPTY_PID_'
        this.nodeLoading[loadingKey] = false
        var areas = []
        if (node) {
          this.$set(node, this.nodesPath, areas)
          this.$set(node, '_loaded', true)
        } else {
          // Array.prototype.splice.apply(this.areas,[0,this.areas.length].concat(areas));
          this.$set(this.proxy, 'areas', areas)
        }
      },
      input: function () {
        this.$emit('input', this.valueProxy)
        if (this.shareDataKey) {
          shareDataCache.emit(this)
        }
      },
      // 现住地
      getAddressDetail: function (value) {
        this.$emit('getaddressdetail', value)
      },
      getId: function (value) {
        this.$emit('getid', value)
      }
    }
  })
})
