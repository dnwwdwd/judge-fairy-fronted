<template>
  <a-layout class="layout-demo">
    <a-layout-sider
      hide-trigger
      collapsible
      :collapsed="collapsed"
    >
      <div class="logo" />
      <a-menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['0_3']"
        :style="{ width: '100%' }"
        @menuItemClick="onClickMenuItem"
      >
        <img id="logo" src="https://img.zcool.cn/community/01c0085c93c9afa801208f8b043aab.jpg" height="46px" width="80px" />
        <a-menu-item key="0_1">
          <IconHome />
          首页
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar />
          通知
        </a-menu-item>
        <a-menu-item key="0_3">
          <IconCalendar />
          我的
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="padding-left: 20px;">
        <home-header />
      </a-layout-header>
      <a-layout style="padding: 0 24px;">


        <a-layout-content>Content</a-layout-content>

        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconCalendar, IconCaretLeft, IconCaretRight, IconHome } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
import HomeHeader from "@/components/HomeHeader.vue";

const collapsed = ref(false);

const onClickMenuItem = (key) => {
  Message.info({ content: `You select ${key}`, showIcon: true });
};

const onCollapse = () => {
  collapsed.value = !collapsed.value;
};

</script>

<style scoped>
.layout-demo {
  height: 100vh; /* 使布局占据整个视口高度 */
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

#logo{
  margin-top: 30px;
  border-radius: 20px;
}
</style>