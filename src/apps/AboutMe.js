/**
 * About Me App - Personal information displayed like System Properties
 */

export const AboutMe = {
  title: 'About Me',
  icon: 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect x="2" y="2" width="28" height="28" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
      <circle cx="16" cy="12" r="6" fill="#000080"/>
      <ellipse cx="16" cy="28" rx="10" ry="6" fill="#000080"/>
    </svg>
  `),
  width: 420,
  height: 380,
  
  getConfig() {
    return {
      title: this.title,
      icon: this.icon,
      width: this.width,
      height: this.height,
      content: this.getContent()
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
        .about-tabs {
          display: flex;
          gap: 0;
          margin-bottom: -2px;
          position: relative;
          z-index: 1;
        }
        .about-tab {
          padding: 4px 16px;
          background: var(--win-bg);
          border: 2px solid;
          border-color: var(--win-border-light) var(--win-border-dark) transparent var(--win-border-light);
          cursor: pointer;
        }
        .about-tab.active {
          background: var(--win-bg);
          border-bottom-color: var(--win-bg);
          padding-bottom: 6px;
          margin-bottom: -2px;
        }
        .about-content {
          flex: 1;
          border: 2px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          padding: 16px;
          background: var(--win-bg);
          overflow-y: auto;
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
                <p>Full Stack Developer</p>
                <p>Version 1.0.0 (Human Build)</p>
              </div>
            </div>
            
            <div class="about-section">
              <h3>About</h3>
              <p>Welcome to my Windows 98-inspired portfolio! I'm a developer who loves building creative web experiences and solving complex problems.</p>
              <p style="margin-top: 8px;">This portfolio is built with vanilla JavaScript, no frameworks - just like the good old days.</p>
            </div>

            <div class="about-section">
              <h3>System Specifications</h3>
              <p>🖥️ Primary IDE: VS Code</p>
              <p>☕ Fuel: Coffee</p>
              <p>🎮 Hobby: Retro Computing</p>
            </div>
          </div>
          
          <div class="tab-panel" id="tab-skills">
            <div class="about-section">
              <h3>Languages</h3>
              <div class="about-list">
                <span class="about-tag">JavaScript</span>
                <span class="about-tag">TypeScript</span>
                <span class="about-tag">Python</span>
                <span class="about-tag">HTML/CSS</span>
                <span class="about-tag">SQL</span>
              </div>
            </div>
            
            <div class="about-section">
              <h3>Frameworks & Tools</h3>
              <div class="about-list">
                <span class="about-tag">React</span>
                <span class="about-tag">Node.js</span>
                <span class="about-tag">Next.js</span>
                <span class="about-tag">Vite</span>
                <span class="about-tag">Git</span>
              </div>
            </div>
            
            <div class="about-section">
              <h3>Interests</h3>
              <div class="about-list">
                <span class="about-tag">Web Dev</span>
                <span class="about-tag">UI/UX</span>
                <span class="about-tag">Open Source</span>
                <span class="about-tag">Retro Tech</span>
              </div>
            </div>
          </div>
          
          <div class="tab-panel" id="tab-contact">
            <div class="about-section">
              <h3>Get In Touch</h3>
              <div class="about-links">
                <p><a href="https://github.com/a1gbr" target="_blank">📁 GitHub</a></p>
                <p><a href="https://linkedin.com/in/a1gbr" target="_blank">💼 LinkedIn</a></p>
                <p><a href="mailto:hello@a1gbr.com">📧 Email</a></p>
              </div>
            </div>
            
            <div class="about-section">
              <h3>Availability</h3>
              <p>Currently open to new opportunities and collaborations.</p>
              <p style="margin-top: 8px;">Feel free to reach out!</p>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        (function() {
          const tabs = document.querySelectorAll('.about-tab');
          const panels = document.querySelectorAll('.tab-panel');
          
          tabs.forEach(tab => {
            tab.addEventListener('click', () => {
              tabs.forEach(t => t.classList.remove('active'));
              panels.forEach(p => p.classList.remove('active'));
              
              tab.classList.add('active');
              document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
            });
          });
        })();
      </script>
    `;
  }
};

export default AboutMe;
