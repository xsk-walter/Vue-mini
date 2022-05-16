/**
 * 1.负责接收初始化的参数（选项）
 * 2.负责把data中的属性注入到Vue实例，转换成getter、setter
 * 3.负责调用observer监听data中所有属性的变化
 * 4.负责调用compiler解析指令、差值表达式
 */
/**
 * 类图  类名 Vue
 * ---属性
 * + $options
 * + $el
 * + $data
 * ---方法
 * - _ProxyData()
 */
class Vue {

    constructor(options) {

        // 1.通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        // TODO更正一: this.$options.el 替代 写死的'#app'，这样更通用
        // this.$el = typeof this.$options.el === 'string' ? document.querySelector('#app') : this.$options.el
        this.$el =
          typeof this.$options.el === 'string'
            ? document.querySelector(this.$options.el)
            : this.$options.el
        
        // TODO:_ProxyData 和Observer的区别
        /**
         * _ProxyData: data中的属性注入到vue实例
         * Observer: 把data中的属性转换为getter和setter
         */

        // 2.把data中的成员转换成getter和setter，注入到vue实例中
        this._ProxyData(this.$data) 

        // 3.调用observer对象，监听数据的变化
        new Observer(this.$data) 

        // 4.调用compiler对象，解析指令和差值表达式
        new Compiler(this)
    }

    _ProxyData(data) {
        // 遍历所有的data属性 转化为 getter 和setter
        Object.keys(data).forEach(key => {
            // 把data中的属性注入到vue实例中
            Object.defineProperty(this, key, {

                enumerable: true, // 可枚举
                configurable: true, // 可配置

                get() {
                    return data[key]
                },

                set(newValue) {
                    if (data[key] === newValue) return
                    data[key] = newValue
                }
            })
        })
    }

}