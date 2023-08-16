<template>
  <div>
    <button ref="reduce" @click="reduceCount">-</button>
    <input
      type="number"
      ref="inputRef"
      @keyup="countInput"
      :value="count"
      :min="min"
    />
    <button ref="add" @click="addCount">+</button>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      count: this.value,
      min: 0,
    };
  },
  watch: {
    count(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    countInput() {
      if (
        Number.isNaN(this.$refs.inputRef.valueAsNumber) ||
        !(this.$refs.inputRef.valueAsNumber >= this.min)
      ) {
        this.count = 0;
      } else {
        this.count = this.$refs.inputRef.valueAsNumber;
      }
    },
    addCount() {
      this.count += 1;
      // this.$emit("input", this.count);
    },
    reduceCount() {
      if (this.count > this.min) {
        this.count -= 1;
      } else {
        this.count = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//type number小箭頭隱藏
/* Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

input {
  border: 1px solid #000000;
  text-align: center;
  border-radius: 5px;
}
button {
  padding: 0 10px;
}
</style>
