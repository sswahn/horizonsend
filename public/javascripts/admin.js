import CreateNewsForm from './createNews.js'
import ModifyNewsTable from './modifyNews.js'

const admin = new Vue({
  el: '#admin-news',
  components: {
    'create-news': CreateNewsForm,
    'modify-news': ModifyNewsTable
  }
})