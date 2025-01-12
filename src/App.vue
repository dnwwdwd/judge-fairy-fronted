<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <basic-layout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const route = useRoute();

// 全局初始化函数，有全局单次调用的代码，都可以写到这里
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  if (store.state.user.loginUser?.role !== "admin") {
    if (to.meta?.access === "canAdmin") {
      next("/noauth");
      return;
    }
  }
  next();
});


/**
 * 解决 ResizeObserver loop completed with undelivered notifications.
 *     at handleError (webpack-internal:///./node_modules/webpack-dev-server/client/overlay.js:299:58)
 *     at eval (webpack-internal:///./node_modules/webpack-dev-server/client/overlay.js:318:7) 报错
 */
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 200);
    super(callback);
  }
};
</script>