const store = new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {
    setArticles(state, data) {
      state.articles = data
    }
  },
  actions: {
    get({ commit }) {
      fetch('/api/v1/news')
        .then(response => response.json())
        .then(data => commit('setArticles', data))
        .catch(error => console.error(error))
    },
    post({ dispatch }, data) {
      fetch('/api/v1/news', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => dispatch('get', data))
      .catch(error => console.error(error))
    },
    put({ dispatch }) {
      fetch('/api/v1/news', {
        method: 'put',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => dispatch('get'))
      .catch(error => console.error(error))
    },
    delete({ dispatch }, id) {
      fetch(`/api/v1/news/${id}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.text())
      .then(data => dispatch('get'))
      .catch(error => console.error(error, error.message))
    }
  }
})