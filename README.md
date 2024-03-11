## 安装步骤 ##
	// 进入模板目录
	npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 组件使用说明与演示 ##
	//涉及全局的公共组件已注册，路径为src/common/script/globalComponents.js 调用组件时直接使用标签，如表单组件 <v-form></v-form>
###	vForm Attributes 
参数|说明|类型
:----|:-----:|-----:
arrList|渲染表单的结构(具体prop看下面的详情)|Array
search|该表单是否应用于检索条件区域,如果为true则支持检索并隐藏其他按钮（默认false）|Boolean
buttonGroup|表单需要的按钮组，参数固定为['submit','cancle','reset',''close],分别代表 ***新增、清空、重置、关闭***。其他根据需求需要的按钮请使用插槽。插槽名称为slotBtn。如果不加这个属性时默认新增时按钮为（提交、清空、关闭）;编辑时按钮为（提交、重置、关闭）|Array
url|提交表单的接口|String
findById|编辑或详情时返显数据的接口与参数集合|Object
formTemplate|提交之后保持在原有页面，需要这个参数;可参照用户管理或者机构管理|Object
labelWidth|表单域标签的宽度|String
labelPosition|表单域标签的位置|String
###	arrList Attributes 
参数|说明|类型
:----|:-----:|-----:
type|表单类型(目前支持input,textarea,select,date,daterange,password,tree,cascader)|String
name|字段名|String
value|默认值）|String
param|当type为select时，必须加param参数，值为字典参数|String
customOption|当type为select时，自定义下拉内容，格式例如 {"0":"自","1":"定","2":"义"}，但要把param去掉|Object
label|表单标签名称|String
noReset|禁止清空，默认false|Boolean
disabled|设置禁用，默认false|Boolean
filter|当type为select时,需要过滤掉的选项的value|Array
span|栅格布局长度|Number
hide|是否显示隐藏 注意，hide：true是隐藏，默认显示|Boolean
rule|对应表单校验规则，规则见elementui 表单校验|Array
eventChange|下拉框监听事件， 如果该下拉支持监听，使用方法见下面Form Events|Boolean
eventBlur|表单失去焦点事件，用法和eventChange事件相似|Boolean
###	vForm Events
事件名称|说明|使用方法
:----|:-----:|-----:
eventChange|下拉监听事件|在组件上绑定事件，<v-form @eventChange="方法名"></v-form> 然后在对应表单上加eventChange：true的属性。在事件内用拓展公共方法onselect()控制指定表单
eventBlur|表单失去焦点事件|在组件上绑定事件，<v-form @eventChange="方法名"></v-form> 然后在对应表单上加eventBlur：true的属性。在事件内用拓展公共方法onselect()控制指定表单
## 表单组件属性控制使用说明 ##	
对应控制表单属性的公共方法 Control(arr, obj) ,参数arr是要操作的表单数组，obj是对指定表单项的属性操作 例如： 
```javascript
let arr = [                      
                [ 
                  {type: "input",name: "userName",value: "",label: "用户名",span: 6,header:"用户管理基本信息",rule: [
                    {required: true,validator: this.validator.empty,trigger: "blur"},
                    {max: 50,message: "长度小于50个字符",trigger: "blur"},
                    {validator: this.cleanSpelChar,trigger: "blur"},
                    {validator: this.ifThere,trigger: "blur"}]
                  },
                  {type: "input",name: "nickName",value: "",label: "用户姓名",span: 6,rule: [
                    {required: true,validator: this.validator.empty,trigger: "blur"}]
                  }, 
                ]
              ]
	this.common.Control(arr,{
		'userName':{
			disabled:true
    	},
    	'nickName':{
			disabled:true
    	}
	})
```
## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- assets                       // 引入外部文件
	|   |-- common                       // 公共组件与方法文件夹
	|       |-- components               // 公共组件文件夹	
	|       |-- script                 	 // 公共方法文件夹（包含校验规则）
	|   |-- modules   				     // 项目所在文件夹（可部署多个项目）
	|   |-- |--platform					 // 例如：当前项目为平台
	|   |-- |--|--api  					 // 接口文件
	|   |-- |--|--components			 // 项目页面
	|   |-- |--|--router				 //	路由
	|   |-- |--|--script				 //	该项目特有js组件
	|   |-- |--|--App.vue				 // 页面入口文件
	|   |-- |--|--index.html			 // 入口html文件
	|   |-- |--|--index.js				 // 程序入口文件，加载各种公共组件
	|   |-- router                       // 路由
	|	|-- store                        // 状态管理仓库
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- element-variables.scss			 // 主题样式
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明




