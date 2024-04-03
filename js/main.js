// 准备变量。
var cropList; // 作物列表

var svgWidth = 1080; // SVG画布宽度
var svgHeight = 480; // SVG画布高度

var width = svgWidth - 48; // 实际绘图宽度
var height = (svgHeight - 56) / 2; // 实际绘图高度
var barPadding = 4; // 柱状图间距
var barWidth = width / seasons[options.season].crops.length - barPadding; // 柱状图宽度
var miniBar = 8; // 迷你柱状图大小
var barOffsetX = 30; // X轴偏移量
var barOffsetY = 50; // Y轴偏移量

// 准备Web元素。
var svg = d3.select("div.graph")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight)
	.style("background-color", "#333333")
	.style("border-radius", "8px");

svg.append("g")
	.append("text")
	.attr("class", "axis")
	.attr("x", language == "cn" ? 42 : 80)
	.attr("y", 24)
	.style("text-anchor", "end")
	.text(language == "cn" ? "利润" : "Total Profit");

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", 10)
	.style("visibility", "hidden")
	.style("background", "rgb(0, 0, 0)")
	.style("background", "rgba(0, 0, 0, 0.75)")
	.style("padding", "8px")
	.style("border-radius", "8px")
	.style("border", "2px solid black");

//绘图
var gAxis = svg.append("g")  // 坐标轴容器
var gProfit = svg.append("g")  // 利润容器
var gSeedLoss = svg.append("g")  // 种子损失容器
var gFertLoss = svg.append("g")  // 肥料损失容器
var gIcons = svg.append("g")  // 图标容器
var gTooltips = svg.append("g")  // 提示框容器

// 定义 Y 轴变量
var axisY;
// 定义利润条柱变量
var barsProfit;
// 定义种子条柱变量
var barsSeed;
// 定义肥料条柱变量
var barsFert;
// 定义图标图片变量
var imgIcons;
// 定义工具提示条柱变量
var barsTooltips;
// 定义选项变量
var options;
// 定义语言设置变量
var language = "cn";
// 定义最大整数常量，取值为最大安全整数或最大整数值
var MAX_INT = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE;

//获取select元素
var select = document.getElementById("languageSelect");
//初始化language变量
language = languageSelect.value;

/*
 * 格式化指定的数字，为千位数添加分隔符。
 * @param num 要格式化的数字。
 * @return 格式化后的字符串。
 */
function formatNumber(num) {
	num = num.toFixed(2) + '';
	x = num.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

/*
 * 计算特定作物的最大收获次数，指定天数、季节等。
 * @param cropID 要计算的作物ID。这对应于所选季节的作物编号。
 * @return 指定时间内作物的收获次数。
 */
function harvests(cropID) {
	var crop = seasons[options.season].crops[cropID];
	var fertilizer = fertilizers[options.fertilizer];
	// 茶叶在季节的最后7天每天都会开花
	var isTea = crop.name == "Tea Leaves";

	// 如果作物不跨季节，则每多一个季节减去28天
	var remainingDays = options.days - 28; // 计算剩余天数，减去一个季节的天数

	// 如果作物跨季节生长且当前季节不是第四季节
	if (options.crossSeason && options.season != 4) {
		var i = options.season + 1;
		if (i >= 4)
			i = 0;
		for (var j = 0; j < seasons[i].crops.length; j++) {
			var seasonCrop = seasons[i].crops[j];
			// 检查下一个季节的作物是否和当前作物相同
			if (crop.name == seasonCrop.name) {
				remainingDays += 28; // 如果相同，则增加一个季节的天数
				break;
			}
		}
	}
	else {
		remainingDays = options.days; // 如果不跨季节，则剩余天数为设置的天数
	}

	// console.log("=== " + crop.name + " ===");

	var harvests = 0; // 收成次数
	var day = 1; // 当前天数

	if (options.skills.agri)//判断有没有农业学家这个技能
		day += Math.floor(crop.growth.initial * (fertilizer.growth - 0.1));//作物生长日期的默认值*肥料增长率-0.1
	else
		day += Math.floor(crop.growth.initial * fertilizer.growth);

	if (day <= remainingDays && (!isTea || ((day - 1) % 28 + 1) > 21))
		harvests++; // 如果条件符合，增加收成次数

	while (day <= remainingDays) {
		if (crop.growth.regrow > 0) {
			// console.log("Harvest on day: " + day);
			day += crop.growth.regrow; // 如果有再生周期，增加再生周期天数
		}
		else {
			// console.log("Harvest on day: " + day);
			if (options.skills.agri)
				day += Math.floor(crop.growth.initial * (fertilizer.growth - 0.1));
			else
				day += Math.floor(crop.growth.initial * fertilizer.growth);
		}

		if (day <= remainingDays && (!isTea || ((day - 1) % 28 + 1) > 21))
			harvests++; // 如果条件符合，增加收成次数
	}

	// console.log("Harvests: " + harvests);
	return harvests; // 返回最终的收成次数

}

/*
 * 计算一包种子的最低成本。
 * @param crop 包含所有作物数据的作物对象。
 * @return 一包种子的最低成本，考虑了选项。
 */66
function minSeedCost(crop) {
	var minSeedCost = Infinity;
	//如果皮埃尔卖这个种子，而且你也选了在皮埃尔买种子这个选项，并且种子价格低于当前规定的最低价格，则更新最低价格
	if (crop.seeds.pierre != 0 && options.seeds.pierre && crop.seeds.pierre < minSeedCost)
		minSeedCost = crop.seeds.pierre;
	//如果joja卖这个种子，而且你也选了在joja买种子这个选项，并且种子价格低于当前规定的最低价格，则更新最低价格
	if (crop.seeds.joja != 0 && options.seeds.joja && crop.seeds.joja < minSeedCost)
		minSeedCost = crop.seeds.joja;
	//如果特殊情况卖这个种子，而且你也选了在特殊情况买种子这个选项，并且种子价格低于当前规定的最低价格，则更新最低价格
	if (crop.seeds.special != 0 && options.seeds.special && crop.seeds.special < minSeedCost)
		minSeedCost = crop.seeds.special;

	return minSeedCost;
}

/*
 * 计算种植的作物数量。
 * @param crop 包含所有作物数据的作物对象。
 * @return 种植的作物数量，考虑了期望种植的数量和最大种子花费。
 */
function planted(crop) {
	// 如果允许购买种子，并且最大种子花费不为零
	if (options.buySeed && options.maxSeedMoney !== 0) {
		return Math.min(options.planted, Math.floor(options.maxSeedMoney / minSeedCost(crop)));// 返回已种植数量和最大种子花费除以单颗种子成本的较小值
	} else {
		return options.planted; // 否则返回已种植数量
	}
}

/*
 * 根据肥料水平和玩家农业水平计算不同作物评级的比例
 * 数学逻辑来自 Crop.harvest(...) 游戏逻辑
 *
 * @param fertilizer 肥料水平（无肥料:0，基础肥料:1，高级肥料:2，顶级肥料:3）
 * @param level 玩家的总农业技能水平
 * @return 包含铱色、金色、银色和未评级作物比例的对象
 */
function levelRatio(fertilizer, level, isWildseed) {
	var ratio = {};

	if (isWildseed) {
		// 如果选择了植物学家，则所有野生作物均为铱色
		if (options.skills.botanist)
			ratio.ratioI = 1;
		else
			ratio.ratioI = 0;
		// 金色采集率为采集等级/30（不包括靛色）
		ratio.ratioG = level / 30.0 * (1 - ratio.ratioI);
		// 银色采集率为采集等级/15（不包括金色或靛色）
		ratio.ratioS = level / 15.0 * (1 - ratio.ratioG - ratio.ratioI);
		// 剩余作物评级的概率
		ratio.ratioN = 1 - ratio.ratioS - ratio.ratioG - ratio.ratioI;
	}
	else {
		// 豪华肥料提供的靛色作物比例为金色比例的一半
		ratio.ratioI = fertilizer >= 3 ? (0.2 * (level / 10.0) + 0.2 * fertilizer * ((level + 2) / 12.0) + 0.01) / 2 : 0;
		// 计算金色乘以不是靛色的概率
		ratio.ratioG = (0.2 * (level / 10.0) + 0.2 * fertilizer * ((level + 2) / 12.0) + 0.01) * (1.0 - ratio.ratioI);
		// 银色概率上限为0.75，乘以不是金色/靛色的概率
		ratio.ratioS = Math.max(0, Math.min(0.75, ratio.ratioG * 2.0) * (1.0 - ratio.ratioG - ratio.ratioI));
		// 不是其他评级的概率
		ratio.ratioN = Math.max(0, 1.0 - ratio.ratioS - ratio.ratioG - ratio.ratioI);
	}
	return ratio;
}

/*
 * 计算指定作物的利润。
 * @param crop 包含所有作物数据的作物对象。
 * @return 总利润。
 */
function profit(crop) {
	// 获取种植的数量
	var num_planted = planted(crop);
	// 计算总收成
	var total_harvests = crop.harvests * num_planted;
	// 获取肥料类型
	var fertilizer = fertilizers[options.fertilizer];
	// 获取产品类型
	var produce = options.produce;

	var useLevel = options.level;
	// 如果作物是野种子，则使用采集等级
	if (crop.isWildseed)
		useLevel = options.foragingLevel;

	// 根据肥料比例和等级计算营养元素分配比例
	var { ratioN, ratioS, ratioG, ratioI } = levelRatio(fertilizer.ratio, useLevel + options.foodLevel, crop.isWildseed);

	// 如果作物是茶叶，则重置银、金、铱的比例
	if (crop.name == "Tea Leaves") ratioN = 1, ratioS = ratioG = ratioI = 0;
	var profit = 0;

	//跳过不合格作物的酒桶/罐计算（其中 corp.produce.jar 或 crop.produce.keg = 0）



	var userawproduce = false;

	switch (produce) {
		case 0: userawproduce = true; break;
		case 1:
			if (crop.produce.jarType == null) userawproduce = true;  // 如果果实的罐头类型为空，则选择原材料
			break;
		case 2:
			if (crop.produce.kegType == null) userawproduce = true;  // 如果果实的酒桶类型为空，则选择原材料
			break;
	}

	// console.log("Calculating raw produce value for: " + crop.name);

	if (produce == 0 || userawproduce) {
		profit += crop.produce.price * ratioN * total_harvests;  // 根据不同比例计算利润
		profit += Math.trunc(crop.produce.price * 1.25) * ratioS * total_harvests;  // 根据不同比例计算利润
		profit += Math.trunc(crop.produce.price * 1.5) * ratioG * total_harvests;  // 根据不同比例计算利润
		profit += crop.produce.price * 2 * ratioI * total_harvests;  // 根据不同比例计算利润
		// console.log("Profit (After normal produce): " + profit);

		if (crop.produce.extra > 0) {
			profit += crop.produce.price * crop.produce.extraPerc * crop.produce.extra * total_harvests;  // 如果额外产量大于0，则计算额外利润
			// console.log("Profit (After extra produce): " + profit);
		}

		if (options.skills.till) {
			profit *= 1.1;  // 如果拥有耕种-农场主技能，则计算利润加成
			// console.log("Profit (After skills): " + profit);
		}
	}
	else {
		var items = total_harvests;
		items += crop.produce.extraPerc * crop.produce.extra * total_harvests;  // 根据额外产量计算物品数量
		var kegModifier = crop.produce.kegType === "Wine" ? 3 : 2.25;  // 根据酒桶类型选择利润倍数

		switch (produce) {
			case 1: profit += items * (crop.produce.price * 2 + 50); break;  // 根据不同情况计算利润
			case 2: profit += items * (crop.produce.keg != null ? crop.produce.keg : crop.produce.price * kegModifier); break;  // 根据不同情况计算利润
		}

		if (options.skills.arti) {
			profit *= 1.4;  // 如果拥有耕种-制品生产家技能，则计算利润加成
		}
	}


	if (options.buySeed) {
		profit += crop.seedLoss;
		// 计算种子花费后的利润
	}

	if (options.buyFert) {
		profit += crop.fertLoss;
		// 计算施肥花费后的利润
	}

	profitData = {}
	profitData.profit = profit;//利润
	profitData.ratioN = ratioN;//无星
	profitData.ratioS = ratioS;//银星
	profitData.ratioG = ratioG;//金星
	profitData.ratioI = ratioI;//铱星

	// 返回利润数据对象
	return profitData;
}

/*
 * 计算购买种子时的利润损失。
 * @param crop 包含所有作物数据的作物对象。
 * @return 总损失。
 */
function seedLoss(crop) {
	var harvests = crop.harvests;

	var loss = -minSeedCost(crop);

	if (crop.growth.regrow == 0 && harvests > 0)
		loss = loss * harvests;

	return loss * planted(crop);
}

/*
 * 当购买肥料时，计算损失转利润。
 *
 * 请注意，收获不会销毁肥料，因此这与收获次数无关。
 *
 * @param crop 包含所有作物数据的作物对象。
 * @return 总损失。
 */
function fertLoss(crop) {
	var loss;
	if (options.fertilizer == 4 && options.fertilizerSource == 1)
		loss = -fertilizers[options.fertilizer].alternate_cost;
	else
		loss = -fertilizers[options.fertilizer].cost;
	return loss * planted(crop);
}

/*
 * 将任何值转换为每日平均值。
 * @param value 要转换的值。
 * @return 每日值。
 */
function perDay(value) {
	return value / options.days;
}

/*
 * 执行对一个季节的作物列表进行过滤，将新的列表保存到 cropList 数组中。
 */
function fetchCrops() {
	cropList = [];

	var season = seasons[options.season];

	for (var i = 0; i < season.crops.length; i++) {
		if ((options.seeds.pierre && season.crops[i].seeds.pierre != 0) ||
			(options.seeds.joja && season.crops[i].seeds.joja != 0) ||
			(options.seeds.special && season.crops[i].seeds.special != 0)) {
			cropList.push(JSON.parse(JSON.stringify(season.crops[i])));
			cropList[cropList.length - 1].id = i;
		}
	}
}

/*
 * 计算 cropList 数组中所有作物的利润和损失。
 */
function valueCrops() {
	for (var i = 0; i < cropList.length; i++) {
		if (cropList[i].isWildseed && options.skills.gatherer) {
			cropList[i].produce.extra += 1;
			cropList[i].produce.extraPerc += 0.2;
		}
		cropList[i].planted = planted(cropList[i]);
		cropList[i].harvests = harvests(cropList[i].id);
		cropList[i].seedLoss = seedLoss(cropList[i]);
		cropList[i].fertLoss = fertLoss(cropList[i]);
		cropList[i].profitData = profit(cropList[i]);
		cropList[i].profit = cropList[i].profitData.profit;
		cropList[i].averageProfit = perDay(cropList[i].profit);
		cropList[i].averageSeedLoss = perDay(cropList[i].seedLoss);
		cropList[i].averageFertLoss = perDay(cropList[i].fertLoss);
		if (options.average) {
			cropList[i].drawProfit = cropList[i].averageProfit;
			cropList[i].drawSeedLoss = cropList[i].averageSeedLoss;
			cropList[i].drawFertLoss = cropList[i].averageFertLoss;
		}
		else {
			cropList[i].drawProfit = cropList[i].profit;
			cropList[i].drawSeedLoss = cropList[i].seedLoss;
			cropList[i].drawFertLoss = cropList[i].fertLoss;
		}
	}
}

/*
 * 对 cropList 数组进行排序，使最具盈利性的作物排在第一个位置。
 */
function sortCrops() {
	var swapped;
	do {
		swapped = false;
		for (var i = 0; i < cropList.length - 1; i++) {
			if (cropList[i].drawProfit < cropList[i + 1].drawProfit) {
				var temp = cropList[i];
				cropList[i] = cropList[i + 1];
				cropList[i + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);


	// console.log("==== SORTED ====");
	for (var i = 0; i < cropList.length; i++) {
		// console.log(cropList[i].drawProfit.toFixed(2) + "  " + cropList[i].name);
	}
}

/* 
 * 更新X D3比例尺。
 * @return 新比例尺。
 */
function updateScaleX() {
	return d3.scale.ordinal()
		.domain(d3.range(seasons[4].crops.length))
		.rangeRoundBands([0, width]);
}

/*
 * 更新 Y D3 比例尺.
 * @return 新比例尺。
 */
function updateScaleY() {
	return d3.scale.linear()
		.domain([0, d3.max(cropList, function (d) {
			if (d.drawProfit >= 0) {
				return (~~((d.drawProfit + 99) / 100) * 100);
			}
			else {
				var profit = d.drawProfit;
				if (options.buySeed) {
					if (d.seedLoss < profit)
						profit = d.drawSeedLoss;
				}
				if (options.buyFert) {
					if (d.fertLoss < profit)
						profit = d.drawFertLoss;
				}
				return (~~((-profit + 99) / 100) * 100);
			}
		})])
		.range([height, 0]);
}

/*
 * 更新 D3 比例尺。
 * @return 新的比例尺。
 */
function updateScaleAxis() {
	return d3.scale.linear()
		.domain([
			-d3.max(cropList, function (d) {
				if (d.drawProfit >= 0) {
					return (~~((d.drawProfit + 99) / 100) * 100);
				}
				else {
					var profit = d.drawProfit;
					if (options.buySeed) {
						if (d.seedLoss < profit)
							profit = d.drawSeedLoss;
					}
					if (options.buyFert) {
						if (d.fertLoss < profit)
							profit = d.drawFertLoss;
					}
					return (~~((-profit + 99) / 100) * 100);
				}
			}),
			d3.max(cropList, function (d) {
				if (d.drawProfit >= 0) {
					return (~~((d.drawProfit + 99) / 100) * 100);
				}
				else {
					var profit = d.drawProfit;
					if (options.buySeed) {
						if (d.seedLoss < profit)
							profit = d.drawSeedLoss;
					}
					if (options.buyFert) {
						if (d.fertLoss < profit)
							profit = d.drawFertLoss;
					}
					return (~~((-profit + 99) / 100) * 100);
				}
			})])
		.range([height * 2, 0]);
}

/*
* 渲染图表。
 * 仅在首次打开或更改季节/种子时调用该函数。
 */
function renderGraph() {

	var x = updateScaleX();
	var y = updateScaleY();
	var ax = updateScaleAxis();

	svg.attr("width", barOffsetX + barPadding * 2 + (barWidth + barPadding) * cropList.length);
	d3.select(".graph").attr("width", barOffsetX + barPadding * 2 + (barWidth + barPadding) * cropList.length);

	var yAxis = d3.svg.axis()
		.scale(ax)
		.orient("left")
		.tickFormat(d3.format(",s"))
		.ticks(16);

	axisY = gAxis.attr("class", "axis")
		.call(yAxis)
		.attr("transform", "translate(48, " + barOffsetY + ")");

	barsProfit = gProfit.selectAll("rect")
		.data(cropList)
		.enter()
		.append("rect")
		.attr("x", function (d, i) {
			if (d.drawProfit < 0 && options.buySeed && options.buyFert)
				return x(i) + barOffsetX + (barWidth / miniBar) * 2;
			else if (d.drawProfit < 0 && !options.buySeed && options.buyFert)
				return x(i) + barOffsetX + barWidth / miniBar;
			else if (d.drawProfit < 0 && options.buySeed && !options.buyFert)
				return x(i) + barOffsetX + barWidth / miniBar;
			else
				return x(i) + barOffsetX;
		})
		.attr("y", function (d) {
			if (d.drawProfit >= 0)
				return y(d.drawProfit) + barOffsetY;
			else
				return height + barOffsetY;
		})
		.attr("height", function (d) {
			if (d.drawProfit >= 0)
				return height - y(d.drawProfit);
			else
				return height - y(-d.drawProfit);
		})
		.attr("width", function (d) {
			if (d.drawProfit < 0 && options.buySeed && options.buyFert)
				return barWidth - (barWidth / miniBar) * 2;
			else if (d.drawProfit < 0 && !options.buySeed && options.buyFert)
				return barWidth - barWidth / miniBar;
			else if (d.drawProfit < 0 && options.buySeed && !options.buyFert)
				return barWidth - barWidth / miniBar;
			else
				return barWidth;
		})
		.attr("fill", function (d) {
			if (d.drawProfit >= 0)
				return "lime";
			else
				return "red";
		});

	barsSeed = gSeedLoss.selectAll("rect")
		.data(cropList)
		.enter()
		.append("rect")
		.attr("x", function (d, i) { return x(i) + barOffsetX; })
		.attr("y", height + barOffsetY)
		.attr("height", function (d) {
			if (options.buySeed)
				return height - y(-d.drawSeedLoss);
			else
				return 0;
		})
		.attr("width", barWidth / miniBar)
		.attr("fill", "orange");

	barsFert = gFertLoss.selectAll("rect")
		.data(cropList)
		.enter()
		.append("rect")
		.attr("x", function (d, i) {
			if (options.buySeed)
				return x(i) + barOffsetX + barWidth / miniBar;
			else
				return x(i) + barOffsetX;
		})
		.attr("y", height + barOffsetY)
		.attr("height", function (d) {
			if (options.buyFert)
				return height - y(-d.drawFertLoss);
			else
				return 0;
		})
		.attr("width", barWidth / miniBar)
		.attr("fill", "brown");

	imgIcons = gIcons.selectAll("image")
		.data(cropList)
		.enter()
		.append("svg:image")
		.attr("x", function (d, i) { return x(i) + barOffsetX; })
		.attr("y", function (d) {
			if (d.drawProfit >= 0)
				return y(d.drawProfit) + barOffsetY - barWidth - barPadding;
			else
				return height + barOffsetY - barWidth - barPadding;
		})
		.attr('width', barWidth)
		.attr('height', barWidth)
		.attr("xlink:href", function (d) { return "img/" + d.img; });

	barsTooltips = gTooltips.selectAll("rect")
		.data(cropList)
		.enter()
		.append("rect")
		.attr("x", function (d, i) { return x(i) + barOffsetX - barPadding / 2; })
		.attr("y", function (d) {
			if (d.drawProfit >= 0)
				return y(d.drawProfit) + barOffsetY - barWidth - barPadding;
			else
				return height + barOffsetY - barWidth - barPadding;
		})
		.attr("height", function (d) {
			var topHeight = 0;

			if (d.drawProfit >= 0)
				topHeight = height + barWidth + barPadding - y(d.drawProfit);
			else
				topHeight = barWidth + barPadding;

			var lossArray = [0];

			if (options.buySeed)
				lossArray.push(d.drawSeedLoss);
			if (options.buyFert)
				lossArray.push(d.drawFertLoss);
			if (d.drawProfit < 0)
				lossArray.push(d.drawProfit);

			var swapped;
			do {
				swapped = false;
				for (var i = 0; i < lossArray.length - 1; i++) {
					if (lossArray[i] > lossArray[i + 1]) {
						var temp = lossArray[i];
						lossArray[i] = lossArray[i + 1];
						lossArray[i + 1] = temp;
						swapped = true;
					}
				}
			} while (swapped);

			return topHeight + (height - y(-lossArray[0]));
		})
		.attr("width", barWidth + barPadding)
		.attr("opacity", "0")
		.attr("cursor", "pointer")
		.on("mouseover", function (d) {
			tooltip.selectAll("*").remove();
			tooltip.style("visibility", "visible");

			tooltip.append("h3").attr("class", "tooltipTitle").text(language == "cn" ? d.name : d.en_name);

			var tooltipTable = tooltip.append("table")
				.attr("class", "tooltipTable")
				.attr("cellspacing", 0);
			var tooltipTr;


			tooltipTr = tooltipTable.append("tr");
			tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "总利润：" : "Total Profit: ");
			if (d.profit > 0)
				tooltipTr.append("td").attr("class", "tooltipTdRightPos").text("+" + formatNumber(d.profit))
					.append("div").attr("class", "gold");
			else
				tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(formatNumber(d.profit))
					.append("div").attr("class", "gold");

			tooltipTr = tooltipTable.append("tr");
			tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "每日利润：" : "Profit per day:");
			if (d.averageProfit > 0)
				tooltipTr.append("td").attr("class", "tooltipTdRightPos").text("+" + formatNumber(d.averageProfit))
					.append("div").attr("class", "gold");
			else
				tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(formatNumber(d.averageProfit))
					.append("div").attr("class", "gold");

			if (options.buySeed) {
				tooltipTr = tooltipTable.append("tr");
				tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "种子总损失：" : "Total seed loss:");
				tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(formatNumber(d.seedLoss))
					.append("div").attr("class", "gold");

				tooltipTr = tooltipTable.append("tr");
				tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "每日种子平均损失：" : "Seed loss per day:");
				tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(formatNumber(d.averageSeedLoss))
					.append("div").attr("class", "gold");
			}

			if (options.buyFert) {
				tooltipTr = tooltipTable.append("tr");
				tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "肥料总损失：" : "Total fertilizer loss:");
				tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(formatNumber(d.fertLoss))
					.append("div").attr("class", "gold");

				tooltipTr = tooltipTable.append("tr");
				tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "每日肥料平均损失：" : "Fertilizer loss per day:");
				tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(formatNumber(d.averageFertLoss))
					.append("div").attr("class", "gold");
			}


			//Ineligible crops are sold raw.
			tooltipTr = tooltipTable.append("tr");
			tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "出售的产品类型：" : "Produce sold:");
			switch (options.produce) {
				case 0: tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? "未加工" : "Raw crops"); break;
				case 1:
					if (d.produce.jarType != null)
						tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.produce.jarType);
					else
						tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(language == "cn" ? "未加工" : "Raw crops");
					break;
				case 2:
					if (d.produce.kegType != null)
						tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.produce.kegType);
					else
						tooltipTr.append("td").attr("class", "tooltipTdRightNeg").text(language == "cn" ? "未加工" : "Raw crops");
					break;
			}
			tooltipTr = tooltipTable.append("tr");
			tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "到月末的时间：" : "Duration:");
			tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? options.days + " 天" : options.days + " days");
			tooltipTr = tooltipTable.append("tr");
			tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "种植数量：" : "Planted:");
			tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? d.planted + " 株" : d.planted);
			tooltipTr = tooltipTable.append("tr");
			tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "收成：" : "Harvests:");
			tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? d.harvests + " 次" : d.harvests);

			if (options.extra) {
				var kegModifier = d.produce.kegType === "Wine" ? 3 : 2.25;
				var kegPrice = d.produce.keg != null ? d.produce.keg : d.produce.price * kegModifier;

				tooltip.append("h3").attr("class", "tooltipTitleExtra").text(language == "cn" ? "作物信息" : "Crop info");
				tooltipTable = tooltip.append("table")
					.attr("class", "tooltipTable")
					.attr("cellspacing", 0);

				if (!(d.isWildseed && options.skills.botanist)) {
					tooltipTr = tooltipTable.append("tr");
					tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "价值 (普通)：" : "Value (Normal):");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.produce.price)
						.append("div").attr("class", "gold");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text("(" + (d.profitData.ratioN * 100).toFixed(0) + "%)");
				}
				if (d.name != "Tea Leaves") {
					if (!(d.isWildseed && options.skills.botanist)) {
						tooltipTr = tooltipTable.append("tr");
						tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "价值 (银星)：" : "Value (Silver):");
						tooltipTr.append("td").attr("class", "tooltipTdRight").text(Math.trunc(d.produce.price * 1.25))
							.append("div").attr("class", "gold");
						tooltipTr.append("td").attr("class", "tooltipTdRight").text("(" + (d.profitData.ratioS * 100).toFixed(0) + "%)");
						tooltipTr = tooltipTable.append("tr");
						tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "价值 (金星)：" : "Value (Gold):");
						tooltipTr.append("td").attr("class", "tooltipTdRight").text(Math.trunc(d.produce.price * 1.5))
							.append("div").attr("class", "gold");
						tooltipTr.append("td").attr("class", "tooltipTdRight").text("(" + (d.profitData.ratioG * 100).toFixed(0) + "%)");
					}
					if ((!d.isWildseed && fertilizers[options.fertilizer].ratio >= 3) || (d.isWildseed && options.skills.botanist)) {
						tooltipTr = tooltipTable.append("tr");
						tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "价值 (铱星)：" : "Value (Iridium):");
						tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.produce.price * 2)
							.append("div").attr("class", "gold");
						tooltipTr.append("td").attr("class", "tooltipTdRight").text("(" + (d.profitData.ratioI * 100).toFixed(0) + "%)");
					}
				}
				tooltipTr = tooltipTable.append("tr");
				if (d.produce.jarType != null) {
					tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "价值 (" + d.produce.jarType + ")：" : "Value (" + d.produce.jarType + "):");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.produce.price * 2 + 50)
						.append("div").attr("class", "gold");
				}
				else {
					tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "价值 (Jar)：" : "Value (Jar):");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text("无");
				}
				tooltipTr = tooltipTable.append("tr");
				if (d.produce.kegType) {
					tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "价值 (" + d.produce.kegType + ")：" : "Value (" + d.produce.kegType + "):");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(kegPrice)
						.append("div").attr("class", "gold");
				}
				else {
					tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "价值 (Keg)：" : "Value (Keg):");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? "无" : "None");
				}


				var first = true;
				if (d.seeds.pierre > 0) {
					tooltipTr = tooltipTable.append("tr");
					tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "种子价格 (皮埃尔)：" : "Seeds (Pierre):");
					first = false;
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.seeds.pierre)
						.append("div").attr("class", "gold");
				}
				if (d.seeds.joja > 0) {
					tooltipTr = tooltipTable.append("tr");
					if (first) {
						tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "种子价格 (Joja)：" : "Seeds (Joja):");
						first = false;
					}
					else
						tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "种子价格 (Joja)：" : "Seeds (Joja):");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.seeds.joja)
						.append("div").attr("class", "gold");
				}
				if (d.seeds.special > 0) {
					tooltipTr = tooltipTable.append("tr");
					if (first) {
						tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "种子价格 (特殊)：" : Seeds(Special));
						first = false;
					}
					else
						tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "种子价格 (特殊)：" : Seeds(Special));
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.seeds.special)
						.append("div").attr("class", "gold");
					tooltipTr = tooltipTable.append("tr");
					tooltipTr.append("td").attr("class", "tooltipTdLeft").text("");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(d.seeds.specialLoc);
				}

				tooltipTr = tooltipTable.append("tr");
				tooltipTr.append("td").attr("class", "tooltipTdLeftSpace").text(language == "cn" ? "生长时间：" : "Time to grow:");
				tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? d.growth.initial + " 天" : d.growth.initial + " days");
				tooltipTr = tooltipTable.append("tr");
				tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "再次收获时间：" : "Time to regrow:");
				if (d.growth.regrow > 0)
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? d.growth.regrow + " 天" : d.growth.regrow + " days");
				else
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? "不可再次收获" : "N/A");
				if (d.produce.extra > 0) {
					tooltipTr = tooltipTable.append("tr");
					tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "有概率多收获的数量：" : "Extra produce:");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text(language == "cn" ? d.produce.extra + "个" : d.produce.extra);
					tooltipTr = tooltipTable.append("tr");
					tooltipTr.append("td").attr("class", "tooltipTdLeft").text(language == "cn" ? "多收获概率：" : "Extra chance:");
					tooltipTr.append("td").attr("class", "tooltipTdRight").text((d.produce.extraPerc * 100) + "%");
				}



			}
		})
		.on("mousemove", function () {
			tooltip.style("top", (d3.event.pageY - 16) + "px").style("left", (d3.event.pageX + 20) + "px");
		})
		.on("mouseout", function () { tooltip.style("visibility", "hidden"); })
		.on("click", function (d) { window.open(d.url, "_blank"); });


}

/*
* 更新已经渲染的图表，显示动画效果。
 */
function updateGraph() {
	var x = updateScaleX();
	var y = updateScaleY();
	var ax = updateScaleAxis();

	var yAxis = d3.svg.axis()
		.scale(ax)
		.orient("left")
		.tickFormat(d3.format(",s"))
		.ticks(16);

	axisY.transition()
		.call(yAxis);

	barsProfit.data(cropList)
		.transition()
		.attr("x", function (d, i) {
			if (d.drawProfit < 0 && options.buySeed && options.buyFert)
				return x(i) + barOffsetX + (barWidth / miniBar) * 2;
			else if (d.drawProfit < 0 && !options.buySeed && options.buyFert)
				return x(i) + barOffsetX + barWidth / miniBar;
			else if (d.drawProfit < 0 && options.buySeed && !options.buyFert)
				return x(i) + barOffsetX + barWidth / miniBar;
			else
				return x(i) + barOffsetX;
		})
		.attr("y", function (d) {
			if (d.drawProfit >= 0)
				return y(d.drawProfit) + barOffsetY;
			else
				return height + barOffsetY;
		})
		.attr("height", function (d) {
			if (d.drawProfit >= 0)
				return height - y(d.drawProfit);
			else
				return height - y(-d.drawProfit);
		})
		.attr("width", function (d) {
			if (d.drawProfit < 0 && options.buySeed && options.buyFert)
				return barWidth - (barWidth / miniBar) * 2;
			else if (d.drawProfit < 0 && !options.buySeed && options.buyFert)
				return barWidth - barWidth / miniBar;
			else if (d.drawProfit < 0 && options.buySeed && !options.buyFert)
				return barWidth - barWidth / miniBar;
			else
				return barWidth;
		})
		.attr("fill", function (d) {
			if (d.drawProfit >= 0)
				return "lime";
			else
				return "red";
		});

	barsSeed.data(cropList)
		.transition()
		.attr("x", function (d, i) { return x(i) + barOffsetX; })
		.attr("y", height + barOffsetY)
		.attr("height", function (d) {
			if (options.buySeed)
				return height - y(-d.drawSeedLoss);
			else
				return 0;
		})
		.attr("width", barWidth / miniBar)
		.attr("fill", "orange");

	barsFert.data(cropList)
		.transition()
		.attr("x", function (d, i) {
			if (options.buySeed)
				return x(i) + barOffsetX + barWidth / miniBar;
			else
				return x(i) + barOffsetX;
		})
		.attr("y", height + barOffsetY)
		.attr("height", function (d) {
			if (options.buyFert)
				return height - y(-d.drawFertLoss);
			else
				return 0;
		})
		.attr("width", barWidth / miniBar)
		.attr("fill", "brown");

	imgIcons.data(cropList)
		.transition()
		.attr("x", function (d, i) { return x(i) + barOffsetX; })
		.attr("y", function (d) {
			if (d.drawProfit >= 0)
				return y(d.drawProfit) + barOffsetY - barWidth - barPadding;
			else
				return height + barOffsetY - barWidth - barPadding;
		})
		.attr('width', barWidth)
		.attr('height', barWidth)
		.attr("xlink:href", function (d) { return "img/" + d.img; });

	barsTooltips.data(cropList)
		.transition()
		.attr("x", function (d, i) { return x(i) + barOffsetX - barPadding / 2; })
		.attr("y", function (d) {
			if (d.drawProfit >= 0)
				return y(d.drawProfit) + barOffsetY - barWidth - barPadding;
			else
				return height + barOffsetY - barWidth - barPadding;
		})
		.attr("height", function (d) {
			var topHeight = 0;

			if (d.drawProfit >= 0)
				topHeight = height + barWidth + barPadding - y(d.drawProfit);
			else
				topHeight = barWidth + barPadding;

			var lossArray = [0];

			if (options.buySeed)
				lossArray.push(d.drawSeedLoss);
			if (options.buyFert)
				lossArray.push(d.drawFertLoss);
			if (d.drawProfit < 0)
				lossArray.push(d.drawProfit);

			var swapped;
			do {
				swapped = false;
				for (var i = 0; i < lossArray.length - 1; i++) {
					if (lossArray[i] > lossArray[i + 1]) {
						var temp = lossArray[i];
						lossArray[i] = lossArray[i + 1];
						lossArray[i + 1] = temp;
						swapped = true;
					}
				}
			} while (swapped);

			return topHeight + (height - y(-lossArray[0]));
		})
		.attr("width", barWidth + barPadding);
}

function updateSeasonNames() {
	if (options.crossSeason) {
		document.getElementById('season_0').innerHTML = language == "cn"?"春天 & 夏天":"Spring & Summer";
		document.getElementById('season_1').innerHTML = language == "cn"?"夏天 & 秋天":"Summer & Fall";
		document.getElementById('season_2').innerHTML = language == "cn"?"秋天 & 冬天":"Fall & Winter";
		document.getElementById('season_3').innerHTML = language == "cn"?"冬天 & 春天":"Winter & Spring";
	}
	else {
		document.getElementById('season_0').innerHTML = language == "cn"?"春天":"Spring";
		document.getElementById('season_1').innerHTML = language == "cn"?"夏天":"Summer";
		document.getElementById('season_2').innerHTML = language == "cn"?"秋天":"Fall";
		document.getElementById('season_3').innerHTML = language == "cn"?"冬天":"Winter";
	}
}

function updateSeedChance() {

}

/*
 * 基于HTML中设置的选项更新所有选项和数据。
 * 之后，重新过滤、值和排序所有的作物。
 */
function updateData() {

	options.season = parseInt(document.getElementById('select_season').value);
	const isGreenhouse = options.season === 4;

	options.produce = parseInt(document.getElementById('select_produce').value);

	if (document.getElementById('number_planted').value <= 0)
		document.getElementById('number_planted').value = 1;
	options.planted = document.getElementById('number_planted').value;

	if (document.getElementById('max_seed_money').value < 0)
		document.getElementById('max_seed_money').value = '0';
	options.maxSeedMoney = parseInt(document.getElementById('max_seed_money').value);
	if (isNaN(options.maxSeedMoney)) {
		options.maxSeedMoney = 0;
	}

	options.average = document.getElementById('check_average').checked;

	options.crossSeason = document.getElementById('cross_season').checked;

	if (!isGreenhouse) {
		document.getElementById('current_day_row').style.display = 'table-row';
		document.getElementById('number_days').disabled = true;
		document.getElementById('cross_season_row').style.display = 'table-row';

		if (document.getElementById('current_day').value <= 0)
			document.getElementById('current_day').value = 1;
		if (options.crossSeason) {
			document.getElementById('number_days').value = 56;
			if (document.getElementById('current_day').value > 56)
				document.getElementById('current_day').value = 56;
			options.days = 57 - document.getElementById('current_day').value;
		}
		else {
			document.getElementById('number_days').value = 28;
			if (document.getElementById('current_day').value > 28)
				document.getElementById('current_day').value = 28;
			options.days = 29 - document.getElementById('current_day').value;
		}
	} else {
		document.getElementById('current_day_row').style.display = 'none';
		document.getElementById('number_days').disabled = false;
		document.getElementById('cross_season_row').style.display = 'none';

		if (document.getElementById('number_days').value > 100000)
			document.getElementById('number_days').value = 100000;
		options.days = document.getElementById('number_days').value;
	}

	options.seeds.pierre = document.getElementById('check_seedsPierre').checked;
	options.seeds.joja = document.getElementById('check_seedsJoja').checked;
	options.seeds.special = document.getElementById('check_seedsSpecial').checked;

	options.buySeed = document.getElementById('check_buySeed').checked;

	options.fertilizer = parseInt(document.getElementById('select_fertilizer').value);

	options.buyFert = document.getElementById('check_buyFert').checked;

	options.fertilizerSource = parseInt(document.getElementById('speed_gro_source').value);

	if (document.getElementById('farming_level').value <= 0)
		document.getElementById('farming_level').value = 1;
	if (document.getElementById('farming_level').value > 13)
		document.getElementById('farming_level').value = 13;
	options.level = parseInt(document.getElementById('farming_level').value);

	if (options.level >= 5) {
		document.getElementById('check_skillsTill').disabled = false;
		document.getElementById('check_skillsTill').style.cursor = "pointer";
		options.skills.till = document.getElementById('check_skillsTill').checked;
	}
	else {
		document.getElementById('check_skillsTill').disabled = true;
		document.getElementById('check_skillsTill').style.cursor = "default";
		document.getElementById('check_skillsTill').checked = false;
	}

	if (options.level >= 10 && options.skills.till) {
		document.getElementById('select_skills').disabled = false;
		document.getElementById('select_skills').style.cursor = "pointer";
	}
	else {
		document.getElementById('select_skills').disabled = true;
		document.getElementById('select_skills').style.cursor = "default";
		document.getElementById('select_skills').value = 0;
	}
	if (document.getElementById('select_skills').value == 1) {
		options.skills.agri = true;
		options.skills.arti = false;
	}
	else if (document.getElementById('select_skills').value == 2) {
		options.skills.agri = false;
		options.skills.arti = true;
	}
	else {
		options.skills.agri = false;
		options.skills.arti = false;
	}

	if (document.getElementById('foraging_level').value <= 0)
		document.getElementById('foraging_level').value = 1;
	if (document.getElementById('foraging_level').value > 13)
		document.getElementById('foraging_level').value = 13;
	options.foragingLevel = parseInt(document.getElementById('foraging_level').value);

	if (options.foragingLevel >= 5) {
		document.getElementById('check_skillsGatherer').disabled = false;
		document.getElementById('check_skillsGatherer').style.cursor = "pointer";
		options.skills.gatherer = document.getElementById('check_skillsGatherer').checked;
	}
	else {
		document.getElementById('check_skillsGatherer').disabled = true;
		document.getElementById('check_skillsGatherer').style.cursor = "default";
		document.getElementById('check_skillsGatherer').checked = false;
	}

	if (options.foragingLevel >= 10 && options.skills.gatherer) {
		document.getElementById('check_skillsBotanist').disabled = false;
		document.getElementById('check_skillsBotanist').style.cursor = "pointer";
		options.skills.botanist = document.getElementById('check_skillsBotanist').checked;
	}
	else {
		document.getElementById('check_skillsBotanist').disabled = true;
		document.getElementById('check_skillsBotanist').style.cursor = "default";
		document.getElementById('check_skillsBotanist').checked = false;
	}

	options.foodIndex = document.getElementById('select_food').value;
	options.foodLevel = parseInt(document.getElementById('select_food').options[options.foodIndex].value);
	if (options.buyFert && options.fertilizer == 4)
		document.getElementById('speed_gro_source').disabled = false;
	else
		document.getElementById('speed_gro_source').disabled = true;

	options.extra = document.getElementById('check_extra').checked;

	updateSeasonNames();

	// Persist the options object into the URL hash.
	window.location.hash = encodeURIComponent(serialize(options));

	fetchCrops();
	valueCrops();
	sortCrops();
}

/*
 * 在启动时调用一次，用于绘制用户界面。
 */
function initial() {
	optionsLoad();
	updateData();
	renderGraph();
}

/*
 * 在每次选项更改时调用，以对图形进行动画处理。
 */
function refresh() {
	updateData();
	updateGraph();
}

/*
 * Parse out and validate the options from the URL hash.
 */
function optionsLoad() {
	if (!window.location.hash) return;

	options = deserialize(window.location.hash.slice(1));

	function validBoolean(q) {

		return q == 1;
	}

	function validIntRange(min, max, num) {

		return num < min ? min : num > max ? max : parseInt(num, 10);
	}

	options.season = validIntRange(0, 4, options.season);
	document.getElementById('select_season').value = options.season;

	options.produce = validIntRange(0, 2, options.produce);
	document.getElementById('select_produce').value = options.produce;

	options.planted = validIntRange(1, MAX_INT, options.planted);
	document.getElementById('number_planted').value = options.planted;

	options.maxSeedMoney = validIntRange(0, MAX_INT, options.maxSeedMoney);
	document.getElementById('max_seed_money').value = options.maxSeedMoney;

	options.average = validBoolean(options.average);
	document.getElementById('check_average').checked = options.average;

	options.crossSeason = validBoolean(options.crossSeason);
	document.getElementById('cross_season').checked = options.crossSeason;

	var daysMax = 0;
	if (options.crossSeason)
		daysMax = options.season === 4 ? MAX_INT : 56;
	else
		daysMax = options.season === 4 ? MAX_INT : 28;

	options.days = validIntRange(1, daysMax, options.days);
	if (options.season === 4) {
		document.getElementById('number_days').value = options.days;
	}
	else {
		if (options.crossSeason) {
			document.getElementById('number_days').value = 56;
			document.getElementById('current_day').value = 57 - options.days;
		}
		else {
			document.getElementById('number_days').value = 28;
			document.getElementById('current_day').value = 29 - options.days;
		}
	}

	options.seeds.pierre = validBoolean(options.seeds.pierre);
	document.getElementById('check_seedsPierre').checked = options.seeds.pierre;

	options.seeds.joja = validBoolean(options.seeds.joja);
	document.getElementById('check_seedsJoja').checked = options.seeds.joja;

	options.seeds.special = validBoolean(options.seeds.special);
	document.getElementById('check_seedsSpecial').checked = options.seeds.special;

	options.buySeed = validBoolean(options.buySeed);
	document.getElementById('check_buySeed').checked = options.buySeed;

	options.fertilizer = validIntRange(0, 6, options.fertilizer);
	document.getElementById('select_fertilizer').value = options.fertilizer;

	options.fertilizerSource = validIntRange(0, 1, options.fertilizerSource);
	document.getElementById('speed_gro_source').value = options.fertilizerSource;

	options.buyFert = validBoolean(options.buyFert);
	document.getElementById('check_buyFert').checked = options.buyFert;

	options.level = validIntRange(0, 13, options.level);
	document.getElementById('farming_level').value = options.level;

	options.skills.till = validBoolean(options.skills.till);
	document.getElementById('check_skillsTill').checked = options.skills.till;

	options.skills.agri = validBoolean(options.skills.agri);
	options.skills.arti = validBoolean(options.skills.arti);
	const binaryFlags = options.skills.agri + options.skills.arti * 2;
	document.getElementById('select_skills').value = binaryFlags;

	options.foragingLevel = validIntRange(0, 13, options.foragingLevel);
	document.getElementById('foraging_level').value = options.foragingLevel;

	options.skills.gatherer = validBoolean(options.skills.gatherer);
	document.getElementById('check_skillsGatherer').checked = options.skills.gatherer;

	options.skills.botanist = validBoolean(options.skills.botanist);
	document.getElementById('check_skillsBotanist').checked = options.skills.botanist;

	options.foodIndex = validIntRange(0, 6, options.foodIndex);
	document.getElementById('select_food').value = options.foodIndex;

	options.extra = validBoolean(options.extra);
	document.getElementById('check_extra').checked = options.extra;

	updateSeasonNames();
}

function deserialize(str) {
	var json = `(${str})`
		.replace(/_/g, ' ')
		.replace(/-/g, ',')
		.replace(/\(/g, '{')
		.replace(/\)/g, '}')
		.replace(/([a-z]+)/gi, '"$1":')
		.replace(/"(true|false)":/gi, '$1');

	//console.log(json);

	return JSON.parse(json);
}

function serialize(obj) {

	return Object.keys(obj)
		.reduce((acc, key) => {
			return /^(?:true|false|\d+)$/i.test('' + obj[key])
				? `${acc}-${key}_${obj[key]}`
				: `${acc}-${key}_(${serialize(obj[key])})`;
		}, '')
		.slice(1);
}

/*
 * Called when changing season/seeds, to redraw the graph.
 */
function rebuild() {
	gAxis.selectAll("*").remove();
	gProfit.selectAll("*").remove();
	gSeedLoss.selectAll("*").remove();
	gFertLoss.selectAll("*").remove();
	gIcons.selectAll("*").remove();
	gTooltips.selectAll("*").remove();

	updateData();
	renderGraph();
}

document.addEventListener('DOMContentLoaded', initial);
document.addEventListener('click', function (event) {
	if (event.target.id === 'reset') window.location = 'index.html';
});
