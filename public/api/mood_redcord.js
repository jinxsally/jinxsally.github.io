var Name = localStorage.getItem("Name");
console.log(localStorage.getItem("midnight"));
// 每天重置变量的函数
function resetVariableDaily() {
    const now = new Date();
    if (now == localStorage.getItem("midnight")) {
        localStorage.setItem("value", 0);
    }
}
// 检查并更新按钮和选择框的状态
function checkMoodRecord() {
    const button = document.getElementById("mood_record");
    const select = document.getElementById("mood_value");
    if (localStorage.getItem("value") != 0) {
        button.style.display = "none";
        select.disabled = true;
        select.value = value;
    } else {
        button.style.display = "block";
        select.disabled = false;
    }
}
var value = localStorage.getItem("value");
// 初始化显示和状态
resetVariableDaily();
checkMoodRecord();

function mood_record() {
    document
        .getElementById("mood_choice")
        .addEventListener("submit", function(event) {
            var button = document.getElementById("mood_record");
            var select = document.getElementById("mood_value");
            event.preventDefault();
            var formData = new FormData();
            var value = document.getElementById("mood_value").value;
            localStorage.setItem("value", value);
            var date = new Date();
            formData.append("value", value);
            formData.append("date", format(date));
            formData.append("Name", Name);
            console.log(value);
            checkMoodRecord();

            fetch("http://localhost:3000/mood_record", {
                    method: "POST",
                    body: formData,
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    if (localStorage.getItem("value") != 0) {
                        button.style.display = "none";
                        select.disabled = true;
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
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