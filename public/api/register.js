const Check = require("./check");

const avatar = undefined;

//上传头像并显示
function Head(object) {
  //获取用户选择的文件（file input的files属性是一个FileList对象）
  // const file = event.target.files;
  var file = object.files[0];
  this.avatar = file;
  console.log(file);

  //如果用户选择了文件
  if (file) {
    //创建一个FileReader对象
    const reader = new FileReader();
    //文件读完触发onload事件
    reader.onload = function (e) {
      //设置为src属性
      document.getElementById("avatar").src = e.target.result;
      document.getElementById("avatar").classList.remove("hidden");
      //隐藏svg图标
      document.getElementById("svg").classList.add("hidden");
    };
    //读取文件数据
    reader.readAsDataURL(file);
  }
}

//注册操作
async function register(event) {
  event.preventDefault();
  //抽取数据
  var form = document.getElementById("form");
  var formData = new FormData(form);
  formData.append("avatar", this.avatar);

  //判断是否重复注册
  var res = await Check.check(formData);
  if (res == false) {
    console.log(res);
    //API，指定后端服务器的地址，提供相对地址
    var response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      body: formData,
    });
    if (response) {
      console.log("Registration successful!");
      window.location.href = "http://localhost:3000/index";
      alert("注册成功!");
      return;
    } else {
      console.error("Registration failed.");
    }
  }
}
