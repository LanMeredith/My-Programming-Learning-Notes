# 前置要求

使用`jpackage` 命令可以将 Java 应用程序打包成平台特定的安装包，但`jpackage` 是 JDK 14 引入的一个工具，对于 Windows 平台，`jpackage` 可以生成 `.msi` 安装文件，但这需要 WiX 工具集（Windows Installer XML Toolset）的支持

## WiX 工具集

WiX 工具集是一个开源工具，用于创建 Windows 安装程序。它提供了一种基于 XML 的语言来描述安装包，并生成 MSI 安装文件。`jpackage` 使用 WiX 来生成 Windows 安装程序，因此在 Windows 上使用 `jpackage` 生成 `.msi` 文件时，需要安装 WiX 3.0 或更高版本

# pom.xml文件配置

在 Maven 的 `pom.xml` 文件中，使用`<build>` 用于配置构建过程

## 插件一：`maven-jar-plugin`

`maven-jar-plugin` 是一个常用的 Maven 插件，用于创建 JAR 文件。需要配置以下内容：

- `<mainClass>`: 指定了 JAR 文件的主类（即包含 `main` 方法的类）。在这个例子中，主类是 `BomDispose`
- `<addClasspath>`: 设置为 `true`，表示在 JAR 文件的清单文件（MANIFEST.MF）中添加类路径信息。这使得 JAR 文件可以包含其依赖项的信息

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.1.2</version>
    <configuration>
        <archive>
            <manifest>
                <addClasspath>true</addClasspath>
                <mainClass>BomDispose</mainClass>
            </manifest>
        </archive>
    </configuration>
</plugin>
```

## 插件二：`maven-shade-plugin`

`maven-shade-plugin` 是一个更强大的插件，用于创建“阴影”JAR 文件（也称为 Uber JAR 或 Fat JAR），即将所有依赖项打包到一个单独的 JAR 文件中。这对于创建独立可执行的 JAR 文件非常有用。你配置了以下内容：

- `<phase>`: 指定在 Maven 生命周期的 `package` 阶段执行插件
- `<goals>`: 指定要执行的目标，这里是 `shade` 目标
- `<transformers>`: 用于修改 JAR 文件的清单文件（MANIFEST.MF）
  - `<transformer>`: 使用 `ManifestResourceTransformer` 来设置主类
  - `<mainClass>`: 指定了 JAR 文件的主类，同样是 `BomDispose`

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.2.4</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <transformers>
                    <transformer
                        implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                        <mainClass>BomDispose</mainClass>
                    </transformer>
                </transformers>
            </configuration>
        </execution>
    </executions>
</plugin>
```

## 总结

- [`maven-jar-plugin`](#插件一：`maven-jar-plugin`)：用于创建基本的 JAR 文件，并在 MANIFEST.MF 文件中设置主类和类路径信息
- [`maven-shade-plugin`](#插件二：`maven-shade-plugin`)：用于创建包含所有依赖项的阴影 JAR 文件，并在 MANIFEST.MF 文件中设置主类

## 为什么要同时使用这两个插件？

- [`maven-jar-plugin`](#插件一：`maven-jar-plugin`)：主要是为了确保 JAR 文件的基本配置正确。
- [`maven-shade-plugin`](#插件二：`maven-shade-plugin`)：用于创建一个包含所有依赖项的独立 JAR 文件，这样你可以直接运行这个 JAR 文件而不需要额外的依赖项。

这两个插件缺一不可

## 如何使用

当你运行 `mvn package` 命令时，Maven 会按照配置的顺序执行这些插件。首先，`maven-jar-plugin` 会创建一个基本的 JAR 文件，然后 `maven-shade-plugin` 会将所有依赖项打包到同一个 JAR 文件中，并生成最终的可执行 JAR 文件（通常会输出两个jar包，其中一个带有`original`前缀，这其中不包含程序执行所需要的依赖）

## 最终的 JAR 文件

最终生成的 JAR 文件将包含所有依赖项，并且在 MANIFEST.MF 文件中指定了主类 `BomDispose`，可以直接运行：

# Jar包打包成exe程序文件

完成前置要求，在 `pom.xml`文件中进行了配置，且安装了WiX工具，Java版本为JDK14以上，即可进行打包

首先拿到Maven打包出的Jar包，**将其放到一个空的文件夹当中**（原因是：将Jar包打包成exe程序文件的过程中，会把Jar包所在目录的同级文件一并打包。程序文件在安装后，Jar包位于安装位置的app目录下）

打开命令行窗口，访问该Jar包所在目录。使用 `jpackage` 命令来生成 Windows 安装包，执行命令后即可生成相应的程序文件（生成出的程序文件可以双击安装，安装完成即可）

案例：

```shell
jpackage --input . --name BOM --win-shortcut --win-console --win-dir-chooser --main-jar RiHong-1.0.jar
```

**参数：**

1. **`--name`**:
   - 指定应用程序的名称
   - 例如：`--name MyApp`
2. **`--input`**:
   - 指定包含应用程序资源的目录
   - 例如：`--input target/classes`
3. **`--main-class`**:
   - 指定应用程序的主类（包含 `main` 方法的类）
   - 例如：`--main-class com.example.MainClass`
4. **`--main-jar`**:
   - 指定包含主类的 JAR 文件
   - 例如：`--main-jar myapp.jar`
5. **`--type`**:
   - 指定生成的安装包类型。在 Windows 上，可以是 `msi` 或 `exe`，默认是 `exe`
   - 例如：`--type msi` 或 `--type exe`
6. **`--icon`**:
   - 指定应用程序的图标文件路径
   - 例如：`--icon images/app-icon.ico`
7. **`--win-shortcut`**:
   - 为应用程序创建桌面快捷方式
   - 例如：`--win-shortcut`
8. **`--win-menu`**:
   - 为应用程序创建开始菜单项
   - 例如：`--win-menu`
9. **`--win-dir-chooser`**:
   - 允许用户在安装过程中选择安装目录
   - 例如：`--win-dir-chooser`
10. **`--win-per-user-install`**:
    - 使安装程序为每个用户单独安装应用程序
    - 例如：`--win-per-user-install`
11. **`--app-version`**:
    - 指定应用程序的版本号
    - 例如：`--app-version 1.1.0`
12. **`--vendor`**:
    - 指定应用程序的供应商名称
    - 例如：`--vendor "My Company"`
13. **`--description`**:
    - 指定应用程序的描述
    - 例如：`--description "My awesome application"`
14. **`--license-file`**:
    - 指定许可证文件的路径
    - 例如：`--license-file LICENSE.txt`
15. **`--resource-dir`**:
    - 指定包含其他资源文件（如图标、许可协议等）的目录
    - 例如：`--resource-dir resources`

# 扩展

## 311报错

报错信息：

> java.io.IOException: Command [light.exe, -nologo, -spdb, -ext, WixUtilExtension, -out, C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\images\win-exe.image\BOM-1.0.msi, -ext, WixUIExtension, -b, C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\config, -sice:ICE27, -loc, C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\config\MsiInstallerStrings_zh_CN.wxl, -cultures:zh-CN, C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\wixobj\main.wixobj, C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\wixobj\bundle.wixobj, C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\wixobj\ui.wixobj, C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\wixobj\InstallDirNotEmptyDlg.wixobj] in C:\Users\SeedList\AppData\Local\Temp\jdk.jpackage16718694715780991010\images\win-msi.image\BOM exited with 311 code

可以在命令后接 `--verbose` 查看详细的日志输出

```shell
jpackage --input . --name BOM --win-shortcut --win-console --win-dir-chooser --main-jar RiHong-6.2.jar --verbose
```

大概率是因为打包的目录下存在一些文件，其字符集不是GBK可处理的，故而出现报错，将那些文件删除即可