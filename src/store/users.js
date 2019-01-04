import Vue from 'vue';
import ProxyUrl from '@/constants/ProxyUrls';
import axios from 'axios';
import * as _ from 'lodash';

export default {
  namespaced: true,
  state: {
    roles: [],
    admins: [],
  },

  actions: {
    async getRoles({ commit }) {
      try {
        const res = await Vue.prototype.$axios({
          url: ProxyUrl.roles,
          withCredentials: true,
          method: 'get',
          data: {},
        });
        // console.log(res);
        commit('setRoles', res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getAdmins({ commit }) {
      try {
        const res = await axios({
          url: ProxyUrl.baseUrl + ProxyUrl.allAdmins,
          withCredentials: true,
          method: 'get',
          data: {},
        });
        commit('setAdmins', res.data);
      } catch (err) {
        throw new Error(err);
      }
    },
    async addAdmin({ dispatch }, admin) {
      try {
        const res = await Vue.prototype.$axios({
          url: ProxyUrl.addAdmin,
          withCredentials: true,
          method: 'post',
          data: admin,
        });

        dispatch('getAdmins');
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async editAdmin({ dispatch }, admin) {
      try {
        const res = await Vue.prototype.$axios({
          url: ProxyUrl.editAdmin,
          withCredentials: true,
          method: 'put',
          data: admin,
        });

        dispatch('getAdmins');
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async deleteAdmin({ dispatch }, dEmail) {
      try {
        const res = await Vue.prototype.$axios({
          url: ProxyUrl.deleteAdmin,
          withCredentials: true,
          method: 'delete',
          data: {
            email: dEmail,
          },
        });
        dispatch('getAdmins');
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    setRoles(state, payload) {
      state.roles = payload;
      console.log(state.roles);
    },
    setAdmins(state, payload) {
      state.admins = payload;
      console.log(state.admins);
    },
  },
  getters: {
    getroles(state) {
      return state.roles;
    },
    getadmins(state) {
      return state.admins;
    },
  },
};

// (_.find(refDataPayload.product_categories, {name: 'category'})).sub_categories
