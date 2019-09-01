const express = require('express');
const app = express();
const process = require('process');
const port = process.argv[2] || 8080;
const auth = require('basic-auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json()) // 用于解析 application/json

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// 连接URL
const url = 'mongodb://localhost:27017';

// 数据库名称
const dbName = 'meanNews';

// 创建MongoClient客户端
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/admins/hi', (req, res) => {

    var credentials = auth(req)

    // 登录认证检验
    if (!credentials) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied');
    } else {
        check(credentials.name, credentials.pass, function (valid) {
            if (valid) {
                res.send('hello');
            } else {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="example"');
                res.end('Access denied');
            }

        })
    }
});

// 创建新闻
app.post('/admins/news', (req, res) => {

    var credentials = auth(req)

    // 登录认证检验
    if (!credentials) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied');
    } else {
        check(credentials.name, credentials.pass, function (valid) {
            if (valid) {

                let news = req.body;
                console.info(news);

                // 使用连接方法来连接到服务器
                client.connect(function (err) {
                    if (err) {
                        console.error('error end: ' + err.stack);
                        return;
                    }

                    console.log("成功连接到服务器");

                    const db = client.db(dbName);

                    // 插入文档
                    insertNews(db, news, function () {
                    });
                });

                // 响应成功
                res.status(200).end();
            } else {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="example"');
                res.end('Access denied');
            }

        })
    }

});


// 查询新闻列表
app.get('/news', (req, res) => {

    // 使用连接方法来连接到服务器
    client.connect(function (err) {
        if (err) {
            console.error('error end: ' + err.stack);
            return;
        }

        console.log("成功连接到服务器");

        const db = client.db(dbName);

        // 插入新闻
        findNewsList(db, function (result) {
            // 响应成功
            res.status(200).json(result);
        });
    });

});

// 根据id查询新闻信息
app.get('/news/:newsId', (req, res) => {

    let newsId = req.params.newsId;
    console.log("newsId为" + newsId);

    // 使用连接方法来连接到服务器
    client.connect(function (err) {
        if (err) {
            console.error('error end: ' + err.stack);
            return;
        }

        console.log("成功连接到服务器");

        const db = client.db(dbName);

        // 查询新闻
        findNews(db, newsId, function (result) {
            // 响应成功
            res.status(200).json(result);
        });
    });

});

// 检查权限
const check = function (name, pass, callback) {
    var valid = false;

    // 使用连接方法来连接到服务器
    client.connect(function (err) {
        if (err) {
            console.error('error end: ' + err.stack);
            return valid;
        }

        console.log("成功连接到服务器");

        const db = client.db(dbName);

        // 判读账号密码是否匹配
        findUser(db, name, function (result) {
            // 响应成功
            if ((result.username === name) && (result.password === pass)) {
                valid = true;
                console.log("验证通过");
                callback(valid);
            } else {
                valid = false;
                console.log("验证失败");
                callback(valid);
            }
        });
    });
}

// 插入新闻
const insertNews = function (db, _news, callback) {
    // 获取集合
    const news = db.collection('news');

    // 插入文档
    news.insertOne({ title: _news.title, content: _news.content, creation: _news.creation }, function (err, result) {
        if (err) {
            console.error('error end: ' + err.stack);
            return;
        }
        console.log("已经插入文档，响应结果是：");
        console.log(result);
        callback(result);
    });
}

// 查找全部新闻标题
const findNewsList = function (db, callback) {
    // 获取集合
    const news = db.collection('news');

    // 查询文档，只返回标题和_id，
    // _id 映射称为 newsId
    news.aggregate({ $project: { newsId: "$_id", title: 1, _id: 0 } }, function (err, cursor) {
        if (err) {
            console.error('error end: ' + err.stack);
            return;
        }

        cursor.toArray(function (err, result) {
            console.log("查询全部文档，响应结果是：");
            console.log(result);
            callback(result);
        });
    });
}


// 查询指定新闻
const findNews = function (db, newsId, callback) {
    // 获取集合
    const news = db.collection('news');

    // 查询指定文档
    news.findOne({ _id: ObjectId(newsId) }, function (err, result) {
        if (err) {
            console.error('error end: ' + err.stack);
            return;
        }

        console.log("查询指定文档，响应结果是：");
        console.log(result);
        callback(result);
    });
}

// 查询指定用户
const findUser = function (db, name, callback) {
    // 获取集合
    const user = db.collection('user');

    // 查询指定文档
    user.findOne({ username: name }, function (err, result) {
        if (err) {
            console.error('error end: ' + err.stack);
            return;
        }

        console.log("查询指定文档，响应结果是：");
        console.log(result);
        callback(result);
    });
}

app.listen(port, () => console.log(`Server listening on port ${port}!`));