// components/tab-view/tab-view.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabs: {
			type: Array,
			value: ["tab栏","tab2"]
		}
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		activeIndex:0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
    handleChangeTab(e) {
      // console.log(e);
      const { index } = e.currentTarget.dataset
      this.setData({
        activeIndex:index
      })
    }
	}
});
