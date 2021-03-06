import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    groups: []
  },
  actions: {
    getGroups ({ commit, state }, { projectId }) {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`/projects/${projectId}/groups`)
          .then(r => r.data)
          .then(groups => {
            commit('SET_GROUPS', groups)
            resolve(groups)
          })
          .catch(error => {
            reject()
          })
      })
    },
    getGroupsByName({ commit, state }, name) {
      return new Promise((resolve, reject) => {
        Vue.http
          .get('/groups_by_name', { params: { name: name } })
          .then(r => r.data)
          .then(groups => {
            resolve(groups)
          })
          .catch(error => {
            reject()
          })
      })
    },
    addGroup ({ dispatch, commit, state }, { projectId, group }) {
      Vue.http
        .post(`/projects/${projectId}/add_group`, { group_id: group.id })
        .then(r => {
          dispatch('getGroups', { projectId: projectId })
        })
    },
    deleteGroup ({ dispatch, commit, state }, { projectId, groupId }) {
      Vue.http
        .delete(`/projects/${projectId}/delete_group/${groupId}`)
        .then(r => {
          dispatch('getGroups', { projectId: projectId })
        })
    }
  },
  mutations: {
    SET_GROUPS (state, groups) {
      state.groups = groups
    }
  },
}