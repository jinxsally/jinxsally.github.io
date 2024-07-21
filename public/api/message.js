//获取每日发言
async function message() {
  var son = undefined;
  var resource = undefined;
  // console.log("发送信息");
  //需要回调解析
  fetch("http://localhost:3000/message")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      son = data.message;
      resource = data.resource;
      console.log(son, resource);
      document.getElementById("hitokoto_text").innerText = son;
      document.getElementById("from_text").innerText = resource;
    });
}
