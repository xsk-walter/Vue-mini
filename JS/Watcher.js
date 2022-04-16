/**
 * 1.数据变化触发依赖，dep通知所有的Watcher实例更新视图；
 * 2.自身实例化的时候往dep对象中添加自己；
 */

class Watcher {

    constructor(vm, key, cb) {
        this.vm = vm
        // data中的属性名称
        this.key = key
        // 回调函数负责更新视图
        this.cb = cb

        // TODO:把watcher对象记录到Dep类的静态属性target
        Dep.target = this
        // 触发get方法，在get方法中会调用addSub方法
        this.oldValue = vm[key]
        Dep.target = null
    }

    // 当数据发生变化时更新视图
    update() {
        let newValue = this.vm[this.key]

        if (newValue === this.oldValue) return
        // TODO: 回调
        this.cb(newValue)
    }
}