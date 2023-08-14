<template>
  <div id="app">
    <h2 class="text-3xl mb-4">TodoList：</h2>
    <div>
      <input
        type="text"
        v-model="newTodo"
        class="border border-solid rounded-l-md border-r-0 border-black px-4 py-1"
        placeholder="請輸入代辦事項"
      />
      <button
        type="button"
        class="border border-solid rounded-r-md border-l-0 border-black bg-blue-200 p-1 px-2"
        @click="addTodo"
      >
        新增
      </button>
    </div>
    <nav class="menu">
      <ul class="flex mx-32">
        <li>
          <a
            href="#"
            class="mx-2 p-1 px-2 rounded-t-md"
            :class="{ active: visibility == 'allList' }"
            @click="visibility = 'allList'"
            >全部</a
          >
        </li>
        <li>
          <a
            href="#"
            class="mx-2 p-1 px-2 rounded-t-md"
            :class="{ active: visibility == 'processing' }"
            @click="visibility = 'processing'"
            >未完成</a
          >
        </li>
        <li>
          <a
            href="#"
            class="mx-2 p-1 px-2 rounded-t-md"
            :class="{ active: visibility == 'done' }"
            @click="visibility = 'done'"
            >已完成</a
          >
        </li>
      </ul>
    </nav>
    <ul class="mx-32">
      <transition-group name="list">
        <div
          v-for="(item, index) in filteredList"
          :key="index"
          class="flex items-center justify-between"
        >
          <div>
            <input
              type="checkbox"
              name="checkItem"
              :id="item.id"
              class="m-4"
              v-model="item.done"
              @click="handleClick($event)"
            />
            <label :for="item.id" class="text-4">
              {{ item.content }}
            </label>
          </div>
          <button
            type="button"
            class="border border-solid rounded-md border-black bg-red-200 p-1 px-2"
            @click="removeTodo(item)"
          >
            刪除
          </button>
        </div>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { todoData } from "./assets/fackData";

export default {
  name: "App",
  data() {
    return {
      newTodo: "",
      visibility: "allList",
    };
  },
  created() {
    this.saveInitData();
  },
  computed: {
    ...mapState({
      items: (state) => state.initData,
    }),
    filteredList() {
      if (this.visibility == "allList") {
        return this.items;
      } else if (this.visibility == "processing") {
        return this.items.filter((item) => {
          return !item.done;
        });
      } else {
        return this.items.filter((item) => {
          return item.done;
        });
      }
    },
  },
  methods: {
    saveInitData() {
      // console.log("saveInitData-todoData =", todoData);

      this.$store.commit("setInitData", todoData);
    },
    handleClick(e) {
      console.log("handleClick-e =", e);
      console.log("handleClick-this.items =", this.items);
      // for (let i = 0; i < this.items.length; i++) {
      //   if (e.target.id == this.items[i].id) {
      //     this.items[i].done = e.target.checked;
      //     break;
      //   }
      // }
      this.$store.commit("setInitData", this.items);
    },
    addTodo() {
      if (!this.newTodo) {
        return; //內容空白就跳出
      }
      this.$store.commit("addData", {
        id: Math.floor(Date.now()),
        content: this.newTodo,
        done: false,
      });
      this.newTodo = "";
    },
    removeTodo(todo) {
      console.log("handleClick-todo =", todo);
      // let newIndex = "";
      // this.items.forEach((element, key) => {
      //   if (element.id == item.id) {
      //     newIndex = key;
      //   }
      // });
      let newIndex = this.items.findIndex((item) => todo.id === item.id);
      this.items.splice(newIndex, 1);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}

.menu {
  ul {
    border-bottom: 1px solid #000000;
  }
  a {
    display: inline-block;
  }
  .active {
    background-color: rgba(191, 219, 254, 1);
  }
}
</style>
