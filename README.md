## node server
 
    1. 切换镜像为淘宝npm   
      npm config set registry https://registry.npm.taobao.org
      
    2. 清除npm依赖缓存
      npm cache clean
      
## 项目架构

```
.
├── LICENSE
├── README.md
├── static  // 静态资源服务器目录
├── config                      // vue-cli 生成&自己加的一些配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── package.json                // npm的依赖、项目信息文件
├── server                      // Koa后端，用于提供Api
│   ├── config                 // 配置文件夹
│   ├── controllers            // controller-控制器
│   ├── models                 // model-模型
│   ├── routes                 // route-路由
│   └── utils                  // 全局公用方法


```


### 使用pm2启动koa服务

```git
npm run pm2
```
> 也可使用run.sh文件进行启动.


#### pm2常用命令

+ pm2 start app.js
+ pm2 show list
+ pm2 stop -id/all
+ pm2 restart [id||name]
