define([
  'require',
  'vue',
  'jQuery',
  'systemConfig',
  'vueAlert',
  'vuedraggable',
  'jQueryAjaxFileUpload',
  'css!cssAttachment',
  'vueBsPop'
], function (require, Vue, $, config, alert, vuedraggable) {
  'use strict'
  // console.log(vuedraggable);
  // Vue.component('draggable', vuedraggable);
  function deepClone (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  Vue.component('cig-preview', {
    template: '<bs-pop\
            type="lg" title="预览" ref="pop" @closed="hide()">\
                <cig-files-previewimg\
                :url="urlProxy"\
                v-model="urlProxy"\
                :visit-path="visitPath"\
                @input="input"\
                :files="imgFilesProxy"\
                v-if="isImage"\
                ref="previewimg">\
                </cig-files-previewimg>\
                <div v-if="isVideo" style="text-align:center">\
                    <video v-if="isVideo" style="max-width: 870px;max-height:500px;" :src="url" controls="controls" ref="vedio">\
                </div>\
                <template slot="footer">\
                    <button type="button" class="btn btn-default" @click="hide">关闭</button>\
                </template>\
            </bs-pop>',
    props: {
      url: {
        default: '',
        type: String
      },
      isImage: {
        type: Boolean,
        default: false
      },
      isVideo: {
        type: Boolean,
        default: false
      },
      imgFiles: {
        default: null
      },
      visitPath: {
        type: String,
        default: 'visitPath'
      }
    },
    data: function () {
      return {
        urlProxy: this.url
      }
    },
    computed: {
      imgFilesProxy: function () {
        return this.imgFiles
      }
    },
    watch: {
      url: function (val) {
        this.urlProxy != val && (this.urlProxy = val)
      }
    },
    mounted: function () {},
    methods: {
      hide: function () {
        this.$refs.pop.hide()
        if (this.$refs.vedio) {
          this.$refs.vedio.pause()
        }
      },
      input: function () {
        this.$emit('input', this.urlProxy)
      },
      show: function () {
        this.$refs.pop.show()
        this.$refs.previewimg && this.$refs.previewimg.active()
      }
    }
  })

  Vue.component('cig-files-previewimg', {
    template: '<div class="preViewImg" @mouseover="btnShow" @mouseout="btnHide">\
                    <div class="img-wrapper" ref="imgWrap" @mousewheel.stop="mousewheelImg">\
                        <img \
                        title="可移动" \
                        :style="curStyle" \
                        :src="curUrl" \
                        @load="imgload" \
                        ref="curImg">\
                    </div>\
                    <div class="tool">\
                        <div class="space_line"></div>\
                        <div class="add_icon" @click="toScale(\'add\')"></div>\
                        <div class="scale_text" style="width:60px">{{showScale}}%</div>\
                        <div class="reduce_icon" @click="toScale(\'reduce\')"></div>\
                        <div class="space_line"></div>\
                        <div class="rotate_left" @click="rotateTo(\'left\')" title="向左旋转"></div>\
                        <div class="scale_text">旋转</div>\
                        <div class="rotate_right" @click="rotateTo(\'right\')" title="向右旋转"></div>\
                        <div class="space_line"></div>\
                        <div class="scale_origin" @click="getInit">合适尺寸</div>\
                        <div class="space_line"></div>\
                    </div>\
                    <div class="btnImg left" :class="btnOver && curIndex>0?\'on\':\'\'"><div @click.stop="prveImg"></div></div>\
                    <div class="btnImg right" :class="btnOver && files && curIndex<files.length-1?\'on\':\'\'"><div @click.stop="nextImg"></div></div>\
                 </div>',
    props: {
      url: {},
      files: [],
      visitPath: {
        type: String,
        default: 'visitPath'
      }
    },
    data: function () {
      return {
        wrapWidth: 500,
        wrapHeight: 600,
        oriWidth: 0,
        oriHeight: 0,
        curStyle: {
          width: 0,
          height: 0,
          transform: 'matrix(1,0,0,1,0,0)',
          left: 0,
          top: 0
        },
        loading: true,
        scale: 1,
        showScale: 100,
        x: 0,
        y: 0,
        angle: 0,
        btnOver: false,
        curIndex: null,
        curUrl: this.url
      }
    },
    computed: {},
    watch: {
      url: function (val) {
        this.active()
      },
      files: function () {
        this.active()
      }
    },
    mounted: function () {
      this.active()
    },
    methods: {
      active: function () {
        // console.log(this.url)
        var ni = 0,
          _this = this
        if (this.url && this.files) {
          this.files.map(function (file, i) {
            file[_this.visitPath] == _this.url && (ni = i)
          })
        }
        this.curUrl = this.url
        this.curIndex = ni
      },
      rotateTo: function (direction) {
        if (direction == 'left') {
          this.angle -= 90
        } else {
          this.angle += 90
        }
        var tempObj = {
          transform: this.getMatrix()
        }
        this.curStyle = $.extend({}, this.curStyle, tempObj)
      },
      getMatrix: function () {
        // return "scale("+this.scale+")rotate("+this.angle+"deg)";
        // 矩阵方法
        var rad = this.angle / 180 * Math.PI,
          matrix_scale = [
            this.scale, 0, 0,
            0, this.scale, 0,
            0, 0, 1
          ],
          matrix_rotate = [
            Math.cos(rad), -Math.sin(rad), 0,
            Math.sin(rad), Math.cos(rad), 0,
            0, 0, 1
          ],
          matrix = []

        for (var i = 0; i < 9; i++) {
          var row = parseInt(i / 3)
          var col = parseInt(i % 3)
          var sum = 0
          for (var j = 0; j < 3; j++) {
            sum += matrix_scale[row * 3 + j] * matrix_rotate[j * 3 + col]
          }
          matrix[i] = sum
        }
        return 'matrix(' + matrix[0] + ',' + matrix[3] + ', ' + matrix[1] + ',' + matrix[4] + ', ' + matrix[2] + ',' + matrix[5] + ')'
      },
      mousewheelImg: function (e) {
        e = e || window.event
        if (e.wheelDelta) {
          if (parseInt(e.wheelDelta) > 0) {
            this.toScale('add', 10)
          } else {
            this.toScale('reduce', 10)
          }
        } else if (e.detail) { // Firefox
          if (parseInt(e.detail) > 0) {
            this.toScale('reduce', 10)
          } else {
            this.toScale('add', 10)
          }
        }
      },
      prveImg: function (e) {
        this.curIndex = this.curIndex - 1
        this.curUrl = this.files[this.curIndex][this.visitPath]
        this.$emit('input', this.curUrl)
      },
      nextImg: function () {
        this.curIndex = this.curIndex + 1
        this.curUrl = this.files[this.curIndex][this.visitPath]
        this.$emit('input', this.curUrl)
      },
      btnShow: function () {
        this.btnOver = true
      },
      btnHide: function () {
        this.btnOver = false
      },
      mousedownImg: function (e) {
        if (e.button == 0) {
          this.x = e.clientX - parseInt($(this.$refs.curImg).css('left'))
          this.y = e.clientY - parseInt($(this.$refs.curImg).css('top'))
          $(document).bind('mousemove', this.mousemoveImg)
          $(document).bind('mouseup', this.mouseupImg)
        }
        return false
      },
      mouseupImg: function (e) {
        $(document).unbind('mousemove', this.mousemoveImg)
        $(document).unbind('mouseup', this.mouseupImg)
      },
      mousemoveImg: function (e) {
        var newStyl = {
          left: (e.clientX - this.x) + 'px',
          top: (e.clientY - this.y) + 'px'
        }
        this.curStyle = $.extend({}, this.curStyle, newStyl)
      },
      imgload: function () {
        this.oriWidth = this.$refs.curImg.naturalWidth
        this.oriHeight = this.$refs.curImg.naturalHeight
        this.wrapWidth = this.$el.clientWidth
        this.getInit()
      },
      getWrapWidth: function () {
        var _this = this,
          set = setInterval(function () {
            if (_this.wrapWidth) {
              clearInterval(set)
              _this.getInit()
            } else {
              _this.wrapWidth = _this.$el.clientWidth
            }
          }, 500)
      },
      getInit: function () {
        if (!this.wrapWidth) {
          this.getWrapWidth()
          return
        }
        var or_b = this.oriWidth / this.oriHeight,
          wrap_b = this.wrapWidth / this.wrapHeight
        this.scale = 1
        this.angle = 0
        if (or_b >= wrap_b) {
          this.curStyle = {
            width: this.wrapWidth + 'px',
            height: this.wrapWidth / or_b + 'px',
            left: '0px',
            top: (this.wrapHeight - this.wrapWidth / or_b) / 2 + 'px',
            transform: this.getMatrix()
          }
          this.showScale = parseInt(this.wrapWidth / this.oriWidth * 100)
        } else {
          this.curStyle = {
            width: this.wrapHeight * or_b + 'px',
            height: this.wrapHeight + 'px',
            left: (this.wrapWidth - this.wrapHeight * or_b) / 2 + 'px',
            top: '0px',
            transform: this.getMatrix()
          }
          this.showScale = parseInt(this.wrapHeight / this.oriHeight * 100)
        }
        this.loading = false
        $(this.$refs.curImg).bind('mousedown', this.mousedownImg)
      },
      toScale: function (type, num) {
        if (this.loading) return
        var np = num || 25,
          nf = np / 100
        if (type == 'add') {
          this.showScale = this.showScale + np
          this.scale = this.scale + nf
        } else {
          if (this.scale - nf > 0.01 && this.showScale > np) {
            this.showScale = this.showScale - np
            this.scale = this.scale - nf
          }
        }
        var tempObj = {
          transform: this.getMatrix()
        }
        this.curStyle = $.extend({}, this.curStyle, tempObj)
      },
      reset: function () {
        this.wrapWidth = this.$el.clientWidth
        this.getInit()
      }
    }
  })

  var cigFileComponent = {
    /** 原来按钮排序方式
    template:'<div :class="[wrapClass,\'file-wrap\']">\
        <ul v-if="viewType == \'grid\'" class="file-group file-group-grid" :title="fullFilesText">\
            <li v-for="(item,index) in files">\
                <span href="javascript:;" @click="fileClick(item)" :title="item.fileName" class="file-text">\
                    {{item.fileName}}\
                </span>\
                <span class="file-grid-rm">\
                    <span class="glyphicon glyphicon-remove" v-if="mode.indexOf(\'remove\')>=0" @click="fileRemove(item)" title="删除"></span>\
                    <span class="glyphicon glyphicon-arrow-right" v-if="index < files.length-1" @click="fileSort(index,\'next\')" title="后移"></span>\
                    <span class="glyphicon glyphicon-arrow-left" v-if="index!=0" @click="fileSort(index,\'prev\')" title="前移"></span>\
                </span>\
            </li>\
            <li v-if="mode.indexOf(\'add\')>=0" v-show="limitNum == 0 || limitNum > files.length">\
                <a href="javascript:;" :class="[\'file-icon\',\'glyphicon glyphicon-plus\']">\
                </a>\
                <input v-show="mode.indexOf(\'add\')>=0" class="file-add-hid" @click="setupUpload" name="file" type="file" ref="file">\
            </li>\
        </ul>\
        <ul v-else class="file-group">\
            <li v-for="(item,index) in files">\
                <span href="javascript:;" v-if="item.preUrl" class="file-icon">\
                    <img :src="item.preUrl">\
                </span>\
                <span href="javascript:;" v-if="!item.preUrl" :class="[\'file-icon\',\'type\',\'type-\'+getFileExt(item.fileName)]">\
                </span>\
                <span class="file-rm" :class="files.length<2? \'num2\': index==0 || index==files.length-1? \'num3\' : \'\'">\
                    <div class="act"  @click="fileClick(item)" :title="\'预览\'+item.fileName" v-if="item.preUrl">\
                        <span class="glyphicon glyphicon-eye-open"></span>\
                    </div>\
                    <div class="act"  @click="fileClick(item)" :title="\'下载\'+item.fileName" v-if="!item.preUrl">\
                        <span class="glyphicon glyphicon-save"></span>\
                    </div>\
                    <div class="act" v-if="mode.indexOf(\'remove\')>=0" @click="fileRemove(item)" title="删除">\
                        <span class="glyphicon glyphicon-trash"></span>\
                    </div>\
                    <div class="act" v-if="index!=0" @click="fileSort(index,\'prev\')" title="前移">\
                        <span class="glyphicon glyphicon-arrow-left"></span>\
                    </div>\
                    <div class="act" v-if="index < files.length-1" @click="fileSort(index,\'next\')" title="后移">\
                        <span class="glyphicon glyphicon-arrow-right"></span>\
                    </div>\
                </span>\
            </li>\
            <li v-if="mode.indexOf(\'add\')>=0" v-show="limitNum == 0 || limitNum > files.length">\
                <a href="javascript:;" :class="[\'file-icon\',\'glyphicon glyphicon-plus\']">\
                </a>\
                <input v-show="mode.indexOf(\'add\')>=0" class="file-add-hid" @click="setupUpload" name="file" type="file" ref="file">\
            </li>\
        </ul>\
    </div>',
    */
    /** 拖动排序方式 */
    template: '<div :class="[wrapClass,\'file-wrap\']" ref="filewrap">\
            <draggable v-if="viewType == \'grid\'" element="ul" class="file-group file-group-grid" :title="fullFilesText"\
             v-model="files" :options="{animation: 150, draggable:\'.itemd\',}" @end="endDrag">\
                <li v-for="(item,index) in files" :class="mode.indexOf(\'remove\')>=0?\'itemd\':\'\'" :key="index">\
                    <span href="javascript:;" @click="fileClick(item)" :title="\'文件名：\'+ item.fileName + (mode.indexOf(\'remove\')>=0?\'（可拖动排序）\':\'\')" class="file-text">\
                        {{item.fileName}}\
                    </span>\
                    <span class="file-drag-rm glyphicon glyphicon-remove" v-if="mode.indexOf(\'remove\')>=0" @click.stop="fileRemove(item)" title="删除"></span>\
                </li>\
                <li v-if="mode.indexOf(\'add\')>=0" v-show="limitNum == 0 || limitNum > files.length">\
                    <a href="javascript:;" :class="[\'file-icon\',\'glyphicon glyphicon-plus\']">\
                    </a>\
                    <input v-show="mode.indexOf(\'add\')>=0" class="file-add-hid" @click="setupUpload"  :multiple="multiple" name="file" type="file" ref="file">\
                </li>\
            </draggable>\
            <draggable element="ul" v-else class="file-group" v-model="files"\
             :options="{animation: 150, draggable:\'.itemd\',}" @end="endDrag" :class="isRename?\'rename\':\'\'">\
                <li v-for="(item,index) in files" :class="mode.indexOf(\'remove\')>=0?\'itemd\':\'\'" :key="index">\
                    <span href="javascript:;" v-if="item.preUrl" @click.stop="fileClick(item)" :title="\'文件名：\'+ item.fileName + (mode.indexOf(\'remove\')>=0?\'（可拖动排序）\':\'\')" class="file-icon">\
                        <!--<img :src="item.preUrl">-->\
                        <i class="img" :style="{backgroundImage:\'url(\'+item.preUrl+\')\'}"></i>\
                    </span>\
                    <span href="javascript:;" v-if="!item.preUrl" @click.stop="fileClick(item)" :title="\'文件名：\'+ item.fileName + (mode.indexOf(\'remove\')>=0?\'（可拖动排序）\':\'\')" :class="[\'file-icon\',\'type\',\'type-\'+getFileExt(item.fileName)]">\
                    </span>\
                    <div v-if="isRename" class="rename_input"><input v-model="item.rename" @keyup="toRename($event,index)" @blur="toRename($event,index)" /></div>\
                    <span class="file-drag-rm glyphicon glyphicon-remove" v-if="mode.indexOf(\'remove\')>=0" @click.stop="fileRemove(item)" title="删除"></span>\
                </li>\
                <li v-if="mode.indexOf(\'add\')>=0" v-show="limitNum == 0 || limitNum > files.length">\
                    <a href="javascript:;" :class="[\'file-icon\',\'glyphicon glyphicon-plus\']">\
                    </a>\
                    <input v-show="mode.indexOf(\'add\')>=0" class="file-add-hid" @click="setupUpload" :multiple="multiple" name="file" type="file" ref="file">\
                </li>\
            </draggable>\
        </div>',
    props: {
      wrapClass: {
        default: '',
        type: String
      },
      viewType: {
        default: 'form',
        type: String
      },
      multiple: {
        type: Boolean,
        default: true
      },
      ajaxUrl: {
        default: function () {
          return {
            'uploadFile': config.backendurl + '/common/uploadFile',
            'getFiles': config.backendurl + '/common/getFiles'
          }
        },
        type: Object
      },
      fileType: {
        default: 'unkown',
        type: String
      },
      busId: {
        default: ''
      },
      mode: {
        default: 'remove|add',
        type: String
      },
      allowCategories: {
        default: function () {
          return {
            '图片': ['gif', 'png', 'jpg', 'jpeg', 'bmp'],
            '视频': ['mov', 'mp4', 'rmvb', 'wmv', 'avi', 'rm', '3gp', 'mkv'],
            '文档': ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'ppt', 'pptx'],
            '压缩包': ['zip', 'rar']
          }
        },
        type: Object
      },
      limitNum: {
        default: 0
      },
      isRename: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        files: [
          // {
          //     id:1,
          //     fileName:"11.png",
          //     category:"图片",
          //     preCls:"glyphicon-picture",
          //     preUrl:"http://www.baidu.com/img/bd_logo.png",
          //     visitPath:"http://www.baidu.com/img/bd_logo.png",
          // },
          // {
          //     id:1,
          //     fileName:"11.png",
          //     preCls:"glyphicon-picture",
          //     visitPath:"http://www.baidu.com/img/bd_logo.png",
          // },
          // {
          //     id:1,
          //     fileName:"11.doc",
          //     preCls:"glyphicon-file",
          //     visitPath:"http://www.baidu.com/img/bd_logo.png",
          // }
        ],
        ori_files: [],
        adds: [],
        dels: [],
        imgFiles: [],
        uploadParams: {
          category: null
        },
        // prePop:null,
        previewUrl: null,
        previewType: null,
        fullFilesText: null
      }
    },
    computed: {},
    watch: {
      busId: function (newVal) {
        this.$set(this, 'files', [])
        this.$set(this, 'ori_files', [])
        this.$set(this, 'dels', [])
        if (this.busId) {
          this.loadData()
        }
      },
      files: function (newVal) {
        var self = this
        this.adds = newVal
        this.imgFiles = this.files.filter(function (file) {
          return file.category == '图片'
        })
        this.fullFilesText = this.files.map(function (file) {
          var filename = file.fileName
          file.rename = self.getFilenameNoExt(filename)
          return filename
        }).join('；')
        this.onChangeVal()
      }
    },
    mounted: function () {
      if (this.busId) {
        this.loadData()
      }
    },
    methods: {
      toRename: function (e, index) {
        if (e.type == 'blur' || e.keyCode == 13) {
          var self = this,
            file = this.files[index]
          if (this.getFilenameNoExt(file.fileName) !== file.rename) {
            var data = {
              id: file.id,
              fileName: file.rename
            }
            $.ajax({
              url: config.backendurl + '/common/updateFileName',
              type: 'get',
              data: data,
              success: function (res) {
                if (res.success) {
                  console.log('修改文件成功')
                  self.files[index].fileName = self.files[index].rename + '.' + self.getFileExt(self.files[index].fileName)
                } else {
                  console.log('修改文件失败:' + JSON.stringify(res))
                }
              },
              error: function (err) {
                console.log('修改文件错误:' + JSON.stringify(err))
              }
            })
          }
        }
      },
      endDrag: function () {
        // console.log(this.files)
      },
      getFilenameNoExt: function (filename) {
        var tempArr = filename && !!~filename.indexOf('.') ? filename.split('.') : [filename]
        tempArr.length > 1 && tempArr.pop()
        return tempArr.join('.')
      },
      getFileExt: function (filename) {
        return filename && !!~filename.indexOf('.') ? filename.split('.').pop().toLowerCase() : ''
      },
      fileSort: function (index, type) {
        var changeIndex = type == 'prev' ? index - 1 : index + 1,
          nowValue = deepClone(this.files[index]),
          changeValue = deepClone(this.files[changeIndex])
        this.files.splice(index, 1, changeValue)
        this.files.splice(changeIndex, 1, nowValue)
      },
      reset: function () {
        this.$set(this, 'files', [])
        this.$set(this, 'ori_files', [])
        this.$set(this, 'dels', [])
      },
      setupUpload: function () {
        var $el = $(this.$refs.file)
        this.resetUploader($el)
        $el.ajaxfileupload({
          params: this.uploadParams,
          action: this.ajaxUrl.uploadFile,
          onStart: this.beforeUpload.bind(this),
          onComplete: this.fileUploaded.bind(this),
          onCancel: function () {},
          validate_extensions: true,
          valid_extensions: this.getAllowExts(),
          submit_button: null
        })
      },
      resetUploader: function ($el) {
        $el.val('')
        $el.off('change')
        $el.data('ajaxUploader-setup', false)
      },
      getAllowExts: function () {
        var exts = []
        for (var key in this.allowCategories) {
          if (this.allowCategories.hasOwnProperty(key)) {
            var element = this.allowCategories[key]
            exts = exts.concat(element)
          }
        }
        return exts
      },
      beforeUpload: function () {
        var _this = this,
          $el = $(this.$refs.file),
          files = $el[0].files,
          len = files.length,
          i = 0,
          categoryArr = []

        if (this.limitNum !== 0 && len + this.files.length > this.limitNum) {
          alert.alert({
            message: '上传文件数量不得超过' + this.limitNum,
            callback: function () {
              _this.resetUploader($el)
              $el.parent()[0].tagName === 'FORM' && ($el.siblings().remove(), $el.unwrap())
            }
          })
          return false
        }

        while (i < len) {
          var ext = files[i].name.split('.').pop().toLowerCase()
          for (var key in this.allowCategories) {
            if (this.allowCategories.hasOwnProperty(key)) {
              var element = this.allowCategories[key]
              element.indexOf(ext) >= 0 && categoryArr.push(key)
            }
          }
          i++
        }
        this.uploadParams.category = categoryArr.length > 0 ? categoryArr.join(',') : null
      },
      loadData: function () {
        $.ajax({
          url: this.ajaxUrl.getFiles,
          data: {
            id: this.busId,
            fileType: this.fileType
          },
          type: 'get',
          success: this.getFilesSuccess.bind(this),
          error: this.getFilesError.bind(this)
        })
      },
      getFilesSuccess: function (res) {
        if (res.success) {
          res.data.forEach(this.formatFile)
          this.$set(this, 'ori_files', JSON.parse(JSON.stringify(res.data)))
          this.files = this.files.length > 0 ? this.files.concat(res.data) : res.data
        } else {
          this.getFilesError()
        }
      },
      getFilesError: function () {},
      formatFile: function (f) {
        var preClses = {
          '图片': 'glyphicon-picture',
          '视频': 'glyphicon-film',
          '文档': 'glyphicon-file',
          '压缩包': 'glyphicon-file'
        }
        f.preCls = preClses[f.category] ? preClses[f.category] : 'glyphicon-file'
        if (f.thumbnail) {
          f.preUrl = f.thumbnail.visitPath
        }
      },
      fileUploaded: function (res) {
        if (res.success) {
          var f = res.data,
            valueType = Object.prototype.toString.call(f).split(' ')[1].slice(0, -1),
            isMult = valueType === 'Array'
          if (isMult) {
            f.map(function (fItem) {
              this.formatFile(fItem)
              this.files.push(fItem)
            }.bind(this))
          } else {
            this.formatFile(f)
            this.files.push(f)
          }
          if (this.isRename && this.$refs.filewrap) {
            var index = this.files.length - 1
            this.$nextTick(function () {
              $(this.$refs.filewrap).find('ul li:eq(' + index + ') input').focus()
            }.bind(this))
          }
        } else {
          if (res.success === 0) {
            alert.alert(res.errMsg)
          } else if (res.status === false) {
            alert.alert('不允许上传该类型文件')
          }
          // TODO:出错了

          // var f = {
          //     id:Math.random(),
          //     fileName:"出错了",
          //     visitPath:""
          // };
          // this.formatFile(f);
          // this.files.push(f);
          // this.adds.push(f);
          // this.onChangeVal();
        }
      },
      isImage: function (file) {
        return file.category == '图片'
      },
      isVideo: function (file) {
        return file.category == '视频' || file.category == '语音'
      },
      fileClick: function (file) {
        if (this.isImage(file) || this.isVideo(file)) {
          this.preView(file)
        } else {
          this.download(file)
        }
      },
      preView: function (file) {
        this.previewUrl = file.visitPath
        this.previewType = file.category == '图片' ? 'isImage' : 'isVideo'
        var self = this
        getPrePop(function () {
          self.prePop.show()
          self.prePop.setData(self.previewUrl, self.previewType, self.imgFiles)
        })

        function getPrePop (callback) {
          if (!self.prePop) {
            var prePop = Vue.extend({
              template: '<cig-preview ref="preview"\
                                    :url="previewUrl"\
                                    v-model="previewUrl"\
                                    :is-image="previewType==\'isImage\'"\
                                    :is-video="previewType==\'isVideo\'"\
                                    :img-files="imgFiles">\
                                </cig-preview>',
              data: function () {
                return {
                  previewUrl: null,
                  previewType: null,
                  imgFiles: null
                }
              },
              mounted: function () {},
              methods: {
                setData: function (previewUrl, previewType, imgFiles) {
                  this.$set(this, 'previewUrl', previewUrl)
                  this.$set(this, 'previewType', previewType)
                  this.$set(this, 'imgFiles', imgFiles)
                },
                show: function () {
                  this.$refs.preview.show()
                }
              }
            })
            self.prePop = new prePop()
            self.prePop.$mount()
            $(self.prePop.$el).appendTo('body')
            callback()
          } else {
            callback()
          }
        }
        /* var url = file.visitPath;
        var isImage = file.category == "图片";
        var isVideo = file.category == "视频";
        var imgFiles = this.imgFiles
        var self = this;
        getPrePop(function(){
            self.prePop.show();
            self.prePop.setData(url,isImage,isVideo,imgFiles);
        });
        function getPrePop(callback){
            if(!self.prePop){
                requirejs(["vueBsPop"],function(pop){
                    var prePop = Vue.extend({
                        template:'<bs-pop\
                            type="lg" title="预览" ref="pop" @closed="hide()">\
                                <cig-files-previewimg\
                                :cur-url="url"\
                                :files="imgFiles" \
                                v-if="isImage">\
                                </cig-files-previewimg>\
                                <div v-if="isVideo" style="text-align:center">\
                                    <!--<img v-if="isImage" style="max-width: 870px;max-height:600px;" :src="url">-->\
                                    <video v-if="isVideo" style="max-width: 870px;max-height:500px;" :src="url" controls="controls" ref="vedio">\
                                </div>\
                                <template slot="footer">\
                                    <button type="button" class="btn btn-default" @click="hide">关闭</button>\
                                </template>\
                            </bs-pop>',
                        data:function(){
                            return {
                                url:"",
                                isImage:false,
                                isVideo:false,
                                imgFiles:null,
                            }
                        },
                        mounted:function(){
                            $(".modal").on("hidden.bs.modal",this.hide.bind(this));
                            if(this.value){
                                this.show();
                            }
                        },
                        methods:{
                            setData:function(url,isImage,isVideo,imgFiles){
                                this.$set(this,"url", url);
                                this.$set(this,"isImage", isImage);
                                this.$set(this,"isVideo", isVideo);
                                this.$set(this,"imgFiles", imgFiles);
                            },
                            hide:function(){
                                this.$refs.pop.hide();
                                if(this.$refs.vedio) {
                                    this.$refs.vedio.pause();
                                }
                            },
                            show:function(){
                                this.$refs.pop.show();
                            }
                        }
                    });
                    self.prePop = new prePop();
                    self.prePop.$mount();
                    $(self.prePop.$el).appendTo("body");
                    callback();
                });
            }
            else{
                callback();
            }
        } */
      },
      download: function (file) {
        var url = file.visitPath
        window.open(url, '_blank')
      },
      fileRemove: function (rmFile) {
        for (var i = 0, file; file = this.files[i]; i++) {
          if (rmFile === file) {
            this.ori_files.map(function (oitem, oi) {
              oitem.id === file.id && this.dels.push(rmFile)
            }.bind(this))
            this.files.splice(i, 1)
            break
          }
        }
      },
      onChangeVal: function () {
        this.$emit('input', {
          add: this.adds.map(function (f) {
            return f.id
          }),
          del: this.dels.map(function (f) {
            return f.id
          })
        })
        this.$emit('fileschange', this.files)
      }
    }
  }
  Vue.component('cig-files', cigFileComponent)

  var helper = {
    getSource: function (busId, fileType) {
      var files = []
      var ajaxUrl = config.backendurl + '/common/getFiles'
      $.ajax({
        url: ajaxUrl,
        data: {
          id: busId,
          fileType: fileType
        },
        type: 'get',
        success: function (res) {
          if (res.success && res.data) {
            res.data.forEach(function (file) {
              files.push(file)
            })
          }
        }
      })
      return files
    },
    getUrls: function (busId, fileType) {
      var urls = []
      var ajaxUrl = config.backendurl + '/common/getFiles'
      $.ajax({
        url: ajaxUrl,
        data: {
          id: busId,
          fileType: fileType
        },
        type: 'get',
        success: function (res) {
          if (res.success && res.data) {
            res.data.forEach(function (file) {
              urls.push(file.visitPath)
            })
          }
        }
      })
      return urls
    },
    getUrl: function (busId, fileType, defaultUrl) {
      var obj = {}
      if (defaultUrl) {
        Vue.set(obj, 'url', defaultUrl)
      }
      var ajaxUrl = config.backendurl + '/common/getFiles'
      $.ajax({
        url: ajaxUrl,
        data: {
          id: busId,
          fileType: fileType
        },
        type: 'get',
        success: function (res) {
          if (res.success && res.data && res.data.length) {
            Vue.set(obj, 'url', res.data[0].visitPath)
          }
        }
      })
      return obj
    }
  }
  return {
    helper: helper,
    cigFileComponent: cigFileComponent
  }
})
