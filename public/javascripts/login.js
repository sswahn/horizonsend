/**
 * Login Component
 * 
 */

Vue.component('login-form', {
  template: `
    <form id="login-form" v-on:submit.prevent="submitForm">
    <img class="logo" src="http://www.horizonsend.com/images/horizons-end_logo.png" alt="Horizon's End | Video Game Design">
      <input id="email" type="email" name="email" placeholder="Email" required>
      <input id="password" type="password" name="password" placeholder="Password" required>
      <button type="submit">Log in to Horizon's End</button>
      <a href="/register">Create an account.</a>
    </form>
  `,
  methods: {
    submitForm() {
      const data = {
        'email': this.$el[0].value,
        'password': this.$el[1].value
      }
      return fetch('/api/v1/auth/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => (data.error) ? alert(data.error) : window.location.href = '/admin') // change this
      .catch(error => console.error(error))
    }
  }
})
const vm = new Vue({ el: '#login'})