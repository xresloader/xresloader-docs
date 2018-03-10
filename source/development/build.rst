编译和打包
===============

::

    # 编译
    mvn compile
    # 打包
    mvn package

以上命令会自动下载依赖文件、包和插件。

编译完成后，输出的结果默认会放在 **target** 目录下。

更新依赖包
---------------------

需要更新依赖包版本只要修改[pom.xml](pom.xml)并修改版本号即可。

依赖包和插件的组名、包名和版本可以在以下仓库内找到:

+ 中心maven仓库: `http://search.maven.org/ <http://search.maven.org/#browse>`_
+ *或到下面列举的仓库列表中查找*

其他仓库地址
---------------------

公有仓库地址
^^^^^^^^^^^^^^^^^^^^^

#. **http://maven.aliyun.com/nexus/#view-repositories**
#. **`http://search.maven.org/ <http://search.maven.org/#browse>`_**
#. **http://mvnrepository.com/**
#. http://repository.jboss.com/maven2/
#. http://repository.sonatype.org/content/groups/public/
#. http://mirrors.ibiblio.org/pub/mirrors/maven2/org/acegisecurity/

私有仓库地址
^^^^^^^^^^^^^^^^^^^^^

#. http://repository.codehaus.org/
#. http://snapshots.repository.codehaus.org/


其他maven功能
^^^^^^^^^^^^^^^^^^^^^

参见： https://maven.apache.org/

批量转表工具和其他工具的开发文档请参见该项目的主页。