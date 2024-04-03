// 用于绘制图表的选项
var options = {
	"produce": 0, // 产量类型，0表示默认
	"planted": 1, // 种植方式，1表示默认
	"maxSeedMoney": 0, // 最大种子花费，0表示默认
	"days": 28, // 天数，28表示默认
	"fertilizer": 2, // 肥料类型，2表示默认
	"level": 0, // 地图等级，0表示默认
	"season": 4, // 季节，4表示默认
	"buySeed": false, // 是否购买种子，默认为false
	"buyFert": false, // 是否购买肥料，默认为false
	"average": false, // 是否计算平均值，默认为false
	"fertilizerSource": 0, // 肥料来源，0表示默认
	"seeds": {
		"pierre": true, // Pierre的种子是否可用
		"joja": true, // Joja的种子是否可用
		"special": true // 特殊种子是否可用
	},
	"skills": {
		"till": false, // 耕种技能，默认为false
		"agri": false, // 农业技能，默认为false
		"arti": false // 艺术技能，默认为false
	},
	"foodIndex": 0, // 食物索引，0表示默认
	"foodLevel": 0, // 食物等级，0表示默认
	"extra": false // 是否包含额外信息，默认为false
};


// 不同肥料及其统计数据
var fertilizers = [
	{
		"name": "None", // 无肥料
		"ratio": 0, // 比例
		"growth": 1, // 生长速度
		"cost": 0 // 费用
	},
	{
		"name": "Basic Fertilizer", // 基础肥料
		"ratio": 1, // 比例
		"growth": 1, // 生长速度
		"cost": 100 // 费用
	},
	{
		"name": "Quality Fertilizer", // 高级肥料
		"ratio": 2, // 比例
		"growth": 1, // 生长速度
		"cost": 150 // 费用
	},
	{
		"name": "Deluxe Fertilizer", // 顶级肥料
		"ratio": 3, // 比例
		"growth": 1, // 生长速度
		"cost": 0 // 费用
	},
	{
		"name": "Speed-Gro", // 生长激素
		"ratio": 0, // 比例
		"growth": 0.9, // 生长速度
		"cost": 100 // 费用
	},
	{
		"name": "Deluxe Speed-Gro", // 高级生长激素
		"ratio": 0, // 比例
		"growth": 0.75, // 生长速度
		"cost": 150, // 费用
		"alternate_cost": 80 // 备选费用
	},
	{
		"name": "Hyper Speed-Gro", // 顶级生长激素
		"ratio": 0, // 比例
		"growth": 0.67, // 生长速度
		"cost": 0 // 费用
	}
];


// 不同季节的预定义作物。
var seasons = [
	{
		"name": "Spring",
		"duration": 28,
		"crops": [
			crops.carrot,//胡萝卜
			crops.coffeebean, // 咖啡豆
			crops.strawberry, // 草莓
			crops.rhubarb, // 大黄
			crops.potato, // 土豆
			crops.cauliflower, // 花椰菜
			crops.greenbean, // 青豆
			crops.tealeaves, // 茶叶
			crops.kale, // 甘蓝
			crops.unmilledrice, // 未碾米
			crops.garlic, // 大蒜
			crops.parsnip, // 防风草
			crops.bluejazz, // 蓝爵士
			crops.tulip, // 郁金香
			crops.ancientfruit, // 上古种子
			crops.springseeds // 春季种子
		]
	},
	{
		"name": "Summer",
		"duration": 28,
		"crops": [
			crops.summersquash,//金皮西葫芦
			crops.pineapple, // 菠萝
			crops.blueberry, // 蓝莓
			crops.starfruit, // 杨桃
			crops.redcabbage, // 红叶卷心菜
			crops.hops, // 啤酒花
			crops.melon, // 甜瓜
			crops.hotpepper, // 辣椒
			crops.tealeaves, // 茶叶
			crops.tomato, // 西红柿
			crops.radish, // 小萝卜
			crops.summerspangle, // 夏季亮片
			crops.poppy, // 虞美人
			crops.wheat, // 小麦
			crops.corn, // 玉米
			crops.coffeebean, // 咖啡豆
			crops.sunflower, // 向日葵
			crops.ancientfruit, // 上古种子
			crops.taroroot, // 芋头
			crops.summerseeds // 夏季种子
		]
	},
	{
		"name": "Fall",
		"duration": 28,
		"crops": [
			crops.broccoli, // 西兰花
			crops.sweetgemberry, // 甜宝石莓
			crops.cranberries, // 蔓越莓
			crops.pumpkin, // 南瓜
			crops.grape, // 葡萄
			crops.artichoke, // 洋蓟
			crops.beet, // 甜菜
			crops.eggplant, // 茄子
			crops.amaranth, // 苋菜
			crops.yam, // 山药
			crops.tealeaves, // 茶叶
			crops.fairyrose, // 玫瑰仙子
			crops.bokchoy, // 小白菜
			crops.sunflower, // 向日葵
			crops.wheat, // 小麦
			crops.corn, // 玉米
			crops.ancientfruit, // 上古种子
			crops.fallseeds // 秋季种子
		]
	},
	{
		"name": "Winter",
		"duration": 28,
		"crops": [
			crops.powdermelon,//霜瓜
			crops.winterseeds // 冬季种子
		]
	},
	{
		"name": "Greenhouse",
		"duration": 112,
		"crops": [
			crops.pineapple, // 菠萝
			crops.coffeebean, // 咖啡豆
			crops.strawberry, // 草莓
			crops.rhubarb, // 大黄
			crops.potato, // 土豆
			crops.cauliflower, // 花椰菜
			crops.greenbean, // 青豆
			crops.kale, // 甘蓝
			crops.unmilledrice, // 未碾米
			crops.garlic, // 大蒜
			crops.parsnip, // 防风草
			crops.bluejazz, // 蓝爵士
			crops.tulip, // 郁金香
			crops.blueberry, // 蓝莓
			crops.starfruit, // 杨桃
			crops.redcabbage, // 红叶卷心菜
			crops.hops, // 啤酒花
			crops.melon, // 甜瓜
			crops.hotpepper, // 辣椒
			crops.tomato, // 番茄
			crops.radish, // 小萝卜
			crops.summerspangle, // 夏季花朵
			crops.poppy, // 罂粟花
			crops.wheat, // 小麦
			crops.corn, // 玉米
			crops.sweetgemberry, // 甜宝石莓
			crops.cranberries, // 蔓越莓
			crops.pumpkin, // 南瓜
			crops.grape, // 葡萄
			crops.tealeaves, // 茶叶
			crops.artichoke, // 洋蓟
			crops.beet, // 甜菜
			crops.eggplant, // 茄子
			crops.amaranth, // 苋菜
			crops.yam, // 山药
			crops.fairyrose, // 玫瑰仙子
			crops.bokchoy, // 小白菜
			crops.sunflower, // 向日葵
			crops.ancientfruit, // 上古种子
			crops.cactusfruit, // 仙人掌果实
			crops.taroroot, // 芋头
			crops.carrot,//胡萝卜
			crops.summersquash,//金皮西葫芦
			crops.broccoli,// 西兰花
			crops.powdermelon//霜瓜
		]
	}
];
