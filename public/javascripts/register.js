/**
 * Login Component
 * 
 */

Vue.component('registration-form', {
  template: `
    <form id="register-form" v-on:submit.prevent="submitForm">
    <img class="logo" src="http://www.horizonsend.com/images/horizons-end_logo.png" alt="Horizon's End | Video Game Design">
      <input id="username" type="text" name="username" placeholder="Username" required>  
      <input id="email" type="email" name="email" placeholder="Email" required>
      <input id="password" type="password" name="password" placeholder="Password" required>
      <input id="password-confirm" type="password" name="password_confirm" placeholder="Confirm Password" required>
      <button type="submit">Register a new user account</button>
    </form>
  `,
  methods: {
    submitForm() {
      const data = {
        'username': this.$el[0].value,
        'email': this.$el[1].value,
        'password': this.$el[2].value,
        'password_confirm': this.$el[3].value
      }
      if (data['password'] !== data['password_confirm']) {
        return alert('Passwords do not match.')
      }
      return fetch('/api/v1/registration', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.text())
      .then(data => (data.error) ? alert(data.error) : alert('Success: please validate email before loggin in.')) //TODO: change this
      .catch(error => console.error(error))
    }
  }
})
const vm = new Vue({ el: '#register'})