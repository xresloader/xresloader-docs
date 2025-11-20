---
title: 构建指南
description: 本地构建与调试步骤
---
# 编译和打包

```bash
# 编译
mvn compile
# 打包
mvn package
```

以上命令会自动下载依赖文件、包和插件。

编译完成后，输出的结果默认会放在 **target** 目录下。

## 更新依赖包

需要更新依赖包版本只要修改\[pom.xml\](pom.xml)并修改版本号即可。

依赖包和插件的组名、包名和版本可以在以下仓库内找到:

- 中心maven仓库: [http://search.maven.org/](http://search.maven.org/#browse)
- *或到下面列举的仓库列表中查找*

## 其他仓库地址

### 公有仓库地址

1.  [https://mirrors.tencent.com/nexus/repository/maven-public/](https://mirrors.tencent.com/nexus/repository/maven-public/)
2.  [http://maven.aliyun.com/nexus/#view-repositories](http://maven.aliyun.com/nexus/#view-repositories)
3.  [http://mvnrepository.com/](http://mvnrepository.com/)
4.  **[http://search.maven.org/](http://search.maven.org/#browse)**
5.  [http://repository.jboss.com/maven2/](http://repository.jboss.com/maven2/)
6.  [http://repository.sonatype.org/content/groups/public/](http://repository.sonatype.org/content/groups/public/)
7.  [http://mirrors.ibiblio.org/pub/mirrors/maven2/org/acegisecurity/](http://mirrors.ibiblio.org/pub/mirrors/maven2/org/acegisecurity/)

### 私有仓库地址

1.  [http://repository.codehaus.org/](http://repository.codehaus.org/)
2.  [http://snapshots.repository.codehaus.org/](http://snapshots.repository.codehaus.org/)

### 其他maven功能

参见： [https://maven.apache.org/](https://maven.apache.org/)

批量转表工具和其他工具的开发文档请参见该项目的主页。
