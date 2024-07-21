import * as echarts from "echarts";

//获取心情数值
var Name = localStorage.getItem("Name");
var formData = new FormData();
formData.append("Name", Name);
fetch("http://localhost:3000/mood", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    var value = [];
    var date = [];
    data.forEach((element) => {
      value.push(element.value);
      date.push(Format(new Date(element.date)));
    });
    console.log(value, date);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("mood_graph"));
    // 绘制图表
    myChart.setOption({
      title: {},
      tooltip: {},
      xAxis: {
        data: date,
        axisLine: {
          lineStyle: {
            color: "white", // 设置 x 轴线为白色
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "white", // 设置 y 轴线为白色
          },
        },
      },
      series: [
        {
          name: "心情记录指数",
          type: "line",
          data: value,
          lineStyle: {
            color: "white", // 设置折线为白色
          },
          itemStyle: {
            color: "white", // 设置数值圆圈为白色
          },
        },
      ],
    });

    // 窗口大小发生变化时，重置图表大小
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  });

function Format(dateObject) {
  const year = dateObject.getFullYear(); // 获取年份
  const month = dateObject.getMonth() + 1; // 获取月份（注意：getMonth() 返回的是从 0 开始的月份，所以需要加 1）
  const day = dateObject.getDate(); // 获取日期

  return `${year}年${month}月${day}日`;
}
