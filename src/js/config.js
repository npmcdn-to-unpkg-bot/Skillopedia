angular.module("Skillopedia").constant("config", {
	url: "http://",
	imageUrl: "http://",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {},
	interceptor: [
		"about",
		"account",
		"authenication",
		"coach",
		"comments",
		"contact",
		"coupons_expired",
		"coupons",
		"create_course",
		"create_step",
		"detail",
		"favourite",
		"fillinorder",
		"index",
		"list",
		"messages",
		"order",
		"order_booking",
		"order_cancel",
		"order_comment",
		"order_confirm",
		"order_finish",
		"order_management",
		"order_refund",
		"orders",
		"orders_management",
		"privacy",
		"schedule",
		"services",
		"shoppingcart",
		"steps",
		"steps_draft",
		"steps_publish",
		"support"
	]
});