/**
 * Modify News
 * 
 */

Vue.component('modify-news-table', {
  template: `
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Author</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tr v-for="(article, index) in articles" :key="index">
          <td>{{ index }}</td>
          <td>{{ article.title }}</td>
          <td>{{ article.updated_at }}</td>
          <td>{{ article.created_by }}</td>
          <td>
            <button @click="showUpdateForm" title="Edit this post" :id="index">
              <i class="fa fa-pencil"></i>
            </button>
          </td>
          <td>
            <button @click="deleteArticle" title="Delete this post" :id="article._id">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
  `,
  computed: {
    articles() {
      return store.state.articles
    }
  },
  methods: {
    deleteArticle(event) {
      if (window.confirm('Delete this post?')) {
        const id = event.target.id
        store.dispatch('delete', id)
      }
    },
    showUpdateForm(event) {
      const index = event.target.id
      store.dispatch('showUpdateForm', index)
    }
  },
  created() {
    store.dispatch('get')
  }
})

const modifyNews = new Vue({ el: '#admin-modify-news'})