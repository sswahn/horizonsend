/**
 * Create News Component
 * 
 */

Vue.component('create-news-form', {
  template: `
    <form v-on:submit.prevent="submitForm()">
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
        <input id="message" type="text" name="message" required>
      </div>
      <button type="submit">Submit</button>
    </form>
  `,
  methods: {
    submitForm() {
      const data = {
        'image_src': this.$el[0].value,
        'image_alt': this.$el[1].value,
        'caption': this.$el[2].value,
        'title': this.$el[3].value,
        'message': this.$el[4].value
      }
      return fetch('/api/v1/news', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.warn(error))
    }
  }
})
const vm = new Vue({ el: '#create-news'})