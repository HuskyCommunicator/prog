<script setup>
import { useRouter } from "vue-router";
import { loadSlim } from "tsparticles-slim";
import { reactive, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
//引入三方粒子库
const particlesInit = async (engine) => {
  await loadSlim(engine);
};
const particlesLoaded = async (container) => {
  //console.log("Particles container loaded", container);
};
const options = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 90,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};

//配置表单属性
const loginForm = reactive({
  //表单绑定的响应式对象
  username: "admin",
  password: "123456",
});
//表单的引用对象
const loginFormRef = ref();
//表单的自定义规则配置
const loginRules = reactive({
  username: [
    {
      required: true, //该字段必填
      message: "请输入用户名", //没有填写时显示的错误信息
      trigger: "blur", //失去焦点的时候触发验证
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const submitForm = () => {
  //1.校验表单
  loginFormRef.value.validate((valid) => {
    if (valid) {
      axios
        .post("/adminapi/user/login", loginForm)
        .then((res) => {
          if (res.data.ActionType === "OK") {
            store.commit("changeUserInfo", res.data.data);
            store.commit("changeGetterRouter", false);
            router.push("/index");
          } else {
            ElMessage.error("用户名和密码不匹配");
          }
        })
        .catch((error) => {
          console.error(error);
          // 在这里处理你的错误，例如显示一个错误消息
        });
    } else {
    }
  });
  //2.拿到表单内容 提交到后台
  //3.设置token值
};
const resetForm = () => {
  loginForm.username = "";
  loginForm.password = "";
};
</script>
<template>
  <div>
    <button>登录</button>
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="80px"
        class="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-button type="primary" @click="submitForm(loginFormRef)"
            >登录
          </el-button>
          <el-button @click="resetForm(loginFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;
  h3 {
    font-size: 30px;
  }
  .loginForm {
    margin: 20px;
  }
}
:deep(.el-form-item__label) {
  //深度选择
  color: white;
}
</style>
