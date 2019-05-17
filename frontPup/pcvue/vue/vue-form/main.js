define([
  'require',
  'vue',
  'vueDomainPool',
  'jQuery'
], function (require, Vue, domainPool, $) {
  //   'use strict' //后面取值用到了with，
  Vue.directive("date", function (el, binding, vnode, oldVnode) {
    var options = {
      "language": "zh-CN",
      "format": "yyyy-mm-dd",
      autoclose: true
    }
    var data = $(el).data("datepicker");
    if (!data) {
      require([
        'bootstrapDatePicker',
        'bootstrapDatePickerLang',
        'css!cssBsDatePicker'], function () {

          $(el).datepicker(options).on("changeDate", function (event) {
            var val = $(el).val();
            vnode.data.on.input.invoker(event);
          });
          var datepicker = $(el).data("datepicker");
          var $next = $(el).next();
          if($next.hasClass("input-group-addon")){
            $next.on("click",function(){
              var visible = datepicker.picker.is(":visible");
              if(visible) datepicker.hide();
              else{
                datepicker.show();
              }
            })
          }
        })
    }
  });
  Vue.directive("month", function (el, binding, vnode, oldVnode) {
    var options = {
      "language": "zh-CN",
      "format": "yyyy年m月",
      "startView":'decade',
      "minViewMode":1,
      autoclose: true
    }
    var data = $(el).data("datepicker");
    if (!data) {
      require([
        'bootstrapDatePicker',
        'bootstrapDatePickerLang',
        'css!cssBsDatePicker'], function () {
          $(el).datepicker(options).on("changeDate", function (event) {
            var val = $(el).val();
            vnode.data.on.input.invoker(event);
          });
          var datepicker = $(el).data("datepicker");
          var $next = $(el).next();
          if($next.hasClass("input-group-addon")){
            $next.on("click",function(){
              var visible = datepicker.picker.is(":visible");
              if(visible) datepicker.hide();
              else{
                datepicker.show();
              }
            })
          }
        })
    }
  });
  Vue.directive("datetime", {
      bind:function (el, binding, vnode, oldVnode) {
          var config = binding.value;
          var options = {
              locale:"zh-cn",
              ignoreReadonly:true,
              format: (config && config.format) ? config.format : 'YYYY-MM-DD H:mm:ss'
          };
          var data = $(el).data("DateTimePicker");
          if (!data) {
              require([
                  'moment',
                  'bootstrapDateTimePicker',
                  'bootstrapDatePickerLang',
                  'css!cssBsDateTimePicker'], function (moment) {
                  moment.locale('zh-cn');
                  $(el).datetimepicker(options);
                  var datetimepicker = $(el).data("DateTimePicker");
                  var getval = function(field){
                      var context = vnode.context;
                      var val = eval("(function(){with(this){return " + field + "}})").apply(context);
                      return val;
                  };
                  if(config&&config.min){
                    var val = getval(config.min);
                    if(val) {
                        $(el).unbind("dp.change");
                        datetimepicker.minDate(Date.str2Date(val));
                        bindElChange();
                    }else{
                        $(el).unbind("dp.change");
                        datetimepicker.minDate(false);
                        bindElChange();
                    }
                    vnode.context.$watch(config.min,function(){
                        var val;
                        val = getval(config.min);
                        if(val) {
                            $(el).unbind("dp.change");
                            datetimepicker.minDate(Date.str2Date(val));
                            bindElChange();
                        }else{
                            $(el).unbind("dp.change");
                            datetimepicker.minDate(false);
                            bindElChange();
                        }
                    })
                  }
                  function bindElChange(){
                      $(el).on("dp.change", function (event) {
                        var val = $(el).val();
                        vnode.data.on.input.invoker(event);
                      });
                  }
                  bindElChange();
                  var $next = $(el).next();
                  if($next.hasClass("input-group-addon")){
                      $next.on("click",function(){
                          if(datetimepicker.widget) datetimepicker.hide();
                          else{
                              datetimepicker.show();
                          }
                      })
                  }
              });
          }
      }
  });

  Vue.directive("daterange", {
      bind:function (el, binding, vnode, oldVnode) {
          var config = binding.value;
          var options = {
              timePicker: true,
              timePickerIncrement: 30,
              timePicker24Hour:true,
              locale: {
                  format: (config && config.format) ? config.format : 'MM-DD H:mm',
                  applyLabel: '确认',
                  cancelLabel: '取消',
              },
          };
          ["opens"].forEach(function(key){
            if(typeof(config[key])!="undefined"){
              options[key] = config[key];
            }
          });
          var data = $(el).data("daterangepicker");
          if (!data) {
              require([
                  'moment',
                  'bootstrapDaterangePicker',
                  'bootstrapDatePickerLang',
                  'css!cssBsDaterangePicker'], function (moment) {
                  moment.locale('zh-cn');
                  var fields = config.fields;
                  var getval = function(field){
                      var context = vnode.context;
                      var val = eval("(function(){with(this){return " + field + "}})").apply(context);
                      return val;
                  };
                  var setval = function(field,val){
                      var context = vnode.context;
                      eval("(function(val){with(this){" + field + "=val;}})").apply(context,[val]);
                  };
                  $(el).daterangepicker(options);
                  var daterangepicker = $(el).data("daterangepicker");
                  if(config.max){
                      vnode.context.$watch(config.max,function(){
                          var val;
                          val = getval(config.max);
                          if(val) {
                              $(el).unbind("change");
                              daterangepicker.maxDate=moment(Date.str2Date(val))
                              daterangepicker.updateView()
                              bindElChange();
                          }
                      })
                  }
                  if(fields && fields.length == 2){
                      var val;
                      val = getval(fields[0]);
                      if(val) daterangepicker.setStartDate(Date.str2Date(val));
                      vnode.context.$watch(fields[0],function(){
                          val = getval(fields[0]);
                          $(el).unbind("change");
                          if(val) daterangepicker.setStartDate(Date.str2Date(val));
                          console.log(val);
                          bindElChange();
                      })
                      val = getval(fields[1]);
                      if(val) daterangepicker.setEndDate(Date.str2Date(val));
                      vnode.context.$watch(fields[1],function(){
                          val = getval(fields[1]);
                          $(el).unbind("change");
                          if(val) daterangepicker.setEndDate(Date.str2Date(val));
                          console.log(val);
                          bindElChange(); 
                      })
                  }

                  function bindElChange(){
                      $(el).change(function(){
                          if(fields && fields.length == 2){
                              setval(fields[0],daterangepicker.startDate.format('YYYY-MM-DD HH:mm:ss'));//startDate 是Moment类型，不是date类型
                              setval(fields[1],daterangepicker.endDate.format('YYYY-MM-DD HH:mm:ss'));
                          }
                      });
                  }
                  $(el).on("show.daterangepicker",function(){
                      if(window.resizeTabHeight){window.resizeTabHeight(true)};
                  });
                  bindElChange();
                  var $next = $(el).next();
                  if($next.hasClass("input-group-addon")){
                      $next.on("click",function(){
                          var visible = daterangepicker.container.is(":visible");
                          if(visible) daterangepicker.hide();
                          else{
                              daterangepicker.show();
                          }
                      })
                  }
              })
          }
      }
  });
  
  Vue.directive("rangemonth", function (el, binding, vnode, oldVnode) {
    var options = {
      "language": "zh-CN",
      "format": "yyyy年m月",
      "startView":'decade',
      "minViewMode":1,
      autoclose: true,
      startDate:binding.value.startDate,
      endDate:binding.value.endDate,
    }
    var data = $(el).data("datepicker");
    if (!data) {
      require([
        'bootstrapDatePicker',
        'bootstrapDatePickerLang',
        'css!cssBsDatePicker'], function () {
          $(el).datepicker(options).on("changeDate", function (event) {
            var val = $(el).val();
            vnode.data.on.input.invoker(event);
          });
          var datepicker = $(el).data("datepicker");
          var $next = $(el).next();
          if($next.hasClass("input-group-addon")){
            $next.on("click",function(){
              var visible = datepicker.picker.is(":visible");
              if(visible) datepicker.hide();
              else{
                datepicker.show();
              }
            })
          }
        })
    }
  });

  var formRender = {
    render: function (context, fields, createElement) {
      return createElement('form')
    }
  }
  /** table的类型布局 */
  var formTableRender = {
    render: function (columns, context, fields, createElement) {
      var rows = []
      var curRowChildren = []
      var curColUse = 0
      var colUnit = Math.ceil(12 / columns)
      fields.forEach(function (field) {
        var dlClassName = 'col-sm-' + colUnit
        if (field.colSpan && field.colSpan > 1) {
          if (curColUse + field.colSpan > columns) {
            appendRow()
          }
          curColUse += field.colSpan
          dlClassName = 'col-sm-' + (colUnit * field.colSpan)
        } else {
          if (curColUse + 1 > columns) {
            appendRow()
          }
          curColUse += 1
        }
        var dlClass = {
          'dl-horizontal': true
        }
        dlClass[dlClassName] = true;
        dlClass["field-"+field.name] = true;
        if(field.label === "nolable") 
        {
          curRowChildren.push(createElement(
                'div', {
                  class: "nolablerow " + field.groupClass
                },
                field.slot
              ))
        } else {
          curRowChildren.push(createElement(
            'dl', {
              class: dlClass
            }, [
              createElement(
                'dt',
                [
                  createElement('label', {
                    class: {
                      'control-label': true
                    },
                    domProps: {
                    }
                  }, field.label)
                ]
              ),
              createElement(
                'dd', {
                  class: field.groupClass
                },
                field.slot
              )
            ]
          ))
        }
      }, this)
      if (curRowChildren.length) {
        appendRow()
      }
      return rows
      function appendRow() {
        var row = createElement('div', {
          class: {
            row: true
          }
        }, curRowChildren)
        rows.push(row)
        curRowChildren = []
        curColUse = 0
      }
    }
  }
  var renders = {
    table1Render: formTableRender.render.bind(null, 1),
    table2Render: formTableRender.render.bind(null, 2),
    table3Render: formTableRender.render.bind(null, 3),
    groupRender:function(groups, subRender, context, fields, createElement){
      subRender = subRender ? subRender : renders.table2Render;
      return groups.map(function(group){
        return createElement('div', {
          class: {
          }
        }, [
          createElement("h4",{
          },
          [group.title])
        ].concat(
          subRender(context, fields.filter(function(field){
              return group.fields.indexOf(field.name) >= 0
            },this)
          ,createElement)
        ))
      })
    }
  }
  function getValueByPath(context, path) {
    var val = eval("(function(){with(this){return " + path + "}})").apply(context);
    return val;
  }
  /**
   * form 表单
   *  包含一些通用字段和表单布局
   *  props:
   *      fieldsRender:表单布局，默认是两列布局，可选项"table1Render","table2Render","table3Render"，
   *          或者是一个function(context,fields,createElement){}的方法
   *          field 里面包括   slot 参数，是创建好的表单控件及验证结果 
   *                          groupClass 是验证的类型样式 success\warning\error
   *      dataPath:数据路径
   *      fields:字段数组，布局时按照数组顺序依次布局
   *          {name:"name",label:"姓名",colSpan:"跨列""}
   *          //label的值等于"nolable"时，label不占位，type中定义的控件占据全部空间
   *          //colSpan是布局方法用的属性，如果不是table布局，可以不要这个
   *          支持一些基本字段，类型如下：
   *          display         不可编辑的字段，直接显示值，如果有options或domainName 则按options和domainName转换为text显示
   *          radio           单选字段，必须有options或domainName中的一个字段
   *          checkbox:multi  多选字段，必须有options或domainName中的一个字段
   *          checkbox        复选字段，可以设置trueValue和falseValue，默认为1和0
   *          selected:multi  多选列表字段，必须有options或domainName中的一个字段
   *          selected        下拉框列表字段，必须有options或domainName中的一个字段
   *          textarea        大文本字段
   *          number          数字字段
   *          text            字符字段
   *          不支持的其他字段，使用slot的形式传递，例如：
   *              <cig-form>
   *                  <bs-tree 
   *                      slot="fieldslot.area" 
   *                      v-model="data.area" 
   *                      :data="tree">
   *                      <!--用树选择一个属性，会由布局方法渲染到area属性的位置-->
   *                  </bs-tree>
   *              </cig-form>
   */
  var form = Vue.component('cig-form', {
    props: {
      fieldsRender: {
        default: null
      },
      fields: {
        type: Array,
        default: function () {
          return []
        }
      },
      dataPath: {
        type: String,
        default: ''
      },
      formClass:{
        type:String,
        default: 'box-body'
      }
    },
    data: function () {

      return {
        domains: this.getDomains(),
        validationState: {
        },
        data: null
      }
    },
    beforeCreate: function () {
      var domainsNames = !this.$options.propsData.fields ? [] : this.$options.propsData.fields.filter(function (field) {
        return field.domainName
      }).map(function (field) {
        return field.domainName
      })

      if (domainsNames.length > 0) {
        domainPool.cacheDomains(domainsNames)
      }
    },
    watch:{
      fields:function(){
        this.$set(this,"domains",this.getDomains());
      }
    },
    created: function () {
    },
    mounted: function () {
      // var context = this.$vnode.context
      // if(this.dataPath){
      //     context.$watch(this.dataPath,this.watchObject.bind(this),{
      //         deep:true,immediate:true
      //     })
      // }
      // else{
      //     this.fields.forEach(function(field){
      //         context.$watch(field.name,this.watchField.bind(this,field))
      //     })
      // }
    },
    render: function (createElement) {
      this.data = this.getData()
      var fieldsRender = this.fieldsRender
      if (typeof (fieldsRender) == 'string') {
        fieldsRender = renders[fieldsRender]
      }
      if (!fieldsRender) {
        fieldsRender = renders.table2Render
      }
      var fieldConfigs = this.fields.map(function (field) {
        var slot = this.$slots['fieldslot.' + field.name]
        var type = field.type
        var validation = this.validationState[field.name]
        var slot = slot ? slot : this.getElementByType(field, createElement)
        var groupClass = ''
        if (validation) {
          if (validation.message) {
            slot = slot.concat([
              createElement('div', {
                class: {
                  'help-block': true
                }
              }, validation.message)
            ])
          }
          if (validation.type) {
            groupClass = 'has-' + validation.type
          }
        }
        return $.extend({
          slot: slot,
          groupClass: groupClass
        }, field)
      }, this)
      var cls = {};
      if(this.formClass){
        cls[this.formClass] = true;
      }
      return createElement('div', {
        class: cls
      }, fieldsRender(this, fieldConfigs, createElement))
    },
    methods: {
      getDomains:function(){
        var domainsNames = this.fields.filter(function (field) {
          return field.domainName
        }).map(function (field) {
          return field.domainName
        })
        var domains = domainPool.getDomainOptions(domainsNames)
        return domains;
      },
      // 这里实现一些通用的类型
      getElementByType: function (field, createElement) {
        var type = field.type,
          name = field.name
        dataPath = this.dataPath
        var self = this
        var data = this.data
        var scope = this.$vnode.context
        switch (type) {
          case 'display':
            var options = field.domainName ? this.domains[field.domainName] : field.options
            var value = data[name]
            var text = domainPool.getTextByValue(options, value)
            return [
              createElement('span', {
                class: {
                  'form-control': true,
                  'multi-line':field.multi === true
                },
                props: {
                  title: text
                },
                attrs: {
                  title: text,
                }
              }, [text])
              // createElement("p",{
              //     class:{
              //         "form-control-static":true
              //     },
              // },[text])
            ]
          case 'radio':
            var options = field.domainName ? this.domains[field.domainName] : field.options
            return options.map(function (option) {
              return createElement('label', {
                class: {
                  'radio-inline': true
                }
              }, [
                  renderInput('<input type="radio" '+(field.disabled?'disabled="disabled"':'')+' v-model="' + (dataPath ? dataPath + '.' : '') + name + '" value="' + option.value + '">', createElement),
                  option.text
                ])
            }, this)
          case 'checkbox:multi':
            var options = field.domainName ? this.domains[field.domainName] : field.options
            return options.map(function (option) {
              return createElement('label', {
                class: {
                  'checkbox-inline': true
                }
              }, [
                  renderInput('<input type="checkbox" '+(field.disabled?'disabled="disabled"':'')+' v-model="' + (dataPath ? dataPath + '.' : '') + name + '" value="' + option.value + '">', createElement),
                  option.text
                ])
            }, this)
          case 'checkbox':
            var trueValue = typeof (field.trueValue) == 'undefined' ? 1 : field.trueValue
            var falseValue = typeof (field.falseValue) == 'undefined' ? 0 : field.falseValue
            return [
              createElement('label', {
                class: {
                  'checkbox-inline': true
                }
              }, [
                  renderInput('<input type="checkbox" '+(field.disabled?'disabled="disabled"':'')+' true-value="' + trueValue + '" false-value="' + falseValue + '" v-model="' + (dataPath ? dataPath + '.' : '') + name + '">', createElement),
                  createElement("span",{
                      style:{
                        visibility:"hidden"
                      }
                    },
                    "占位")
                ])
            ]
          case 'selected:multi':
            var options = field.domainName ? this.domains[field.domainName] : field.options
            if(options && options.length){
              return [
                renderInput('<select multiple class="form-control" v-model="' + (dataPath ? dataPath + '.' : '') + name + '">' +
                  options.map(function (option) {
                    return '<option value="' + option.value + '">' + option.text + '</option>';//, {domProps: {value: option.value}}, [])
                  }, this).join("")
                  + '</select>', createElement)
              ]
            }
            else{
              return [
                renderInput('<select multiple class="form-control"></select>',createElement)
              ]
            }
          case 'selected':
            var options = field.domainName ? this.domains[field.domainName] : field.options
            if(options && options.length){
              return [
                renderInput('<select class="form-control" v-model="' + (dataPath ? dataPath + '.' : '') + name + '">' +
                  '<option value="">请选择</option>'+
                  options.map(function (option) {
                    return '<option value="' + option.value + '">' + option.text + '</option>';//, {domProps: {value: option.value}}, [])
                  }, this).join("")
                  + '</select>', createElement)
              ]
            }
            else{
              return [
                renderInput('<select class="form-control"></select>',createElement)
              ]
            }
          case 'textarea':
            return [
              renderInput('<textarea '+(field.disabled?'disabled':'')+' placeholder="'+ ( field.placeholder ? field.placeholder : "" ) +'" class="form-control" rows="3" v-model="' + (dataPath ? dataPath + '.' : '') + name + '"></textarea>', createElement)
            ]
          case 'date':
          case 'datetime':
            return [
              createElement("div",{
                class:{
                  'input-group':true,
                  'date-group':true
                }
              },[
                  renderInput('<input class="form-control" placeholder="'+ ( field.placeholder ? field.placeholder : "" ) +'" readonly type="text" v-'+type+' v-model="' + (dataPath ? dataPath + '.' : '') + name + '">',createElement),
                  createElement("div",{
                      class:{
                        'input-group-addon':true
                      }
                  },[
                    createElement("i",{
                      class:{
                        "glyphicon glyphicon-calendar":true
                      }
                    })
                  ])
              ])
            ]
          case 'number':
            return [
              renderInput('<input class="form-control" placeholder="'+ ( field.placeholder ? field.placeholder : "" ) +'" type="number" v-model.number="' + (dataPath ? dataPath + '.' : '') + name + '">', createElement)
            ]
          case 'text':
          default:
            return [
              renderInput('<input class="form-control" placeholder="'+ ( field.placeholder ? field.placeholder : "" ) +'" title="' + ( data[name] ? data[name] : "" ) + '" type="'+(type?type:"text")+'" v-model.trim="' + (dataPath ? dataPath + '.' : '') + name + '">', createElement)
            ]
        }
        function renderInput(string, createElement) {
          var res = Vue.compile(string)
          return res.render.call(scope, createElement)
        }
        // function getModelOptions(){
        //     return {
        //         class:{
        //             "form-control":true
        //         },
        //         directives:[
        //             {
        //                 name:"model",
        //                 rawName:"v-model",
        //                 value:(data[name]),
        //                 expression: (dataPath ? dataPath+"." : "") +name
        //             }
        //         ],
        //         attrs:{
        //         },
        //         domProps:
        //         {
        //             "value":(data[name])
        //         },
        //         on:
        //         {
        //             "input":function($event){
        //                 if($event.target.composing)
        //                     return
        //                 self.$set(data,name,$event.target.value)
        //             }
        //         }
        //     }
        // }
      },
      resetValidation: function () {
        this.$set(this, 'validationState', {})
      },
      getData: function () {
        var scope = this.$vnode.context
        var dataPath = this.dataPath
        var data = dataPath ? getValueByPath(scope, dataPath) : scope
        return data;
      },
      hasError: function () {
        var has = false;
        for (var i = 0, field; field = this.fields[i]; i++) {
          var state = this.validationState[field.name];
          has = state && state.type === "error";
          if (has)
            break;
        }
        return has;
      },
      setValidation: function (validationState) {
        for (var key in validationState) {
          if (validationState.hasOwnProperty(key)) {
            var element = validationState[key]
            this.$set(this.validationState, key, element)
          }
        }
      }
    }
  })

  /* 来自vue-validator */
  /**
   * build-in validators
   */

  /**
   * required
   * This function validate whether the value has been filled out.
   */
  function required(val, arg) {
    var isRequired = arg === undefined ? true : arg
    if (Array.isArray(val)) {
      if (val.length !== 0) {
        var valid = true
        for (var i = 0, l = val.length; i < l; i++) {
          valid = required(val[i], isRequired)
          if ((isRequired && !valid) || (!isRequired && valid)) {
            break
          }
        }
        return valid
      } else {
        return !isRequired
      }
    } else if (typeof val === 'number' || typeof val === 'function') {
      return isRequired
    } else if (typeof val === 'boolean') {
      return val === isRequired
    } else if (typeof val === 'string') {
      return isRequired ? (val.length > 0) : (val.length <= 0)
    } else if (val !== null && typeof val === 'object') {
      return isRequired ? (Object.keys(val).length > 0) : (Object.keys(val).length <= 0)
    } else if (val === null || val === undefined) {
      return !isRequired
    } else {
      return !isRequired
    }
  }

  /**
   * pattern
   * This function validate whether the value matches the regex pattern
   */
  function pattern(val, pat) {
    if (typeof pat !== 'string') { return false }

    var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'))
    if (!match) { return false }

    return new RegExp(match[1], match[2]).test(val)
  }

  /**
   * minlength
   * This function validate whether the minimum length.
   */
  function minlength(val, min) {
    if (typeof val === 'string') {
      return isInteger(min, 10) && val.length >= parseInt(min, 10)
    } else if (Array.isArray(val)) {
      return val.length >= parseInt(min, 10)
    } else if (val === null) {
      return true;
    } else {
      return false
    }
  }

  /**
   * maxlength
   * This function validate whether the maximum length.
   */
  function maxlength(val, max) {
    if (typeof val === 'string') {
      return isInteger(max, 10) && val.length <= parseInt(max, 10)
    } else if (Array.isArray(val)) {
      return val.length <= parseInt(max, 10)
    } else if (val === null) {
      return true;
    } else {
      return false
    }
  }

  /**
   * min
   * This function validate whether the minimum value of the numberable value.
   */
  function min(val, arg) {
    return val === null || (!isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg)))
  }

  /**
   * max
   * This function validate whether the maximum value of the numberable value.
   */
  function max(val, arg) {
    return val === null || (!isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg)))
  }

  /**
   * isInteger
   * This function check whether the value of the string is integer.
   */
  function isInteger(val) {
    return /^(-?[1-9]\d*|0)$/.test(val)
  }

  var validators = Object.freeze({
    required: function (val) {
      var isValid = required(val);
      return {
        isValid: isValid,
        message: "必填项"
      }
    },
    pattern: function (val, arg) {
      var isValid = pattern(val, arg);
      return {
        isValid: isValid,
        message: "不满足正则表达式" + arg.toString()
      }
    },
    minlength: function (val, arg) {
      var isValid = minlength(val, arg);
      return {
        isValid: isValid,
        message: "长度必须大于等于" + arg
      }
    },
    maxlength: function (val, arg) {
      var isValid = maxlength(val, arg);
      return {
        isValid: isValid,
        message: "长度必须小于等于" + arg
      }
    },
    min: function (val, arg) {
      var isValid = min(val, arg);
      return {
        isValid: isValid,
        message: "值必须大于等于" + arg
      }
    },
    max: function (val, arg) {
      var isValid = max(val, arg);
      return {
        isValid: isValid,
        message: "值必须小于等于" + arg
      }
    }
  });

  return {
    renders: renders,
    validators: validators,
    helper: {
      /**
       * 返回fields 和 默认的data
       */
      getFieldsMixin: function (fields, def, dataPath) {
        if(!dataPath)dataPath = "data";
        var res = {}
        fields.forEach(function (f) {
          res[f.name] = null
        })
        if (def) {
          for (var key in def) {
            if (def.hasOwnProperty(key)) {
              var element = def[key]
              res[key] = element
            }
          }
        }
        var result = {
          data: {
            fields: fields,
          },
          methods:{
            getFormOriginData:function(){
              return res;
            },
            resetFormData:function(res){
                this.$set(this,dataPath,$.extend({},this.getFormOriginData()));
            }
          }
        };
        result.data[dataPath] = res;
        return result;
      },
      // 返回watch对象，在外部设置watch
      getValidatorMixin: function (validateOptions, formRef, dataPath) {
        var watch = {
        }
        for (var key in validateOptions) {
          if (validateOptions.hasOwnProperty(key)) {
            var element = validateOptions[key]
            watch[(dataPath ? dataPath + '.' : '') + key] = (function (option, fieldname) {
              return function (newVal) {
                var form = this.$refs[formRef];
                var isValid = true;
                var message = "";
                var messages = option.messages;
                for (var key in option) {
                  if (key != "messages" && option.hasOwnProperty(key)) {
                    var arg = option[key];
                    if (validators[key]) {
                      var validator = validators[key];
                      var res = validator(newVal, arg);
                      if (!res.isValid) {
                        isValid = false;
                        message = (messages && messages[key]) || res.message;
                        break;
                      }
                    }
                  }
                }
                var state = {};
                if (isValid) {
                  state[fieldname] = {};
                }
                else {
                  state[fieldname] = {
                    type: "error",
                    message: message
                  };
                }
                form.setValidation(state);
              }
            })(element, key);
          }
        }
        return {
          watch: watch,
          methods: {
            raiseValidate: function () {
              for (var key in watch) {
                if (watch.hasOwnProperty(key)) {
                  var element = watch[key];
                  if (typeof (element) == "function") {
                    var val = getValueByPath(this, key);
                    element.apply(this, [val]);
                  }
                }
              }
            }
          }
        };
      },
      raiseValidate: function (validateOptions, form) {
        var data = this.$vnode.context;
        data = this.dataPath ? data[this.dataPath] : data;
        this.fields.forEach(function (field) {
          this.$set(data, field.name, data[field.name]);
        }, this);
      },
    },
    regValidator:{
      phoneReg: "/(^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$)/",
      cardNumReg: "/(^(\\d{6})(18|19|20)?(\\d{2})([01]\\d)([0123]\\d)(\\d{3})(\\d|X)$)/"
    }
  }
})
