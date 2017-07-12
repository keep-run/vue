# Vue

介绍：本仓库为基于vue2.0的一些项目练习

## 1、aProject

本项目为模拟一个电商售卖平台，其中用到json-server(也有用node写的程序实现同样的功能)模拟服务端提供数据，通过vue-resource对其发送http请求，通过vue-router实现路由和子路由。本项目有助于深刻理解vue组件化开发的思想，同时加深对vue的理解。

本项目涉及到以下知识点：

​    1、组件以及子组件与父组件的相互通信

​    2、基于vue实现轮播；

​    3、通过http请求，实现与后台的交互；

​    4、利用vue-router实现路由以及子路由的功能；

​    5、结合CSS3实现过度效果

## 2、BookStore
本项目为一个基于express4.x和mongodb的个人图书管理系统。并实现了增删查改等基本功能，主要分为两个部分：前端和后端

###前端部分
前端部分对应BookStore文件夹。基于vue框架实现页面的渲染。包括一个主页面和几个对话框组件，涉及组件之间的相互通信以及基于vue-reaource的http请求。
###后端部分
后端部分对应BookStoreServer文件。
首先假定本地已经安装mongodb软件，并使用默认端口打开。
BookStoreServer是一个利用express生成器产生的工程文件。并安装了mongoose模块。在config文件夹下mongoose.js文件里边连接数据库。
在routes文件下的index.js中，通过接受前端页面的http请求，实现对数据库内容的增删改查操作。