import vue from 'vue'

const _require = window.require
const _define = window.define
_define('vue', [], function () {
  return vue
})

const convert = (deps, elname) => {
  return (resolve) => {
    _require(['vue'].concat(deps), (Vue) => {
      resolve(Vue.options.components[elname])
    })
  }
}
export const CigAjaxArea = convert(['vueArea'], 'cig-ajax-area')
export const CigArea = convert(['vueArea'], 'cig-area')
export const BsPop = convert(['vueBsPop'], 'bs-pop')
export const BsTreeview = convert(['vueBsTreeview'], 'bs-treeview')
export const BsTable = convert(['vueTable'], 'bs-table')
export const CigTable = convert(['vueTable'], 'cig-table')
export const CigForm = convert(['vueForm'], 'cig-form')
export const BsTab = convert(['vueBsTab'], 'bs-tab')
