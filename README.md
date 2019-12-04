![](https://raw.githubusercontent.com/xinahn/xinahn-client/master/preview.jpg)
# 信安搜索

一个开源，高隐私，自架自用的聚合搜索引擎。 [Demo点我](https://xinahn.com)

前后端皆为Javascript撰写，好上手，若有问题或需求请[提交issue](https://github.com/xinahn/xinahn-client/issues)。

此repo为前端代码，在部署之前请确认已经先跑完[后端设置](https://github.com/xinahn/xinahn-socket)。

### 事前准备
1. 确认已安装Nginx以及Node.js
2. 确认已跑完[后端设置](https://github.com/xinahn/xinahn-socket)

### 安装
```console
$ git clone https://github.com/xinahn/xinahn-client
$ cd xinahn-client && npm install
$ npm run build
```
此时建制好的档案会生产于```./build/```之下。

### Nginx 设置
将以下代码黏贴于 ```/etc/nginx/sites-available/default.conf``` 之中，并且记得置换```YOUR_CLIENT_DIRECTORY```为你的```xinahn-client```位置
```
server {
	...
	root YOUR_CLIENT_DIRECTORY/xinahn-client/build;
	location / {
		try_files $uri $uri /index.html;
 	}
	...
}
```

### 重新载入 Nginx 设定即可
```console
$ service nginx reload
```
打开 ```http://YOUR_SERVER_IP``` 即可开始使用搜寻了 :)



# License
[MIT](https://github.com/xinahn/xinahn-client/blob/master/LICENSE)