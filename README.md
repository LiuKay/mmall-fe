# mmall-fe
网上商城


若需要测试开发部署：
修改 mm.js 中 serverHost 为你的后台项目地址，如：http://localhost:8080/mmall/

npm install 安装依赖
npm run dist_win 打包静态文件

将打包好的 dist 文件夹放到 tomcat/webapps 目录下，与 mmall 后台项目同级，启动 tomcat
访问 http://localhost:8080/dist/view/ 即可




域名部署
http://mmall.aboyl.org
附带了Nginx配置文件，如果要部署到自己的服务器上面可以把Nginx里面的/root/L/project地址以及域名改成自己的就好了
进行了子域名配置，需要在nginx的conf目录下面创建一个vhost目录，然后把mmall.conf文件放入vhost中
项目名称就是mmall也可以自己取
里面的dist文件通过npm run dist生成,如果是windows系统，则使用npm run dist_win

使用技术
html,css，jQuery技术
使用了CommonJs语法创建模块
使用webpack作为打包工具
使用hogan作为html渲染模版
使用git作为版本控制工具
使用了阿里云云服务器，系统为Centos 7
使用Nginx进行反向代理解决跨域问题
使用shell脚本进行发布
配置了淘宝源


生成项目的方法:
1、在自己的机器上安装node.js,Nginx,webpack，配置好环境变量这些
2、创建自己的开发，生产环境文件夹，如本例子中的/root/L/developer和/root/L/project，用来存放不同的项目
3、拉取代码，配置Nginx，可以使用或者参考仓库中的Nginx.conf
4、调用脚本，也可以手动发布，要注意的是要把文件夹改成自己的