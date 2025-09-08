export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '70vh' }}>
        <div className="container">
          <div className="hero-content" style={{ textAlign: 'center', display: 'block' }}>
            <div className="hero-text">
              <h1>
                <span data-text="zh-tw:為什麼做這個？|zh-cn:为什么做这个？|en:Why This Project?">
                  為什麼做這個？
                </span>
              </h1>
              <p className="chinese-subtitle">
                <span data-text="zh-tw:一個產品經理的追劇回憶錄|zh-cn:一个产品经理的追剧回忆录|en:A Product Manager's Drama-Watching Memoir">
                  一個產品經理的追劇回憶錄
                </span>
              </p>
              <p className="subtitle">
                <span data-text="zh-tw:其實就是想記錄一下，那些陪我們長大的台劇到底有多經典。順便練習一下前端開發，看能不能把這些回憶做成一個有趣的專案。|zh-cn:其实就是想记录一下，那些陪我们长大的台剧到底有多经典。顺便练习一下前端开发，看能不能把这些回忆做成一个有趣的专案。|en:I just wanted to document how classic the Taiwanese dramas that grew up with us really are. Also practice some frontend development and see if I can turn these memories into an interesting project.">
                  其實就是想記錄一下，那些陪我們長大的台劇到底有多經典。順便練習一下前端開發，看能不能把這些回憶做成一個有趣的專案。
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="drama-showcase">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span data-text="zh-tw:我的追劇史|zh-cn:我的追剧史|en:My Drama History">
                我的追劇史
              </span>
            </h2>
            <p className="section-subtitle">
              <span data-text="zh-tw:從小時候每天準時守在電視機前，到現在用Netflix回味經典|zh-cn:从小时候每天准时守在电视机前，到现在用Netflix回味经典|en:From waiting in front of the TV every day as a kid, to now rewatching classics on Netflix">
                從小時候每天準時守在電視機前，到現在用Netflix回味經典
              </span>
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 800,
                marginBottom: '30px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <span data-text="zh-tw:追劇的意外收穫|zh-cn:追剧的意外收获|en:Unexpected Drama Benefits">
                  追劇的意外收穫
                </span>
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#666',
                marginBottom: '20px'
              }}>
                <span data-text="zh-tw:當我開始學習中文時，台劇成了我最好的老師。時至今日，看劇依然是我精進中文能力的絕佳方式。偷偷說，我從小就夢想能成為台劇演員，但一直沒有勇氣去追尋。我會模仿劇中角色的語氣和台詞，幻想自己也身在其中，哪怕只是個外國人角色，也甘之如飴。|zh-cn:当我开始学习中文时，台剧成了我最好的老师。时至今日，看剧依然是我精进中文能力的绝佳方式。偷偷说，我从小就梦想能成为台剧演员，但一直没有勇气去追寻。我模仿剧中角色的语气和台词，幻想自己也身在其中，哪怕只是个外国人角色，也甘之如饴。|en:When I first started learning Chinese, dramas became my best teacher. Even now, watching dramas is a great way to hone my skills. I secretly wanted to be an actor in Taiwanese and Chinese TV shows, but never had the courage to pursue that dream. I would mimic the characters' sayings and imagine myself in those roles... or at least a role for a white foreigner, haha.">
                  當我開始學習中文時，台劇成了我最好的老師。時至今日，看劇依然是我精進中文能力的絕佳方式。偷偷說，我從小就夢想能成為台劇演員，但一直沒有勇氣去追尋。我會模仿劇中角色的語氣和台詞，幻想自己也身在其中，哪怕只是個外國人角色，也甘之如飴。
                </span>
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#666',
                marginBottom: '20px'
              }}>
                <span data-text="zh-tw:身為一個住在美國的人，台劇是連結台灣文化與社群的絕佳橋樑。透過這些戲劇，我能與有共同興趣的朋友們交流，分享追劇的喜悅。|zh-cn:身为一个住在美国的人，台剧是连结台湾文化与社群的绝佳桥梁。透过这些戏剧，我能与有共同兴趣的朋友们交流，分享追剧的喜悦。|en:As someone living in the States, TV dramas are a great way to connect with the culture and meet like-minded individuals. Through these shows, I can communicate with friends who share the same interests and share the joy of watching dramas.">
                  身為一個住在美國的人，台劇是連結台灣文化與社群的絕佳橋樑。透過這些戲劇，我能與有共同興趣的朋友們交流，分享追劇的喜悅。
                </span>
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #f8faff, #e8f0ff)',
              padding: '40px',
              borderRadius: '20px',
              borderLeft: '4px solid #667eea',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '24px',
                opacity: 0.5
              }}>📺</div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>
                <span data-text="zh-tw:追劇的意外收穫|zh-cn:追剧的意外收获|en:Unexpected Drama Benefits">
                  追劇的意外收穫
                </span>
              </h3>
              <p style={{ lineHeight: 1.6, color: '#555', marginBottom: '15px' }}>
                <span data-text="zh-tw:原本只是想放鬆看劇，沒想到這些台詞竟然這麼有哲理：|zh-cn:原本只是想放松看剧，没想到这些台词竟然这么有哲理：|en:Originally just wanted to relax and watch dramas, didn't expect these lines to be so philosophical:">
                  原本只是想放鬆看劇，沒想到這些台詞竟然這麼有哲理：
                </span>
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px', fontSize: '0.95rem' }}>
                  <span style={{ color: '#667eea' }}>💭</span> 
                  <span data-text="zh-tw:「人生本來就有很多事是徒勞無功的啊」|zh-cn:「人生本来就有很多事是徒劳无功的啊」|en:'Life is full of things that are futile anyway'">
                    「人生本來就有很多事是徒勞無功的啊」
                  </span>
                </li>
                <li style={{ marginBottom: '10px', fontSize: '0.95rem' }}>
                  <span style={{ color: '#667eea' }}>💭</span> 
                  <span data-text="zh-tw:「有些話說出來就變了味」|zh-cn:「有些话说出来就变了味」|en:'Some words change their meaning once spoken'">
                    「有些話說出來就變了味」
                  </span>
                </li>
                <li style={{ fontSize: '0.95rem' }}>
                  <span style={{ color: '#667eea' }}>💭</span> 
                  <span data-text="zh-tw:「大人的世界沒有容易二字」|zh-cn:「大人的世界没有容易二字」|en:'There's no easy in the adult world'">
                    「大人的世界沒有容易二字」
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Goals Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span data-text="zh-tw:這個專案想做什麼|zh-cn:这个专案想做什么|en:What This Project Aims to Do">
                這個專案想做什麼
              </span>
            </h2>
            <p className="section-subtitle">
              <span data-text="zh-tw:不只是回憶殺，也想試試看能不能把技術和回憶結合|zh-cn:不只是回忆杀，也想试试看能不能把技术和回忆结合|en:Not just nostalgia trips, but also seeing if I can combine tech with memories">
                不只是回憶殺，也想試試看能不能把技術和回憶結合
              </span>
            </p>
          </div>
          
          <div className="categories-grid">
            <div className="category-card">
              <span className="category-icon">📱</span>
              <h3>
                <span data-text="zh-tw:記錄台劇文化|zh-cn:记录台剧文化|en:Document Taiwan Drama Culture">
                  記錄台劇文化
                </span>
              </h3>
              <p className="category-description">
                <span data-text="zh-tw:把那些經典台詞、經典場景都整理起來。不只是為了懷舊，而是想讓更多人知道台劇到底有多棒。從《流星花園》到《想見你》，每一部都有它的時代意義。|zh-cn:把那些经典台词、经典场景都整理起来。不只是为了怀旧，而是想让更多人知道台剧到底有多棒。从《流星花园》到《想见你》，每一部都有它的时代意义。|en:Organize all those classic lines and scenes. Not just for nostalgia, but to let more people know how amazing Taiwanese dramas really are. From Meteor Garden to Someday or One Day, each has its historical significance.">
                  把那些經典台詞、經典場景都整理起來。不只是為了懷舊，而是想讓更多人知道台劇到底有多棒。從《流星花園》到《想見你》，每一部都有它的時代意義。
                </span>
              </p>
            </div>
            
            <div className="category-card">
              <span className="category-icon">💻</span>
              <h3>
                <span data-text="zh-tw:練習前端技術|zh-cn:练习前端技术|en:Practice Frontend Skills">
                  練習前端技術
                </span>
              </h3>
              <p className="category-description">
                <span data-text="zh-tw:身為產品經理，平常都在寫PRD和開會，很久沒有實際寫code了。想說趁這個機會練習一下React、CSS動畫，還有響應式設計。做喜歡的東西學習效果最好！|zh-cn:身为产品经理，平常都在写PRD和开会，很久没有实际写code了。想说趁这个机会练习一下React、CSS动画，还有响应式设计。做喜欢的东西学习效果最好！|en:As a product manager, I usually write PRDs and attend meetings - haven't actually coded in a while. Thought I'd take this chance to practice React, CSS animations, and responsive design. Learning works best when you're doing something you love!">
                  身為產品經理，平常都在寫PRD和開會，很久沒有實際寫code了。想說趁這個機會練習一下React、CSS動畫，還有響應式設計。做喜歡的東西學習效果最好！
                </span>
              </p>
            </div>
            
            <div className="category-card">
              <span className="category-icon">🎬</span>
              <h3>
                <span data-text="zh-tw:YouTube 內容創作|zh-cn:YouTube 内容创作|en:YouTube Content Creation">
                  YouTube 內容創作
                </span>
              </h3>
              <p className="category-description">
                <span data-text="zh-tw:想把這個專案的開發過程拍成影片，從構思、設計到實作，看看一個人能不能在業餘時間做出一個有趣的產品。也算是記錄自己的學習歷程吧！|zh-cn:想把这个专案的开发过程拍成影片，从构思、设计到实作，看看一个人能不能在业余时间做出一个有趣的产品。也算是记录自己的学习历程吧！|en:Want to film the development process of this project - from conception, design to implementation. See if one person can create an interesting product in their spare time. Also documenting my own learning journey!">
                  想把這個專案的開發過程拍成影片，從構思、設計到實作，看看一個人能不能在業餘時間做出一個有趣的產品。也算是記錄自己的學習歷程吧！
                </span>
              </p>
            </div>
            
            <div className="category-card">
              <span className="category-icon">🌏</span>
              <h3>
                <span data-text="zh-tw:連結同好|zh-cn:连结同好|en:Connect Fellow Fans">
                  連結同好
                </span>
              </h3>
              <p className="category-description">
                <span data-text="zh-tw:希望能遇到一些同樣喜歡台劇的朋友。不管是想一起討論劇情的、想合作開發功能的，還是單純想聊天回憶的，都很歡迎！畢竟一個人追劇沒有人可以討論真的很寂寞。|zh-cn:希望能遇到一些同样喜欢台剧的朋友。不管是想一起讨论剧情的、想合作开发功能的，还是单纯想聊天回忆的，都很欢迎！毕竟一个人追剧没有人可以讨论真的很寂寞。|en:Hope to meet some friends who also love Taiwanese dramas. Whether you want to discuss plots together, collaborate on development, or just chat about memories - all welcome! After all, watching dramas alone with no one to discuss them with is really lonely.">
                  希望能遇到一些同樣喜歡台劇的朋友。不管是想一起討論劇情的、想合作開發功能的，還是單純想聊天回憶的，都很歡迎！畢竟一個人追劇沒有人可以討論真的很寂寞。
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Channel Section */}
      <section className="stats-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '20px',
            color: 'white'
          }}>
            <span data-text="zh-tw:追蹤開發過程|zh-cn:追踪开发过程|en:Follow the Development">
              追蹤開發過程
            </span>
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '30px',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            <span data-text="zh-tw:想看這個網站是怎麼一步一步做出來的嗎？歡迎來我的YouTube頻道！|zh-cn:想看这个网站是怎么一步一步做出来的吗？欢迎来我的YouTube频道！|en:Want to see how this website was built step by step? Welcome to my YouTube channel!">
              想看這個網站是怎麼一步一步做出來的嗎？歡迎來我的YouTube頻道！
            </span>
          </p>
          <a 
            href="https://www.youtube.com/@YouYong%E8%AF%B4" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            🎬 <span data-text="zh-tw:YouYong说 YouTube 頻道|zh-cn:YouYong说 YouTube 频道|en:YouYong说 YouTube Channel">YouYong说 YouTube 頻道</span>
          </a>
        </div>
      </section>
    </div>
  );
}