import { check } from "./check";

// src/main.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    //抽取数据
    var form = document.getElementById("form");
    var formData = new FormData(form);

    //判断是否存在该用户
    var res = await check(formData);
    if (res == true) {
      // console.log(res);
      //存在的话存储用户信息
      localStorage.setItem("Name", formData.get("Name"));
      window.location.href = "http://localhost:5173/index";
      alert("登录成功!");
    } else {
      alert("用户名或密码错误!");
    }
  });
});
