<template>
  <div>
    <el-button v-for="(link,index) in Link"
               :key="index"
               :icon="link.icon"
               @click="linkTo(link)">
      {{link.name}}
    </el-button>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      Link: [
        {
          icon: 'el-icon-s-home',
          name: '首页',
          url: '/'
        },
        {
          icon: 'el-icon-menu',
          name: '树形控件',
          url: '/elment-ui/tree'
        }
      ]
    }
  },
  methods: {
    linkTo (link) {
      this.$router.push(link.url)
    }
  }
}
</script>
