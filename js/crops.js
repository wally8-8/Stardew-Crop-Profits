/*
 * 所有数据均来自修改后的 polarstoat/stardew-crop-data 
 */

//ctrl+k ctrl+0 折叠所有代码块
//ctrl+k ctrl+j 展开所有折叠的代码块

// // 作物列表
var crops = {
  "carrot": {
    "name": "胡萝卜",
    "en_name": "Carrot",
    "url": "https://zh.stardewvalleywiki.com/胡萝卜",
    "urlEn": "http://stardewvalleywiki.com/Carrot",
    "img": "carrot.png",
    "seeds": {
      "sell": 15,
      "pierre": 0,
      "joja": 0,
      "special": 0,
      "specialLoc": "Unpurchasable",
      "specialUrl": "https://zh.stardewvalleywiki.com/胡萝卜种子"
    },
    "growth": {
      "initial": 3,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 35,
      "jarType": "胡萝卜腌菜",
      "kegType": "胡萝卜汁"
    }
  },
  "summersquash": {
    "name": "金皮西葫芦",
    "en_name": "Summer Squash",
    "url": "https://zh.stardewvalleywiki.com/金皮西葫芦",
    "urlEn": "https://stardewvalleywiki.com/Summer_Squash",
    "img": "summersquash.png",
    "seeds": {
      "sell": 20,
      "pierre": 0,
      "joja": 0,
      "special": 0,
      "specialLoc": "Unpurchasable",
      "specialUrl": "https://zh.stardewvalleywiki.com/金皮西葫芦种子"
    },
    "growth": {
      "initial": 6,
      "regrow": 3
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 45,
      "jarType": "金皮西葫芦腌菜",
      "kegType": "金皮西葫芦汁"
    }
  },
  "broccoli": {
    "name": "西兰花",
    "en_name": "Broccoli",
    "url": "https://zh.stardewvalleywiki.com/西兰花",
    "urlEn": "https://stardewvalleywiki.com/Broccoli",
    "img": "broccoli.png",
    "seeds": {
      "sell": 40,
      "pierre": 0,
      "joja": 0,
      "special": 0,
      "specialLoc": "Unpurchasable",
      "specialUrl": "https://zh.stardewvalleywiki.com/西兰花种子"
    },
    "growth": {
      "initial": 8,
      "regrow": 3
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 70,
      "jarType": "西兰花腌菜",
      "kegType": "西蓝花汁"
    }
  },
  "powdermelon": {
    "name": "霜瓜",
    "en_name": "Powdermelon",
    "url": "https://zh.stardewvalleywiki.com/霜瓜",
    "urlEn": "https://stardewvalleywiki.com/Powdermelon",
    "img": "powdermelon.png",
    "seeds": {
      "sell": 20,
      "pierre": 0,
      "joja": 0,
      "special": 0,
      "specialLoc": "Unpurchasable",
      "specialUrl": "https://zh.stardewvalleywiki.com/霜瓜种子"
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 70,
      "jarType": "霜瓜果酱",
      "kegType": "霜瓜酒",
    }
  },
  "amaranth": {
    "name": "苋菜",
    "en_name": "Amaranth",
    "url": "https://zh.stardewvalleywiki.com/苋菜",
    "urlEn": "https://stardewvalleywiki.com/Amaranth",
    "img": "amaranth.png",
    "seeds": {
      "sell": 35,
      "pierre": 70,
      "joja": 87,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 150,
      "jarType": "苋菜腌菜",
      "kegType": "苋菜汁"
    }
  },
  "grape": {
    "name": "葡萄",
    "en_name": "Grape",
    "url": "https://zh.stardewvalleywiki.com/葡萄",
    "urlEn": "https://stardewvalleywiki.com/Grape",
    "img": "grape.png",
    "seeds": {
      "sell": 30,
      "pierre": 60,
      "joja": 75,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 10,
      "regrow": 3
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 80,
      "jarType": "葡萄酱",
      "kegType": "葡萄酒"
    }
  },
  "hops": {
    "name": "啤酒花",
    "en_name": "Hops",
    "url": "https://zh.stardewvalleywiki.com/啤酒花",
    "urlEn": "https://stardewvalleywiki.com/Hops",
    "img": "hops.png",
    "seeds": {
      "sell": 30,
      "pierre": 60,
      "joja": 75,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 11,
      "regrow": 1
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 25,
      "keg": 300,
      "jarType": "啤酒花腌菜",
      "kegType": "淡啤酒"
    }
  },
  "pineapple": {
    "name": "菠萝",
    "en_name": "Pineapple",
    "url": "https://zh.stardewvalleywiki.com/菠萝",
    "urlEn": "https://stardewvalleywiki.com/Pineapple",
    "img": "pineapple.png",
    "seeds": {
      "sell": 240,
      "pierre": 0,
      "joja": 0,
      "special": 400,
      "specialLoc": "姜岛商人",
      "specialUrl": "https://zh.stardewvalleywiki.com/姜岛商人"
    },
    "growth": {
      "initial": 14,
      "regrow": 7
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 300,
      "jarType": "菠萝酱",
      "kegType": "菠萝酒"
    }
  },
  "sweetgemberry": {
    "name": "宝石甜莓",
    "en_name": "Sweet Gem Berry",
    "url": "https://zh.stardewvalleywiki.com/宝石甜莓",
    "urlEn": "https://stardewvalleywiki.com/Sweet_Gem_Berry",
    "img": "sweetgemberry.png",
    "seeds": {
      "sell": 200,
      "pierre": 0,
      "joja": 0,
      "special": 1000,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 24,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 3000
    }
  },
  "tealeaves": {
    "name": "茶叶",
    "en_name": "Tea Leaves",
    "url": "https://zh.stardewvalleywiki.com/茶叶",
    "urlEn": "https://stardewvalleywiki.com/Tea_Leaves",
    "img": "tealeaves.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 2500,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 20,
      "regrow": 1
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 50,
      "keg": 100,
      "jarType": "茶叶腌菜",
      "kegType": "绿茶"
    }
  },
  "fairyrose": {
    "name": "玫瑰仙子",
    "en_name": "Fairy Rose",
    "url": "https://zh.stardewvalleywiki.com/玫瑰仙子",
    "urlEn": "https://stardewvalleywiki.com/Fairy_Rose",
    "img": "fairyrose.png",
    "seeds": {
      "sell": 100,
      "pierre": 200,
      "joja": 250,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 12,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 290
    }
  },
  "tulip": {
    "name": "郁金香",
    "en_name": "Tulip",
    "url": "https://zh.stardewvalleywiki.com/郁金香",
    "urlEn": "https://stardewvalleywiki.com/Tulip",
    "img": "tulip.png",
    "seeds": {
      "sell": 10,
      "pierre": 20,
      "joja": 25,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 6,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 30
    }
  },
  "bluejazz": {
    "name": "蓝爵士",
    "en_name": "Blue Jazz",
    "url": "https://zh.stardewvalleywiki.com/蓝爵",
    "urlEn": "https://stardewvalleywiki.com/Blue_Jazz",
    "img": "bluejazz.png",
    "seeds": {
      "sell": 15,
      "pierre": 30,
      "joja": 37,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 50
    }
  },
  "sunflower": {
    "name": "向日葵",
    "en_name": "Sunflower",
    "url": "https://zh.stardewvalleywiki.com/向日葵",
    "urlEn": "https://stardewvalleywiki.com/Sunflower",
    "img": "sunflower.png",
    "seeds": {
      "sell": 20,
      "pierre": 200,
      "joja": 125,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 8,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 80
    }
  },
  "coffeebean": {
    "name": "咖啡豆",
    "en_name": "Coffee Bean",
    "url": "https://zh.stardewvalleywiki.com/咖啡豆",
    "urlEn": "https://stardewvalleywiki.com/Coffee_Bean",
    "img": "coffeebean.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 2500,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 10,
      "regrow": 2
    },
    "produce": {
      "extra": 3,
      "extraPerc": 1,
      "price": 15,
      "keg": 150 / 5,
      "kegType": "咖啡"
    }
  },
  "poppy": {
    "name": "虞美人",
    "en_name": "Poppy",
    "url": "https://zh.stardewvalleywiki.com/虞美人",
    "urlEn": "https://stardewvalleywiki.com/Poppy",
    "img": "poppy.png",
    "seeds": {
      "sell": 50,
      "pierre": 100,
      "joja": 125,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 140
    }
  },
  "summerspangle": {
    "name": "夏季亮片",
    "en_name": "Summer Spangle",
    "url": "https://zh.stardewvalleywiki.com/夏季亮片",
    "urlEn": "https://stardewvalleywiki.com/Summer_Spangle",
    "img": "summerspangle.png",
    "seeds": {
      "sell": 25,
      "pierre": 50,
      "joja": 62,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 8,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 90
    }
  },
  "parsnip": {
    "name": "防风草",
    "en_name": "Parsnip",
    "url": "https://zh.stardewvalleywiki.com/防风草",
    "urlEn": "https://stardewvalleywiki.com/Parsnip",
    "img": "parsnip.png",
    "seeds": {
      "sell": 10,
      "pierre": 20,
      "joja": 25,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 4,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 35,
      "jarType": "防风草腌菜",
      "kegType": "防风草汁"
    }
  },
  "greenbean": {
    "name": "青豆",
    "en_name": "Green Bean",
    "url": "https://zh.stardewvalleywiki.com/青豆",
    "urlEn": "https://stardewvalleywiki.com/Green_Bean",
    "img": "greenbean.png",
    "seeds": {
      "sell": 30,
      "pierre": 60,
      "joja": 75,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 10,
      "regrow": 3
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 40,
      "jarType": "青豆腌菜",
      "kegType": "青豆汁"
    }
  },
  "cauliflower": {
    "name": "花椰菜",
    "en_name": "Cauliflower",
    "url": "https://zh.stardewvalleywiki.com/花椰菜",
    "urlEn": "https://stardewvalleywiki.com/Cauliflower",
    "img": "cauliflower.png",
    "seeds": {
      "sell": 40,
      "pierre": 80,
      "joja": 100,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 12,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 175,
      "jarType": "花椰菜腌菜",
      "kegType": "花椰菜汁"
    }
  },
  "potato": {
    "name": "土豆",
    "en_name": "Potato",
    "url": "https://zh.stardewvalleywiki.com/土豆",
    "urlEn": "https://stardewvalleywiki.com/Potato",
    "img": "potato.png",
    "seeds": {
      "sell": 25,
      "pierre": 50,
      "joja": 62,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 6,
      "regrow": 0
    },
    "produce": {
      "extra": 1,
      "extraPerc": 0.25, // technically (0.2^1) + (0.2^2) + (0.2^3) ...
      "price": 80,
      "jarType": "土豆腌菜",
      "kegType": "土豆汁"
    }
  },
  "garlic": {
    "name": "大蒜",
    "en_name": "Garlic",
    "url": "https://zh.stardewvalleywiki.com/大蒜",
    "urlEn": "https://stardewvalleywiki.com/Garlic",
    "img": "garlic.png",
    "seeds": {
      "sell": 20,
      "pierre": 40,
      "joja": 0,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 4,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 60,
      "jarType": "大蒜腌菜",
      "kegType": "大蒜汁"
    }
  },
  "taroroot": {
    "name": "芋头",
    "en_name": "Taro Root",
    "url": "https://zh.stardewvalleywiki.com/芋头",
    "urlEn": "https://stardewvalleywiki.com/Taro_Root",
    "img": "taroroot.png",
    "seeds": {
      "sell": 20,
      "pierre": 0,
      "joja": 0,
      "special": 24,
      "specialLoc": "姜岛商人",
      "specialUrl": "https://zh.stardewvalleywiki.com/姜岛商人"
    },
    "growth": {
      "initial": 10,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 100,
      "jarType": "芋头腌菜",
      "kegType": "芋头汁"
    }
  },
  "kale": {
    "name": "甘蓝",
    "en_name": "Kale",
    "url": "https://zh.stardewvalleywiki.com/甘蓝",
    "urlEn": "https://stardewvalleywiki.com/Kale",
    "img": "kale.png",
    "seeds": {
      "sell": 35,
      "pierre": 70,
      "joja": 87,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 6,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 110,
      "jarType": "甘蓝腌菜",
      "kegType": "甘蓝汁"
    }
  },
  "unmilledrice": {
    "name": "未碾米",
    "en_name": "Unmilled Rice",
    "url": "https://zh.stardewvalleywiki.com/未碾米",
    "urlEn": "https://stardewvalleywiki.com/Unmilled_Rice",
    "img": "unmilledrice.png",
    "seeds": {
      "sell": 20,
      "pierre": 40,
      "joja": 0,
      "special": 1000,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 8,
      "regrow": 0
    },
    "produce": {
      "extra": 1,
      "extraPerc": 0.11,
      "price": 30,
      "jarType": "未碾米腌菜",
      "kegType": "未碾米汁"
    }
  },
  "rhubarb": {
    "name": "大黄",
    "en_name": "Rhubarb",
    "url": "https://zh.stardewvalleywiki.com/大黄",
    "urlEn": "https://stardewvalleywiki.com/Rhubarb",
    "img": "rhubarb.png",
    "seeds": {
      "sell": 50,
      "pierre": 0,
      "joja": 0,
      "special": 100,
      "specialLoc": "绿洲",
      "specialUrl": "https://zh.stardewvalleywiki.com/Oasis"
    },
    "growth": {
      "initial": 13,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 220,
      "jarType": "大黄酱",
      "kegType": "大黄酒"
    }
  },
  "melon": {
    "name": "甜瓜",
    "en_name": "Melon",
    "url": "https://zh.stardewvalleywiki.com/甜瓜",
    "urlEn": "https://stardewvalleywiki.com/Melon",
    "img": "melon.png",
    "seeds": {
      "sell": 40,
      "pierre": 80,
      "joja": 100,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 12,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 250,
      "jarType": "甜瓜酱",
      "kegType": "甜瓜酒"
    }
  },
  "tomato": {
    "name": "西红柿",
    "en_name": "Tomato",
    "url": "https://zh.stardewvalleywiki.com/西红柿",
    "urlEn": "https://stardewvalleywiki.com/Tomato",
    "img": "tomato.png",
    "seeds": {
      "sell": 15,
      "pierre": 50,
      "joja": 62,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 11,
      "regrow": 4
    },
    "produce": {
      "extra": 1,
      "extraPerc": 0.05,
      "price": 60,
      "jarType": "西红柿腌菜",
      "kegType": "西红柿汁"
    }
  },
  "blueberry": {
    "name": "蓝莓",
    "en_name": "Blueberry",
    "url": "https://zh.stardewvalleywiki.com/蓝莓",
    "urlEn": "https://stardewvalleywiki.com/Blueberry",
    "img": "blueberry.png",
    "seeds": {
      "sell": 40,
      "pierre": 80,
      "joja": 0,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 13,
      "regrow": 4
    },
    "produce": {
      "extra": 2,
      "extraPerc": 1,
      "price": 50,
      "jarType": "蓝莓酱",
      "kegType": "蓝莓酒"
    }
  },
  "hotpepper": {
    "name": "辣椒",
    "en_name": "Hot Pepper",
    "url": "https://zh.stardewvalleywiki.com/辣椒",
    "urlEn": "https://stardewvalleywiki.com/Hot_Pepper",
    "img": "hotpepper.png",
    "seeds": {
      "sell": 20,
      "pierre": 40,
      "joja": 50,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 5,
      "regrow": 3
    },
    "produce": {
      "extra": 1,
      "extraPerc": 0.03,
      "price": 40,
      "jarType": "辣椒酱",
      "kegType": "辣椒酒"
    }
  },
  "wheat": {
    "name": "小麦",
    "en_name": "Wheat",
    "url": "https://zh.stardewvalleywiki.com/小麦",
    "urlEn": "https://stardewvalleywiki.com/Wheat",
    "img": "wheat.png",
    "seeds": {
      "sell": 5,
      "pierre": 10,
      "joja": 12,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 4,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 25,
      "keg": 200,
      "jarType": "小麦腌菜",
      "kegType": "啤酒"
    }
  },
  "radish": {
    "name": "萝卜",
    "en_name": "Radish",
    "url": "https://zh.stardewvalleywiki.com/ ",
    "urlEn": "https://stardewvalleywiki.com/Radish",
    "img": "radish.png",
    "seeds": {
      "sell": 20,
      "pierre": 40,
      "joja": 50,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 6,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 90,
      "jarType": "萝卜腌菜",
      "kegType": "萝卜汁"
    }
  },
  "redcabbage": {
    "name": "红叶卷心菜",
    "en_name": "Red Cabbage",
    "url": "https://zh.stardewvalleywiki.com/红叶卷心菜",
    "urlEn": "https://stardewvalleywiki.com/Red_Cabbage",
    "img": "redcabbage.png",
    "seeds": {
      "sell": 50,
      "pierre": 100,
      "joja": 0,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 9,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 260,
      "jarType": "红叶卷心菜腌菜",
      "kegType": "红叶卷心菜汁"
    }
  },
  "starfruit": {
    "name": "杨桃",
    "en_name": "Starfruit",
    "url": "https://zh.stardewvalleywiki.com/杨桃",
    "urlEn": "https://stardewvalleywiki.com/Starfruit",
    "img": "starfruit.png",
    "seeds": {
      "sell": 200,
      "pierre": 0,
      "joja": 0,
      "special": 400,
      "specialLoc": "绿洲",
      "specialUrl": "https://zh.stardewvalleywiki.com/Oasis"
    },
    "growth": {
      "initial": 13,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 750,
      "jarType": "杨桃酱",
      "kegType": "杨桃酒"
    }
  },
  "corn": {
    "name": "玉米",
    "en_name": "Corn",
    "url": "https://zh.stardewvalleywiki.com/玉米",
    "urlEn": "https://stardewvalleywiki.com/Corn",
    "img": "corn.png",
    "seeds": {
      "sell": 75,
      "pierre": 150,
      "joja": 187,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 14,
      "regrow": 4
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 50,
      "jarType": "玉米腌菜",
      "kegType": "玉米汁"
    }
  },
  "eggplant": {
    "name": "茄子",
    "en_name": "Eggplant",
    "url": "https://zh.stardewvalleywiki.com/茄子",
    "urlEn": "https://stardewvalleywiki.com/Eggplant",
    "img": "eggplant.png",
    "seeds": {
      "sell": 10,
      "pierre": 20,
      "joja": 25,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 5,
      "regrow": 5
    },
    "produce": {
      "extra": 1,
      "extraPerc": 0.002,
      "price": 60,
      "jarType": "茄子腌菜",
      "kegType": "茄子汁"
    }
  },
  "artichoke": {
    "name": "洋蓟",
    "en_name": "Artichoke",
    "url": "https://zh.stardewvalleywiki.com/洋蓟",
    "urlEn": "https://stardewvalleywiki.com/Artichoke",
    "img": "artichoke.png",
    "seeds": {
      "sell": 15,
      "pierre": 30,
      "joja": 0,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 8,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 160,
      "jarType": "洋蓟腌菜",
      "kegType": "洋蓟汁"
    }
  },
  "pumpkin": {
    "name": "南瓜",
    "en_name": "Pumpkin",
    "url": "https://zh.stardewvalleywiki.com/南瓜",
    "urlEn": "https://stardewvalleywiki.com/Pumpkin",
    "img": "pumpkin.png",
    "seeds": {
      "sell": 50,
      "pierre": 100,
      "joja": 125,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 13,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 320,
      "jarType": "南瓜酱",
      "kegType": "南瓜汁"
    }
  },
  "bokchoy": {
    "name": "小白菜",
    "en_name": "Bok Choy",
    "url": "https://zh.stardewvalleywiki.com/小白菜",
    "urlEn": "https://stardewvalleywiki.com/Bok_Choy",
    "img": "bokchoy.png",
    "seeds": {
      "sell": 25,
      "pierre": 50,
      "joja": 62,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 4,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 80,
      "jarType": "小白菜腌菜",
      "kegType": "小白菜汁"
    }
  },
  "yam": {
    "name": "山药",
    "en_name": "Yam",
    "url": "https://zh.stardewvalleywiki.com/山药",
    "urlEn": "https://stardewvalleywiki.com/Yam",
    "img": "yam.png",
    "seeds": {
      "sell": 30,
      "pierre": 60,
      "joja": 75,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 10,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 160,
      "jarType": "山药腌菜",
      "kegType": "山药汁"
    }
  },
  "cranberries": {
    "name": "蔓越莓",
    "en_name": "Cranberries",
    "url": "https://zh.stardewvalleywiki.com/蔓越莓",
    "urlEn": "https://stardewvalleywiki.com/Cranberries",
    "img": "cranberries.png",
    "seeds": {
      "sell": 60,
      "pierre": 240,
      "joja": 300,
      "special": 0,
      "specialLoc": "",
      "specialUrl": ""
    },
    "growth": {
      "initial": 7,
      "regrow": 5
    },
    "produce": {
      "extra": 1,
      "extraPerc": 1,
      "price": 75,
      "jarType": "蔓越莓酱",
      "kegType": "蔓越莓酒"
    }
  },
  "beet": {
    "name": "甜菜",
    "en_name": "Beet",
    "url": "https://zh.stardewvalleywiki.com/甜菜",
    "urlEn": "https://stardewvalleywiki.com/Beet",
    "img": "beet.png",
    "seeds": {
      "sell": 10,
      "pierre": 0,
      "joja": 0,
      "special": 20,
      "specialLoc": "绿洲",
      "specialUrl": "https://zh.stardewvalleywiki.com/绿洲"
    },
    "growth": {
      "initial": 6,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 100,
      "jarType": "甜菜腌菜",
      "kegType": "甜菜汁"
    }
  },
  "ancientfruit": {
    "name": "上古水果",
    "en_name": "Ancient Fruit",
    "url": "https://zh.stardewvalleywiki.com/上古水果",
    "urlEn": "https://stardewvalleywiki.com/Ancient_Fruit",
    "img": "ancientfruit.png",
    "seeds": {
      "sell": 30,
      "pierre": 0,
      "joja": 0,
      "special": 0,
      "specialLoc": "Unpurchasable",
      "specialUrl": "https://zh.stardewvalleywiki.com/Ancient_Seeds"
    },
    "growth": {
      "initial": 28,
      "regrow": 7
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 550,
      "jarType": "上古水果果酱",
      "kegType": "上古水果果酒"
    }
  },
  "cactusfruit": {
    "name": "仙人掌果子",
    "en_name": "Cactus Fruit",
    "url": "https://zh.stardewvalleywiki.com/仙人掌果子",
    "urlEn": "https://stardewvalleywiki.com/Cactus_Fruit",
    "img": "cactusfruit.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 150,
      "specialLoc": "绿洲",
      "specialUrl": "https://zh.stardewvalleywiki.com/Oasis"
    },
    "growth": {
      "initial": 12,
      "regrow": 3
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      "price": 75,
      "jarType": "仙人掌果果酱",
      "kegType": "仙人掌果果酒"
    }
  },
  "strawberry": {
    "name": "草莓",
    "en_name": "Strawberry",
    "url": "https://zh.stardewvalleywiki.com/草莓",
    "urlEn": "https://stardewvalleywiki.com/Strawberry",
    "img": "strawberry.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 100,
      "specialLoc": "复活节",
      "specialUrl": "https://zh.stardewvalleywiki.com/Egg_Festival"
    },
    "growth": {
      "initial": 8,
      "regrow": 4
    },
    "produce": {
      "extra": 1,
      "extraPerc": 0.02,
      "price": 120,
      "jarType": "草莓酱",
      "kegType": "草莓酒"
    }
  },
  "springseeds": {
    "name": "春季种子",
    "en_name": "Spring Seeds",
    "url": "https://zh.stardewvalleywiki.com/春季种子",
    "urlEn": "https://stardewvalleywiki.com/Spring_Seeds",
    "img": "springseeds.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 1000,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      // (Wild Horseradish + Daffodil + Leek + Dandelion) / 4
      "price": (50 + 30 + 60 + 40) / 4
    },
    "isWildseed": true
  },
  "summerseeds": {
    "name": "夏季种子",
    "en_name": "Summer Seeds",
    "url": "https://zh.stardewvalleywiki.com/夏季种子",
    "urlEn": "https://stardewvalleywiki.com/Summer_Seeds",
    "img": "summerseeds.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 1000,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      // (Spice Berry + Grape + Sweet Pea) / 3
      "price": (80 + 80 + 50) / 3,
      "jarType": "果酱",
      "kegType": "酒"
    },
    "isWildseed": true
  },
  "fallseeds": {
    "name": "秋季种子",
    "en_name": "Fall Seeds",
    "url": "https://zh.stardewvalleywiki.com/秋季种子",
    "urlEn": "https://stardewvalleywiki.com/Fall_Seeds",
    "img": "fallseeds.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 1000,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      // (Blackberry + Common Mushroom + Hazelnut + Wild Plum) / 4
      "price": (20 + 40 + 90 + 80) / 4,
      "jarType": "果酱",
      "kegType": "酒"
    },
    "isWildseed": true
  },
  "winterseeds": {
    "name": "冬季种子",
    "en_name": "Winter Seeds",
    "url": "https://zh.stardewvalleywiki.com/冬季种子",
    "urlEn": "https://stardewvalleywiki.com/Winter_Seeds",
    "img": "winterseeds.png",
    "seeds": {
      "sell": 0,
      "pierre": 0,
      "joja": 0,
      "special": 1000,
      "specialLoc": "旅行货车",
      "specialUrl": "https://zh.stardewvalleywiki.com/旅行货车"
    },
    "growth": {
      "initial": 7,
      "regrow": 0
    },
    "produce": {
      "extra": 0,
      "extraPerc": 0,
      // (Crocus + Crystal Fruit + Snow Yam + Winter Root) / 4
      "price": (60 + 150 + 100 + 70) / 4,
      "jarType": "果酱",
      "kegType": "酒"
    },
    "isWildseed": true
  }
};