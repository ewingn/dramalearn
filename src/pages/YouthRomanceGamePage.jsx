import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

/** ========= helpers you already use ========= **/
const parseTextMap = (key) =>
  key.split("|").reduce((acc, item) => {
    const [k, v] = item.split(":");
    acc[k] = v;
    return acc;
  }, {});

const t = (key, lang) => {
  const m = parseTextMap(key);
  return m[lang] || m["zh-tw"] || key;
};

/** ========= your existing API shim (kept compatible) ========= **/
const callGeminiApi = async (systemPrompt, messages) => {
  const apiKey = ""; // plug your key to go live
  if (!apiKey) {
    // graceful fallback so the UI still feels alive
    return {
      text:
        "（系統）目前為示範模式：\n\n嗯…你突然叫我來天台，是想告白嗎？不要害羞啦，說吧。🙂",
      sources: [],
    };
  }
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  const payload = {
    contents: messages,
    tools: [{ google_search: {} }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  return { text: text || "（系統）暫時沒有回覆，等等再試。", sources: [] };
};
/** ========================================== **/

export default function YouthRomanceGamePage() {
  // pull language from your <Outlet /> context
  const { currentLanguage = "zh-tw" } = useOutletContext() || {};

  /** ===== state ===== **/
  const [phase, setPhase] = useState("intro"); // intro | role | chat | victory | fail
  const [role, setRole] = useState(null); // male | female
  const [botRole, setBotRole] = useState(null);
  const [xp, setXp] = useState(() => Number(localStorage.getItem("yr_xp") || 0));
  const [likeMeter, setLikeMeter] = useState(
    () => Number(localStorage.getItem("yr_like") || 50)
  );
  const [messages, setMessages] = useState([]); // [{who:'bot'|'you', text:string}]
  const [freeInput, setFreeInput] = useState("");
  const chatRef = useRef(null);

  /** ===== scene copy (TW-first) ===== **/
  const scene = useMemo(
    () => ({
      title:
        "zh-tw:校園告白場景｜天台的勇氣|zh-cn:校园告白场景｜天台的勇气|en:Campus Confession · Rooftop Courage",
      desc:
        "zh-tw:下課後，你約了他/她到天台。微風、斜陽、心跳聲…今天，也許是個改變關係的好日子。|zh-cn:下课后，你约了他/她到天台。微风、斜阳、心跳声……今天也许是改变关系的好日子。|en:After class you asked your crush to the rooftop. Breeze, sunset, heartbeat—maybe today changes everything.",
      starter:
        "zh-tw:你在這裡等我很久了嗎？有什麼事嗎？|zh-cn:你在这里等我很久了吗？有什么事吗？|en:Have you been waiting long? What’s up?",
      choices: [
        {
          label: "zh-tw:說出心意|zh-cn:说出心意|en:Confess",
          text: "我…其實我很喜歡你！",
          like: +25,
          xp: +100,
          hints:
            "zh-tw:語域：口語、真誠；可加『其實』或『老實說』來軟化語氣。台灣說法：有點害羞可加『蛤…』、或結尾用『啦』。|zh-cn:语域：口语、真诚……|en:Register: casual & sincere. Add softeners like “actually” or “to be honest”.",
        },
        {
          label: "zh-tw:打哈哈|zh-cn:打哈哈|en:Play it off",
          text: "沒事啦～只是想吹吹風。",
          like: -10,
          xp: +20,
          hints:
            "zh-tw:台灣語氣詞：啦、啊、嘛能降低正面交鋒。這句容易錯失時機。|zh-cn:……|en:Might miss the moment; filler particles reduce directness.",
        },
        {
          label: "zh-tw:聊課業|zh-cn:聊课业|en:Homework…",
          text: "欸…數學第十頁你會寫嗎？",
          like: -20,
          xp: +10,
          hints:
            "zh-tw:語用：轉移話題。若對方期待感情話題，會降好感。|zh-cn:……|en:Topic shift—likely reduces affection now.",
        },
      ],
    }),
    []
  );

  /** ===== derived text ===== **/
  const title = t(scene.title, currentLanguage);
  const desc = t(scene.desc, currentLanguage);

  /** ===== effects ===== **/
  useEffect(() => {
    if (phase === "intro") {
      setMessages([]);
      setRole(null);
      setBotRole(null);
      setLikeMeter((n) => (n === 50 ? n : 50));
    }
  }, [phase]);

  useEffect(() => {
    // victory / fail guards
    if (likeMeter >= 100) setPhase("victory");
    if (likeMeter <= 0) setPhase("fail");
    localStorage.setItem("yr_like", String(likeMeter));
  }, [likeMeter]);

  useEffect(() => {
    localStorage.setItem("yr_xp", String(xp));
  }, [xp]);

  useEffect(() => {
    // scroll to bottom on new message
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  /** ===== ui helpers ===== **/
  const likeColor =
    likeMeter >= 80
      ? "bg-green-500"
      : likeMeter >= 60
      ? "bg-yellow-500"
      : likeMeter >= 30
      ? "bg-orange-500"
      : "bg-red-500";

  const roleCards = [
    {
      id: "male",
      emoji: "👦",
      name:
        "zh-tw:男主角・柯景騰|zh-cn:男主角・柯景腾|en:Male Lead · Ko Ching-teng",
      traits:
        "zh-tw:皮但溫柔、刀子嘴豆腐心。|zh-cn:皮但温柔……|en:Mischief outside, soft inside.",
      system:
        "你是一個叫柯景騰的台灣校園男生。個性有點皮但很溫柔。現在在校園天台，對方可能想告白。請用繁體中文，口語、自然、帶一點調侃但不傷人。",
    },
    {
      id: "female",
      emoji: "👧",
      name:
        "zh-tw:女主角・沈佳宜|zh-cn:女主角・沈佳宜|en:Female Lead · Shen Chia-yi",
      traits:
        "zh-tw:溫柔理性、偶爾小脾氣。|zh-cn:温柔理性……|en:Warm, principled, slightly reserved.",
      system:
        "你是一個叫沈佳宜的台灣校園女生。氣質溫柔理性。現在在校園天台，對方可能想告白。請用繁體中文，禮貌、含蓄但不冷淡。",
    },
  ];

  /** ===== actions ===== **/
  const startRole = (id) => {
    const me = id;
    const bot = id === "male" ? "female" : "male";
    setRole(me);
    setBotRole(bot);
    setPhase("chat");
    // starter
    setMessages([
      { who: "bot", text: t(scene.starter, currentLanguage) },
    ]);
  };

  const handleChoice = async (choice) => {
    // user message
    setMessages((prev) => [...prev, { who: "you", text: choice.text }]);
    setXp((n) => n + choice.xp);
    setLikeMeter((n) => Math.min(100, Math.max(0, n + choice.like)));

    // bot system prompt
    const sys =
      (botRole === "male" ? roleCards[0].system : roleCards[1].system) +
      "\n\n回覆短小精悍、自然、有台灣語氣詞（啦、啊、欸、嘛）與情緒表情（…）。";

    // build history in API format
    const apiHistory = [
      { role: "model", parts: [{ text: t(scene.starter, currentLanguage) }] },
      { role: "user", parts: [{ text: choice.text }] },
    ];
    const resp = await callGeminiApi(sys, apiHistory);
    setMessages((prev) => [...prev, { who: "bot", text: resp.text }]);
  };

  const handleFreeSend = async () => {
    if (!freeInput.trim()) return;
    const text = freeInput.trim();
    setFreeInput("");
    setMessages((prev) => [...prev, { who: "you", text }]);
    setXp((n) => n + 30);

    const sys =
      (botRole === "male" ? roleCards[0].system : roleCards[1].system) +
      "\n\n回覆口語自然，根據對方語氣調整距離感。";

    const apiHistory = [
      { role: "model", parts: [{ text: t(scene.starter, currentLanguage) }] },
      { role: "user", parts: [{ text }] },
    ];
    const resp = await callGeminiApi(sys, apiHistory);
    setMessages((prev) => [...prev, { who: "bot", text: resp.text }]);
  };

  /** ===== UI ===== **/
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-blue-50 to-pink-100 pt-24 pb-10">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header strip */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
              {title} <span className="align-middle">🌸</span>
            </h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{desc}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-white/70 shadow text-sm font-semibold">
              XP：{xp}
            </div>
            <div className="w-28 md:w-36 h-2 rounded-full bg-white/60 overflow-hidden shadow-inner">
              <div
                className={`h-full ${likeColor} transition-all`}
                style={{ width: `${likeMeter}%` }}
                aria-label="Like meter"
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
          {/* Phases */}
          {phase === "intro" && (
            <div className="p-6 md:p-8 text-center">
              <p className="text-gray-700 leading-relaxed">
                {t(
                  "zh-tw:準備好在天台當主角了嗎？先選擇你的身份唷。|zh-cn:准备好在天台当主角了吗？先选择你的身份。|en:Ready to be the lead on the rooftop? Choose your role to begin.",
                  currentLanguage
                )}
              </p>
              <button
                onClick={() => setPhase("role")}
                className="mt-6 inline-block px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-pink-700 shadow hover:scale-105 transition"
              >
                {t("zh-tw:開始|zh-cn:开始|en:Start", currentLanguage)}
              </button>
            </div>
          )}

          {phase === "role" && (
            <div className="p-6 md:p-8">
              <h2 className="text-center text-xl md:text-2xl font-extrabold mb-6">
                {t("zh-tw:選擇你的角色|zh-cn:选择你的角色|en:Choose Your Role", currentLanguage)}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roleCards.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => startRole(r.id)}
                    className="rounded-xl border-2 border-transparent hover:border-pink-300 bg-gradient-to-br from-pink-50 to-blue-50 p-5 text-left shadow transition"
                  >
                    <div className="text-3xl">{r.emoji}</div>
                    <div className="mt-2 font-bold">{t(r.name, currentLanguage)}</div>
                    <div className="text-gray-600 text-sm">{t(r.traits, currentLanguage)}</div>
                  </button>
                ))}
              </div>

              <p className="mt-6 text-xs text-gray-500">
                {t(
                  "zh-tw:提示：對話中可使用臺灣語氣詞（啦、嘛、欸），更貼近在地語感。|zh-cn:提示：对话中可使用台湾语气词。|en:Tip: sprinkle Taiwanese particles like 啦/嘛/欸 for authentic tone.",
                  currentLanguage
                )}
              </p>
            </div>
          )}

          {phase === "chat" && (
            <div className="flex flex-col h-[70vh]">
              {/* chat area */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-white to-pink-50/40">
                {/* opener only once */}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mb-3 flex ${m.who === "you" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%]`}>
                      {m.who === "bot" && <div className="text-xl">🍎</div>}
                      <div
                        className={`rounded-2xl px-4 py-2 shadow text-[15px] leading-relaxed ${
                          m.who === "you"
                            ? "bg-indigo-500 text-white rounded-br-sm"
                            : "bg-white text-gray-800 border border-pink-100 rounded-bl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                      {m.who === "you" && <div className="text-xl">🫶</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* action bar */}
              <div className="p-4 md:p-5 border-t bg-white">
                {/* quick choices */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {scene.choices.map((c) => (
                    <button
                      key={c.text}
                      onClick={() => handleChoice(c)}
                      className="px-3 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-sm font-semibold transition"
                    >
                      {t(c.label, currentLanguage)}
                    </button>
                  ))}
                </div>

                {/* hint line (mobile first) */}
                <div className="text-xs text-gray-500 mb-3">
                  {t("zh-tw:小撇步：長按選項可看語用提示。|zh-cn:小提示：长按选项可看语用提示。|en:Pro tip: long-press a choice to see usage hints.", currentLanguage)}
                </div>

                {/* free input */}
                <div className="flex gap-2">
                  <input
                    value={freeInput}
                    onChange={(e) => setFreeInput(e.target.value)}
                    placeholder={t("zh-tw:自己輸入台詞…|zh-cn:自己输入台词…|en:Type your line…", currentLanguage)}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <button
                    onClick={handleFreeSend}
                    className="px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-pink-700 shadow hover:scale-105 transition"
                  >
                    {t("zh-tw:送出|zh-cn:送出|en:Send", currentLanguage)}
                  </button>
                </div>
              </div>
            </div>
          )}

          {phase === "victory" && (
            <div className="p-8 text-center">
              <div className="text-5xl mb-3">💖</div>
              <h3 className="text-2xl font-extrabold text-pink-600">
                {t("zh-tw:成功告白！|zh-cn:成功告白！|en:Confession Successful!", currentLanguage)}
              </h3>
              <p className="text-gray-600 mt-2">
                {t("zh-tw:好感度滿分，恭喜你解鎖新場景與進階台詞！|zh-cn:好感度满分，恭喜解锁新场景与进阶台词！|en:Max affection—new scenes & advanced lines unlocked!", currentLanguage)}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/learn" className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  ← {t("zh-tw:回到分類|zh-cn:回到分类|en:Back to Categories", currentLanguage)}
                </Link>
                <button onClick={() => setPhase("intro")} className="px-5 py-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600">
                  {t("zh-tw:再玩一次|zh-cn:再玩一次|en:Play Again", currentLanguage)}
                </button>
              </div>
            </div>
          )}

          {phase === "fail" && (
            <div className="p-8 text-center">
              <div className="text-5xl mb-3">💔</div>
              <h3 className="text-2xl font-extrabold text-rose-600">
                {t("zh-tw:告白失敗…|zh-cn:告白失败…|en:Confession Failed…", currentLanguage)}
              </h3>
              <p className="text-gray-600 mt-2">
                {t("zh-tw:別灰心，再換一種說法吧！|zh-cn:别灰心，换一种说法！|en:Don’t worry—try a different approach!", currentLanguage)}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/learn" className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  ← {t("zh-tw:回到分類|zh-cn:回到分类|en:Back to Categories", currentLanguage)}
                </Link>
                <button onClick={() => setPhase("intro")} className="px-5 py-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600">
                  {t("zh-tw:重新開始|zh-cn:重新开始|en:Restart", currentLanguage)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer help card (TW flavor + learning aid) */}
        <div className="mt-6 text-xs text-gray-600 leading-relaxed">
          <div className="bg-white/70 border border-pink-100 rounded-2xl p-4 shadow">
            <div className="font-semibold mb-1">
              {t("zh-tw:學習小幫手：|zh-cn:学习小帮手：|en:Learning helper:", currentLanguage)}
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("zh-tw:台灣口語常用語氣詞：啦／嘛／欸／喔。|zh-cn:台湾口语常用语气词：啦/嘛/欸/喔。|en:Taiwanese particles to sound natural: 啦, 嘛, 欸, 喔.", currentLanguage)}</li>
              <li>{t("zh-tw:告白語氣避免太命令；多用『其實、老實說、我覺得』。|zh-cn:告白语气避免命令，多用缓冲词。|en:Avoid imperative tone; use softeners like “其實/老實說/我覺得”.", currentLanguage)}</li>
              <li>{t("zh-tw:換同義說法也能加分：喜歡你→對你有好感／很在意你。|zh-cn:同义改写：喜欢你→对你有好感。|en:Paraphrasing helps: “like you” → “have feelings for you”.", currentLanguage)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
