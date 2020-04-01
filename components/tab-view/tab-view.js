// components/tab-view/tab-view.js
Component({
	properties: {
		tabs: {
			type: Array,
			value: ["标签1", "标签2"]
		}
	},
	data: {
		activeIndex: 0
	},
	methods: {
		handleChangeTab(e) {
			// console.log(e);
			const { index } = e.currentTarget.dataset;
			this.setData({
				activeIndex: index
			});
			this.triggerEvent("onChange", e.currentTarget.dataset);
		}
	}
});
