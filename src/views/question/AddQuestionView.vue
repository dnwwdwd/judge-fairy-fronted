<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form" @submit="handleSubmit" label-align="left">
      <a-form-item field="title" label="题目名称">
        <a-input v-model="form.title" placeholder="请输入题目名称"></a-input>
      </a-form-item>
      <a-form-item field="isRead">
        <a-input-tag
          v-model="form.tags"
          allow-clear
          placeholder="请选择题目标签"
        />
      </a-form-item>
      <a-form-item field="answer" tooltip="请输入题目答案" label="答案">
        <md-editor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <md-editor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>

      <a-form-item
        label="题目限制项"
        :content-flex="false"
        :merge-props="false"
      >
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="form.judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              min="0"
              class="input-demo"
            />
          </a-form-item>
          <a-form-item field="form.judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              mode="button"
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              min="0"
              class="input-demo"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              mode="button"
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              min="0"
              class="input-demo"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item
        label="题目限制项"
        :content-flex="false"
        :merge-props="false"
      >
        <a-space direction="vertical" style="min-width: 640px">
          <a-form-item
            v-for="(judgeCaseItem, index) of form.judgeCase"
            :label="`判题用例 ${index + 1}`"
            :key="index"
            no-style
          >
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入输出用例"
              />
            </a-form-item>
            <a-button type="dashed" status="danger" @click="handleDelete(index)"
              >删除判题用例
            </a-button>
          </a-form-item>
        </a-space>
        <div style="margin-top: 16px">
          <a-button type="outline" status="success" @click="handleAdd"
            >新增判题用例
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
          style="min-width: 150px; margin-top: 16px"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
// 如果页面地址包含update，视为修改页面
const updatePage = route.path.includes("update");

/**
 * 根据题目获取旧的题目信息
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const form = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
});

/**
 * 新增判题用例
 */
const handleAdd = () => {
  if (form.value) {
    form.value.judgeCase.push({
      input: "",
      output: "",
    });
  }
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

/**
 * 删除判题用例
 */
const handleSubmit = async () => {
  // 区分是新建还是修改
  if (updatePage) {
    const res: any = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res?.code === 0) {
      message.success("题目修改成功");
    } else {
      message.error("题目修改失败" + (res.message ? `，${res.message}` : ""));
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code == 0) {
      message.success("题目创建成功");
    } else {
      message.error("题目创建失败" + (res.message ? `，${res.message}` : ""));
    }
  }
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped>
#addQuestionView {
}
</style>
