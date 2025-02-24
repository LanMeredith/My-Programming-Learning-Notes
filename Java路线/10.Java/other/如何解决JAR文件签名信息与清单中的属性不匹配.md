# 问题情况

**java.lang.SecurityException: Invalid signature file digest for Manifest main attributes**

```java
Error: A JNI error has occurred, please check your installation and try again Exception in thread "main" java.lang.SecurityException: Invalid signature file digest for Manifest main attributes at java.base/sun.security.util.SignatureFileVerifier.processImpl(SignatureFileVerifier.java:347) at java.base/sun.security.util.SignatureFileVerifier.process(SignatureFileVerifier.java:289) at java.base/java.util.jar.JarVerifier.processEntry(JarVerifier.java:327) at java.base/java.util.jar.JarVerifier.update(JarVerifier.java:239) at java.base/java.util.jar.JarFile.initializeVerifier(JarFile.java:761) at java.base/java.util.jar.JarFile.getInputStream(JarFile.java:847) at java.base/jdk.internal.loader.URLClassPath$JarLoader$2.getInputStream(URLClassPath.java:881) at java.base/jdk.internal.loader.Resource.cachedInputStream(Resource.java:77) at java.base/jdk.internal.loader.Resource.getByteBuffer(Resource.java:163) at java.base/jdk.internal.loader.BuiltinClassLoader.defineClass(BuiltinClassLoader.java:853) at java.base/jdk.internal.loader.BuiltinClassLoader.findClassOnClassPathOrNull(BuiltinClassLoader.java:760) at java.base/jdk.internal.loader.BuiltinClassLoader.loadClassOrNull(BuiltinClassLoader.java:681) at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:639) at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:188) at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:520) at java.base/java.lang.Class.forName0(Native Method) at java.base/java.lang.Class.forName(Class.java:467) at java.base/sun.launcher.LauncherHelper.loadMainClass(LauncherHelper.java:794) at java.base/sun.launcher.LauncherHelper.checkAndLoadMain(LauncherHelper.java:689)
```

# 解决办法

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
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>META-INF/*.SF</exclude>
                            <exclude>META-INF/*.DSA</exclude>
                            <exclude>META-INF/*.RSA</exclude>
                        </excludes>
                    </filter>
                </filters>
            </configuration>
        </execution>
    </executions>
</plugin>
```

注意：shade用2.3以上版本不用手动删除，否则，在打包之后，执行以下命令，删除打包中.SF/.RSA/相关的文件

```shell
zip -d your.jar 'META-INF/.SF' 'META-INF/.RSA' 'META-INF/*SF'
```

# 问题原因

这个问题是在maven打包之后由于重复引用某些依赖导致生成了一些.SF等文件，运行jar时会抛出
