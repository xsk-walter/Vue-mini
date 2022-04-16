/**
 * 1.收集依赖，添加观察watcher；
 * 2.通知所有的观察者；
 */

class Dep {

    constructor() {
        // 存储所有的观察者
        this.subs = []
    }

    // 添加观察者
    addSub(sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }

    // 通知所有的观察者
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}