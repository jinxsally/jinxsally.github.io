//获取用户名
var Name = localStorage.getItem("Name");
//获取漂流瓶
//   console.log(Name);
//使用表单方便解析
fetch("http://localhost:3000/bottles")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    //把数据插入到表格
    const Table = document.getElementById("bottle");

    // 获取所有行
    const rows = Table.getElementsByClassName("rowt");
    //   console.log(rows);

    // 填充数据到每个单元格
    data.forEach((entry, index) => {
      // 计算当前在第几行第几列
      const rowIndex = Math.floor(index / 3); // 行索引
      const colIndex = index % 3; // 列索引

      // 获取对应的单元格
      const cell = rows[rowIndex].getElementsByClassName("colt")[colIndex];

      const maxlength = 5;

      // 填充内容和日期到单元格中
      const messageDiv = cell.querySelector(".message");
      messageDiv.textContent = entry.content;
      var text = messageDiv.textContent;
      if (text.length > maxlength) {
        messageDiv.textContent = text.slice(0, maxlength) + "...";
      }

      const dateDiv = cell.getElementsByClassName("date")[0];
      dateDiv.innerText = Format(new Date(entry.date));
    });
  });

function Format(dateObject) {
  const year = dateObject.getFullYear(); // 获取年份
  const month = dateObject.getMonth() + 1; // 获取月份（注意：getMonth() 返回的是从 0 开始的月份，所以需要加 1）
  const day = dateObject.getDate(); // 获取日期

  return `${year}年${month}月${day}日`;
}
