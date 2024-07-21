const express = require("express");
const path = require("path");
const cors = require("cors"); // 引入 cors 中间件
var debug = require("debug")("my-application"); // debug模块
const multiparty = require("multiparty");
const bodyParser = require("body-parser");
const Mysql = require("./Mysql");
const fs = require("fs");
const app = express();

//启动监听
app.set("port", process.env.PORT || 3000); // 设定监听端口
var server = app.listen(app.get("port"), function() {
    debug("Express server listening on port " + server.address().port);
});

// 使用 cors 中间件
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));

//自动发送每日一言
app.get("/message", async(req, res, next) => {
    var son = await Mysql.check_message();
    // console.log(son);
    res.send(son);
});

//接收表单信息
app.post("/submit", (req, res, next) => {
    let form = new multiparty.Form({ uploadDir: "./public/images" });
    form.parse(req, (err, fields, files) => {
        // console.log(files);
        var Name = fields.Name;
        var Key = fields.Key;
        var Avatar = files.avatar[0].path;
        console.log(Name);
        console.log(Key);
        console.log(Avatar);

        //添加进数据库
        Mysql.insert(Name, Key, Avatar);
    });
    res.send("success");
});

//获取用户信息
app.post("/info", (req, res, next) => {
    let form = new multiparty.Form();
    form.parse(req, async(err, fields, files) => {
        var Name = fields.Name;
        console.log(Name);

        //查询数据库
        var results = await Mysql.check(Name);
        console.log(results);
        var avatar = results.Avatar;
        //确保头像文件存在且是有效文件路径
        if (avatar && fs.existsSync(avatar)) {
            // console.log("查询成功");
            res.sendFile(path.resolve(avatar));
        } else {
            res.status(404).send("Avatar not found");
        }
    });
});

//查询用户信息
app.post("/check", (req, res, next) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;

        console.log("接收到名称为:", Name);
        Mysql.check(Name).then((resluts) => {
            console.log("数据库回复为:", resluts);
            if (resluts == null) {
                resluts = false;
            } else {
                resluts = true;
            }
            res.send(resluts);
        });
    });
});

//获取登录权限
app.post("/login", (req, res, next) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;
        var Key = fields.Key;

        Mysql.check(Name).then((resluts) => {
            console.log("数据库回复为:", resluts);
            if (resluts && resluts.Name == Name && resluts.Passwords == Key) {
                resluts = true;
            } else {
                resluts = false;
            }
            res.send(resluts);
        });
    });
});

//记录日记内容
app.post("/record", (req, res, next) => {
    //解析用户信息
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;
        var content = fields.content;
        var date = fields.date;

        Mysql.insert_diary(Name, content, date).then((resluts) => {
            console.log("数据库回复为:", resluts);
            // 成功插入数据
            if (resluts) {
                resluts = true;
            } else {
                resluts = false;
            }
            res.send(JSON.stringify(resluts));
        });
    });
});

//获取日记内容
app.post("/get_diary", (req, res, next) => {
    //解析用户信息
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;
        // console.log(Name);

        Mysql.check_diary(Name).then((resluts) => {
            // console.log("数据库回复为:", resluts);
            // 成功获取日记数据
            res.send(JSON.stringify(resluts));
        });
    });
});

//获取所有日记内容
app.post("/get_all_diary", (req, res, next) => {
    //解析用户信息
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;
        // console.log(Name);

        Mysql.check_all_diary(Name).then((resluts) => {
            // console.log("数据库回复为:", resluts);
            // 成功获取日记数据
            res.send(JSON.stringify(resluts));
        });
    });
});

//获取漂流瓶
app.get("/bottles", (req, res, next) => {
    // console.log("请求数据");
    Mysql.check_bottles().then((resluts) => {
        res.send(JSON.stringify(resluts));
    });
});

//上传漂流瓶
app.post("/throw", (req, res, next) => {
    //解析用户信息
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;
        var content = fields.content;
        var date = fields.date;

        Mysql.insert_bottles(content, date).then((resluts) => {
            console.log("数据库回复为:", resluts);
            // 成功插入数据
            if (resluts) {
                resluts = true;
            } else {
                resluts = false;
            }
            res.send(JSON.stringify(resluts));
        });
    });
});

//获取心情记录
app.post("/mood", (req, res) => {
    //解析用户信息
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;

        Mysql.check_moods(Name).then((resluts) => {
            // console.log("数据库回复为:", resluts);
            res.send(resluts);
        });
    });
});

//记录今日心情指数
app.post("/mood_record", (req, res) => {
    //解析用户信息
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        var Name = fields.Name;
        var value = fields.value;
        var date = fields.date;

        Mysql.insert_moods(Name, value, date).then((resluts) => {
            // console.log("数据库回复为:", resluts);
            // 成功插入数据
            if (resluts) {
                resluts = true;
            } else {
                resluts = false;
            }
            res.send(JSON.stringify(resluts));
        });
    });
});