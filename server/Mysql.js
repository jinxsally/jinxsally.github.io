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
function insert(Name, Key, Avatar) {
    const insertQuery = `INSERT INTO users (Name, Passwords, Avatar) VALUES (?, ?, ?)`;
    connection.query(
        insertQuery, [Name, Key, Avatar],
        (error, results, fields) => {
            if (error) {
                console.error("Database insert error: " + error);
                return;
            }
            console.log("Data inserted into database.");
        }
    );
}

//查询数据
function check(Name) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE Name = ?"; // 查询指定用户名的 SQL 查询语句
        const params = [Name]; // 参数化查询参数数组

        // 执行查询
        connection.query(sql, params, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
                return;
            }

            // 处理查询结果
            if (results.length > 0) {
                // console.log(results);
                const user = results[0]; // 只有一个匹配的用户
                // console.log(user);
                resolve(user);
            } else {
                resolve(null); // 如果没有找到用户，返回 null
            }
        });
    });
}

//查询名言数据表，返回一句
function check_message() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM messages ORDER BY RAND() LIMIT 1;"; //随机

        // 执行查询
        connection.query(sql, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
                return;
            }
            // 处理查询结果
            if (results.length > 0) {
                // console.log(results);
                const son = results[0];
                // console.log(son);
                resolve(son);
            } else {
                resolve(null); // 如果没有找到用户，返回 null
            }
        });
    });
}

//插入日记信息
function insert_diary(Name, content, date) {
    return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO diaries (Name, content,date) VALUES (?, ?,?)`;
        connection.query(insertQuery, [Name, content, date], (error, results) => {
            if (error) {
                console.error("Database insert error: " + error);
                resolve(false);
            }
            console.log("Data inserted into database.");
            resolve(true);
        });
    });
}

//查询日记信息
function check_diary(Name) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM diaries WHERE Name = ? ORDER BY id DESC LIMIT 5`; //随机

        // 执行查询
        connection.query(sql, [Name], (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
                return;
            }
            // 处理查询结果
            if (results.length > 0) {
                // console.log(results);
                resolve(results);
            } else {
                resolve(null); // 如果没有找到用户，返回 null
            }
        });
    });
}

//查询所有日记信息
function check_all_diary(Name) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM diaries WHERE id IN (SELECT MAX(id) FROM diaries WHERE Name = ? GROUP BY date) ORDER BY id DESC;`; //随机

        // 执行查询
        connection.query(sql, [Name], (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
                return;
            }
            // 处理查询结果
            if (results.length > 0) {
                // console.log(results);
                resolve(results);
            } else {
                resolve(null); // 如果没有找到用户，返回 null
            }
        });
    });
}

//查询漂流瓶信息
function check_bottles() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM bottles ORDER BY RAND() LIMIT 5;"; //随机

        // 执行查询
        connection.query(sql, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
                return;
            }
            // 处理查询结果
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(null); // 如果没有找到用户，返回 null
            }
        });
    });
}

//插入漂流瓶信息
function insert_bottles(content, date) {
    return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO bottles (content,date) VALUES (?,?)`;
        connection.query(insertQuery, [content, date], (error, results, fields) => {
            if (error) {
                console.error("Database insert error: " + error);
                resolve(false);
            }
            console.log("Data inserted into database.");
            resolve(true);
        });
    });
}

//插入心情记录
function insert_moods(Name, value, date) {
    return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO moods (Name,value,date) VALUES (?,?,?)`;
        connection.query(
            insertQuery, [Name, value, date],
            (error, results, fields) => {
                if (error) {
                    console.error("Database insert error: " + error);
                    resolve(false);
                }
                console.log("Data inserted into database.");
                resolve(true);
            }
        );
    });
}

//查询心情记录
function check_moods(Name) {
    return new Promise((resolve, reject) => {
        const sql =
            "SELECT * FROM moods WHERE Name = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) ORDER BY date DESC LIMIT 7"; //随机

        // 执行查询
        connection.query(sql, [Name], (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err);
                return;
            }
            // 处理查询结果
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(null); // 如果没有找到用户，返回 null
            }
        });
    });
}

module.exports = {
    insert,
    check,
    check_message,
    insert_diary,
    check_diary,
    check_all_diary,
    check_bottles,
    insert_bottles,
    insert_moods,
    check_moods,
};