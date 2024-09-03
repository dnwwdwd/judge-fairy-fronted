<template>
  <div class="search-container">
    <a-input-search
      :style="{ width: '320px' }"
      placeholder="搜索帖子或者用户"
      v-model="searchParam"
      @search="doSearch"
      search-button
      style="margin-bottom: 20px"
    />
  </div>

  <div class="publish-button">
    <a-button status="warning" @click="publishPost"> 发布宝贝</a-button>
  </div>
  <!-- Tab 栏 -->
  <a-space direction="vertical" size="large">
    <a-tabs
      type="rounded"
      size="large"
      v-model:selectedKey="selectedKey"
      @change="doMenuClick"
    >
      <a-tab-pane key="1" title="推荐">
        <post-card-list :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="2" title="用户">
        <user-card-list :user-list="userList" />
      </a-tab-pane>
    </a-tabs>
  </a-space>

  <a-drawer
    :width="600"
    :height="200"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title> 发布宝贝</template>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      auto-label-width
      label-align="right"
    >
      <a-form-item field="title" tooltip="标题不少于1个字" label="帖子标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item
        field="content"
        label="宝贝介绍"
        tooltip="介绍一下你要发布的宝贝"
      >
        <a-input v-model="form.content" placeholder="请输入帖子内容" />
      </a-form-item>
      <a-form-item field="tags" label="相关标签" tooltip="宝贝的相关标签">
        <a-input-tag
          :style="{ width: '320px' }"
          v-model="form.tags"
          placeholder="请输入宝贝标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="price" label="宝贝价格" tooltip="宝贝的价格">
        <a-input-number
          v-model="form.price"
          :style="{ width: '320px' }"
          placeholder="设置宝贝价格"
          allow-clear
        >
        </a-input-number>
      </a-form-item>
      <a-form-item label="宝贝图片" tooltip="上传宝贝的图片">
        <a-upload
          list-type="picture-card"
          :default-file-list="imageList"
          @change="onChange"
          image-preview
          :auto-upload="false"
        />
      </a-form-item>
    </a-form>
  </a-drawer>

</template>

<script setup lang="ts">
import PostCardList from "@/components/PostCardList.vue";
import UserCardList from "@/components/UserCardList.vue";
import { reactive, ref, watchEffect } from "vue";
import { FileItem, Message } from "@arco-design/web-vue";
import {
  PostControllerService,
  UploadControllerService,
  UserControllerService
} from "../../generated";

const searchParam = ref("");

const postList = ref([]);
const userList = ref([]);
const selectedKey = ref("1");

const visible = ref(true);
const imageList = ref([]);

const form = reactive({
  title: "",
  content: "",
  tags: [] as string[],
  price: 0,
  images: [] as string[]
});

// const searchParams =ref({
//   pageSize: 8,
//   pageNum: 1,
// });

const doMenuClick = (key: string) => {
  selectedKey.value = key;
};

const loadPost = async () => {
  const res: any = await PostControllerService.recommendPostsUsingGet(1, 8);
  if (res.code === 0) {
    postList.value = res.data;
  } else {
    Message.error("加载失败");
  }
};

const searchUser = async () => {
  const res: any = await UserControllerService.searchUsersUsingPost({
    username: searchParam.value,
    pageNum: 1,
    pageSize: 8
  });
  if (res.code === 0) {
    userList.value = res.data;
  } else {
    Message.error("加载失败");
  }
};

const searchPost = async () => {
  const res: any = await PostControllerService.searchPostUsingPost({
    searchParam: searchParam.value,
    pageNum: 1,
    pageSize: 8
  });
  if (res?.code === 0) {
    postList.value = res.data;
    Message.info("搜索成功");
  } else {
    Message.error("搜索失败");
  }
};

watchEffect(async () => {
  if (selectedKey.value === "1") {
    loadPost();
  }
  if (selectedKey.value === "2") {
    searchUser();
  }
});

const doSearch = async () => {
  if (selectedKey.value === "1") {
    if (searchParam.value) {
      console.log("1");
      searchPost();
    } else {
      loadPost();
    }
  }
  if (selectedKey.value === "2") {
    searchUser();
  }
};

// 发布帖子
const publishPost = () => {
  visible.value = true;
};

const handleOk = async () => {
  const res = await PostControllerService.addPostUsingPost(form);
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

const file = ref();

// 定义一个方法来处理文件上传的逻辑
const onChange = async (_: any, currentFile: FileItem) => {
  file.value = currentFile;
  const res = await UploadControllerService.uploadImageUsingPost(
    currentFile?.file
  );
  if (res.code === 0) {
    form.images.push(res.data);
    Message.success("图片上传成功");
  } else {
    Message.error("图片上传失败");
  }
};
</script>

<style scoped>
.search-container {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
}
</style>