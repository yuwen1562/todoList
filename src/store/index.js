import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initData: [],
  },
  getters: {},
  mutations: {
    setInitData(state, data) {
      // console.log("mutationsSetInitData-state =", state);
      console.log("mutationsSetInitData-data =", data);
      state.initData = data;
    },
    addData(state, data) {
      // console.log("mutationsSetInitData-state =", state);
      console.log("mutationsAddData-data =", data);
      const pushData = state.initData;
      pushData.push(data);
      state.initData = pushData;
    },
  },
  actions: {},
  modules: {},
});
