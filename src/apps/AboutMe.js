/**
 * About Me App - Personal information displayed like System Properties
 */
import { aboutMe as aboutMeIcon } from '../icons/win98Icons.js';

export const AboutMe = {
  title: 'About Me',
  icon: aboutMeIcon,
  width: 420,
  height: 380,
  
  getConfig() {
    return {
      title: this.title,
      icon: this.icon,
      width: this.width,
      height: this.height,
      content: this.getContent(),
      onInit: (container) => this.onInit(container)
    };
  },

  getContent() {
    return `
      <style>
        .about-container {
          font-family: 'MS Sans Serif', Tahoma, sans-serif;
          font-size: 11px;
          padding: 8px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        /* Win98 Tab Control */
        .about-tabs {
          display: flex;
          position: relative;
          padding-left: 2px;
          margin-bottom: 0;
        }
        .about-tab {
          position: relative;
          padding: 3px 8px 2px 8px;
          margin-right: 3px;
          background: var(--win-bg);
          border: 1.5px solid;
          border-bottom: none;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          cursor: pointer;
          z-index: 0;
        }
        .about-tab.active {
          padding-bottom: 4px;
          margin-bottom: -2px;
          border-bottom: 2px solid var(--win-bg);
          z-index: 2;
        }
        /* Dotted focus outline inside active tab */
        .about-tab.active::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 1px dotted #000;
        }
        
        .about-content {
          flex: 1;
          border: 1.5px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          padding: 16px;
          background: var(--win-bg);
          overflow-y: auto;
          position: relative;
          z-index: 1;
        }
        .about-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--win-border-darker);
        }
        .about-logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #000080 0%, #1084d0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
          flex-shrink: 0;
        }
        .about-title h2 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: bold;
        }
        .about-title p {
          margin: 2px 0;
          color: #666;
        }
        .about-section {
          margin-bottom: 16px;
        }
        .about-section h3 {
          font-size: 11px;
          font-weight: bold;
          margin: 0 0 8px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--win-border-darker);
        }
        .about-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .about-note {
          font-size: 10px;
          color: #333;
          margin-top: 8px;
        }
        .about-tag {
          background: #000080;
          color: white;
          padding: 2px 8px;
          font-size: 10px;
        }
        .about-links a {
          color: #0000ff;
          text-decoration: underline;
          cursor: pointer;
          margin-right: 16px;
        }
        .about-links a:hover {
          color: #ff0000;
        }
        .tab-panel {
          display: none;
        }
        .tab-panel.active {
          display: block;
        }
      </style>
      
      <div class="about-container">
        <div class="about-tabs">
          <div class="about-tab active" data-tab="general">General</div>
          <div class="about-tab" data-tab="skills">Skills</div>
          <div class="about-tab" data-tab="contact">Contact</div>
        </div>
        
        <div class="about-content">
          <div class="tab-panel active" id="tab-general">
            <div class="about-header">
              <div class="about-logo">A1</div>
              <div class="about-title">
                <h2>a1gbr</h2>
                <p>Wannabe Developer | ESL Teacher</p>
                <p>Version 0.0.1 (Alpha)</p>
              </div>
            </div>
            
            <div class="about-section">
              <h3>About</h3>
              <p>Welcome to my W98-inspired website! I'm an information systems graduate, coder and a linguistic enthusiast.</p>
              <p style="margin-top: 8px;">This portfolio is built with vanilla JavaScript and Claude Opus 4.5</p>
            </div>

            <div class="about-section">
              <h3>System Specifications</h3>
              <p>🖥️ IDEs: VS Code | IntelliJ</p>
              <p>☕ Fuel: Coffee</p>
              <p>🎮 Hobby: Gaming | Running </p>
            </div>
          </div>
          
          <div class="tab-panel" id="tab-skills">
            <div class="about-section">
            <h3>Professional Stack</h3>
              <div class="about-list">
                <span class="about-tag">Angular</span>
                <span class="about-tag">Spring</span>
                <span class="about-tag">PostgreSQL</span>
                <span class="about-tag">Docker</span>
              </div>
            </div>
            <div class="about-section">
              <h3>Known Languages</h3>
              <div class="about-list">
                <span class="about-tag">Java</span>
                <span class="about-tag">SQL</span>
                <span class="about-tag">C#</span>
                <span class="about-tag">JavaScript</span>
                <span class="about-tag">TypeScript</span>
                <span class="about-tag">Dart</span>
                <span class="about-tag">HTML/CSS</span>
                <span class="about-tag">Python</span>

                
              </div>
            </div>
            
            <div class="about-section">
              <h3>Frameworks</h3>
              <div class="about-list">
                <span class="about-tag">Angular</span>
                <span class="about-tag">Flutter</span>
                <span class="about-tag">ASP.NET</span>
                <span class="about-tag">Spring</span>
                <span class="about-tag">React</span>
                <span class="about-tag">jQuery</span>
                <span class="about-tag">Node.js</span>
                <span class="about-tag">Next.js</span>
                <span class="about-tag">Vite</span>
                <span class="about-tag">Astro</span>
              </div>
            </div>
            
            <div class="about-section">
              <h3>Tools</h3>
              <div class="about-list">
                <span class="about-tag">Git</span>
                <span class="about-tag">GitHub</span>
                <span class="about-tag">MySQL</span>
                <span class="about-tag">AWS EC2</span>
                <span class="about-tag">Heroku</span>
                <span class="about-tag">Vercel</span>
                <span class="about-tag">Cloudflare CI/CD</span>
                <span class="about-tag">Postman</span>
                <span class="about-tag">Figma</span>
              </div>
            </div>
          </div>
          
          <div class="tab-panel" id="tab-contact">
            <div class="about-section">
              <h3>Get In Touch</h3>
              <div class="about-links">
                <p><a href="https://github.com/a1gbr" target="_blank">📁 GitHub</a></p>
                <p><a href="https://linkedin.com/in/a1gbr" target="_blank">💼 LinkedIn</a></p>
                <p><a href="mailto:contato@a1gbr.com">📧 Email</a></p>
              </div>
            </div>
            
            <div class="about-section">
              <h3>Availability</h3>
              <p>Currently seeking new opportunities and collaborations.</p>
              <p style="margin-top: 8px;">Feel free to reach out!</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  onInit(container) {
    const tabs = container.querySelectorAll('.about-tab');
    const panels = container.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        container.querySelector('#tab-' + tab.dataset.tab).classList.add('active');
      });
    });
  }
};

export default AboutMe;
