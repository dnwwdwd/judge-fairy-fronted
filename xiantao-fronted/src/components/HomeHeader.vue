<template>
  <a-menu
    mode="horizontal"
    :default-selected-keys="['1']"
    :selected-keys="selectedKeys"
    @menu-item-click="doMenuClick"
  >
    <a-menu-item
      key="0"
      :style="{ padding: 0, marginRight: '38px' }"
      disabled
    >



    </a-menu-item>
    <a-menu-item v-for="item in visibleRoutes" :key="item.path">
      {{ item.name }}
    </a-menu-item>
  </a-menu>
</template>

<script setup lang="ts">

import { computed, ref } from "vue";
import { routes } from "../router/router";
import { useRouter } from "vue-router";

const router = useRouter();

const visibleRoutes = computed(() =>{
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return true;
  });
});

const selectedKeys = ref(["/"]);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

</script>

<style scoped>

</style>