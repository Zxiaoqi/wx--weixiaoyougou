// component/cpmindex.js
Component({
  // 默认情况下，一个组件的wxml中只能有一个slot。需要使用多slot时，可以在组件js中声明启用。
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    pureDataPattern: /^timestamp$/
  },
  behaviors: [],
  properties: {
    timestamp: Number,
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    },
    propA:{
      type:String,
      value:''
    }
  },
  observers: {
    timestamp: function () {
      // timestamp 被设置时，将它展示为可读时间字符串
      var timeString = new Date(this.data.timestamp).toLocaleString()
      this.setData({
        timeString: timeString
      })
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    onTap: function(){
      var myEventDetail = {
        value:this.properties.propA
      } // detail对象，提供给事件监听函数
      var myEventOption = {
        bubbles:true
      } // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  },
  lifetimes: {
    attached: function() {
      console.log(this.properties.propA);
      
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },
})
