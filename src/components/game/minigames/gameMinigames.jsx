import React, { useState, useEffect } from 'react';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';
import { minigameStyles, backButtonStyle } from "../styles/gameStyles.js";
import NoteWritingGame from '../../romance/minigames/NoteWritingGame';
import VoiceChatGame from '../../romance/minigames/VoiceChatGame';
import FestivalActivitiesGame from './FestivalActivitiesGame';
import ConnectionsGame from './ConnectionsGame';
import ScriptedChatGame from './ScriptedChatGame'; // New import

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
      { "category": '顏色', "items": ['紅', '黃', '藍', '綠'] },
      { "category": '天氣', "items": ['晴', '雨', '雲', '雪'] }
    ],
    // Puzzle 3: Musical Instruments
    [
        { "category": '樂器', "items": ['鋼琴', '吉他', '小提琴', '鼓'] },
        { "category": '國家', "items": ['美國', '中國', '日本', '法國'] },
        { "category": '運動', "items": ['籃球', '足球', '游泳', '跑步'] },
        { "category": '學校科目', "items": ['數學', '語文', '科學', '歷史'] }
    ],
    // Puzzle 4: Household Items
    [
        { "category": '家具', "items": ['桌子', '椅子', '床', '燈'] },
        { "category": '飲料', "items": ['水', '茶', '咖啡', '牛奶'] },
        { "category": '數字', "items": ['一', '二', '三', '四'] },
        { "category": '身體部位', "items": ['頭', '手', '腳', '眼睛'] }
    ],
    // Puzzle 5: Nature
    [
        { "category": '大自然', "items": ['山', '河', '樹', '花'] },
        { "category": '城市', "items": ['台北', '東京', '巴黎', '紐約'] },
        { "category": '節日', "items": ['春節', '中秋節', '聖誕節', '萬聖節'] },
        { "category": '方向', "items": ['東', '南', '西', '北'] }
    ],
    // Puzzle 6: Foods
    [
        { "category": '食物', "items": ['米飯', '麵條', '麵包', '餃子'] },
        { "category": '季節', "items": ['春', '夏', '秋', '冬'] },
        { "category": '形狀', "items": ['圓', '方', '三角', '星'] },
        { "category": '國家首都', "items": ['北京', '華盛頓', '倫敦', '首爾'] }
    ],
    // Puzzle 7: Clothes
    [
        { "category": '服裝', "items": ['襯衫', '褲子', '裙子', '外套'] },
        { "category": '廚房用具', "items": ['碗', '盤', '筷子', '勺子'] },
        { "category": '電腦部件', "items": ['鍵盤', '滑鼠', '螢幕', '主機'] },
        { "category": '自然災害', "items": ['地震', '颱風', '洪水', '海嘯'] }
    ],
    // Puzzle 8: Planets
    [
        { "category": '行星', "items": ['地球', '火星', '月亮', '太陽'] },
        { "category": '調味品', "items": ['鹽', '糖', '醋', '醬油'] },
        { "category": '節肢動物', "items": ['蜘蛛', '蜜蜂', '蝦', '螃蟹'] },
        { "category": '建築物', "items": ['學校', '醫院', '圖書館', '銀行'] }
    ],
    // Puzzle 9: Household Appliances
    [
        { "category": '家電', "items": ['電視', '冰箱', '洗衣機', '冷氣機'] },
        { "category": '鳥類', "items": ['麻雀', '鴿子', '老鷹', '企鵝'] },
        { "category": '海洋生物', "items": ['鯨魚', '鯊魚', '海豚', '水母'] },
        { "category": '文藝復興時期人物', "items": ['達文西', '米開朗基羅', '拉斐爾', '莫內'] }
    ],
    // Puzzle 10: Human Emotions
    [
        { "category": '情感', "items": ['快樂', '悲傷', '生氣', '驚訝'] },
        { "category": '運動器材', "items": ['球', '拍', '網', '棒'] },
        { "category": '蔬菜', "items": ['白菜', '蘿蔔', '番茄', '馬鈴薯'] },
        { "category": '天文現象', "items": ['流星', '彗星', '日蝕', '月蝕'] }
    ],
    // Puzzle 11: Kitchen Utensils
    [
        { "category": '餐具', "items": ['湯匙', '叉子', '刀', '碗'] },
        { "category": '地理名詞', "items": ['海洋', '大陸', '島嶼', '山脈'] },
        { "category": '音樂類型', "items": ['流行', '搖滾', '古典', '爵士'] },
        { "category": '體育項目', "items": ['排球', '羽毛球', '乒乓球', '網球'] }
    ],
    // Puzzle 12: Superheroes
    [
        { "category": '超級英雄', "items": ['蝙蝠俠', '超人', '蜘蛛人', '鋼鐵人'] },
        { "category": '工具', "items": ['錘子', '螺絲刀', '扳手', '鋸子'] },
        { "category": '天氣現象', "items": ['閃電', '雷', '風', '雨'] },
        { "category": '學校設施', "items": ['教室', '操場', '圖書館', '食堂'] }
    ],
    // Puzzle 13: Time Units
    [
        { "category": '時間單位', "items": ['秒', '分', '小時', '天'] },
        { "category": '建築材料', "items": ['木頭', '石頭', '磚', '水泥'] },
        { "category": '交通標誌', "items": ['紅燈', '黃燈', '綠燈', '斑馬線'] },
        { "category": '身體感官', "items": ['視', '聽', '嗅', '味'] }
    ],
    // Puzzle 14: Famous Landmarks
    [
        { "category": '著名地標', "items": ['自由女神像', '艾菲爾鐵塔', '大笨鐘', '金字塔'] },
        { "category": '飲料', "items": ['可樂', '汽水', '果汁', '啤酒'] },
        { "category": '昆蟲', "items": ['蝴蝶', '螞蟻', '蚊子', '蒼蠅'] },
        { "category": '情緒', "items": ['高興', '難過', '害怕', '驚訝'] }
    ],
    // Puzzle 15: School Supplies
    [
        { "category": '學習用品', "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": '運動場地', "items": ['球場', '跑道', '泳池', '健身房'] },
        { "category": '家庭電器', "items": ['微波爐', '烤箱', '吸塵器', '吹風機'] },
        { "category": '國家首都', "items": ['台北', '東京', '北京', '首爾'] }
    ],
    // Puzzle 16: Office Supplies
    [
        { "category": '辦公用品', "items": ['訂書機', '迴紋針', '剪刀', '膠水'] },
        { "category": '陸地動物', "items": ['獅子', '老虎', '大象', '長頸鹿'] },
        { "category": '日常用品', "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": '樂器', "items": ['吉他', '鋼琴', '小提琴', '鼓'] }
    ],
    // Puzzle 17: Grains
    [
        { "category": '穀物', "items": ['米', '麥', '玉米', '豆'] },
        { "category": '常見菜餚', "items": ['炒飯', '牛肉麵', '水餃', '滷肉飯'] },
        { "category": '學校活動', "items": ['考試', '上課', '放學', '作業'] },
        { "category": '身體部位', "items": ['頭', '手', '腳', '眼睛'] }
    ],
    // Puzzle 18: Kitchen Spices
    [
        { "category": '香料', "items": ['胡椒', '辣椒', '肉桂', '薑'] },
        { "category": '日常行為', "items": ['走', '跑', '跳', '睡'] },
        { "category": '交通工具', "items": ['腳踏車', '摩托車', '公車', '捷運'] },
        { "category": '天氣', "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ],
    // Puzzle 19: Feelings
    [
        { "category": '感覺', "items": ['餓', '渴', '累', '痛'] },
        { "category": '文具', "items": ['鉛筆', '原子筆', '馬克筆', '螢光筆'] },
        { "category": '人體器官', "items": ['心', '肺', '肝', '腎'] },
        { "category": '家電', "items": ['電鍋', '烤箱', '微波爐', '熱水壺'] }
    ],
    // Puzzle 20: School Places
    [
        { "category": '校園地點', "items": ['教室', '操場', '圖書館', '體育館'] },
        { "category": '水果', "items": ['草莓', '葡萄', '鳳梨', '芒果'] },
        { "category": '動物', "items": ['熊貓', '猴子', '長頸鹿', '斑馬'] },
        { "category": '服飾', "items": ['帽子', '鞋子', '襪子', '手套'] }
    ],
    // Puzzle 21: Common Chinese Surnames
    [
        { "category": '常見姓氏', "items": ['王', '李', '張', '陳'] },
        { "category": '電腦品牌', "items": ['蘋果', '微軟', '谷歌', '臉書'] },
        { "category": '球類運動', "items": ['籃球', '足球', '排球', '棒球'] },
        { "category": '建築物', "items": ['學校', '醫院', '飯店', '超市'] }
    ],
    // Puzzle 22: Traditional Chinese Festivals
    [
        { "category": '中國傳統節日', "items": ['春節', '中秋節', '清明節', '端午節'] },
        { "category": '交通工具', "items": ['汽車', '機車', '火車', '腳踏車'] },
        { "category": '自然現象', "items": ['彩虹', '閃電', '地震', '颱風'] },
        { "category": '常見蔬菜', "items": ['高麗菜', '空心菜', '菠菜', '青江菜'] }
    ],
    // Puzzle 23: Human Body Senses
    [
        { "category": '人體感官', "items": ['視', '聽', '嗅', '味'] },
        { "category": '文具', "items": ['橡皮擦', '修正帶', '膠帶', '剪刀'] },
        { "category": '時間單位', "items": ['分鐘', '小時', '天', '週'] },
        { "category": '家庭成員', "items": ['祖父', '祖母', '叔叔', '阿姨'] }
    ],
    // Puzzle 24: Common Chinese Verbs
    [
        { "category": '動詞', "items": ['吃', '喝', '玩', '睡'] },
        { "category": '水果', "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": '顏色', "items": ['紅色', '藍色', '黃色', '綠色'] },
        { "category": '天氣', "items": ['晴天', '陰天', '雨天', '雪天'] }
    ],
    // Puzzle 25: Office Items
    [
        { "category": '辦公室用品', "items": ['筆', '紙', '電話', '電腦'] },
        { "category": '動物', "items": ['老虎', '獅子', '大象', '熊貓'] },
        { "category": '常見飲料', "items": ['水', '果汁', '茶', '咖啡'] },
        { "category": '節日', "items": ['聖誕節', '萬聖節', '新年', '感恩節'] }
    ],
    // Puzzle 26: School Subjects
    [
        { "category": '學校科目', "items": ['數學', '英文', '歷史', '地理'] },
        { "category": '廚具', "items": ['鍋子', '平底鍋', '菜刀', '鏟子'] },
        { "category": '交通標誌', "items": ['停車', '禁止', '慢行', '注意'] },
        { "category": '國家', "items": ['美國', '英國', '法國', '德國'] }
    ],
    // Puzzle 27: Body Parts
    [
        { "category": '身體部位', "items": ['頭', '肩膀', '膝蓋', '腳趾'] },
        { "category": '運動', "items": ['跑步', '游泳', '跳高', '跳遠'] },
        { "category": '節日', "items": ['新年', '元宵節', '清明節', '端午節'] },
        { "category": '家具', "items": ['沙發', '椅子', '桌子', '櫃子'] }
    ],
    // Puzzle 28: Common Adjectives
    [
        { "category": '形容詞', "items": ['高', '矮', '胖', '瘦'] },
        { "category": '職業', "items": ['律師', '醫生', '工程師', '老師'] },
        { "category": '樂器', "items": ['鋼琴', '小提琴', '長笛', '薩克斯風'] },
        { "category": '昆蟲', "items": ['螞蟻', '蜜蜂', '蝴蝶', '蜻蜓'] }
    ],
    // Puzzle 29: Daily Necessities
    [
        { "category": '日常用品', "items": ['牙膏', '牙刷', '毛巾', '肥皂'] },
        { "category": '蔬菜', "items": ['白菜', '蘿蔔', '馬鈴薯', '洋蔥'] },
        { "category": '天氣', "items": ['晴', '雨', '風', '雪'] },
        { "category": '交通工具', "items": ['巴士', '計程車', '捷運', '飛機'] }
    ],
    // Puzzle 30: Common Objects
    [
        { "category": '常見物品', "items": ['手機', '錢包', '鑰匙', '手錶'] },
        { "category": '顏色', "items": ['紅色', '綠色', '藍色', '紫色'] },
        { "category": '動物', "items": ['狗', '貓', '兔子', '鳥'] },
        { "category": '廚房用具', "items": ['鍋', '碗', '瓢', '盆'] }
    ],
    // Puzzle 31: Famous Buildings
    [
        { "category": '著名建築', "items": ['故宮', '長城', '天壇', '兵馬俑'] },
        { "category": '學習用品', "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": '運動', "items": ['籃球', '足球', '排球', '網球'] },
        { "category": '人體器官', "items": ['心臟', '肺', '肝臟', '腎臟'] }
    ],
    // Puzzle 32: Common Chinese Foods
    [
        { "category": '中式食物', "items": ['小籠包', '牛肉麵', '水餃', '炒飯'] },
        { "category": '天氣', "items": ['晴朗', '多雲', '下雨', '下雪'] },
        { "category": '文具', "items": ['筆', '尺', '橡皮擦', '修正液'] },
        { "category": '家庭成員', "items": ['爺爺', '奶奶', '爸爸', '媽媽'] }
    ],
    // Puzzle 33: Common Verbs
    [
        { "category": '動詞', "items": ['看', '聽', '說', '寫'] },
        { "category": '交通工具', "items": ['汽車', '火車', '飛機', '船'] },
        { "category": '水果', "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": '顏色', "items": ['紅色', '藍色', '黃色', '綠色'] }
    ],
    // Puzzle 34: Common Nouns
    [
        { "category": '名詞', "items": ['書', '筆', '桌子', '椅子'] },
        { "category": '動物', "items": ['狗', '貓', '鳥', '魚'] },
        { "category": '天氣', "items": ['晴', '雨', '風', '雪'] },
        { "category": '家庭成員', "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 35: Common Objects
    [
        { "category": '生活用品', "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": '職業', "items": ['醫生', '老師', '律師', '工程師'] },
        { "category": '水果', "items": ['葡萄', '香蕉', '蘋果', '橘子'] },
        { "category": '天氣', "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ],
    // Puzzle 36: Common Verbs
    [
        { "category": '動詞', "items": ['吃', '喝', '跑', '跳'] },
        { "category": '交通工具', "items": ['汽車', '公車', '捷運', '腳踏車'] },
        { "category": '學校科目', "items": ['數學', '英文', '科學', '歷史'] },
        { "category": '身體部位', "items": ['頭', '手', '腳', '眼睛'] }
    ],
    // Puzzle 37: Common Nouns
    [
        { "category": '名詞', "items": ['書', '筆', '紙', '橡皮'] },
        { "category": '動物', "items": ['狗', '貓', '兔子', '魚'] },
        { "category": '天氣', "items": ['晴', '雨', '雲', '雪'] },
        { "category": '家庭成員', "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 38: Common Adjectives
    [
        { "category": '形容詞', "items": ['高', '矮', '胖', '瘦'] },
        { "category": '職業', "items": ['律師', '醫生', '工程師', '老師'] },
        { "category": '樂器', "items": ['鋼琴', '小提琴', '長笛', '薩克斯風'] },
        { "category": '昆蟲', "items": ['螞蟻', '蜜蜂', '蝴蝶', '蜻蜓'] }
    ],
    // Puzzle 39: Daily Necessities
    [
        { "category": '日常用品', "items": ['牙膏', '牙刷', '毛巾', '肥皂'] },
        { "category": '蔬菜', "items": ['白菜', '蘿蔔', '馬鈴薯', '洋蔥'] },
        { "category": '天氣', "items": ['晴', '雨', '風', '雪'] },
        { "category": '交通工具', "items": ['巴士', '計程車', '捷運', '飛機'] }
    ],
    // Puzzle 40: Common Objects
    [
        { "category": '常見物品', "items": ['手機', '錢包', '鑰匙', '手錶'] },
        { "category": '顏色', "items": ['紅色', '綠色', '藍色', '紫色'] },
        { "category": '動物', "items": ['狗', '貓', '兔子', '鳥'] },
        { "category": '廚房用具', "items": ['鍋', '碗', '瓢', '盆'] }
    ],
    // Puzzle 41: Famous Buildings
    [
        { "category": '著名建築', "items": ['故宮', '長城', '天壇', '兵馬俑'] },
        { "category": '學習用品', "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": '運動', "items": ['籃球', '足球', '排球', '網球'] },
        { "category": '人體器官', "items": ['心臟', '肺', '肝臟', '腎臟'] }
    ],
    // Puzzle 42: Common Chinese Foods
    [
        { "category": '中式食物', "items": ['小籠包', '牛肉麵', '水餃', '炒飯'] },
        { "category": '天氣', "items": ['晴朗', '多雲', '下雨', '下雪'] },
        { "category": '文具', "items": ['筆', '尺', '橡皮擦', '修正液'] },
        { "category": '家庭成員', "items": ['爺爺', '奶奶', '爸爸', '媽媽'] }
    ],
    // Puzzle 43: Common Verbs
    [
        { "category": '動詞', "items": ['看', '聽', '說', '寫'] },
        { "category": '交通工具', "items": ['汽車', '火車', '飛機', '船'] },
        { "category": '水果', "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": '顏色', "items": ['紅色', '藍色', '黃色', '綠色'] }
    ],
    // Puzzle 44: Common Nouns
    [
        { "category": '名詞', "items": ['書', '筆', '桌子', '椅子'] },
        { "category": '動物', "items": ['狗', '貓', '鳥', '魚'] },
        { "category": '天氣', "items": ['晴', '雨', '風', '雪'] },
        { "category": '家庭成員', "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 45: Common Objects
    [
        { "category": '生活用品', "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": '職業', "items": ['醫生', '老師', '律師', '工程師'] },
        { "category": '水果', "items": ['葡萄', '香蕉', '蘋果', '橘子'] },
        { "category": '天氣', "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ],
    // Puzzle 46: Common Verbs
    [
        { "category": '動詞', "items": ['吃', '喝', '跑', '跳'] },
        { "category": '交通工具', "items": ['汽車', '公車', '捷運', '腳踏車'] },
        { "category": '學校科目', "items": ['數學', '英文', '科學', '歷史'] },
        { "category": '身體部位', "items": ['頭', '手', '腳', '眼睛'] }
    ],
    // Puzzle 47: Common Nouns
    [
        { "category": '名詞', "items": ['書', '筆', '紙', '橡皮'] },
        { "category": '動物', "items": ['狗', '貓', '兔子', '魚'] },
        { "category": '天氣', "items": ['晴', '雨', '雲', '雪'] },
        { "category": '家庭成員', "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 48: Common Adjectives
    [
        { "category": '形容詞', "items": ['高', '矮', '胖', '瘦'] },
        { "category": '職業', "items": ['律師', '醫生', '工程師', '老師'] },
        { "category": '樂器', "items": ['鋼琴', '小提琴', '長笛', '薩克斯風'] },
        { "category": '昆蟲', "items": ['螞蟻', '蜜蜂', '蝴蝶', '蜻蜓'] }
    ],
    // Puzzle 49: Daily Necessities
    [
        { "category": '日常用品', "items": ['牙膏', '牙刷', '毛巾', '肥皂'] },
        { "category": '蔬菜', "items": ['白菜', '蘿蔔', '馬鈴薯', '洋蔥'] },
        { "category": '天氣', "items": ['晴', '雨', '風', '雪'] },
        { "category": '交通工具', "items": ['巴士', '計程車', '捷運', '飛機'] }
    ],
    // Puzzle 50: Common Objects
    [
        { "category": '常見物品', "items": ['手機', '錢包', '鑰匙', '手錶'] },
        { "category": '顏色', "items": ['紅色', '綠色', '藍色', '紫色'] },
        { "category": '動物', "items": ['狗', '貓', '兔子', '鳥'] },
        { "category": '廚房用具', "items": ['鍋', '碗', '瓢', '盆'] }
    ],
    // Puzzle 51: Famous Buildings
    [
        { "category": '著名建築', "items": ['故宮', '長城', '天壇', '兵馬俑'] },
        { "category": '學習用品', "items": ['書包', '課本', '筆記本', '鉛筆盒'] },
        { "category": '運動', "items": ['籃球', '足球', '排球', '網球'] },
        { "category": '人體器官', "items": ['心臟', '肺', '肝臟', '腎臟'] }
    ],
    // Puzzle 52: Common Chinese Foods
    [
        { "category": '中式食物', "items": ['小籠包', '牛肉麵', '水餃', '炒飯'] },
        { "category": '天氣', "items": ['晴朗', '多雲', '下雨', '下雪'] },
        { "category": '文具', "items": ['筆', '尺', '橡皮擦', '修正液'] },
        { "category": '家庭成員', "items": ['爺爺', '奶奶', '爸爸', '媽媽'] }
    ],
    // Puzzle 53: Common Verbs
    [
        { "category": '動詞', "items": ['看', '聽', '說', '寫'] },
        { "category": '交通工具', "items": ['汽車', '火車', '飛機', '船'] },
        { "category": '水果', "items": ['蘋果', '香蕉', '橘子', '草莓'] },
        { "category": '顏色', "items": ['紅色', '藍色', '黃色', '綠色'] }
    ],
    // Puzzle 54: Common Nouns
    [
        { "category": '名詞', "items": ['書', '筆', '桌子', '椅子'] },
        { "category": '動物', "items": ['狗', '貓', '鳥', '魚'] },
        { "category": '天氣', "items": ['晴', '雨', '風', '雪'] },
        { "category": '家庭成員', "items": ['爸爸', '媽媽', '哥哥', '妹妹'] }
    ],
    // Puzzle 55: Common Objects
    [
        { "category": '生活用品', "items": ['牙刷', '毛巾', '肥皂', '梳子'] },
        { "category": '職業', "items": ['醫生', '老師', '律師', '工程師'] },
        { "category": '水果', "items": ['葡萄', '香蕉', '蘋果', '橘子'] },
        { "category": '天氣', "items": ['晴朗', '陰天', '下雨', '下雪'] }
    ]
];

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
                  case 'scripted_chat':
                      return <ScriptedChatGame
                          gameActive={gameActive}
                          t={t}
                          onComplete={onComplete}
                          currentLanguage={currentLanguage}
                          onGoBack={onGoBack}
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