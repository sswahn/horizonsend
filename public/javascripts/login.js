/**
 * Login Component
 * 
 */

Vue.component('login-form', {
  template: `
    <form v-on:submit.prevent="submitForm()">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" name="email" required>
      </div>
      <div>
        <label for="message">Password</label>
        <input id="password" type="password" name="password" required>
      </div>
      <button type="submit">Submit</button>
    </form>
  `,
  methods: {
    submitForm() {
      const data = {
        'email': this.$el[0].value,
        'password': this.$el[1].value
      }
      return fetch('/api/v1/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 
          'Content-Type': 'application/json'
        }
      }).then(response => {
        window.location.href = '/admin' // change this
      }).catch(error => console.warn(error))
    }
  }
})
const vm = new Vue({ el: '#login'})