
/**
 * 1、将data选项中的属性转为getter和setter；
 * 2、data中的某个属性也是对象，把该属性转换成响应式属性；
 * 3、数据变化发布通知；
 */
/**
 * 类图 类名 Observer
 * 方法
 * walk（）
 * defineReactive（）
 */
class Observer {

    constructor(data) {
        
        this.data = data
        this.walk(this.data)
    }

    walk(data) {

        // 1.判断data是否是对象
        if (data && typeof data !== 'object') return

        // 2.遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    
    defineReactive(data, key, val) {

        let that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        // 如果val是对象，把val内部的属性转换为响应式数据
        this.walk(val)

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,

            get() {
                // TODO:添加依赖 Dep.target(观察者) = watcher对象;把watcher对象订阅到Dep（目标对象）中去
                Dep.target && dep.addSub(Dep.target)

                return val // TODO:避免闭包； data[key]会触发getter，所以返回val
            },

            set(newValue) {
                if (newValue === val) return
                val = newValue
                
                // 监听修改后的数据，转为getter、setter
                that.walk(newValue)

                // TODO:发送通知
                dep.notify()
            }
        })
        
    }

}
