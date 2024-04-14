# 一、Java命名规范

## 总体规范

1. 项目名全部小写
2. 包名全部小写，类名首字母大写，其余组成词首字母依次大写
3. 变量名，方法名首字母小写，如果名称由多个单词组成，除首字母外的每个单词的首字母都要大写
4. 常量名全部大写

**所有命名规则必须遵循以下规则**

1. 名称只能由字母、数字、下划线、$符号组成
2. 不能以数字开头
3. 名称不能使用Java中的关键字
4. 坚决不允许出现中文及拼音命名

## Java包名命名规范

Java的包名由小写单词组成，包的路径符合所开发的系统模块的定义，以便通过包名可得知其属于哪个模块，从而方便到对应包里找相应的实现类

### 常规包名

为了保障每个Java Package命名的唯一性，在Java编程规范中要求开发人员在自己定义的包名前加上唯一的前缀。由于互联网上的域名称是不会重复的，所以多数开发人员采用自己公司在互联网上的域名称作为自己程序包的唯一前缀。例如 : com.sun.swt……推荐将域名反过来写，这样不会产生冲突。

#### 公司项目

- com：公司项目，copyright由项目发起的公司所有
- 包名：com.公司名.项目名.模块名

#### 团队项目

- team：团队项目，指由团队发起，并由该团队开发的项目，copyright属于该团队所有
- 包名：team.团队名.项目名.模块名

#### 自定义包名

一般公司命名为com.公司名.项目名.模块名……那我们个人的项目又怎么命名呢？

 个人的英语单词有individual、personal、private、one-man，进一步对以上四个单词词意进行分析并在保证了唯一性，继而使用每个单词的前4个字母作为前缀，与com也做了区分。

示例如下所示:

#### indi

- 个体项目：指个人发起，但非自己独自完成的项目，可公开或私有项目，copyright主要属于发起者。  
- 包名：ndi.发起者名.项目名.模块名

#### pers

- 个人项目：指个人发起，独自完成，可分享的项目，copyright主要属于个人。
- 包名：pers.个人名.项目名.模块名

#### priv

- 私有项目：指个人发起，独自完成，非公开的私人使用的项目，copyright属于个人。
- 包名：priv.个人名.项目名.模块名

#### onem

- 与indi相同，推荐使用indi。

## Java类命名规范

- 类名要求每个单词首字母均大写

## Java方法名与对象名（变量名）

- 方法名或对象名（变量名）除第一个单词首字母小写外（若只有一个单词，则全部小写），其余单词首字母均大写。
- 方法名采取动词加名词或动词表示，例如append()、getName()等
- 属性名与对象名命名方法相同，采用名词或形容词加名词的形式表示，如name、dbClassName、dbUser等
- 常量要求字母全部大写，可以加一些前缀，用_进行分隔

## 属性文件.properties定义变量命名

- object.a_b_c格式，全部小写，其中object是宿主，a_b_c多个单词下划线分开。例：hibernate.cache.use_second_level_cache，hibernate.cache.provider_class，hibernate.cache.provider_configuration_file_resource_path

## xml文件命名

- 全部小写，-符号是其xml的用途说明，类似applicationContext属习惯命名。比如springmvc-servlet.xml、workdesk-manager.xml、workdesk-servlet.xml、applicationContext-basic.xml等
- xml里的内容多个字符间以-隔开，比如param-name，filter-mapping等。

## 普通文件

- 命名(jsp,js,img等)和java普通变量规范相同。

## 属性文件properties

- 以下划线隔开：errors_zh_CN.properties，hibernate_test.properties

## 数据库命名

- 表、字段命名全部大写，多个单词以_隔开。

 