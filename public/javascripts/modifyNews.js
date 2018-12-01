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
            <th>Title</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tr v-for="(article, index) in articles" :key="index" id="article._id">
          <td>{{ article.title }}</td>
          <td>{{ article.updated_at }}</td>
          <td>
            <button @click="showEditForm" title="Edit this post">
              <i class="fas fa-pencil-alt"></i>
            </button>
          </td>
          <td>
            <button @click="deleteArticle" title="Delete this post">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
  `,
  data() {
    return {
      articles: this.articles || []
    }
  },
  methods: {
    getArticles() {
      return fetch('/api/v1/news')
        .then(response => response.json())
        .then(data => this.setData(data))
        .catch(error => console.error(error))
    },
    deleteArticle(event) {
      if (window.confirm('Delete this post?')) {
        const id = event.target.parentNode.id
        return fetch(`/api/v1/news/${id}`, {
          method: 'delete'
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
      }
    },
    showEditForm(event) {
      const id = event.target.parentNode.id
      window.location.href = `/admin/news/${id}`
    },
    setData(data) {
      this.articles = data
    }
  },
  mounted() {
    this.getArticles()
  }
})

const modifyNews = new Vue({ el: '#admin-news'})