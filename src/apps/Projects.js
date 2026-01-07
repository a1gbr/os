/**
 * Projects App - Showcase projects in a file explorer style
 */

export const Projects = {
  title: 'My Projects',
  icon: 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M2 6 L14 6 L16 2 L30 2 L30 28 L2 28 Z" fill="#ffcc00" stroke="#000" stroke-width="1"/>
      <rect x="4" y="8" width="24" height="18" fill="#ffdd55"/>
    </svg>
  `),
  width: 550,
  height: 400,

  getConfig() {
    return {
      title: this.title,
      icon: this.icon,
      width: this.width,
      height: this.height,
      content: this.getContent(),
      menubar: ['File', 'Edit', 'View', 'Help']
    };
  },

  getContent() {
    const projects = [
      {
        name: 'Windows93 Portfolio',
        icon: '💻',
        desc: 'This portfolio! A nostalgic Windows 98 clone built with vanilla JS.',
        tech: ['JavaScript', 'CSS', 'Vite'],
        link: '#'
      },
      {
        name: 'Project Alpha',
        icon: '🚀',
        desc: 'A full-stack web application with real-time features.',
        tech: ['React', 'Node.js', 'Socket.io'],
        link: '#'
      },
      {
        name: 'Data Visualizer',
        icon: '📊',
        desc: 'Interactive data visualization dashboard.',
        tech: ['D3.js', 'Python', 'FastAPI'],
        link: '#'
      },
      {
        name: 'CLI Tool',
        icon: '⌨️',
        desc: 'A developer productivity tool for the command line.',
        tech: ['Node.js', 'TypeScript'],
        link: '#'
      },
      {
        name: 'Mobile App',
        icon: '📱',
        desc: 'Cross-platform mobile application.',
        tech: ['React Native', 'Firebase'],
        link: '#'
      }
    ];

    return `
      <style>
        .projects-container {
          font-family: 'MS Sans Serif', Tahoma, sans-serif;
          font-size: 11px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        /* Win98 Toolbar Style */
        .projects-toolbar {
          display: flex;
          align-items: flex-end;
          gap: 0;
          padding: 2px 4px 2px 4px;
          background: var(--win-bg);
          border-bottom: 1px solid var(--win-border-darker);
          box-shadow: 0 1px 0 var(--win-border-light);
        }
        .toolbar-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          min-width: 36px;
          padding: 2px 4px 1px 4px;
          background: var(--win-bg);
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 10px;
          font-family: var(--win-font);
        }
        .toolbar-btn:hover {
          border: 1px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
        }
        .toolbar-btn:active {
          border: 1px solid;
          border-color: var(--win-border-dark) var(--win-border-light) var(--win-border-light) var(--win-border-dark);
        }
        .toolbar-btn.disabled {
          opacity: 0.5;
          cursor: default;
        }
        .toolbar-btn.disabled:hover {
          border-color: transparent;
        }
        .toolbar-btn-icon {
          width: 20px;
          height: 20px;
          margin-bottom: 1px;
        }
        .toolbar-btn-label {
          font-size: 10px;
          white-space: nowrap;
        }
        .toolbar-separator {
          width: 2px;
          height: 36px;
          margin: 0 3px;
          background: var(--win-border-darker);
          box-shadow: 1px 0 0 var(--win-border-light);
        }
        /* Win98 Address Bar Style */
        .projects-address {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 4px;
          background: var(--win-bg);
          border-bottom: 1px solid var(--win-border-darker);
          box-shadow: 0 1px 0 var(--win-border-light);
        }
        .projects-address-label {
          font-size: 11px;
          padding-right: 2px;
        }
        .address-combo {
          flex: 1;
          display: flex;
          position: relative;
        }
        .address-combo-input {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 4px;
          height: 21px;
          padding: 2px 4px;
          padding-right: 20px;
          border: 2px solid;
          border-color: var(--win-border-darker) var(--win-border-light) var(--win-border-light) var(--win-border-darker);
          box-shadow: inset 1px 1px 0 var(--win-border-dark);
          background: var(--win-white);
          font-size: 11px;
          font-family: var(--win-font);
        }
        .address-combo-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
        .address-combo-btn {
          position: absolute;
          right: 2px;
          top: 2px;
          width: 16px;
          height: calc(100% - 4px);
          background: var(--win-bg);
          border: 2px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .address-combo-btn::after {
          content: '';
          border: 4px solid transparent;
          border-top-color: var(--win-black);
          border-top-width: 4px;
          margin-top: 3px;
        }
        .address-combo-btn:active {
          border-color: var(--win-border-dark) var(--win-border-light) var(--win-border-light) var(--win-border-dark);
        }
        .projects-content {
          flex: 1;
          background: white;
          overflow: auto;
          padding: 8px;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
        }
        .project-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px;
          cursor: pointer;
          text-align: center;
          border: 1px solid transparent;
        }
        .project-item:hover {
          background: #e8e8e8;
        }
        .project-item.selected {
          background: #000080;
          color: white;
        }
        .project-icon {
          font-size: 32px;
          margin-bottom: 4px;
        }
        .project-name {
          font-size: 11px;
          word-break: break-word;
        }
        .project-details {
          position: fixed;
          bottom: 48px;
          left: 0;
          right: 0;
          background: var(--win-bg);
          border-top: 2px solid var(--win-border-light);
          padding: 12px;
          display: none;
        }
        .project-details.visible {
          display: block;
        }
        .project-details h3 {
          margin: 0 0 8px 0;
          font-size: 12px;
        }
        .project-details p {
          margin: 4px 0;
        }
        .project-tech {
          display: flex;
          gap: 4px;
          margin-top: 8px;
        }
        .project-tech span {
          background: #000080;
          color: white;
          padding: 2px 6px;
          font-size: 10px;
        }
        /* Win98 Status Bar Style */
        .projects-statusbar {
          display: flex;
          align-items: center;
          min-height: 20px;
          padding: 2px 2px;
          background: var(--win-bg);
          gap: 2px;
        }
        .projects-statusbar-section {
          display: flex;
          align-items: center;
          padding: 1px 6px;
          min-height: 16px;
          font-size: 11px;
          /* Sunken 3D effect */
          border: 1px solid;
          border-color: var(--win-border-darker) var(--win-border-light) var(--win-border-light) var(--win-border-darker);
        }
        .projects-statusbar-section:first-child {
          flex: 1;
        }
      </style>
      
      <div class="projects-container">
        <div class="projects-toolbar">
          <div class="toolbar-btn disabled">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="#000" stroke-width="2"/>
            </svg>
            <span class="toolbar-btn-label">Back</span>
          </div>
          <div class="toolbar-btn disabled">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="#000" stroke-width="2"/>
            </svg>
            <span class="toolbar-btn-label">Forward</span>
          </div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <path d="M3 10H17M10 3L10 10" stroke="#000" stroke-width="2"/>
              <rect x="3" y="10" width="14" height="8" fill="#ffcc00" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Up</span>
          </div>
          <div class="toolbar-separator"></div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="14" fill="#c0c0c0" stroke="#000"/>
              <rect x="11" y="3" width="6" height="14" fill="#c0c0c0" stroke="#000"/>
              <line x1="6" y1="10" x2="14" y2="10" stroke="#000" stroke-dasharray="2"/>
            </svg>
            <span class="toolbar-btn-label">Cut</span>
          </div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="10" height="12" fill="#fff" stroke="#000"/>
              <rect x="6" y="2" width="10" height="12" fill="#fff" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Copy</span>
          </div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="6" width="12" height="10" fill="#fff" stroke="#000"/>
              <rect x="6" y="4" width="8" height="4" fill="#c0c0c0" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Paste</span>
          </div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <path d="M4 14C6 8 10 6 16 6" stroke="#000" stroke-width="2"/>
              <path d="M12 3L16 6L12 9" stroke="#000" stroke-width="2" fill="none"/>
            </svg>
            <span class="toolbar-btn-label">Undo</span>
          </div>
          <div class="toolbar-separator"></div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="#000" stroke-width="2"/>
              <line x1="16" y1="4" x2="4" y2="16" stroke="#000" stroke-width="2"/>
            </svg>
            <span class="toolbar-btn-label">Delete</span>
          </div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="14" height="14" fill="#fff" stroke="#000"/>
              <line x1="3" y1="7" x2="17" y2="7" stroke="#000"/>
              <line x1="7" y1="7" x2="7" y2="17" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Properties</span>
          </div>
          <div class="toolbar-separator"></div>
          <div class="toolbar-btn">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="3" width="6" height="6" fill="#ffcc00" stroke="#000"/>
              <rect x="10" y="3" width="6" height="6" fill="#ffcc00" stroke="#000"/>
              <rect x="2" y="11" width="6" height="6" fill="#ffcc00" stroke="#000"/>
              <rect x="10" y="11" width="6" height="6" fill="#ffcc00" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Views</span>
          </div>
        </div>

        <div class="projects-address">
          <span class="projects-address-label">Address</span>
          <div class="address-combo">
            <div class="address-combo-input">
              <svg class="address-combo-icon" viewBox="0 0 16 16">
                <path d="M1 4L6 4L7 2L15 2L15 14L1 14Z" fill="#ffcc00" stroke="#000" stroke-width="0.5"/>
              </svg>
              <span>C:\\Projects\\</span>
            </div>
            <div class="address-combo-btn"></div>
          </div>
        </div>
        
        <div class="projects-content">
          <div class="project-grid">
            ${projects.map((p, i) => `
              <div class="project-item" data-index="${i}">
                <div class="project-icon">${p.icon}</div>
                <div class="project-name">${p.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="project-details" id="project-details">
          <h3 id="detail-name"></h3>
          <p id="detail-desc"></p>
          <div class="project-tech" id="detail-tech"></div>
        </div>
        
        <div class="projects-statusbar">
          <span class="projects-statusbar-section">${projects.length} object(s)</span>
        </div>
      </div>
      
      <script>
        (function() {
          const projects = ${JSON.stringify(projects)};
          const items = document.querySelectorAll('.project-item');
          const details = document.getElementById('project-details');
          
          items.forEach(item => {
            item.addEventListener('click', () => {
              items.forEach(i => i.classList.remove('selected'));
              item.classList.add('selected');
              
              const idx = parseInt(item.dataset.index);
              const project = projects[idx];
              
              document.getElementById('detail-name').textContent = project.name;
              document.getElementById('detail-desc').textContent = project.desc;
              document.getElementById('detail-tech').innerHTML = 
                project.tech.map(t => '<span>' + t + '</span>').join('');
              
              details.classList.add('visible');
            });
            
            item.addEventListener('dblclick', () => {
              const idx = parseInt(item.dataset.index);
              const project = projects[idx];
              if (project.link && project.link !== '#') {
                window.open(project.link, '_blank');
              }
            });
          });
        })();
      </script>
    `;
  }
};

export default Projects;
