###### Vue-mini

一、Vue实例

1. 构造函数： $option\ \$el\\ \$data  判断是否存在 通过  || 逻辑运算符；
2. _ProxyData 遍历所有data属性，并注入到vue实例中；
3. 判断是否重复选项；

二、Observer 数据劫持

1.data属性数据劫持；

2.递归遍历data属性转为getter、setter； Object.keys() => 获取对象中的属性；

3.数据变化发送通知；

4.避免get获取数据时造成闭包；this.data[key]会触发get方法，需要将值返回；

三、Compiler 编译文本

1.操作节点：

* Array.from 将伪数组转为真数组

* node节点（node.childNodes） 遍历操作 

* 节点类型：node.nodeType = 3 文本节点、=1元素节点

* 元素节点 获取属性 指令：node.attributes (伪数组) => Array.from(node.attributes) - attr.name / 属性名称

* 处理文本节点：差值表达式  正则

	```javascript
	let reg = /\{\{(.+?)\}\}/  // 匹配差值表达式内容msg  {{msg}}
	let key = RegExp.$1.trim() // RegExp 正则构造函数
	
	node.textContent = node.textContent.replace(reg, this[key]) // replace 按照reg规则data替换 msg
	```

四、Dep （dependency 依赖）

五、Watcher

1.自身实例化的时候往dep对象中添加自己；

2.当数据变化时触发依赖，dep通知所有的Watcher实例更新视图。

3.实例化时，传入回调函数，处理相应操作。

六、发布订阅者模式

七、观察者模式