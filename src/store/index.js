import Vue from "vue";
import Vuex from "vuex";
import { todoData } from "../assets/fackData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initData: todoData,
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
    removeData(state, newIndex) {
      const rmData = state.initData.splice(newIndex, 1);
      console.log("mutationsRemoveData-rmData =", rmData);
      // const rm = rmData.splice(newIndex, 1);
      // console.log("mutationsRemoveData-rm =", rm);
      // state.initData = rmData.splice(newIndex, 1);
    },
  },
  actions: {},
  modules: {},
});
