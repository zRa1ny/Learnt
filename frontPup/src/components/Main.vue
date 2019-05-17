<template>
  <div class="main">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside></el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
import VHeader from '@/components/VHeader'
export default {
  name: 'Main',
  components: { VHeader }

}
</script>
<style>
.main {
}
.aside {
  width: 180px;
}
</style>
