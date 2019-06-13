//git 多个仓库地址 设置对应仓库的name和email
git config --global --unset user.name
git config --global --unset user.email

公司
git config user.name "company"
git config user.email "905514896@qq.com"

//设置npm仓库
@cig...下载不下来： 
 npm config set registry https://registry.npm.taobao.org
 npm config set @cig:registry https://r.ispacesys.cn

 安装yarn：   npm install yarn -g
 查看npm基本配置： npm config list
 查看yarn基本配置： yarn config list
 yarn config set @cig:registry https://r.ispacesys.cn
 npm config set "@cig:registry" "https://r.ispacesys.cn" -g


 其他配置：（解决cig包无法下载问题）
powershell中执行

yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g

yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g

yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g

yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g

yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g
//Cmd
msiexec /package  //cmd安装