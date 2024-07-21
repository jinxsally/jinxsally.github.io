const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

//加入数据库
const mysql = require("mysql");

// 创建数据库连接
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "spider",
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

//增加数据
function insert(message, resource) {
  const insertQuery = `INSERT INTO messages (message, resource) VALUES (?, ?)`;
  connection.query(
    insertQuery,
    [message, resource],
    (error, results, fields) => {
      if (error) {
        console.error("Database insert error: " + error);
        return;
      }
      console.log("Data inserted into database.");
    }
  );
}

//删除数据

// 定义要爬取的网页URL
const url =
  "https://so.gushiwen.cn/mingjus/default.aspx?page=1&tstr=&astr=&cstr=&xstr=";
// 不同的分类网址
var url_1 =
  "https://so.gushiwen.cn/mingjus/default.aspx?tstr=%e5%86%99%e9%9b%aa";
var url_2 =
  "https://so.gushiwen.cn/mingjus/default.aspx?tstr=%e7%88%b1%e6%83%85";
var url_3 =
  "https://so.gushiwen.cn/mingjus/default.aspx?tstr=%e7%a6%bb%e5%88%ab";
var url_4 =
  "https://so.gushiwen.cn/mingjus/default.aspx?tstr=%e5%86%99%e9%9b%a8";
var url_5 =
  "https://so.gushiwen.cn/mingjus/default.aspx?tstr=%e7%a7%8b%e5%a4%a9";
var url_6 =
  "https://so.gushiwen.cn/mingjus/default.aspx?tstr=%e6%9c%88%e4%ba%ae";
var url_7 =
  "https://so.gushiwen.cn/mingjus/default.aspx?tstr=%e5%8a%b1%e5%bf%97";

// 发起网络请求并获取网页内容
axios
  .get(url_3)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    let results = [];
    var son = undefined;
    var resource = undefined;

    $(".cont").each((i, element) => {
      const aTags = $(element).find("a");
      if (aTags.length >= 2) {
        son = $(aTags[0]).text();
        resource = $(aTags[1]).text();
        // console.log(son + "源自:" + resource + "\n");
        insert(son, resource);
        results.push({
          son: son,
          resource: resource,
        });
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
