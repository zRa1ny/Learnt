<template>
  <div class="tree">
    <el-row>
      <el-card>
        <div slot="header">普通树模型</div>
        <el-tree :data="data"
                 shWow-checkbox
                 node-key="id"
                 :default-expanded-keys="[2, 3]"
                 :default-checked-keys="[5]">
        </el-tree>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header"
             @click="checkboxTreeShow()">多选树模型</div>
        <el-tree :data="data"
                 show-checkbox
                 node-key="id"
                 :default-expanded-keys="[2, 3]"
                 :default-checked-keys="[5]"
                 ref="checkboxTree">
        </el-tree>
      </el-card>
    </el-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2'

          }]
        }, {
          id: 2,
          label: '二级 2-2',

          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2'
            // disabled: true
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    checkboxTreeShow () {
      var CheckedNodes = this.$refs.checkboxTree.getCheckedNodes(false)// (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
      console.log(CheckedNodes)
      console.log(this.$refs.checkboxTree.getCurrentKey())
    }
  }
}
</script>
