/**
 * 1.负责编译模板，解析指令、差值表达式；
 * 2.负责页面首次渲染；
 * 3.当数据变化后重新渲染视图；
 */

class Compiler {

    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }

    // 编译模板，处理文本节点和元素节点
    compile(el) {
       let childNodes = el.childNodes

       if (childNodes && childNodes.length) {

           Array.from(childNodes).forEach(node => {

               if (this.isTextNode(node)) {

                   this.compileText(node)
               } else if (this.isElementNode(node)) {

                   this.compileElement(node)
               }

               //   node节点是否有子节点，如果有，递归调用compile 
               if (node.childNodes && node.childNodes.length) {
                   this.compile(node)
               }
           })
       }
        
    }

    // 编译文本节点，处理差值表达式
    compileText(node) {
        let reg = /\{\{(.+?)\}\}/
        let content = node.textContent
        
        if (reg.test(content)) {
            let key = RegExp.$1.trim() // $1 为 reg中 匹配 ()中的文本内容
            node.textContent = node.textContent.replace(reg, this.vm[key])

            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
        
    }

    // 处理元素节点 、指令
    compileElement(node) {
        if (node.attributes && node.attributes.length) {
            // 遍历所有的属性节点
            Array.from(node.attributes).forEach(attr => {
                
                let attrName = attr.name.substr(2)
                // 判断是否为指令
                if (this.isDirective(attr.name)) {

                    let key = attr.value

                    this.update(node, key, attrName)
                }

            })
        }
    }
 

    update(node, key, attrName) {

        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key)//TODO: call改变this指向 为 Compiler
        // this.textUpdater()
    }

    textUpdater(node, value, key) {
        
        node.textContent = value

        new Watcher(this.vm, key, newValue => {
            node.textContent = newValue
        })
    }

    modelUpdater(node, value, key) {
        node.value = value

        // 数据更新 - 更新视图
        new Watcher(this.vm, key, newValue => {
            node.value = newValue
        })

        // TODO:双向数据绑定 - 修改视图 更新数据
        node.addEventListener('input', (val) => {

            this.vm[key] = val.target.value
        })
    }

    // 判断为v-指令
    isDirective(attrName) {

        return attrName.startsWith('v-')
    }

    // 判断文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }

    // 判断元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}