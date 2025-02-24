# 问题情况

采用 JDBC 链接 SQL Server 时，报错：驱动程序无法通过使用安全套接字层(SSL)加密与 SQL Server 建立安全连接

# 解决方法

找到 JDK 的安装位置，找到 java. Security 文件，搜索 3DES_EDE_CBC，将附近的 TLSv 1，TLSv 1.1 去除掉即可