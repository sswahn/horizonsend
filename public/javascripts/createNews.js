/**
 * Create News Component
 * 
 */

Vue.component('create-news-form', {
  template: `
    <form v-on:submit.prevent="submitForm()" class="form form-medium">
      <h2>Create a News article</h2>
      <div>
        <label for="image-src">Image URL</label>
        <input id="image-src" type="text" name="image_src" required>
      </div>
      <div>
        <label for="image-alt">Image description</label>
        <input id="image-alt" type="text" name="image_alt" required>
      </div>
      <div>
        <label for="caption">Image caption</label>
        <input id="caption" type="text" name="caption" required>
      </div>
      <div>
        <label for="title">Title</label>
        <input id="title" type="text" name="title" required>
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  `,
  methods: {
    submitForm() {
      const data = {
        image_src: this.$el[0].value,
        image_alt: this.$el[1].value,
        caption: this.$el[2].value,
        title: this.$el[3].value,
        message: this.$el[4].value
      }
      store.dispatch('post', data)
    }
  }
})

const createNews = new Vue({ el: '#admin-create-news'})