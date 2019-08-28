使用国内的源
==============================

国内的Maven源
------------------------------

由于国内访问官方maven仓库的速度比较慢，所以可以尝试使用oschina提供的maven仓库镜像

添加mirror节点到settings.xml里的mirrors即可。比如 ::

    <mirror>
        <id>tencent-cloud</id>
        <mirrorOf>central</mirrorOf>
        <name>Tencent Cloud Mirror.</name>
        <url>http://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
    </mirror>

    <mirror>
        <id>aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Aliyun Mirror.</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    </mirror>

    <mirror>
        <id>repo2</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://repo2.maven.org/maven2/</url>
    </mirror>

    <mirror>
        <id>ui</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://uk.maven.org/maven2/</url>
    </mirror>

    <mirror>
        <id>jboss-public-repository-group</id>
        <mirrorOf>central</mirrorOf>
        <name>JBoss Public Repository Group</name>
        <url>http://repository.jboss.org/nexus/content/groups/public</url>
    </mirror>

    <mirror>
        <id>repo1</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://repo1.maven.org/maven2/</url>
    </mirror>

如果$HOME/.m2下没有settings.xml文件，可以去 http://maven.apache.org/download.cgi 下载个发布包，然后复制一个出来

设置完maven配置之后，可以用如下命令编译打包 ::

    # 编译
    mvn -s [settings.xml路径] compile
    # 打包
    mvn -s [settings.xml路径] package

加速NPM包下载
------------------------------

关闭npm的https
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

    npm config set strict-ssl false

设置npm的软件源
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

    npm config set registry "http://registry.npmjs.org/"
    npm config set registry https://mirrors.tencent.com/npm/
    npm config set registry https://registry.npm.taobao.org/
    npm install -g cnpm --registry=https://registry.npm.taobao.org

代理
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+ 设置代理： ``npm config set proxy=http://代理服务器ip:代理服务器端口``
+ 取消代理： ``npm config delete http-proxy``
+ 取消代理： ``npm config delete https-proxy``
+ 单独设置代理： ``npm install --save-dev electron-prebuilt --proxy http://代理服务器ip:代理服务器端口``

