/**
 * News Component
 * 
 */

Vue.component('news-app', {
  template: `
  <div>
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
        <address class="author">By <span rel="author">{{ article.author }}</span></address> &ndash; 
        <time :datetime="article.date">{{ article.date }}</time>
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
    }
  },
  mounted() {
    this.getArticles()
  }
})

const vm = new Vue({ el: '#news' })