import Vue from 'vue';

// 使用 Event Bus
const winBus = function () {
  window.eventBus = new Vue();
};

export default winBus;
