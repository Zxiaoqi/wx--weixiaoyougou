// components/cart-tab/cart-tab.js
Component({
properties: {},
data: {},
methods: {
    //加入购物车
    addCart(e) { 
      this.triggerEvent("addCart");
    },
    //立即购买
    toBuy(e) { 
      this.triggerEvent("toBuy");
    }
},
options: {
	multipleSlots: true // 在组件定义时的选项中启用多slot支持
}
});
