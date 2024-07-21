//获取个人信息
function info() {
  //获取用户名
  var Name = localStorage.getItem("Name");
  document.getElementById("Name").innerText = Name;
  console.log(Name);
  //使用表单方便解析
  var formData = new FormData();
  formData.append("Name", Name);
  fetch("http://localhost:3000/info", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      // console.log(blob);
      const img = document.getElementById("avatar");
      img.src = URL.createObjectURL(blob);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
