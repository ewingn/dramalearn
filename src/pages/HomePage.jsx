import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span data-text="zh-tw:追劇學中文|zh-cn:追剧学中文|en:Learn Chinese by Binge-Watching">
                  追劇學中文
                </span>
              </h1>
              <p className="chinese-subtitle">
                <span data-text="zh-tw:那些年陪我們長大的台劇|zh-cn:那些年陪我们长大的台剧|en:The dramas that grew up with us">
                  那些年陪我們長大的台劇
                </span>
              </p>
              <p className="subtitle">
                <span data-text="zh-tw:還記得第一次聽到道明寺說「如果道歉有用的話，要警察幹嘛」時的震撼嗎？或是被莫俊傑的「我想見你」感動到哭？讓我們一起重溫那些經典台詞，順便把中文變更好！|zh-cn:还记得第一次听到道明寺说「如果道歉有用的话，要警察干嘛」时的震撼吗？或是被莫俊杰的「我想见你」感动到哭？让我们一起重温那些经典台词，顺便把中文变更好！|en:Remember the shock of hearing Dao Ming Si say 'If apologizing worked, what would we need police for?' Or crying at Mo Jun Jie's 'I want to see you'? Let's relive those classic lines while making our Chinese better!">
                  還記得第一次聽到道明寺說「如果道歉有用的話，要警察幹嘛」時的震撼嗎？或是被莫俊傑的「我想見你」感動到哭？讓我們一起重溫那些經典台詞，順便把中文變更好！
                </span>
              </p>
              <Link 
                to="/learn" 
                className="cta-button kawaii-bounce" 
                style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  fontSize: '1.1rem',
                  padding: '15px 30px'
                }}
              >
                <span data-text="zh-tw:開始回味|zh-cn:开始回味|en:Start Reminiscing">
                  開始回味
                </span>
              </Link>
            </div>
            
            <div className="hero-visual">
              <div className="drama-card">
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div className="drama-badge">
                    <span data-text="zh-tw:今天重溫|zh-cn:今天重温|en:Today's Rewatch">
                      今天重溫
                    </span>
                  </div>
                  <div className="drama-title">
                    <span data-text="zh-tw:想見你|zh-cn:想见你|en:Someday or One Day">
                      想見你
                    </span>
                  </div>
                  <div className="drama-meta">
                    <span data-text="zh-tw:2019・Netflix爆紅|zh-cn:2019・Netflix爆红|en:2019・Netflix Hit">
                      2019・Netflix爆紅
                    </span>
                  </div>
                </div>
                
                <div className="dialogue-preview">
                  <div style={{ marginBottom: '10px', fontSize: '0.95rem' }}>
                    <span className="dialogue-speaker">
                      <span data-text="zh-tw:雨萱|zh-cn:雨萱|en:Yu Xuan">雨萱</span>:
                    </span>
                    <div style={{ color: '#333', margin: '5px 0' }}>
                      <span data-text="zh-tw:我想見你，只想見你，未來過去，我只想見你|zh-cn:我想见你，只想见你，未来过去，我只想见你|en:I want to see you, only want to see you, future and past, I only want to see you">
                        「我想見你，只想見你，未來過去，我只想見你」
                      </span>
                    </div>
                    <div className="dialogue-translation">
                      <span data-text="zh-tw:光這一句就讓多少人哭到不行|zh-cn:光这一句就让多少人哭到不行|en:This one line made so many people cry">
                        光這一句就讓多少人哭到不行
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <small style={{ color: '#666' }}>
                    <span data-text="zh-tw:那些讓我們又哭又笑的台詞|zh-cn:那些让我们又哭又笑的台词|en:Lines that made us cry and laugh">
                      那些讓我們又哭又笑的台詞
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drama Showcase Section */}
      <section className="drama-showcase">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span data-text="zh-tw:那些年的經典台詞|zh-cn:那些年的经典台词|en:Classic Lines Through the Years">
                那些年的經典台詞
              </span>
            </h2>
            <p className="section-subtitle">
              <span data-text="zh-tw:從學生時代追到現在，每一句都是回憶殺|zh-cn:从学生时代追到现在，每一句都是回忆杀|en:From student days to now, every line hits right in the feels">
                從學生時代追到現在，每一句都是回憶殺
              </span>
            </p>
          </div>
          
          <div className="drama-carousel">
            <div className="drama-poster">
              <div className="drama-year">2001</div>
              <h4>
                <span data-text="zh-tw:流星花園|zh-cn:流星花园|en:Meteor Garden">流星花園</span>
              </h4>
              <p>
                <span data-text="zh-tw:如果道歉有用的話，要警察幹嘛？|zh-cn:如果道歉有用的话，要警察干嘛？|en:If apologizing worked, what would we need police for?">
                  「如果道歉有用的話，要警察幹嘛？」
                </span>
              </p>
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                <span data-text="zh-tw:道明寺語錄第一名|zh-cn:道明寺语录第一名|en:Dao Ming Si's #1 quote">道明寺語錄第一名</span>
              </small>
            </div>
            
            <div className="drama-poster">
              <div className="drama-year">2005</div>
              <h4>
                <span data-text="zh-tw:惡作劇之吻|zh-cn:恶作剧之吻|en:It Started with a Kiss">惡作劇之吻</span>
              </h4>
              <p>
                <span data-text="zh-tw:喜歡一個人，是沒有理由的|zh-cn:喜欢一个人，是没有理由的|en:Liking someone needs no reason">
                  「喜歡一個人，是沒有理由的」
                </span>
              </p>
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                <span data-text="zh-tw:直樹的溫柔殺|zh-cn:直树的温柔杀|en:Naoki's gentle blow">直樹的溫柔殺</span>
              </small>
            </div>
            
            <div className="drama-poster">
              <div className="drama-year">2011</div>
              <h4>
                <span data-text="zh-tw:那些年，我們一起追的女孩|zh-cn:那些年，我们一起追的女孩|en:You Are the Apple of My Eye">那些年</span>
              </h4>
              <p>
                <span data-text="zh-tw:人生本來就有很多事是徒勞無功的啊|zh-cn:人生本来就有很多事是徒劳无功的啊|en:Life is full of things that are futile">
                  「人生本來就有很多事是徒勞無功的啊」
                </span>
              </p>
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                <span data-text="zh-tw:柯景騰的青春哲學|zh-cn:柯景腾的青春哲学|en:Ke Jing Teng's youth philosophy">柯景騰的青春哲學</span>
              </small>
            </div>
            
            <div className="drama-poster">
              <div className="drama-year">2020</div>
              <h4>
                <span data-text="zh-tw:想見你|zh-cn:想见你|en:Someday or One Day">想見你</span>
              </h4>
              <p>
                <span data-text="zh-tw:你相信平行時空嗎？|zh-cn:你相信平行时空吗？|en:Do you believe in parallel universes?">
                  「你相信平行時空嗎？」
                </span>
              </p>
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                <span data-text="zh-tw:Netflix神劇開場白|zh-cn:Netflix神剧开场白|en:Netflix masterpiece opener">Netflix神劇開場白</span>
              </small>
            </div>
            
            <div className="drama-poster">
              <div className="drama-year">2022</div>
              <h4>
                <span data-text="zh-tw:華燈初上|zh-cn:华灯初上|en:Light the Night">華燈初上</span>
              </h4>
              <p>
                <span data-text="zh-tw:有些話說出來就變了味|zh-cn:有些话说出来就变了味|en:Some words change their meaning once spoken">
                  「有些話說出來就變了味」
                </span>
              </p>
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                <span data-text="zh-tw:條通媽媽桑的人生智慧|zh-cn:条通妈妈桑的人生智慧|en:Hostess bar mama-san's life wisdom">條通媽媽桑的人生智慧</span>
              </small>
            </div>
            
            <div className="drama-poster">
              <div className="drama-year">2024</div>
              <h4>
                <span data-text="zh-tw:不夠善良的我們|zh-cn:不够善良的我们|en:Us That Weren't Good Enough">不夠善良的我們</span>
              </h4>
              <p>
                <span data-text="zh-tw:大人的世界沒有容易二字|zh-cn:大人的世界没有容易二字|en:There's no easy in the adult world">
                  「大人的世界沒有容易二字」
                </span>
              </p>
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                <span data-text="zh-tw:30歲的現實感|zh-cn:30岁的现实感|en:Reality at 30">30歲的現實感</span>
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>23年</h3>
              <p>
                <span data-text="zh-tw:陪伴追劇歲月|zh-cn:陪伴追剧岁月|en:Years of Drama Watching">
                  陪伴追劇歲月
                </span>
              </p>
            </div>
            <div className="stat-item">
              <h3>無數次</h3>
              <p>
                <span data-text="zh-tw:重播還是會哭|zh-cn:重播还是会哭|en:Still Cry on Rewatches">
                  重播還是會哭
                </span>
              </p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>
                <span data-text="zh-tw:會唱主題曲|zh-cn:会唱主题曲|en:Can Sing Theme Songs">
                  會唱主題曲
                </span>
              </p>
            </div>
            <div className="stat-item">
              <h3>永遠</h3>
              <p>
                <span data-text="zh-tw:青春回憶|zh-cn:青春回忆|en:Youthful Memories">
                  青春回憶
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span data-text="zh-tw:按劇型重溫|zh-cn:按剧型重温|en:Rewatch by Genre">
                按劇型重溫
              </span>
            </h2>
            <p className="section-subtitle">
              <span data-text="zh-tw:想哭的時候看愛情劇，想笑的時候看搞笑劇，心情不同看的劇也不同|zh-cn:想哭的时候看爱情剧，想笑的时候看搞笑剧，心情不同看的剧也不同|en:Watch romance when you want to cry, comedy when you want to laugh - different moods, different dramas">
                想哭的時候看愛情劇，想笑的時候看搞笑劇，心情不同看的劇也不同
              </span>
            </p>
          </div>
          
          <div className="categories-grid">
            <div className="category-card">
              <span className="category-icon">🌸</span>
              <h3>
                <span data-text="zh-tw:校園初戀系|zh-cn:校园初恋系|en:Campus First Love">
                  校園初戀系
                </span>
              </h3>
              <p className="category-subtitle">
                <span data-text="zh-tw:那些年、惡吻經典|zh-cn:那些年、恶吻经典|en:You Are the Apple of My Eye, ISWAK Classics">
                  那些年、惡吻經典
                </span>
              </p>
              <p className="category-description">
                <span data-text="zh-tw:還記得學生時代的心動嗎？那種純純的喜歡，青澀的告白，還有永遠學不會的化學。重溫那些讓我們臉紅心跳的校園時光吧！|zh-cn:还记得学生时代的心动吗？那种纯纯的喜欢，青涩的告白，还有永远学不会的化学。重温那些让我们脸红心跳的校园时光吧！|en:Remember the heart-fluttering moments of student days? That pure love, awkward confessions, and chemistry we never learned. Let's relive those blushing campus moments!">
                  還記得學生時代的心動嗎？那種純純的喜歡，青澀的告白，還有永遠學不會的化學。重溫那些讓我們臉紅心跳的校園時光吧！
                </span>
              </p>
            </div>
            
            <div className="category-card">
              <span className="category-icon">👑</span>
              <h3>
                <span data-text="zh-tw:霸總愛情劇|zh-cn:霸总爱情剧|en:CEO Romance">
                  霸總愛情劇
                </span>
              </h3>
              <p className="category-subtitle">
                <span data-text="zh-tw:流星花園開山鼻祖|zh-cn:流星花园开山鼻祖|en:Meteor Garden Started It All">
                  流星花園開山鼻祖
                </span>
              </p>
              <p className="category-description">
                <span data-text="zh-tw:道明寺把霸總這個角色發揮到極致！從「紅牌」到「壁咚」，從豪門世家到平民女孩，這些套路我們看一百遍還是會心動。|zh-cn:道明寺把霸总这个角色发挥到极致！从「红牌」到「壁咚」，从豪门世家到平民女孩，这些套路我们看一百遍还是会心动。|en:Dao Ming Si perfected the domineering CEO role! From red cards to wall slams, from wealthy families to ordinary girls - we've seen these tropes 100 times and still get butterflies.">
                  道明寺把霸總這個角色發揮到極致！從「紅牌」到「壁咚」，從豪門世家到平民女孩，這些套路我們看一百遍還是會心動。
                </span>
              </p>
            </div>
            
            <div className="category-card">
              <span className="category-icon">🌙</span>
              <h3>
                <span data-text="zh-tw:燒腦神劇|zh-cn:烧脑神剧|en:Mind-Bending">
                  燒腦神劇
                </span>
              </h3>
              <p className="category-subtitle">
                <span data-text="zh-tw:想見你讓全世界暈頭|zh-cn:想见你让全世界晕头|en:Someday or One Day Confused the World">
                  想見你讓全世界暈頭
                </span>
              </p>
              <p className="category-description">
                <span data-text="zh-tw:看完想見你大家都在問：「所以到底誰是誰？」穿越時空、平行宇宙、身體交換...台劇也能拍得這麼燒腦！|zh-cn:看完想见你大家都在问：「所以到底谁是谁？」穿越时空、平行宇宙、身体交换...台剧也能拍得这么烧脑！|en:After watching Someday or One Day, everyone asks: 'So who is who exactly?' Time travel, parallel universes, body swaps... Taiwanese dramas can be this mind-bending too!">
                  看完想見你大家都在問：「所以到底誰是誰？」穿越時空、平行宇宙、身體交換...台劇也能拍得這麼燒腦！
                </span>
              </p>
            </div>
            
            <div className="category-card">
              <span className="category-icon">🍻</span>
              <h3>
                <span data-text="zh-tw:大人的世界|zh-cn:大人的世界|en:Adult World">
                  大人的世界
                </span>
              </h3>
              <p className="category-subtitle">
                <span data-text="zh-tw:華燈初上、不夠善良|zh-cn:华灯初上、不够善良|en:Light the Night, Not Good Enough">
                  華燈初上、不夠善良
                </span>
              </p>
              <p className="category-description">
                <span data-text="zh-tw:長大後才發現，原來大人的愛情這麼複雜。職場政治、婚姻關係、人生選擇...這些劇讓我們看見成年人的無奈與堅強。|zh-cn:长大后才发现，原来大人的爱情这么复杂。职场政治、婚姻关系、人生选择...这些剧让我们看见成年人的无奈与坚强。|en:Growing up, we realized adult love is so complicated. Office politics, marriage relationships, life choices... these dramas show us adult helplessness and strength.">
                  長大後才發現，原來大人的愛情這麼複雜。職場政治、婚姻關係、人生選擇...這些劇讓我們看見成年人的無奈與堅強。
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}