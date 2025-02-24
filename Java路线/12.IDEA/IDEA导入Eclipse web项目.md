在IDEA的界面选择File选项卡，New选项中的Project from existing Source子选项

在选择项目的目录文件夹位置，选择导入的模型为Eclipse

选择项目的目录位置，如果想要在eclipse的文件和IDEA的文件同步，那只需要保持Keep project and module files in框中内容和项目文件中的内容保持一致即可

下一步，IDEA会自动搜索模块，选择工程模块即可，如果在模块中有出现js的模块，那我们需要取消js勾选

想要保持工程的代码样式，选择Use default project code style即可

配置JDK选择对应版本即可，或者在Project Structure中配置Project选项

删除Project Structure->Modules->Dependencies里爆红的模块

在Project Structure->Libraries中选择New Project Libraries的JAVA选项，选中lib也就是项目中放置jar包的位置

在Project Structure->Modules->Dependencies里添加该jar包

在Project Structure->Modules->Dependencies里点击加号，配置Tomcat的jar包

在Project Structure->Facets中点击加号，选择web，配置web.xml

在Project Structure->Artifacts中点击加号，选择web Application:Exploded->From Module

配置Tomcat