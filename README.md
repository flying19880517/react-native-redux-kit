## react-native-redux-kit

本项目使用react native构建App，结合redux框架来集成一些常用功能，方便大家学习和使用。本项目所有第三方组件都支持android和ios。

**支持：Android 4.1 (API 16)+ IOS(coming soon)**

## 依赖第三方组件

- redux([redux中文文档](http://cn.redux.js.org/))
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)(字体图标组件)
- [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)(路由组件，包含头部导航和底部导航)
- [react-native-scrollable-tab-view](https://github.com/brentvatne/react-native-scrollable-tab-view)(滑动tab组件)
- [react-native-storage](https://github.com/sunnylqm/react-native-storage)(本地储存组件)

## 截图

![首页1](./screenshot/Screenshot_main1.jpg)![首页2](./screenshot/Screenshot_main2.jpg)
![登录](./screenshot/Screenshot_login.jpg)![抽屉](./screenshot/Screenshot_drawer.jpg)

## 运行项目

### 第一步

下载安装运行react native环境的软件，请自行搜索相关的资料

### 第二步

git克隆本项目，然后在项目根目录执行以下命令安装react native命令
```
npm install -g react-native-cli
```

### 第三步

在项目根目录执行以下命令安装react native依赖组件
```
npm install
```

### 第四步

在模拟器或者真机运行，请自行搜索相关的资料.

注意：由于我只测试了安卓，安卓上部分手机run-android的时候会出错，Unable to upload some APKs，所以把默认的gradle版本改成了1.2.3，这样发布程序的时候本地图片资源会读取不到，需要把gradle版本改回1.3.1

## 开源许可

**MIT License**