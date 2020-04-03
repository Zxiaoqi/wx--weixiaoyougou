// components/tab-view/tab-view.js
Component({
	properties: {
		tabs: {
			type: Array,
			value: ["标签1", "标签2"]
		},
		activeIndex: {
			type: Number,
			value:0
		}
	},
	data: {
	},
	methods: {
		handleChangeTab(e) {
			// console.log(e);
			const { index } = e.currentTarget.dataset;
			this.setData({
				activeIndex: index
			});
			// console.log(this.data.activeIndex);
			// console.log(this.properties);
			this.triggerEvent("onChange", e.currentTarget.dataset);
		}
	}
});
