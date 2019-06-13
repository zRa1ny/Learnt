<template>
  <div>
    <input type="text"
           v-model="myname"
           @input="inputa">
  </div>
</template>
<script>
export default {
  props: {
    name: null
  },
  computed: {
    myname: {
      get () {
        return this.myname
      },
      set (data) {
        return data
      }
    }
  },
  methods: {
    inputa () {
      // this.$emit('input', this.myname)
    }
  }
}
</script>
