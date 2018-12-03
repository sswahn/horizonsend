/**
 * News Component
 * 
 */

Vue.component('news-app', {
  template: `
    <div class="sections">
      <article v-for="(article, index) in articles" :key="index"
      :id="article._id" class="article">
        <figure>
          <a :href="article.image_src">
            <img :src="article.image_src" :alt="article.image_alt">
          </a>
          <figcaption>{{ article.caption }}</figcaption>
        </figure>
        <header>
          <h2>{{ article.title }}</h2>
          <span class="author">By <a href="#" rel="author">{{ article.created_by }}</a></span> &ndash; 
          <time :datetime="article.updated_at">{{ formatDate(article.updated_at) }}</time>
        </header>
        <div>
          <p>{{ article.message }}</p>
        </div>
      </article>
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
    setData(data) {
      this.articles = data
    },
    formatDate(date) { // temp
      return (new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      }))
    }
  },
  created() {
    this.getArticles()
  }
})

const vm = new Vue({ el: '#news' })