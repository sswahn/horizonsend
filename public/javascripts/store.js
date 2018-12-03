const store = new Vuex.Store({
  state: {
    articles: [],
    showUpdateForm: false,
    updateIndex: undefined
  },
  mutations: {
    setArticles(state, data) {
      state.articles = data
    },
    setUpdateIndex(state, index) {
      state.updateIndex = index
    },
    showUpdateForm(state) {
      state.showUpdateForm = true
    },
    hideUpdateForm(state) {
      state.showUpdateForm = false
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
      .then(data => dispatch('get'))
      .catch(error => console.error(error))
    },
    put({ commit, dispatch }, data) {
      fetch(`/api/v1/news/${data.id}`, {
        method: 'put',
        body: JSON.stringify(data.put),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => dispatch('get'))
      .catch(error => console.error(error))
      .finally(x => commit('hideUpdateForm'))
    },
    delete({ dispatch }, id) {
      fetch(`/api/v1/news/${id}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.text())
      .then(data => dispatch('get'))
      .catch(error => console.error(error))
    },
    showUpdateForm({ commit }, index) {
      commit('setUpdateIndex', index)
      commit('showUpdateForm')
    }
  }
})