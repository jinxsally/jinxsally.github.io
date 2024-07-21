//判断用户是否存在
export async function check(formData) {
  var response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: formData,
  });
  var data = await response.json();
  console.log(data);
  if (data) {
    return true;
  } else {
    return false;
  }
}


