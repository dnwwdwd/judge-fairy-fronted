<template>
  <div id="userLogin">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form style="max-width: 480px; margin: 0 auto" :model="form" auto-label-width @submit="handleSubmit" label-align="right">
      <a-form-item field="账号" tooltip="账号不少于4位" label="账号">
        <a-input
          v-model="form.userAccount"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item field="密码" label="密码" tooltip="密码不少于8位">
        <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px; margin-left: 120px; border-radius: 5%; margin-top: 10px">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService } from "../../../generated";
import message from '@arco-design/web-vue/es/message';
import { useRouter } from "vue-router";
import store from "@/store";

const router = useRouter();

const form = reactive({
  userAccount: '',
  userPassword: '',
});
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res?.code === 0) {
    await store.dispatch('user/getLoginUser');
    message.success('登录成功');
    // 跳转到主页
    router.push({
      path: '/',
      replace: true,
    });

  } else {
    message.error('登录失败' + (res.message ? `，${res.message}` : ''));
  }
};

</script>
