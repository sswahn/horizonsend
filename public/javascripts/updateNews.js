/**
 * Update News Component
 * 
 */

Vue.component('update-news-form', {
  template: `
    <form v-show="display" v-on:submit.prevent="submitForm()" class="form form-medium">
      <h2>Update a News article</h2>
      <div>
        <label for="image-src">Image URL</label>
        <input id="image-src" type="text" name="image_src" required :value="article.image_src">
      </div>
      <div>
        <label for="image-alt">Image description</label>
        <input id="image-alt" type="text" name="image_alt" required :value="article.image_alt">
      </div>
      <div>
        <label for="caption">Image caption</label>
        <input id="caption" type="text" name="caption" required :value="article.caption">
      </div>
      <div>
        <label for="title">Title</label>
        <input id="title" type="text" name="title" required :value="article.title">
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" required :value="article.message"></textarea>
      </div>
      <input type="hidden" :value="article._id">
      <button type="submit">Submit</button>
    </form>
  `,
  computed: {
    article() {
      return store.state.articles[
        store.state.updateIndex
      ] || []
    },
    display() {
      return store.state.showUpdateForm
    }
  },
  methods: {
    submitForm() {
      const data = {
        put: {
          image_src: this.$el[0].value,
          image_alt: this.$el[1].value,
          caption: this.$el[2].value,
          title: this.$el[3].value,
          message: this.$el[4].value
        },
        id: this.$el[5].value
      }
      store.dispatch('put', data)
    }
  }
})

const updateNews = new Vue({ el: '#admin-update-news'})