var Name = localStorage.getItem("Name");

// 获取当前日期和星期
const date = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
const currentDate = date.toLocaleDateString("zh-CN", options);
const weekDays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
];
const currentDay = weekDays[date.getDay()];

// 显示当前日期和星期
document.getElementById("date").textContent = currentDate;
document.getElementById("day").textContent = currentDay;

//提交记录到数据库
async function record() {
    var form = document.getElementById("form");
    var formData = new FormData(form);
    console.log(formData.get("content"));
    //用户相关信息
    formData.append("Name", Name);
    formData.append("date", format(date));

    //发送数据到后端
    fetch("http://localhost:3000/record", {
            method: "POST",
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

//格式化日期
function format(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}