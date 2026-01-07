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
        .projects-toolbar {
          display: flex;
          gap: 4px;
          padding: 4px;
          border-bottom: 1px solid var(--win-border-darker);
          background: var(--win-bg);
        }
        .projects-toolbar button {
          padding: 2px 8px;
          background: var(--win-bg);
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 11px;
        }
        .projects-toolbar button:hover {
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
        }
        .projects-address {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 8px;
          border-bottom: 1px solid var(--win-border-darker);
          background: var(--win-bg);
        }
        .projects-address-input {
          flex: 1;
          height: 20px;
          padding: 2px 4px;
          border: 2px solid;
          border-color: var(--win-border-darker) var(--win-border-light) var(--win-border-light) var(--win-border-darker);
          background: white;
          font-size: 11px;
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
        .projects-statusbar {
          display: flex;
          align-items: center;
          padding: 2px 8px;
          border-top: 2px solid var(--win-border-light);
          background: var(--win-bg);
          font-size: 11px;
        }
      </style>
      
      <div class="projects-container">
        <div class="projects-toolbar">
          <button>Back</button>
          <button>Forward</button>
          <button>Up</button>
        </div>
        
        <div class="projects-address">
          <span>Address:</span>
          <input class="projects-address-input" value="C:\\Projects\\" readonly>
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
          <span>${projects.length} object(s)</span>
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
