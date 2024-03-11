<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

//
const props = defineProps({
  content: String,
});

//
const emit = defineEmits(["event"]);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  //设置初始值
  props.content && editor.setHtml(props.content);
  //
};

const handleChange = () => {
  // console.log(valueHtml.value);
  emit("event", valueHtml.value);
};
</script>
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
