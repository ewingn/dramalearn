import React, { useState, useEffect } from 'react';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';
import { minigameStyles, backButtonStyle } from "../styles/gameStyles.js";

// === Connections Game Corpus ===
// A corpus of 55 unique Connections puzzles.
const connectionsCorpus = [
    // Puzzle 1: Professions
    [
      { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['醫生', '老師', '學生', '廚師'] },
      { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['車', '船', '飛機', '火車'] },
      { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['蘋果', '香蕉', '橘子', '西瓜'] },
      { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '鳥', '魚'] }
    ],
    // Puzzle 2: Stationery
    [
      { "category": { 'zh-tw': '文具', 'zh-cn': '文具', 'en': 'Stationery' }, "items": ['筆', '紙', '橡皮', '尺'] },
      { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爸爸', '媽媽', '哥哥', '妹妹'] },
      { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅', '黃', '藍', '綠'] },
      { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '雲', '雪'] }
    ],
    // Puzzle 3: Musical Instruments
    [
        { "category": { 'zh-tw': '樂器', 'zh-cn': '乐器', 'en': 'Musical Instruments' }, "items": ['鋼琴', '吉他', '小提琴', '鼓'] },
        { "category": { 'zh-tw': '國家', 'zh-cn': '国家', 'en': 'Countries' }, "items": ['美國', '中國', '日本', '法國'] },
        { "category": { 'zh-tw': '運動', 'zh-cn': '运动', 'en': 'Sports' }, "items": ['籃球', '足球', '游泳', '跑步'] },
        { "category": { 'zh-tw': '學校科目', 'zh-cn': '学校科目', 'en': 'School Subjects' }, "items": ['數學', '語文', '科學', '歷史'] }
    ],
    // Puzzle 4: Household Items
    [
        { "category": { 'zh-tw': '家具', 'zh-cn': '家具', 'en': 'Household Items' }, "items": ['桌子', '椅子', '床', '燈'] },
        { "category": { 'zh-tw': '飲料', 'zh-cn': '饮料', 'en': 'Beverages' }, "items": ['水', '茶', '咖啡', '牛奶'] },
        { "category": { 'zh-tw': '數字', 'zh-cn': '数字', 'en': 'Numbers' }, "items": ['一', '二', '三', '四'] },
        { "category": { 'zh-tw': '身體部位', 'zh-cn': '身体部位', 'en': 'Body Parts' }, "items": ['頭', '手', '腳', '眼睛'] }
    ],
    // Puzzle 5: Nature
    [
        { "category": { 'zh-tw': '大自然', 'zh-cn': '大自然', 'en': 'Nature' }, "items": ['山', '河', '樹', '花'] },
        { "category": { 'zh-tw': '城市', 'zh-cn': '城市', 'en': 'Cities' }, "items": ['台北', '東京', '巴黎', '紐約'] },
        { "category": { 'zh-tw': '節日', 'zh-cn': '节日', 'en': 'Holidays' }, "items": ['春節', '中秋節', '聖誕節', '萬聖節'] },
        { "category": { 'zh-tw': '方向', 'zh-cn': '方向', 'en': 'Directions' }, "items": ['東', '南', '西', '北'] }
    ],
    // Puzzle 6: Foods
    [
        { "category": { 'zh-tw': '食物', 'zh-cn': '食物', 'en': 'Foods' }, "items": ['米飯', '麵條', '麵包', '餃子'] },
        { "category": { 'zh-tw': '季節', 'zh-cn': '季节', 'en': 'Seasons' }, "items": ['春', '夏', '秋', '冬'] },
        { "category": { 'zh-tw': '形狀', 'zh-cn': '形状', 'en': 'Shapes' }, "items": ['圓', '方', '三角', '星'] },
        { "category": { 'zh-tw': '國家首都', 'zh-cn': '国家首都', 'en': 'National Capitals' }, "items": ['北京', '華盛頓', '倫敦', '首爾'] }
    ],
    // Puzzle 7: Clothes
    [
        { "category": { 'zh-tw': '服裝', 'zh-cn': '服装', 'en': 'Clothes' }, "items": ['襯衫', '褲子', '裙子', '外套'] },
        { "category": { 'zh-tw': '廚房用具', 'zh-cn': '厨房用具', 'en': 'Kitchen Utensils' }, "items": ['碗', '盤', '筷子', '勺子'] },
        { "category": { 'zh-tw': '電腦部件', 'zh-cn': '电脑部件', 'en': 'Computer Parts' }, "items": ['鍵盤', '滑鼠', '螢幕', '主機'] },
        { "category": { 'zh-tw': '自然災害', 'zh-cn': '自然灾害', 'en': 'Natural Disasters' }, "items": ['地震', '颱風', '洪水', '海嘯'] }
    ],
    // Puzzle 8: Planets
    [
        { "category": { 'zh-tw': '行星', 'zh-cn': '行星', 'en': 'Planaets' }, "items": ['地球', '火星', '月亮', '太陽'] },
        { "category": { 'zh-tw': '調味品', 'zh-cn': '调味品', 'en': 'Condiments' }, "items": ['鹽', '糖', '醋', '醬油'] },
        { "category": { 'zh-tw': '節肢動物', 'zh-cn': '节肢动物', 'en': 'Arthropods' }, "items": ['蜘蛛', '蜜蜂', '蝦', '螃蟹'] },
        { "category": { 'zh-tw': '建築物', 'zh-cn': '建筑物', 'en': 'Buildings' }, "items": ['學校', '醫院', '圖書館', '銀行'] }
    ],
    // Puzzle 9: Household Appliances
    [
        { "category": { 'zh-tw': '家電', 'zh-cn': '家电', 'en': 'Household Appliances' }, "items": ['電視', '冰箱', '洗衣機', '冷氣機'] },
        { "category": { 'zh-tw': '鳥類', 'zh-cn': '鸟类', 'en': 'Birds' }, "items": ['麻雀', '鴿子', '老鷹', '企鵝'] },
        { "category": { 'zh-tw': '海洋生物', 'zh-cn': '海洋生物', 'en': 'Marine Life' }, "items": ['鯨魚', '鯊魚', '海豚', '水母'] },
        { "category": { 'zh-tw': '文藝復興時期人物', 'zh-cn': '文艺复兴时期人物', 'en': 'Renaissance Figures' }, "items": ['達文西', '米開朗基羅', '拉斐爾', '莫內'] }
    ],
    // Puzzle 10: Human Emotions
    [
        { "category": { 'zh-tw': '情感', 'zh-cn': '情感', 'en': 'Human Emotions' }, "items": ['快樂', '悲傷', '生氣', '驚訝'] },
        { "category": { 'zh-tw': '運動器材', 'zh-cn': '运动器材', 'en': 'Sports Equipment' }, "items": ['球', '拍', '網', '棒'] },
        { "category": { 'zh-tw': '蔬菜', 'zh-cn': '蔬菜', 'en': 'Vegetables' }, "items": ['白菜', '蘿蔔', '番茄', '馬鈴薯'] },
        { "category": { 'zh-tw': '天文現象', 'zh-cn': '天文现象', 'en': 'Astronomical Phenomena' }, "items": ['流星', '彗星', '日蝕', '月蝕'] }
    ],
    // Puzzle 11: Kitchen Utensils
    [
        { "category": { 'zh-tw': '餐具', 'zh-cn': '餐具', 'en': 'Tableware' }, "items": ['湯匙', '叉子', '刀', '碗'] },
        { "category": { 'zh-tw': '地理名詞', 'zh-cn': '地理名词', 'en': 'Geographical Terms' }, "items": ['海洋', '大陸', '島嶼', '山脈'] },
        { "category": { 'zh-tw': '音樂類型', 'zh-cn': '音乐类型', 'en': 'Music Genres' }, "items": ['流行', '搖滾', '古典', '爵士'] },
        { "category": { 'zh-tw': '體育項目', 'zh-cn': '体育项目', 'en': 'Sports' }, "items": ['排球', '羽毛球', '乒乓球', '網球'] }
    ],
    // Puzzle 12: Superheroes
    [
        { "category": { 'zh-tw': '超級英雄', 'zh-cn': '超级英雄', 'en': 'Superheroes' }, "items": ['蝙蝠俠', '超人', '蜘蛛人', '鋼鐵人'] },
        { "category": { 'zh-tw': '工具', 'zh-cn': '工具', 'en': 'Tools' }, "items": ['錘子', '螺絲刀', '扳手', '鋸子'] },
        { "category": { 'zh-tw': '天氣現象', 'zh-cn': '天气现象', 'en': 'Weather Phenomena' }, "items": ['閃電', '雷', '風', '雨'] },
        { "category": { 'zh-tw': '學校設施', 'zh-cn': '学校设施', 'en': 'School Facilities' }, "items": ['教室', '操場', '圖書館', '食堂'] }
    ],
    // Puzzle 13: Time Units
    [
        { "category": { 'zh-tw': '時間單位', 'zh-cn': '时间单位', 'en': 'Units of Time' }, "items": ['秒', '分', '小時', '天'] },
        { "category": { 'zh-tw': '建築材料', 'zh-cn': '建筑材料', 'en': 'Building Materials' }, "items": ['木頭', '石頭', '磚', '水泥'] },
        { "category": { 'zh-tw': '交通標誌', 'zh-cn': '交通标志', 'en': 'Traffic Signs' }, "items": ['紅燈', '黃燈', '綠燈', '斑馬線'] },
        { "category": { 'zh-tw': '身體感官', 'zh-cn': '身体感官', 'en': 'Body Senses' }, "items": ['視', '聽', '嗅', '味'] }
    ],
    // Puzzle 14: Famous Landmarks
    [
        { "category": { 'zh-tw': '著名地標', 'zh-cn': '著名地标', 'en': 'Famous Landmarks' }, "items": ['自由女神像', '艾菲爾鐵塔', '大笨鐘', '金字塔'] },
        { "category": { 'zh-tw': '飲料', 'zh-cn': '饮料', 'en': 'Drinks' }, "items": ['可樂', '汽水', '果汁', '啤酒'] },
        { "category": { 'zh-tw': '昆蟲', 'zh-cn': '昆虫', 'en': 'Insects' }, "items": ['蝴蝶', '螞蟻', '蚊子', '蒼蠅'] },
        { "category": { 'zh-tw': '情緒', 'zh-cn': '情绪', 'en': 'Emotions' }, "items": ['高興', '難過', '害怕', '驚訝'] }
    ],
    // Puzzle 15: School Supplies
    [
        { "category": { 'zh-tw': '學習用品', 'zh-cn': '学习用品', 'en': 'School Supplies' }, "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": { 'zh-tw': '運動場地', 'zh-cn': '运动场地', 'en': 'Sports Venues' }, "items": ['球場', '跑道', '泳池', '健身房'] },
        { "category": { 'zh-tw': '家庭電器', 'zh-cn': '家庭电器', 'en': 'Home Appliances' }, "items": ['微波爐', '烤箱', '吸塵器', '吹風機'] },
        { "category": { 'zh-tw': '國家首都', 'zh-cn': '国家首都', 'en': 'National Capitals' }, "items": ['台北', '東京', '北京', '首爾'] }
    ],
    // Puzzle 16: Office Supplies
    [
        { "category": { 'zh-tw': '辦公用品', 'zh-cn': '办公用品', 'en': 'Office Supplies' }, "items": ['訂書機', '迴紋針', '剪刀', '膠水'] },
        { "category": { 'zh-tw': '陸地動物', 'zh-cn': '陆地动物', 'en': 'Land Animals' }, "items": ['獅子', '老虎', '大象', '長頸鹿'] },
        { "category": { 'zh-tw': '日常用品', 'zh-cn': '日常用品', 'en': 'Daily Necessities' }, "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": { 'zh-tw': '樂器', 'zh-cn': '乐器', 'en': 'Musical Instruments' }, "items": ['吉他', '鋼琴', '小提琴', '鼓'] }
    ],
    // Puzzle 17: Grains
    [
        { "category": { 'zh-tw': '穀物', 'zh-cn': '谷物', 'en': 'Grains' }, "items": ['米', '麥', '玉米', '豆'] },
        { "category": { 'zh-tw': '常見菜餚', 'zh-cn': '常见菜肴', 'en': 'Common Dishes' }, "items": ['炒飯', '牛肉麵', '水餃', '滷肉飯'] },
        { "category": { 'zh-tw': '學校活動', 'zh-cn': '学校活动', 'en': 'School Activities' }, "items": ['考試', '上課', '放學', '作業'] },
        { "category": { 'zh-tw': '身體部位', 'zh-cn': '身体部位', 'en': 'Body Parts' }, "items": ['頭', '手', '腳', '眼睛'] }
    ],
    // Puzzle 18: Kitchen Spices
    [
        { "category": { 'zh-tw': '香料', 'zh-cn': '香料', 'en': 'Spices' }, "items": ['胡椒', '辣椒', '肉桂', '薑'] },
        { "category": { 'zh-tw': '日常行為', 'zh-cn': '日常行为', 'en': 'Daily Actions' }, "items": ['走', '跑', '跳', '睡'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Modes of Transport' }, "items": ['腳踏車', '摩托車', '公車', '捷運'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ],
    // Puzzle 19: Feelings
    [
        { "category": { 'zh-tw': '感覺', 'zh-cn': '感觉', 'en': 'Feelings' }, "items": ['餓', '渴', '累', '痛'] },
        { "category": { 'zh-tw': '文具', 'zh-cn': '文具', 'en': 'Stationery' }, "items": ['鉛筆', '原子筆', '馬克筆', '螢光筆'] },
        { "category": { 'zh-tw': '人體器官', 'zh-cn': '人体器官', 'en': 'Body Organs' }, "items": ['心', '肺', '肝', '腎'] },
        { "category": { 'zh-tw': '家電', 'zh-cn': '家电', 'en': 'Home Appliances' }, "items": ['電鍋', '烤箱', '微波爐', '熱水壺'] }
    ],
    // Puzzle 20: School Places
    [
        { "category": { 'zh-tw': '校園地點', 'zh-cn': '校园地点', 'en': 'School Places' }, "items": ['教室', '操場', '圖書館', '體育館'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['草莓', '葡萄', '鳳梨', '芒果'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['熊貓', '猴子', '長頸鹿', '斑馬'] },
        { "category": { 'zh-tw': '服飾', 'zh-cn': '服饰', 'en': 'Apparel' }, "items": ['帽子', '鞋子', '襪子', '手套'] }
    ],
    // Puzzle 21: Common Chinese Surnames
    [
        { "category": { 'zh-tw': '常見姓氏', 'zh-cn': '常见姓氏', 'en': 'Common Surnames' }, "items": ['王', '李', '張', '陳'] },
        { "category": { 'zh-tw': '電腦品牌', 'zh-cn': '电脑品牌', 'en': 'Computer Brands' }, "items": ['蘋果', '微軟', '谷歌', '臉書'] },
        { "category": { 'zh-tw': '球類運動', 'zh-cn': '球类运动', 'en': 'Ball Sports' }, "items": ['籃球', '足球', '排球', '棒球'] },
        { "category": { 'zh-tw': '建築物', 'zh-cn': '建筑物', 'en': 'Buildings' }, "items": ['學校', '醫院', '飯店', '超市'] }
    ],
    // Puzzle 22: Traditional Chinese Festivals
    [
        { "category": { 'zh-tw': '中國傳統節日', 'zh-cn': '中国传统节日', 'en': 'Traditional Chinese Festivals' }, "items": ['春節', '中秋節', '清明節', '端午節'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['汽車', '機車', '火車', '腳踏車'] },
        { "category": { 'zh-tw': '自然現象', 'zh-cn': '自然现象', 'en': 'Natural Phenomena' }, "items": ['彩虹', '閃電', '地震', '颱風'] },
        { "category": { 'zh-tw': '常見蔬菜', 'zh-cn': '常见蔬菜', 'en': 'Common Vegetables' }, "items": ['高麗菜', '空心菜', '菠菜', '青江菜'] }
    ],
    // Puzzle 23: Human Body Senses
    [
        { "category": { 'zh-tw': '人體感官', 'zh-cn': '人体感官', 'en': 'Human Senses' }, "items": ['視', '聽', '嗅', '味'] },
        { "category": { 'zh-tw': '文具', 'zh-cn': '文具', 'en': 'Stationery' }, "items": ['橡皮擦', '修正帶', '膠帶', '剪刀'] },
        { "category": { 'zh-tw': '時間單位', 'zh-cn': '时间单位', 'en': 'Units of Time' }, "items": ['分鐘', '小時', '天', '週'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['祖父', '祖母', '叔叔', '阿姨'] }
    ],
    // Puzzle 24: Common Chinese Verbs
    [
        { "category": { 'zh-tw': '動詞', 'zh-cn': '动词', 'en': 'Verbs' }, "items": ['吃', '喝', '玩', '睡'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅色', '藍色', '黃色', '綠色'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴天', '陰天', '雨天', '雪天'] }
    ],
    // Puzzle 25: Office Items
    [
        { "category": { 'zh-tw': '辦公室用品', 'zh-cn': '办公室用品', 'en': 'Office Items' }, "items": ['筆', '紙', '電話', '電腦'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['老虎', '獅子', '大象', '熊貓'] },
        { "category": { 'zh-tw': '常見飲料', 'zh-cn': '常见饮料', 'en': 'Common Drinks' }, "items": ['水', '果汁', '茶', '咖啡'] },
        { "category": { 'zh-tw': '節日', 'zh-cn': '节日', 'en': 'Holidays' }, "items": ['聖誕節', '萬聖節', '新年', '感恩節'] }
    ],
    // Puzzle 26: School Subjects
    [
        { "category": { 'zh-tw': '學校科目', 'zh-cn': '学校科目', 'en': 'School Subjects' }, "items": ['數學', '英文', '歷史', '地理'] },
        { "category": { 'zh-tw': '廚具', 'zh-cn': '厨具', 'en': 'Kitchenware' }, "items": ['鍋子', '平底鍋', '菜刀', '鏟子'] },
        { "category": { 'zh-tw': '交通標誌', 'zh-cn': '交通标志', 'en': 'Traffic Signs' }, "items": ['停車', '禁止', '慢行', '注意'] },
        { "category": { 'zh-tw': '國家', 'zh-cn': '国家', 'en': 'Countries' }, "items": ['美國', '英國', '法國', '德國'] }
    ],
    // Puzzle 27: Body Parts
    [
        { "category": { 'zh-tw': '身體部位', 'zh-cn': '身体部位', 'en': 'Body Parts' }, "items": ['頭', '肩膀', '膝蓋', '腳趾'] },
        { "category": { 'zh-tw': '運動', 'zh-cn': '运动', 'en': 'Sports' }, "items": ['跑步', '游泳', '跳高', '跳遠'] },
        { "category": { 'zh-tw': '節日', 'zh-cn': '节日', 'en': 'Holidays' }, "items": ['新年', '元宵節', '清明節', '端午節'] },
        { "category": { 'zh-tw': '家具', 'zh-cn': '家具', 'en': 'Furniture' }, "items": ['沙發', '椅子', '桌子', '櫃子'] }
    ],
    // Puzzle 28: Common Adjectives
    [
        { "category": { 'zh-tw': '形容詞', 'zh-cn': '形容词', 'en': 'Adjectives' }, "items": ['高', '矮', '胖', '瘦'] },
        { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['律師', '醫生', '工程師', '老師'] },
        { "category": { 'zh-tw': '樂器', 'zh-cn': '乐器', 'en': 'Musical Instruments' }, "items": ['鋼琴', '小提琴', '長笛', '薩克斯風'] },
        { "category": { 'zh-tw': '昆蟲', 'zh-cn': '昆虫', 'en': 'Insects' }, "items": ['螞蟻', '蜜蜂', '蝴蝶', '蜻蜓'] }
    ],
    // Puzzle 29: Daily Necessities
    [
        { "category": { 'zh-tw': '日常用品', 'zh-cn': '日常用品', 'en': 'Daily Necessities' }, "items": ['牙膏', '牙刷', '毛巾', '肥皂'] },
        { "category": { 'zh-tw': '蔬菜', 'zh-cn': '蔬菜', 'en': 'Vegetables' }, "items": ['白菜', '蘿蔔', '馬鈴薯', '洋蔥'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '風', '雪'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['巴士', '計程車', '捷運', '飛機'] }
    ],
    // Puzzle 30: Common Objects
    [
        { "category": { 'zh-tw': '常見物品', 'zh-cn': '常见物品', 'en': 'Common Objects' }, "items": ['手機', '錢包', '鑰匙', '手錶'] },
        { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅色', '綠色', '藍色', '紫色'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '兔子', '鳥'] },
        { "category": { 'zh-tw': '廚房用具', 'zh-cn': '厨房用具', 'en': 'Kitchen Tools' }, "items": ['鍋', '碗', '瓢', '盆'] }
    ],
    // Puzzle 31: Famous Buildings
    [
        { "category": { 'zh-tw': '著名建築', 'zh-cn': '著名建筑', 'en': 'Famous Buildings' }, "items": ['故宮', '長城', '天壇', '兵馬俑'] },
        { "category": { 'zh-tw': '學習用品', 'zh-cn': '学习用品', 'en': 'School Supplies' }, "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": { 'zh-tw': '運動', 'zh-cn': '运动', 'en': 'Sports' }, "items": ['籃球', '足球', '排球', '網球'] },
        { "category": { 'zh-tw': '人體器官', 'zh-cn': '人体器官', 'en': 'Body Organs' }, "items": ['心臟', '肺', '肝臟', '腎臟'] }
    ],
    // Puzzle 32: Common Chinese Foods
    [
        { "category": { 'zh-tw': '中式食物', 'zh-cn': '中式食物', 'en': 'Chinese Foods' }, "items": ['小籠包', '牛肉麵', '水餃', '炒飯'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴朗', '多雲', '下雨', '下雪'] },
        { "category": '文具', "items": ['筆', '尺', '橡皮擦', '修正液'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爺爺', '奶奶', '爸爸', '媽媽'] }
    ],
    // Puzzle 33: Common Verbs
    [
        { "category": { 'zh-tw': '動詞', 'zh-cn': '动词', 'en': 'Verbs' }, "items": ['看', '聽', '說', '寫'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['汽車', '火車', '飛機', '船'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅色', '藍色', '黃色', '綠色'] }
    ],
    // Puzzle 34: Common Nouns
    [
        { "category": { 'zh-tw': '名詞', 'zh-cn': '名词', 'en': 'Nouns' }, "items": ['書', '筆', '桌子', '椅子'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '鳥', '魚'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '風', '雪'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 35: Common Objects
    [
        { "category": { 'zh-tw': '生活用品', 'zh-cn': '生活用品', 'en': 'Daily Items' }, "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['醫生', '老師', '律師', '工程師'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['葡萄', '香蕉', '蘋果', '橘子'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ],
    // Puzzle 36: Common Verbs
    [
        { "category": { 'zh-tw': '動詞', 'zh-cn': '动词', 'en': 'Verbs' }, "items": ['吃', '喝', '跑', '跳'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['汽車', '公車', '捷運', '腳踏車'] },
        { "category": { 'zh-tw': '學校科目', 'zh-cn': '学校科目', 'en': 'School Subjects' }, "items": ['數學', '英文', '科學', '歷史'] },
        { "category": { 'zh-tw': '身體部位', 'zh-cn': '身体部位', 'en': ['頭', '手', '腳', '眼睛'] } }
    ],
    // Puzzle 37: Common Nouns
    [
        { "category": { 'zh-tw': '名詞', 'zh-cn': '名词', 'en': 'Nouns' }, "items": ['書', '筆', '紙', '橡皮'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '兔子', '魚'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '雲', '雪'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 38: Common Adjectives
    [
        { "category": { 'zh-tw': '形容詞', 'zh-cn': '形容词', 'en': 'Adjectives' }, "items": ['高', '矮', '胖', '瘦'] },
        { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['律師', '醫生', '工程師', '老師'] },
        { "category": { 'zh-tw': '樂器', 'zh-cn': '乐器', 'en': 'Musical Instruments' }, "items": ['鋼琴', '小提琴', '長笛', '薩克斯風'] },
        { "category": { 'zh-tw': '昆蟲', 'zh-cn': '昆虫', 'en': 'Insects' }, "items": ['螞蟻', '蜜蜂', '蝴蝶', '蜻蜓'] }
    ],
    // Puzzle 39: Daily Necessities
    [
        { "category": { 'zh-tw': '日常用品', 'zh-cn': '日常用品', 'en': 'Daily Necessities' }, "items": ['牙膏', '牙刷', '毛巾', '肥皂'] },
        { "category": { 'zh-tw': '蔬菜', 'zh-cn': '蔬菜', 'en': 'Vegetables' }, "items": ['白菜', '蘿蔔', '馬鈴薯', '洋蔥'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '風', '雪'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['巴士', '計程車', '捷運', '飛機'] }
    ],
    // Puzzle 40: Common Objects
    [
        { "category": { 'zh-tw': '常見物品', 'zh-cn': '常见物品', 'en': 'Common Objects' }, "items": ['手機', '錢包', '鑰匙', '手錶'] },
        { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅色', '綠色', '藍色', '紫色'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '兔子', '鳥'] },
        { "category": { 'zh-tw': '廚房用具', 'zh-cn': '厨房用具', 'en': 'Kitchen Tools' }, "items": ['鍋', '碗', '瓢', '盆'] }
    ],
    // Puzzle 41: Famous Buildings
    [
        { "category": { 'zh-tw': '著名建築', 'zh-cn': '著名建筑', 'en': 'Famous Buildings' }, "items": ['故宮', '長城', '天壇', '兵馬俑'] },
        { "category": { 'zh-tw': '學習用品', 'zh-cn': '学习用品', 'en': 'School Supplies' }, "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": { 'zh-tw': '運動', 'zh-cn': '运动', 'en': 'Sports' }, "items": ['籃球', '足球', '排球', '網球'] },
        { "category": { 'zh-tw': '人體器官', 'zh-cn': '人体器官', 'en': 'Body Organs' }, "items": ['心臟', '肺', '肝臟', '腎臟'] }
    ],
    // Puzzle 42: Common Chinese Foods
    [
        { "category": { 'zh-tw': '中式食物', 'zh-cn': '中式食物', 'en': 'Chinese Foods' }, "items": ['小籠包', '牛肉麵', '水餃', '炒飯'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴朗', '多雲', '下雨', '下雪'] },
        { "category": { 'zh-tw': '文具', 'zh-cn': '文具', 'en': 'Stationery' }, "items": ['筆', '尺', '橡皮擦', '修正液'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爺爺', '奶奶', '爸爸', '媽媽'] }
    ],
    // Puzzle 43: Common Verbs
    [
        { "category": { 'zh-tw': '動詞', 'zh-cn': '动词', 'en': 'Verbs' }, "items": ['看', '聽', '說', '寫'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['汽車', '火車', '飛機', '船'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅色', '藍色', '黃色', '綠色'] }
    ],
    // Puzzle 44: Common Nouns
    [
        { "category": { 'zh-tw': '名詞', 'zh-cn': '名词', 'en': 'Nouns' }, "items": ['書', '筆', '桌子', '椅子'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '鳥', '魚'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '風', '雪'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 45: Common Objects
    [
        { "category": { 'zh-tw': '生活用品', 'zh-cn': '生活用品', 'en': 'Daily Items' }, "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['醫生', '老師', '律師', '工程師'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['葡萄', '香蕉', '蘋果', '橘子'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ],
    // Puzzle 46: Common Verbs
    [
        { "category": { 'zh-tw': '動詞', 'zh-cn': '动词', 'en': 'Verbs' }, "items": ['吃', '喝', '跑', '跳'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['汽車', '公車', '捷運', '腳踏車'] },
        { "category": { 'zh-tw': '學校科目', 'zh-cn': '学校科目', 'en': 'School Subjects' }, "items": ['數學', '英文', '科學', '歷史'] },
        { "category": { 'zh-tw': '身體部位', 'zh-cn': '身体部位', 'en': ['頭', '手', '腳', '眼睛'] } }
    ],
    // Puzzle 47: Common Nouns
    [
        { "category": { 'zh-tw': '名詞', 'zh-cn': '名词', 'en': 'Nouns' }, "items": ['書', '筆', '紙', '橡皮'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '兔子', '魚'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '雲', '雪'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 48: Common Adjectives
    [
        { "category": { 'zh-tw': '形容詞', 'zh-cn': '形容词', 'en': 'Adjectives' }, "items": ['高', '矮', '胖', '瘦'] },
        { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['律師', '醫生', '工程師', '老師'] },
        { "category": { 'zh-tw': '樂器', 'zh-cn': '乐器', 'en': 'Musical Instruments' }, "items": ['鋼琴', '小提琴', '長笛', '薩克斯風'] },
        { "category": { 'zh-tw': '昆蟲', 'zh-cn': '昆虫', 'en': 'Insects' }, "items": ['螞蟻', '蜜蜂', '蝴蝶', '蜻蜓'] }
    ],
    // Puzzle 49: Daily Necessities
    [
        { "category": { 'zh-tw': '日常用品', 'zh-cn': '日常用品', 'en': 'Daily Necessities' }, "items": ['牙膏', '牙刷', '毛巾', '肥皂'] },
        { "category": { 'zh-tw': '蔬菜', 'zh-cn': '蔬菜', 'en': 'Vegetables' }, "items": ['白菜', '蘿蔔', '馬鈴薯', '洋蔥'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '風', '雪'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['巴士', '計程車', '捷運', '飛機'] }
    ],
    // Puzzle 50: Common Objects
    [
        { "category": { 'zh-tw': '常見物品', 'zh-cn': '常见物品', 'en': 'Common Objects' }, "items": ['手機', '錢包', '鑰匙', '手錶'] },
        { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅色', '綠色', '藍色', '紫色'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '兔子', '鳥'] },
        { "category": { 'zh-tw': '廚房用具', 'zh-cn': '厨房用具', 'en': 'Kitchen Tools' }, "items": ['鍋', '碗', '瓢', '盆'] }
    ],
    // Puzzle 51: Famous Buildings
    [
        { "category": { 'zh-tw': '著名建築', 'zh-cn': '著名建筑', 'en': 'Famous Buildings' }, "items": ['故宮', '長城', '天壇', '兵馬俑'] },
        { "category": { 'zh-tw': '學習用品', 'zh-cn': '学习用品', 'en': 'School Supplies' }, "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": { 'zh-tw': '運動', 'zh-cn': '运动', 'en': 'Sports' }, "items": ['籃球', '足球', '排球', '網球'] },
        { "category": { 'zh-tw': '人體器官', 'zh-cn': '人体器官', 'en': 'Body Organs' }, "items": ['心臟', '肺', '肝臟', '腎臟'] }
    ],
    // Puzzle 52: Common Chinese Foods
    [
        { "category": { 'zh-tw': '中式食物', 'zh-cn': '中式食物', 'en': 'Chinese Foods' }, "items": ['小籠包', '牛肉麵', '水餃', '炒飯'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴朗', '多雲', '下雨', '下雪'] },
        { "category": { 'zh-tw': '文具', 'zh-cn': '文具', 'en': 'Stationery' }, "items": ['筆', '尺', '橡皮擦', '修正液'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爺爺', '奶奶', '爸爸', '媽媽'] }
    ],
    // Puzzle 53: Common Verbs
    [
        { "category": { 'zh-tw': '動詞', 'zh-cn': '动词', 'en': 'Verbs' }, "items": ['看', '聽', '說', '寫'] },
        { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['汽車', '火車', '飛機', '船'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": { 'zh-tw': '顏色', 'zh-cn': '颜色', 'en': 'Colors' }, "items": ['紅色', '藍色', '黃色', '綠色'] }
    ],
    // Puzzle 54: Common Nouns
    [
        { "category": { 'zh-tw': '名詞', 'zh-cn': '名词', 'en': 'Nouns' }, "items": ['書', '筆', '桌子', '椅子'] },
        { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '鳥', '魚'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴', '雨', '風', '雪'] },
        { "category": { 'zh-tw': '家庭成員', 'zh-cn': '家庭成员', 'en': 'Family Members' }, "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 55: Common Objects
    [
        { "category": { 'zh-tw': '生活用品', 'zh-cn': '生活用品', 'en': 'Daily Items' }, "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['醫生', '老師', '律師', '工程師'] },
        { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['葡萄', '香蕉', '蘋果', '橘子'] },
        { "category": { 'zh-tw': '天氣', 'zh-cn': '天气', 'en': 'Weather' }, "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ]
];

// Note Writing Minigame
const NoteWritingGame = ({ gameActive, t, onComplete, setGameStats }) => {
  const [noteContent, setNoteContent] = useState('');
  const handleSubmit = () => {
    const hasGoodLength = noteContent.length >= 15 && noteContent.length <= 60;
    const hasNoKeywords = !noteContent.includes('考試') && !noteContent.includes('老師') && 
                         !noteContent.includes('考试') && !noteContent.includes('老师') &&
                         !noteContent.includes('exam') && !noteContent.includes('teacher');
    const success = hasGoodLength && hasNoKeywords;
    const points = success ? 100 : 20;
    
    setGameStats(prev => ({ ...prev, notesExchanged: prev.notesExchanged + 1 }));
    onComplete(success, points, success ? 
      t({ 'zh-tw': '她偷偷笑了，看起來很開心！', 'zh-cn': '她偷偷笑了，看起来很开心！', 'en': 'She smiled secretly and looks happy!' }) :
      t({ 'zh-tw': '老師發現了，沒收了紙條...', 'zh-cn': '老师发现了，没收了纸条...', 'en': 'Teacher noticed and confiscated the note...' })
    );
  };

  return (
    <div style={minigameStyles.container}>
      <h3>{t({ 'zh-tw': '📝 寫紙條給心儀的人', 'zh-cn': '📝 写纸条给心仪的人', 'en': '📝 Write a Note to Your Crush' })}</h3>
      <div style={minigameStyles.hint}>
        {t({ 'zh-tw': '💡 提示：寫15-60字，避免提到考試或老師！要表達真誠的情感', 'zh-cn': '💡 提示：写15-60字，避免提到考试或老师！要表达真诚的情感', 'en': '💡 Hint: Write 15-60 characters, avoid mentioning exams or teachers! Express genuine feelings' })}
      </div>
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder={t({ 'zh-tw': '寫下你想對她/他說的話...例如：你今天很漂亮，想和你一起吃午餐', 'zh-cn': '写下你想对她/他说的话...例如：你今天很漂亮，想和你一起吃午餐', 'en': 'Write what you want to say to her/him...e.g.: You look beautiful today, want to have lunch together?' })}
        disabled={!gameActive}
        style={minigameStyles.textarea}
      />
      <div style={minigameStyles.noteStats}>
        <span style={{color: noteContent.length < 15 ? '#f44336' : noteContent.length > 60 ? '#ff9800' : '#4caf50'}}>
          {t({ 'zh-tw': '字數', 'zh-cn': '字数', 'en': 'Characters' })}: {noteContent.length}/60
        </span>
      </div>
      <button 
        onClick={handleSubmit} 
        disabled={!gameActive || noteContent.length === 0}
        style={minigameStyles.submitButton}
      >
        {t({ 'zh-tw': '📝 偷偷傳紙條', 'zh-cn': '📝 偷偷传纸条', 'en': '📝 Pass Note Secretly' })}
      </button>
    </div>
  );
};

// Voice Chat Minigame
const VoiceChatGame = ({ gameActive, currentLanguage, t, userInput, setUserInput, isRecording, setIsRecording, chatHistory, setChatHistory, onComplete }) => {
    // Speech Recognition
    const startVoiceInput = () => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert(t({ 'zh-tw': '您的瀏覽器不支援語音輸入', 'zh-cn': '您的浏览器不支持语音输入', 'en': 'Your browser doesn\'t support voice input' }));
        return;
      }
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = currentLanguage === 'zh-tw' ? 'zh-TW' : currentLanguage === 'zh-cn' ? 'zh-CN' : 'en-US';
      recognition.interimResults = false;
      setIsRecording(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsRecording(false);
      };
      recognition.onerror = () => {
        setIsRecording(false);
        alert(t({ 'zh-tw': '語音輸入失敗', 'zh-cn': '语音输入失败', 'en': 'Voice input failed' }));
      };
      recognition.onend = () => setIsRecording(false);
    };

    // AI Response Generator
    const generateAIResponse = (userMessage) => {
        const responses = {
            positive: [
                { 'zh-tw': '真的嗎？你好有趣呢！', 'zh-cn': '真的吗？你好有趣呢！', 'en': 'Really? You\'re so interesting!' },
                { 'zh-tw': '哈哈，你總是能讓我笑', 'zh-cn': '哈哈，你总是能让我笑', 'en': 'Haha, you always make me laugh' },
                { 'zh-tw': '你說話好幽默', 'zh-cn': '你说话好幽默', 'en': 'You\'re so funny when you talk' },
                { 'zh-tw': '我也這麼想！', 'zh-cn': '我也这么想！', 'en': 'I think so too!' }
            ],
            neutral: [
                { 'zh-tw': '這樣啊...', 'zh-cn': '这样啊...', 'en': 'I see...' },
                { 'zh-tw': '嗯嗯，然後呢？', 'zh-cn': '嗯嗯，然后呢？', 'en': 'Mm-hmm, and then?' },
                { 'zh-tw': '你覺得呢？', 'zh-cn': '你觉得呢？', 'en': 'What do you think?' },
                { 'zh-tw': '聽起來很有趣！', 'zh-cn': '听起来很有趣！', 'en': 'Sounds interesting!' }
            ],
            shy: [
                { 'zh-tw': '你...你幹嘛這樣說', 'zh-cn': '你...你干嘛这样说', 'en': 'Why... why do you say that' },
                { 'zh-tw': '臉紅了啦...', 'zh-cn': '脸红了啦...', 'en': 'I\'m blushing...' },
                { 'zh-tw': '你真的這麼覺得嗎？', 'zh-cn': '你真的这么觉得吗？', 'en': 'Do you really think so?' }
            ]
        };
        let responseType = 'neutral';
        if (userMessage.length > 20 && (userMessage.includes('喜歡') || userMessage.includes('漂亮') || userMessage.includes('可愛'))) {
            responseType = 'shy';
        } else if (userMessage.length > 15 && (userMessage.includes('?') || userMessage.includes('？'))) {
            responseType = 'positive';
        }
        const responseArray = responses[responseType];
        const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
        return t(randomResponse);
    };

    const handleSendMessage = () => {
      if (!userInput.trim()) return;
      
      const newMessage = {
        id: Date.now(),
        sender: 'player',
        content: userInput,
        isVoice: false,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, newMessage]);
      
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          sender: 'crush',
          content: generateAIResponse(userInput),
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);
      
      const messageValue = userInput;
      setUserInput('');
      
      const hasQuestion = messageValue.includes('?') || messageValue.includes('？') || 
                         messageValue.includes('嗎') || messageValue.includes('吗') ||
                         messageValue.includes('呢') || messageValue.includes('how') || 
                         messageValue.includes('what') || messageValue.includes('why');
      const goodLength = messageValue.length > 8 && messageValue.length < 80;
      const hasCompliment = messageValue.includes('漂亮') || messageValue.includes('可愛') || 
                           messageValue.includes('聰明') || messageValue.includes('beautiful') || 
                           messageValue.includes('cute') || messageValue.includes('smart');
      
      const success = (hasQuestion && goodLength) || hasCompliment;
      
      setTimeout(() => {
        onComplete(success, success ? 120 : 80, success ? 
          t({ 'zh-tw': '對話很愉快，你們越聊越投機！', 'zh-cn': '对话很愉快，你们越聊越投机！', 'en': 'Great conversation, you\'re getting along well!' }) :
          t({ 'zh-tw': '對話還不錯，但還能更好！試著問她問題或給予讚美', 'zh-cn': '对话还不错，但还能更好！试着问她问题或给予赞美', 'en': 'The conversation was okay, but could be better! Try asking questions or giving compliments' })
        );
      }, 3000);
    };

    return (
      <div style={minigameStyles.container}>
        <h3>{t({ 'zh-tw': '💬 對話時間', 'zh-cn': '💬 对话时间', 'en': '💬 Chat Time' })}</h3>
        <div style={minigameStyles.hint}>
          {t({ 'zh-tw': '💡 提示：問她問題或給予真誠的讚美來展開有趣的對話！', 'zh-cn': '💡 提示：问她问题或给予真诚的赞美来展开有趣的对话！', 'en': '💡 Hint: Ask questions or give sincere compliments to start interesting conversations!' })}
        </div>
        <div style={minigameStyles.chatHistory}>
          {chatHistory.slice(-6).map(message => (
            <div key={message.id} style={{
              ...minigameStyles.message,
              ...(message.sender === 'player' ? minigameStyles.playerMessage : minigameStyles.crushMessage)
            }}>
              <div style={minigameStyles.messageContent}>
                {message.isVoice && <Mic style={minigameStyles.voiceIcon} />}
                {message.content}
              </div>
            </div>
          ))}
          {chatHistory.length === 0 && (
            <div style={{textAlign: 'center', color: '#666', padding: '20px'}}>
              {t({ 'zh-tw': '開始你們的對話吧！', 'zh-cn': '开始你们的对话吧！', 'en': 'Start your conversation!' })}
            </div>
          )}
        </div>
        <div style={minigameStyles.chatInputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t({ 'zh-tw': '說些什麼... (試著問問題或讚美她！)', 'zh-cn': '说些什么... (试着问问题或赞美她！)', 'en': 'Say something... (Try asking questions or complimenting her!)' })}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={!gameActive}
            style={minigameStyles.chatInput}
          />
          <button
            onClick={startVoiceInput}
            disabled={!gameActive || isRecording}
            style={{...minigameStyles.voiceButton, backgroundColor: isRecording ? '#ff5722' : '#2196f3'}}
          >
            {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!gameActive || !userInput.trim()}
            style={minigameStyles.sendButton}
          >
            {t({ 'zh-tw': '發送', 'zh-cn': '发送', 'en': 'Send' })}
          </button>
        </div>
      </div>
    );
};

// Festival Activities Minigame
const FestivalActivitiesGame = ({ gameActive, t, onComplete }) => {
    const activities = [
        { 
            name: { 'zh-tw': '一起逛攤位', 'zh-cn': '一起逛摊位', 'en': 'Browse Stalls Together' },
            description: { 'zh-tw': '慢慢逛校園，享受輕鬆時光', 'zh-cn': '慢慢逛校园，享受轻松时光', 'en': 'Stroll around campus and enjoy relaxed time' },
            success: 70,
            points: 80
        },
        { 
            name: { 'zh-tw': '邀請吃章魚燒', 'zh-cn': '邀请吃章鱼烧', 'en': 'Invite to Eat Takoyaki' },
            description: { 'zh-tw': '主動邀請，展現紳士風度', 'zh-cn': '主动邀请，展现绅士风度', 'en': 'Take initiative and show gentleman behavior' },
            success: 80,
            points: 120
        },
        { 
            name: { 'zh-tw': '一起玩遊戲攤', 'zh-cn': '一起玩游戏摊', 'en': 'Play Games Together' },
            description: { 'zh-tw': '挑戰遊戲，為她贏取獎品', 'zh-cn': '挑战游戏，为她赢取奖品', 'en': 'Challenge games and win prizes for her' },
            success: 60,
            points: 100
        }
    ];

    const handleActivity = (activity) => {
        const success = Math.random() * 100 < activity.success;
        onComplete(success, activity.points, success ? 
            t({ 'zh-tw': `${t(activity.name)}很成功！她看起來很開心，你們的感情更進一步了`, 'zh-cn': `${t(activity.name)}很成功！她看起来很开心，你们的感情更进一步了`, 'en': `${t(activity.name)} was successful! She looks happy and your relationship got closer` }) :
            t({ 'zh-tw': '有點尷尬，但她還是很友善。也許下次可以嘗試不同的方法', 'zh-cn': '有点尴尬，但她还是很友善。也许下次可以尝试不同的方法', 'en': 'A bit awkward, but she\'s still friendly. Maybe try a different approach next time' })
        );
    };

    return (
        <div style={minigameStyles.container}>
            <h3>{t({ 'zh-tw': '🎪 選擇校慶活動', 'zh-cn': '🎪 选择校庆活动', 'en': '🎪 Choose Festival Activity' })}</h3>
            <div style={minigameStyles.hint}>
                {t({ 'zh-tw': '💡 提示：每個選擇都有不同的成功率和獎勵！', 'zh-cn': '💡 提示：每个选择都有不同的成功率和奖励！', 'en': '💡 Hint: Each choice has different success rates and rewards!' })}
            </div>
            <div style={minigameStyles.activitiesContainer}>
                {activities.map((activity, index) => (
                    <button
                        key={index}
                        onClick={() => handleActivity(activity)}
                        disabled={!gameActive}
                        style={{
                            ...minigameStyles.activityButton,
                            border: `2px solid ${activity.success >= 70 ? '#4caf50' : activity.success >= 60 ? '#ff9800' : '#f44336'}`
                        }}
                    >
                        <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
                            {t(activity.name)}
                        </div>
                        <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>
                            {t(activity.description)}
                        </div>
                        <div style={minigameStyles.activityChance}>
                            {t({ 'zh-tw': '成功率', 'zh-cn': '成功率', 'en': 'Success Rate' })}: {activity.success}% | 
                            {t({ 'zh-tw': '獎勵', 'zh-cn': '奖励', 'en': 'Reward' })}: {activity.points} {t({ 'zh-tw': '分', 'zh-cn': '分', 'en': 'pts' })}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// ConnectionsGame component
const ConnectionsGame = ({ gameActive, onComplete, t }) => {
    const [grid, setGrid] = useState([]);
    const [selected, setSelected] = useState([]);
    const [foundGroups, setFoundGroups] = useState([]);
    const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [puzzleData, setPuzzleData] = useState([]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * connectionsCorpus.length);
        const selectedPuzzle = connectionsCorpus[randomIndex];

        setPuzzleData(selectedPuzzle);
        let allItems = selectedPuzzle.flatMap(group => group.items);
        allItems.sort(() => 0.5 - Math.random());
        setGrid(allItems);
    }, []);

    const handleSelect = (item) => {
        if (foundGroups.some(group => group.items.includes(item))) {
            return;
        }

        setSelected(prev => {
            if (prev.includes(item)) {
                return prev.filter(i => i !== item);
            } else if (prev.length < 4) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const checkGroup = () => {
        if (selected.length !== 4) return;

        let isCorrect = false;
        let foundGroup = null;

        const selectedSet = new Set(selected);

        for (const group of puzzleData) {
            const groupSet = new Set(group.items);
            if (selectedSet.size === groupSet.size && [...selectedSet].every(item => groupSet.has(item))) {
                isCorrect = true;
                foundGroup = group;
                break;
            }
        }

        if (isCorrect) {
            setFoundGroups(prev => [...prev, foundGroup]);
            setSelected([]);
            if (foundGroups.length + 1 === 4) {
                onComplete(true, 400, t({
                    'zh-tw': `太棒了！你找到所有連線，你的中文很厲害！`,
                    'zh-cn': `太棒了！你找到所有连线，你的中文很厉害！`,
                    'en': `Awesome! You found all the connections, your Chinese is great!`
                }));
            }
        } else {
            setIncorrectAttempts(prev => {
                const newAttempts = prev + 1;
                if (newAttempts >= 5) {
                    onComplete(false, 0, t({
                        'zh-tw': `挑戰失敗！你用盡了所有錯誤嘗試。`,
                        'zh-cn': `挑战失败！你用尽了所有错误尝试。`,
                        'en': `Challenge failed! You've used all your attempts.`
                    }));
                }
                return newAttempts;
            });
            setSelected([]);
        }
    };

    const remainingGrid = grid.filter(item => !foundGroups.some(group => group.items.includes(item)));

    return (
        <div style={minigameStyles.connectionsContainer}>
            {/* Background floating elements for visual appeal */}
            <div style={{ position: 'absolute', top: '10%', left: '15%', fontSize: '4rem', opacity: 0.2 }}>🤓</div>
            <div style={{ position: 'absolute', bottom: '10%', right: '15%', fontSize: '3rem', opacity: 0.2 }}>📚</div>
            <div style={{ position: 'absolute', top: '25%', right: '25%', fontSize: '2rem', opacity: 0.2 }}>❤️</div>
            <div style={{ position: 'absolute', bottom: '25%', left: '25%', fontSize: '3.5rem', opacity: 0.2 }}>💕</div>
            
            <h3 className="text-center font-bold text-lg mb-2">{t({ 'zh-tw': '找出四個一組的字詞', 'zh-cn': '找出四个一组的字词', 'en': 'Find the four words that are a group' })}</h3>
            <div style={minigameStyles.connectionsHeader}>
                <div className="font-bold text-gray-700">
                    {t({ 'zh-tw': '錯誤', 'zh-cn': '错误', 'en': 'Errors' })}: {incorrectAttempts}/5
                </div>
                <button
                    onClick={checkGroup}
                    disabled={selected.length !== 4 || !gameActive}
                    style={minigameStyles.connectionsSubmitButton}
                >
                    {t({ 'zh-tw': '提交', 'zh-cn': '提交', 'en': 'Submit' })}
                </button>
            </div>
            <div style={minigameStyles.connectionsGrid}>
                {remainingGrid.map((item, index) => (
                    <button
                        key={item}
                        style={{
                            ...minigameStyles.connectionsItem,
                            backgroundColor: selected.includes(item) ? minigameStyles.connectionsItemSelected.background : '#f0f0f0',
                            transform: selected.includes(item) ? minigameStyles.connectionsItemSelected.transform : 'none'
                        }}
                        onClick={() => handleSelect(item)}
                        disabled={!gameActive}
                    >
                        {item}
                    </button>
                ))}
            </div>
            {foundGroups.length > 0 && (
                <div style={minigameStyles.connectionsFoundGroup}>
                    {foundGroups.map((group, index) => (
                        <div key={index} style={{
                            ...minigameStyles.connectionsGroupCard,
                            backgroundColor: ['#e1f7d5', '#c3e2e8', '#fce8b3', '#e1d5e7'][index]
                        }}>
                            <div className="font-bold text-sm text-green-700">
                                {t(group.category)}
                            </div>
                            <div className="text-gray-800 text-lg">
                                {group.items.join(', ')}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


// Main GameMinigames component
const GameMinigames = ({
  gameActive,
  currentLanguage,
  t,
  userInput,
  setUserInput,
  isRecording,
  setIsRecording,
  chatHistory,
  setChatHistory,
  gameStats,
  setGameStats,
  onComplete,
  currentMinigame,
  onGoBack,
}) => {
  const [noteContent, setNoteContent] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const quizSets = {
      taiwan_culture: [
          {
              question: { 'zh-tw': '台灣最高的山是？', 'zh-cn': '台湾最高的山是？', 'en': 'What is the highest mountain in Taiwan?' },
              options: [{ 'zh-tw': '玉山', 'zh-cn': '玉山', 'en': 'Yushan' }, { 'zh-tw': '阿里山', 'zh-cn': '阿里山', 'en': 'Alishan' }, { 'zh-tw': '合歡山', 'zh-cn': '合欢山', 'en': 'Hehuan Mountain' }],
              correct: 0
          },
          {
              question: { 'zh-tw': '台灣的國花是？', 'zh-cn': '台湾的国花是？', 'en': 'What is Taiwan\'s national flower?' },
              options: [{ 'zh-tw': '櫻花', 'zh-cn': '樱花', 'en': 'Cherry Blossom' }, { 'zh-tw': '梅花', 'zh-cn': '梅花', 'en': 'Plum Blossom' }, { 'zh-tw': '蘭花', 'zh-cn': '兰花', 'en': 'Orchid' }],
              correct: 1
          },
          {
              question: { 'zh-tw': '夜市最有名的小吃是？', 'zh-cn': '夜市最有名的小吃是？', 'en': 'What\'s the most famous night market snack?' },
              options: [{ 'zh-tw': '珍珠奶茶', 'zh-cn': '珍珠奶茶', 'en': 'Bubble Tea' }, { 'zh-tw': '臭豆腐', 'zh-cn': '臭豆腐', 'en': 'Stinky Tofu' }, { 'zh-tw': '小籠包', 'zh-cn': '小笼包', 'en': 'Xiaolongbao' }],
              correct: 1
          }
      ],
      math: [
          {
              question: { 'zh-tw': '2x + 5 = 13，x = ?', 'zh-cn': '2x + 5 = 13，x = ?', 'en': '2x + 5 = 13, x = ?' },
              options: ['4', '8', '3'],
              correct: 0
          },
          {
              question: { 'zh-tw': '√64 = ?', 'zh-cn': '√64 = ?', 'en': '√64 = ?' },
              options: ['6', '8', '10'],
              correct: 1
          },
          {
              question: { 'zh-tw': '15 × 7 = ?', 'zh-cn': '15 × 7 = ?', 'en': '15 × 7 = ?' },
              options: ['95', '105', '115'],
              correct: 1
          }
      ]
  };

  useEffect(() => {
    if (currentMinigame === 'quiz_battle' && !currentQuiz) {
      const allQuestions = [...quizSets.taiwan_culture, ...quizSets.math];
      const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      setCurrentQuiz(randomQuestion);
    }
  }, [currentMinigame, currentQuiz, quizSets.taiwan_culture, quizSets.math]);

  return (
    <>
      <button onClick={onGoBack} style={backButtonStyle}>
          <ArrowLeft size={20} />
          <span>Back to All Games</span>
      </button>
      <div style={{ padding: '20px' }}>
          {(() => {
              switch (currentMinigame) {
                  case 'note_writing':
                      return <NoteWritingGame
                          gameActive={gameActive}
                          t={t}
                          onComplete={onComplete}
                          setGameStats={setGameStats}
                      />;
                  case 'connections_game':
                      return <ConnectionsGame
                          gameActive={gameActive}
                          onComplete={onComplete}
                          t={t}
                      />;
                  case 'voice_chat':
                      return <VoiceChatGame
                          gameActive={gameActive}
                          t={t}
                          userInput={userInput}
                          setUserInput={setUserInput}
                          isRecording={isRecording}
                          setIsRecording={setIsRecording}
                          chatHistory={chatHistory}
                          setChatHistory={setChatHistory}
                          onComplete={onComplete}
                          currentLanguage={currentLanguage}
                      />;
                  case 'festival_activities':
                      return <FestivalActivitiesGame
                          gameActive={gameActive}
                          t={t}
                          onComplete={onComplete}
                      />;
                  default:
                      return (
                          <div style={minigameStyles.container}>
                              <h3>Minigame not found</h3>
                              <p>Current minigame: {currentMinigame}</p>
                          </div>
                      );
              }
          })()}
      </div>
    </>
  );
};

export default GameMinigames;