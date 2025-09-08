import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('謝謝你的訊息！我們會盡快回覆你的～');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
      <div className="container">
        {/* Header Section */}
        <div className="section-header">
          <h1 className="section-title">
            <span data-text="zh-tw:聯絡我們|zh-cn:联系我们|en:Contact Us">
              聯絡我們
            </span>
          </h1>
          <p className="section-subtitle">
            <span data-text="zh-tw:有任何想法或建議嗎？我們很想聽聽你的聲音！|zh-cn:有任何想法或建议吗？我们很想听听你的声音！|en:Have any ideas or suggestions? We'd love to hear from you!">
              有任何想法或建議嗎？我們很想聽聽你的聲音！
            </span>
          </p>
        </div>

        {/* Contact Form and Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          marginBottom: '80px'
        }}>
          {/* Contact Form */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.1)',
            border: '2px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h3 style={{
              marginBottom: '30px',
              color: '#333',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>💌</span>
              <span data-text="zh-tw:寫信給我們|zh-cn:写信给我们|en:Send us a Message">
                寫信給我們
              </span>
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  <span data-text="zh-tw:姓名 / Name|zh-cn:姓名 / Name|en:Name">
                    姓名 / Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="請輸入你的姓名"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  <span data-text="zh-tw:電子郵件 / Email|zh-cn:电子邮件 / Email|en:Email">
                    電子郵件 / Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="請輸入你的電子郵件"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  <span data-text="zh-tw:主題 / Subject|zh-cn:主题 / Subject|en:Subject">
                    主題 / Subject
                  </span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="你想聊什麼呢？"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  <span data-text="zh-tw:訊息 / Message|zh-cn:信息 / Message|en:Message">
                    訊息 / Message
                  </span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="告訴我們你的想法、建議，或是你最喜歡的台劇場景..."
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                💕 <span data-text="zh-tw:送出訊息|zh-cn:发送信息|en:Send Message">送出訊息</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #f8faff, #e8f0ff)',
              padding: '30px',
              borderRadius: '15px',
              borderLeft: '4px solid #667eea'
            }}>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '15px',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>🎬</span>
                <span data-text="zh-tw:想要合作嗎？|zh-cn:想要合作吗？|en:Want to Collaborate?">
                  想要合作嗎？
                </span>
              </h4>
              <p style={{ marginBottom: '15px', lineHeight: 1.6 }}>
                <span data-text="zh-tw:如果你是內容創作者、台劇製作團隊，或是對語言教育充滿熱情的夥伴，我們很樂意與你合作！|zh-cn:如果你是内容创作者、台剧制作团队，或是对语言教育充满热情的伙伴，我们很乐意与你合作！|en:If you're a content creator, drama production team, or passionate language education partner, we'd love to collaborate!">
                  如果你是內容創作者、台劇製作團隊，或是對語言教育充滿熱情的夥伴，我們很樂意與你合作！
                </span>
              </p>
              <p>
                <strong data-text="zh-tw:合作信箱：|zh-cn:合作邮箱：|en:Partnership:">合作信箱：</strong>
                <span style={{ color: '#667eea' }}>youyong189@gmail.com
</span>
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f8faff, #e8f0ff)',
              padding: '30px',
              borderRadius: '15px',
              borderLeft: '4px solid #667eea'
            }}>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '15px',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>💡</span>
                <span data-text="zh-tw:有好點子？|zh-cn:有好点子？|en:Have Ideas?">
                  有好點子？
                </span>
              </h4>
              <p style={{ marginBottom: '15px', lineHeight: 1.6 }}>
                <span data-text="zh-tw:想看到特定的台劇場景？有什麼學習功能的建議？或是發現了什麼 bug？歡迎隨時告訴我們！|zh-cn:想看到特定的台剧场景？有什么学习功能的建议？或是发现了什么 bug？欢迎随时告诉我们！|en:Want to see specific drama scenes? Have learning feature suggestions? Found a bug? Feel free to let us know anytime!">
                  想看到特定的台劇場景？有什麼學習功能的建議？或是發現了什麼 bug？歡迎隨時告訴我們！
                </span>
              </p>
              <p>
                <strong data-text="zh-tw:建議信箱：|zh-cn:建议邮箱：|en:Feedback:">建議信箱：</strong>
                <span style={{ color: '#667eea' }}>youyong189@gmail.com
</span>
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f8faff, #e8f0ff)',
              padding: '30px',
              borderRadius: '15px',
              borderLeft: '4px solid #667eea'
            }}>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '15px',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>🤝</span>
                <span data-text="zh-tw:加入社群|zh-cn:加入社群|en:Join Community">
                  加入社群
                </span>
              </h4>
              <p style={{ marginBottom: '15px', lineHeight: 1.6 }}>
                <span data-text="zh-tw:加入我們的學習社群，與其他台劇愛好者一起練習中文，分享學習心得！|zh-cn:加入我们的学习社群，与其他台剧爱好者一起练习中文，分享学习心得！|en:Join our learning community to practice Chinese with other drama enthusiasts and share learning experiences!">
                  加入我們的學習社群，與其他台劇愛好者一起練習中文，分享學習心得！
                </span>
              </p>
              <div style={{ marginTop: '15px' }}>
                <a href="#" style={{
                  display: 'inline-block',
                  marginRight: '15px',
                  padding: '8px 15px',
                  background: '#667eea',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}>
                  📱 <span data-text="zh-tw:Discord 社群|zh-cn:Discord 社群|en:Discord Community">Discord 社群</span>
                </a>
                <a href="#" style={{
                  display: 'inline-block',
                  padding: '8px 15px',
                  background: '#667eea',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}>
                  📺 <span data-text="zh-tw:YouTube 頻道|zh-cn:YouTube 频道|en:YouTube Channel">YouTube 頻道</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px',
          padding: '60px',
          background: 'linear-gradient(135deg, #f8faff, #e8f0ff)',
          borderRadius: '20px'
        }}>
          <h3 style={{
            marginBottom: '20px',
            color: '#667eea',
            fontSize: '1.8rem'
          }}>
            <span data-text="zh-tw:常見問題 FAQ|zh-cn:常见问题 FAQ|en:Frequently Asked Questions">
              常見問題 FAQ
            </span>
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '40px',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>
                🤔 <span data-text="zh-tw:什麼時候正式上線？|zh-cn:什么时候正式上线？|en:When will it officially launch?">什麼時候正式上線？</span>
              </h4>
              <p style={{ color: '#666' }}>
                <span data-text="zh-tw:我們正在努力開發中！預計 2025 年夏天開放 Beta 測試版本。現在就加入等候名單，搶先體驗吧！|zh-cn:我们正在努力开发中！预计 2025 年夏天开放 Beta 测试版本。现在就加入等候名单，抢先体验吧！|en:We're working hard on development! Beta testing is expected to open in summer 2025. Join the waitlist now for early access!">
                  我們正在努力開發中！預計 2025 年夏天開放 Beta 測試版本。現在就加入等候名單，搶先體驗吧！
                </span>
              </p>
            </div>
            <div>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>
                💰 <span data-text="zh-tw:使用費用如何？|zh-cn:使用费用如何？|en:What are the costs?">使用費用如何？</span>
              </h4>
              <p style={{ color: '#666' }}>
                <span data-text="zh-tw:我們會提供免費的基礎內容，以及付費的進階功能。具體定價將在正式上線前公布。|zh-cn:我们会提供免费的基础内容，以及付费的进阶功能。具体定价将在正式上线前公布。|en:We'll offer free basic content and paid premium features. Specific pricing will be announced before official launch.">
                  我們會提供免費的基礎內容，以及付費的進階功能。具體定價將在正式上線前公布。
                </span>
              </p>
            </div>
            <div>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>
                📱 <span data-text="zh-tw:支援哪些裝置？|zh-cn:支持哪些设备？|en:What devices are supported?">支援哪些裝置？</span>
              </h4>
              <p style={{ color: '#666' }}>
                <span data-text="zh-tw:支援網頁版、iOS 和 Android App。未來也會考慮推出 Switch 等遊戲平台版本！|zh-cn:支持网页版、iOS 和 Android App。未来也会考虑推出 Switch 等游戏平台版本！|en:Supports web, iOS and Android apps. We may also consider gaming platforms like Switch in the future!">
                  支援網頁版、iOS 和 Android App。未來也會考慮推出 Switch 等遊戲平台版本！
                </span>
              </p>
            </div>
            <div>
              <h4 style={{ color: '#333', marginBottom: '10px' }}>
                🎯 <span data-text="zh-tw:適合什麼程度的學習者？|zh-cn:适合什么程度的学习者？|en:What level of learners is it suitable for?">適合什麼程度的學習者？</span>
              </h4>
              <p style={{ color: '#666' }}>
                <span data-text="zh-tw:從 HSK 2 到 HSK 6 都有對應內容。無論你是初學者還是進階學習者，都能找到適合的劇情挑戰！|zh-cn:从 HSK 2 到 HSK 6 都有对应内容。无论你是初学者还是进阶学习者，都能找到适合的剧情挑战！|en:Content ranges from HSK 2 to HSK 6. Whether you're a beginner or advanced learner, you'll find suitable drama challenges!">
                  從 HSK 2 到 HSK 6 都有對應內容。無論你是初學者還是進階學習者，都能找到適合的劇情挑戰！
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}