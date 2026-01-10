/**
 * Projects App - Showcase projects in a file explorer style
 */
import {
  folder as folderIconData,
  folderSmall,
  urlShortcut as urlIconData,
  urlShortcutSmall,
} from "../icons/win98Icons.js";

export const Projects = {
  title: "My Projects",
  icon: folderIconData,
  width: 600,
  height: 450,

  getConfig() {
    return {
      title: this.title,
      icon: this.icon,
      width: this.width,
      height: this.height,
      content: this.getContent(),
      menubar: ["File", "Edit", "View", "Help"],
      onInit: (container) => this.onInit(container),
    };
  },

  getContent() {
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
        .toolbar-btn:hover:not(.disabled) {
          border: 1px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
        }
        .toolbar-btn:active:not(.disabled) {
          border: 1px solid;
          border-color: var(--win-border-dark) var(--win-border-light) var(--win-border-light) var(--win-border-dark);
        }
        .toolbar-btn.disabled {
          opacity: 0.5;
          cursor: default;
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
          position: relative;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 8px;
        }
        .project-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px;
          cursor: pointer;
          text-align: center;
          border: 1px solid transparent;
          user-select: none;
        }
        .project-item:hover {
          background: #e8e8e8;
        }
        .project-item.focused {
          border: 1px dotted #000;
        }
        .project-item.focused:not(.selected) .project-name {
          text-decoration: underline;
        }
        .project-item.selected {
          background: #000080;
          color: white;
        }
        .project-item.selected.focused {
          border: 1px dotted #fff;
        }
        .project-icon {
          width: 32px;
          height: 32px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-icon img,
        .project-icon svg {
          width: 32px;
          height: 32px;
          pointer-events: none;
        }
        .project-name {
          font-size: 11px;
          word-break: break-word;
          max-width: 72px;
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
          border: 1px solid;
          border-color: var(--win-border-darker) var(--win-border-light) var(--win-border-light) var(--win-border-darker);
        }
        .projects-statusbar-section:first-child {
          flex: 1;
        }
        /* Win98 Context Menu */
        .context-menu {
          position: fixed;
          background: var(--win-bg);
          border: 2px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          box-shadow:
            inset 1px 1px 0 var(--win-bg-light),
            inset -1px -1px 0 var(--win-border-darker),
            2px 2px 4px rgba(0, 0, 0, 0.25);
          padding: 2px;
          min-width: 150px;
          z-index: 10000;
          display: none;
        }
        .context-menu.visible {
          display: block;
        }
        .context-menu-item {
          padding: 4px 24px 4px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .context-menu-item:hover:not(.disabled) {
          background: var(--win-selection);
          color: var(--win-selection-text);
        }
        .context-menu-item.disabled {
          color: var(--win-border-darker);
          text-shadow: 1px 1px 0 var(--win-white);
          cursor: default;
        }
        .context-menu-item.bold {
          font-weight: bold;
        }
        .context-menu-separator {
          height: 1px;
          background: var(--win-border-darker);
          box-shadow: 0 1px 0 var(--win-border-light);
          margin: 4px 2px;
        }

        /* Win98 Properties Dialog */
        .props-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 10001;
          display: none;
        }
        .props-overlay.visible {
          display: block;
        }
        .props-dialog {
          position: fixed;
          background: var(--win-bg);
          border: 2px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          box-shadow:
            inset 1px 1px 0 var(--win-bg-light),
            inset -1px -1px 0 var(--win-border-darker),
            4px 4px 8px rgba(0, 0, 0, 0.3);
          width: 380px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }
        .props-titlebar {
          display: flex;
          align-items: center;
          height: 18px;
          padding: 2px 3px;
          background: linear-gradient(90deg, #000080, #1084d0);
          cursor: move;
          flex-shrink: 0;
          /* Ensure titlebar is tall enough for touch on mobile */
          min-height: 24px;
          /* Prevent touch callout/context menu on long press */
          -webkit-touch-callout: none;
        }
        .props-titlebar-icon {
          width: 16px;
          height: 16px;
          margin-left: 2px;
          margin-right: 4px;
        }
        .props-titlebar-icon img,
        .props-titlebar-icon svg {
          width: 16px;
          height: 16px;
        }
        .props-titlebar-text {
          flex: 1;
          color: white;
          font-weight: bold;
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .props-titlebar-close {
          width: 16px;
          height: 14px;
          background: var(--win-bg);
          border: 2px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
          line-height: 1;
        }
        .props-titlebar-close:active {
          border-color: var(--win-border-dark) var(--win-border-light) var(--win-border-light) var(--win-border-dark);
        }
        .props-body {
          padding: 8px;
          flex: 1;
          overflow-y: auto;
        }
        /* Properties Tabs */
        .props-tabs {
          display: flex;
          position: relative;
          padding-left: 2px;
          margin-bottom: 0;
        }
        .props-tab {
          position: relative;
          padding: 3px 12px 2px 12px;
          margin-right: 2px;
          background: var(--win-bg);
          border: 1.5px solid;
          border-bottom: none;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          cursor: pointer;
          z-index: 0;
        }
        .props-tab.active {
          padding-bottom: 4px;
          margin-bottom: -2px;
          border-bottom: 2px solid var(--win-bg);
          z-index: 2;
        }
        .props-tab.active::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 1px dotted #000;
        }
        .props-content {
          border: 1.5px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          padding: 16px;
          background: var(--win-bg);
          position: relative;
          z-index: 1;
        }
        .props-tab-panel {
          display: none;
        }
        .props-tab-panel.active {
          display: block;
        }
        /* Properties Content Styles */
        .props-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--win-border-darker);
        }
        .props-header-icon {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .props-header-icon img,
        .props-header-icon svg {
          width: 32px;
          height: 32px;
        }
        .props-header-name {
          flex: 1;
          padding: 2px 4px;
          border: 2px solid;
          border-color: var(--win-border-darker) var(--win-border-light) var(--win-border-light) var(--win-border-darker);
          box-shadow: inset 1px 1px 0 var(--win-border-dark);
          background: var(--win-white);
          font-size: 11px;
        }
        .props-row {
          display: flex;
          margin-bottom: 6px;
        }
        .props-label {
          width: 80px;
          color: #000;
        }
        .props-value {
          flex: 1;
          color: #000;
          word-break: break-all;
        }
        .props-value a {
          color: #0000ff;
          text-decoration: underline;
        }
        .props-value a:hover {
          color: #ff0000;
        }
        .props-divider {
          height: 2px;
          margin: 12px 0;
          background: var(--win-border-darker);
          box-shadow: 0 1px 0 var(--win-border-light);
        }
        .props-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
        }
        .props-tech-tag {
          background: #000080;
          color: white;
          padding: 2px 6px;
          font-size: 10px;
        }
        .props-desc {
          margin-top: 8px;
          padding: 8px;
          background: var(--win-white);
          border: 2px solid;
          border-color: var(--win-border-darker) var(--win-border-light) var(--win-border-light) var(--win-border-darker);
          box-shadow: inset 1px 1px 0 var(--win-border-dark);
          min-height: 40px;
        }
        /* Properties Buttons */
        .props-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 6px;
          padding: 8px;
          padding-top: 0;
        }
        .props-btn {
          min-width: 75px;
          height: 23px;
          padding: 0 12px;
          background: var(--win-bg);
          border: 2px solid;
          border-color: var(--win-border-light) var(--win-border-dark) var(--win-border-dark) var(--win-border-light);
          box-shadow:
            inset 1px 1px 0 var(--win-bg-light),
            inset -1px -1px 0 var(--win-border-darker);
          cursor: pointer;
          font-family: var(--win-font);
          font-size: 11px;
        }
        .props-btn:active {
          border-color: var(--win-border-dark) var(--win-border-light) var(--win-border-light) var(--win-border-dark);
          box-shadow: inset 1px 1px 0 var(--win-border-darker);
        }
        .props-btn:focus {
          outline: 1px dotted #000;
          outline-offset: -4px;
        }
      </style>

      <div class="projects-container">
        <div class="projects-toolbar">
          <div class="toolbar-btn disabled" id="btn-back">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="#000" stroke-width="2"/>
            </svg>
            <span class="toolbar-btn-label">Back</span>
          </div>
          <div class="toolbar-btn disabled" id="btn-forward">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="#000" stroke-width="2"/>
            </svg>
            <span class="toolbar-btn-label">Forward</span>
          </div>
          <div class="toolbar-btn disabled" id="btn-up">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <path d="M3 10H17M10 3L10 10" stroke="#000" stroke-width="2"/>
              <rect x="3" y="10" width="14" height="8" fill="#ffcc00" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Up</span>
          </div>
          <div class="toolbar-separator"></div>
          <div class="toolbar-btn disabled">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="14" fill="#c0c0c0" stroke="#000"/>
              <rect x="11" y="3" width="6" height="14" fill="#c0c0c0" stroke="#000"/>
              <line x1="6" y1="10" x2="14" y2="10" stroke="#000" stroke-dasharray="2"/>
            </svg>
            <span class="toolbar-btn-label">Cut</span>
          </div>
          <div class="toolbar-btn disabled">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="10" height="12" fill="#fff" stroke="#000"/>
              <rect x="6" y="2" width="10" height="12" fill="#fff" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Copy</span>
          </div>
          <div class="toolbar-btn disabled">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="6" width="12" height="10" fill="#fff" stroke="#000"/>
              <rect x="6" y="4" width="8" height="4" fill="#c0c0c0" stroke="#000"/>
            </svg>
            <span class="toolbar-btn-label">Paste</span>
          </div>
          <div class="toolbar-separator"></div>
          <div class="toolbar-btn disabled">
            <svg class="toolbar-btn-icon" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="#000" stroke-width="2"/>
              <line x1="16" y1="4" x2="4" y2="16" stroke="#000" stroke-width="2"/>
            </svg>
            <span class="toolbar-btn-label">Delete</span>
          </div>
          <div class="toolbar-btn" id="btn-properties">
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
              <span id="address-path">C:\\Projects\\</span>
            </div>
            <div class="address-combo-btn"></div>
          </div>
        </div>

        <div class="projects-content" id="projects-content">
          <div class="project-grid" id="project-grid"></div>
        </div>

        <div class="projects-statusbar">
          <span class="projects-statusbar-section" id="status-text">0 object(s)</span>
        </div>
      </div>

      <!-- Context Menu -->
      <div class="context-menu" id="context-menu">
        <div class="context-menu-item bold" data-action="open">Open</div>
        <div class="context-menu-item" data-action="explore">Explore</div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item disabled">Cut</div>
        <div class="context-menu-item disabled">Copy</div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item disabled">Create Shortcut</div>
        <div class="context-menu-item disabled">Delete</div>
        <div class="context-menu-item disabled">Rename</div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="properties">Properties</div>
      </div>

      <!-- Properties Dialog -->
      <div class="props-overlay" id="props-overlay">
        <div class="props-dialog">
          <div class="props-titlebar">
            <div class="props-titlebar-icon" id="props-title-icon"></div>
            <span class="props-titlebar-text" id="props-title-text">Properties</span>
            <div class="props-titlebar-close" id="props-close">&times;</div>
          </div>
          <div class="props-body">
            <div class="props-tabs" id="props-tabs"></div>
            <div class="props-content" id="props-content"></div>
          </div>
          <div class="props-buttons">
            <button class="props-btn" id="props-ok">OK</button>
            <button class="props-btn" id="props-cancel">Cancel</button>
          </div>
        </div>
      </div>
    `;
  },

  onInit(container) {
    // File system structure
    const fileSystem = {
      "/": [
        {
          name: "College Projects",
          type: "folder",
          desc: "Various projects completed during college.",
          tech: [],
          created: "2023-02-10",
          modified: "2024-05-22",
        },
        {
          name: "Landing Pages",
          type: "folder",
          desc: "Collection of landing pages created for various projects and events.",
          tech: [],
          created: "2023-06-01",
          modified: "2024-04-12",
        }
      ],
      "/College Projects/": [
        {
          name: "TickTag",
          type: "folder",
          desc: "TickTag Project - Online ticket sales platform with distributed architecture.",
          tech: [],
          created: "2024-10-15",
          modified: "2024-12-20",
        },
        {
          name: "HE110_W0R1D.url",
          type: "url",
          desc: "Educational web content aggregator for aspiring tech professionals. Curated programming resources for beginners.",
          tech: ["HTML", "CSS", "JavaScript"],
          link: "https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2022-1-e1-proj-web-t1-he110_w0r1d",
          created: "2022-03-01",
          modified: "2022-06-15",
        },
        {
          name: "OpenLibrary.url",
          type: "url",
          desc: "Business process application for library workflow automation. Built on Sydle One BPM platform.",
          tech: ["Sydle One", "BPM", "Workflow"],
          link: "https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2022-2-e2-proj-bpm-t4-openlibrary",
          created: "2022-08-01",
          modified: "2022-12-10",
        },
        {
          name: "CLINAST.url",
          type: "url",
          desc: "Clinic management and control application built with Flutter/Dart. Developed in partnership with Clialmed.",
          tech: ["Flutter", "Dart", "Multiplatform"],
          link: "https://github.com/a1gbr/clinast",
          created: "2024-03-01",
          modified: "2024-11-15",
        },
      ],
      "/Landing Pages/": [
        {
          name: "Luana Machado Psicóloga.url",
          type: "url",
          desc: "Landing page for psychologist Luana Machado. Showcases services and contact info.",
          tech: ["HTML", "CSS", "JavaScript", "Astro", "GitHub Pages"],
          link: "https://a1gbr.github.io/luana-psi/",
          created: "2023-05-10",
          modified: "2024-02-20",
        },
        {
          link: "https://desserts-landing-page.vercel.app/",
          name: "Delicia Arte Doceria Artesanal.url",
          type: "url",
          desc: "Responsive landing page for a dessert shop. Features menu, testimonials, and contact form.",
          tech: ["HTML", "CSS", "JavaScript", "Next.js", "Vercel"],
          created: "2023-07-15",
          modified: "2024-03-10",
        },
        {
          link: "https://a1gbr.github.io/brenda-odonto/",
          name: "Dra. Brenda Costa Odonto.url",
          type: "url",
          desc: "Landing page for dentist Brenda Costa. Showcases services and contact info.",
          tech: ["HTML", "Tailwind", "TypeScript", "Next.js", "GitHub Pages"],
          created: "2023-08-20",
          modified: "2024-01-15",
        },
      ],
      "/College Projects/TickTag/": [
        {
          name: "Backend.url",
          type: "url",
          desc: "Java/Spring Boot backend for TickTag - an online ticket sales platform with scalable architecture.",
          tech: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
          link: "https://github.com/sales-victor/TickTag",
          created: "2024-10-17",
          modified: "2024-12-15",
        },
        {
          name: "Frontend.url",
          type: "url",
          desc: "React frontend for TickTag ticket sales platform. Responsive design for desktop and mobile.",
          tech: ["React", "JavaScript", "CSS", "Docker"],
          link: "https://github.com/ThiagoVini13/ticktag-frontend",
          created: "2024-10-17",
          modified: "2024-12-18",
        },
        {
          name: "Mobile.url",
          type: "url",
          desc: "Cross-platform mobile app for TickTag using Expo/React Native with TypeScript.",
          tech: ["React Native", "Expo", "TypeScript"],
          link: "https://github.com/sales-victor/ticktag-mobile",
          created: "2024-11-20",
          modified: "2024-12-10",
        },
        {
          name: "Documentation.url",
          type: "url",
          desc: "Full documentation and project specs for TickTag - distributed ticket sales system with load balancing.",
          tech: ["GitHub"],
          link: "https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-2-pe6-t3-g11-venda-de-tickets",
          created: "2024-10-15",
          modified: "2024-12-20",
        },
      ],
    };

    let currentPath = "/";
    let history = ["/"];
    let historyIndex = 0;
    let selectedItem = null;
    let focusedItem = null;

    const grid = container.querySelector("#project-grid");
    const addressPath = container.querySelector("#address-path");
    const statusText = container.querySelector("#status-text");
    const contextMenu = container.querySelector("#context-menu");
    const btnBack = container.querySelector("#btn-back");
    const btnForward = container.querySelector("#btn-forward");
    const btnUp = container.querySelector("#btn-up");
    const btnProperties = container.querySelector("#btn-properties");

    // Properties dialog elements
    const propsOverlay = container.querySelector("#props-overlay");
    const propsDialog = container.querySelector(".props-dialog");
    const propsTitlebar = container.querySelector(".props-titlebar");
    const propsTitleIcon = container.querySelector("#props-title-icon");
    const propsTitleText = container.querySelector("#props-title-text");
    const propsClose = container.querySelector("#props-close");
    const propsTabs = container.querySelector("#props-tabs");
    const propsContent = container.querySelector("#props-content");
    const propsOk = container.querySelector("#props-ok");
    const propsCancel = container.querySelector("#props-cancel");

    // Drag state for properties dialog
    let propsDragState = null;

    // Debounce flag to prevent double-click timing issues
    let isNavigating = false;
    let lastDblClickTime = 0;

    // Icon helpers - create img tags from icon paths/data URIs
    function createIconImg(iconSrc, size = 32) {
      return `<img src="${iconSrc}" width="${size}" height="${size}" style="image-rendering: pixelated;" alt="">`;
    }

    const folderIcon = createIconImg(folderIconData, 32);
    const urlIcon = createIconImg(urlIconData, 32);
    const folderIconSmall = createIconImg(folderSmall, 16);
    const urlIconSmall = createIconImg(urlShortcutSmall, 16);

    function getFileType(item) {
      if (item.type === "folder") return "File Folder";
      if (item.type === "url") return "Internet Shortcut";
      if (item.type === "txt") return "Text Document";
      if (item.type === "exe") return "Application";
      return "File";
    }

    function getFileIcon(item, small = false) {
      if (item.type === "folder") return small ? folderIconSmall : folderIcon;
      return small ? urlIconSmall : urlIcon;
    }

    function showProperties(item) {
      if (!item) return;

      const items = fileSystem[currentPath];
      const data = items[item.dataset.index];

      // Set title
      propsTitleIcon.innerHTML = getFileIcon(data, true);
      propsTitleText.textContent = data.name + " Properties";

      // Build tabs based on type
      let tabs = ["General"];
      if (data.type === "url") {
        tabs.push("Web Document");
      }

      // Render tabs
      propsTabs.innerHTML = tabs
        .map(
          (tab, i) => `
        <div class="props-tab ${
          i === 0 ? "active" : ""
        }" data-tab="${i}">${tab}</div>
      `
        )
        .join("");

      // Render content based on type
      let generalContent = `
        <div class="props-header">
          <div class="props-header-icon">${getFileIcon(data)}</div>
          <input type="text" class="props-header-name" value="${
            data.name
          }" readonly>
        </div>

        <div class="props-row">
          <span class="props-label">Type:</span>
          <span class="props-value">${getFileType(data)}</span>
        </div>
        ${
          data.type === "url"
            ? `
        <div class="props-row">
          <span class="props-label">URL:</span>
          <span class="props-value"><a href="${data.link}" target="_blank">${data.link}</a></span>
        </div>
        `
            : ""
        }
        <div class="props-row">
          <span class="props-label">Location:</span>
          <span class="props-value">C:\\Projects${currentPath.replace(
            /\//g,
            "\\"
          )}</span>
        </div>

        <div class="props-divider"></div>

        ${
          data.created
            ? `
        <div class="props-row">
          <span class="props-label">Created:</span>
          <span class="props-value">${data.created}</span>
        </div>
        `
            : ""
        }
        ${
          data.modified
            ? `
        <div class="props-row">
          <span class="props-label">Modified:</span>
          <span class="props-value">${data.modified}</span>
        </div>
        `
            : ""
        }

        ${
          data.tech && data.tech.length > 0
            ? `
        <div class="props-divider"></div>
        <div class="props-row">
          <span class="props-label">Tech Stack:</span>
        </div>
        <div class="props-tech">
          ${data.tech
            .map((t) => `<span class="props-tech-tag">${t}</span>`)
            .join("")}
        </div>
        `
            : ""
        }

        ${
          data.desc
            ? `
        <div class="props-divider"></div>
        <div class="props-row">
          <span class="props-label">Description:</span>
        </div>
        <div class="props-desc">${data.desc}</div>
        `
            : ""
        }
      `;

      let webDocContent = "";
      if (data.type === "url") {
        webDocContent = `
          <div class="props-row">
            <span class="props-label">URL:</span>
          </div>
          <input type="text" class="props-header-name" value="${data.link}" readonly style="width: 100%; margin-bottom: 12px;">

          <div class="props-row">
            <span class="props-label">Shortcut Key:</span>
            <span class="props-value">None</span>
          </div>

          <div class="props-divider"></div>

          <div class="props-row">
            <span class="props-label">Visits:</span>
            <span class="props-value">0</span>
          </div>

          <div class="props-row">
            <span class="props-label">Make this page available offline</span>
          </div>
        `;
      }

      // Combine panels
      propsContent.innerHTML = `
        <div class="props-tab-panel active" data-panel="0">${generalContent}</div>
        ${
          data.type === "url"
            ? `<div class="props-tab-panel" data-panel="1">${webDocContent}</div>`
            : ""
        }
      `;

      // Tab switching
      propsTabs.querySelectorAll(".props-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          propsTabs
            .querySelectorAll(".props-tab")
            .forEach((t) => t.classList.remove("active"));
          propsContent
            .querySelectorAll(".props-tab-panel")
            .forEach((p) => p.classList.remove("active"));
          tab.classList.add("active");
          propsContent
            .querySelector(`[data-panel="${tab.dataset.tab}"]`)
            .classList.add("active");
        });
      });

      // Center and show dialog
      const dialogWidth = 380;
      const dialogHeight = propsDialog.offsetHeight || 400;
      propsDialog.style.left = `${(window.innerWidth - dialogWidth) / 2}px`;
      propsDialog.style.top = `${(window.innerHeight - dialogHeight) / 2}px`;
      propsOverlay.classList.add("visible");
    }

    function hideProperties() {
      propsOverlay.classList.remove("visible");
    }

    function renderFolder(path) {
      const items = fileSystem[path] || [];
      grid.innerHTML = "";

      items.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "project-item";
        div.dataset.index = index;
        div.dataset.type = item.type;
        div.dataset.name = item.name;

        div.innerHTML = `
          <div class="project-icon">${
            item.type === "folder" ? folderIcon : urlIcon
          }</div>
          <div class="project-name">${item.name}</div>
        `;

        grid.appendChild(div);
      });

      // Update address bar
      addressPath.textContent = "C:\\\\Projects" + path.replace(/\//g, "\\\\");
      statusText.textContent = items.length + " object(s)";

      // Update navigation buttons
      updateNavButtons();

      // Set focus (dotted border) on first item without selecting it
      const firstItem = grid.querySelector(".project-item");
      if (firstItem) {
        focusedItem = firstItem;
        firstItem.classList.add("focused");
      } else {
        focusedItem = null;
      }
    }

    function updateNavButtons() {
      btnBack.classList.toggle("disabled", historyIndex <= 0);
      btnForward.classList.toggle(
        "disabled",
        historyIndex >= history.length - 1
      );
      btnUp.classList.toggle("disabled", currentPath === "/");
    }

    function navigateTo(path) {
      if (fileSystem[path]) {
        if (historyIndex < history.length - 1) {
          history = history.slice(0, historyIndex + 1);
        }
        history.push(path);
        historyIndex = history.length - 1;
        currentPath = path;
        selectedItem = null;
        focusedItem = null;
        renderFolder(path);
      }
    }

    function goBack() {
      if (historyIndex > 0) {
        historyIndex--;
        currentPath = history[historyIndex];
        selectedItem = null;
        focusedItem = null;
        renderFolder(currentPath);
      }
    }

    function goForward() {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        currentPath = history[historyIndex];
        selectedItem = null;
        focusedItem = null;
        renderFolder(currentPath);
      }
    }

    function goUp() {
      if (currentPath !== "/") {
        const parts = currentPath.split("/").filter((p) => p);
        parts.pop();
        const parentPath = "/" + (parts.length ? parts.join("/") + "/" : "");
        navigateTo(parentPath);
      }
    }

    function openItem(item) {
      // Prevent double-firing due to timing issues
      if (isNavigating) return;
      
      const items = fileSystem[currentPath];
      const index = parseInt(item.dataset.index, 10);
      const data = items?.[index];

      if (!data) return;

      // Verify the item name matches what we expect (extra safety)
      if (item.dataset.name !== data.name) return;

      // Use dataset.type for immediate check, data for actual values
      if (item.dataset.type === "folder" && data.type === "folder") {
        isNavigating = true;
        const newPath = currentPath + data.name + "/";
        navigateTo(newPath);
        // Reset flag after navigation completes
        setTimeout(() => { isNavigating = false; }, 100);
      } else if (item.dataset.type === "url" && data.type === "url" && data.link && data.link !== "#") {
        isNavigating = true;
        window.open(data.link, "_blank");
        setTimeout(() => { isNavigating = false; }, 100);
      }
    }

    function hideContextMenu() {
      contextMenu.classList.remove("visible");
    }

    function showContextMenu(x, y, item) {
      const items = fileSystem[currentPath];
      const data = items ? items[item?.dataset?.index] : null;

      const openBtn = contextMenu.querySelector('[data-action="open"]');
      const exploreBtn = contextMenu.querySelector('[data-action="explore"]');
      const propsBtn = contextMenu.querySelector('[data-action="properties"]');

      if (data?.type === "folder") {
        openBtn.textContent = "Open";
        exploreBtn.style.display = "block";
      } else {
        openBtn.textContent = "Open";
        exploreBtn.style.display = "none";
      }

      // Enable/disable properties based on selection
      if (item) {
        propsBtn.classList.remove("disabled");
      } else {
        propsBtn.classList.add("disabled");
      }

      contextMenu.style.left = x + "px";
      contextMenu.style.top = y + "px";
      contextMenu.classList.add("visible");

      const rect = contextMenu.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        contextMenu.style.left = x - rect.width + "px";
      }
      if (rect.bottom > window.innerHeight) {
        contextMenu.style.top = y - rect.height + "px";
      }
    }

    // Event listeners
    grid.addEventListener("click", (e) => {
      // Ignore clicks that are part of a double-click sequence
      if (Date.now() - lastDblClickTime < 300) return;
      
      const item = e.target.closest(".project-item");
      hideContextMenu();

      // Clear previous focus and selection
      grid
        .querySelectorAll(".project-item")
        .forEach((i) => i.classList.remove("selected", "focused"));

      if (item) {
        // Click sets both focus and selection
        item.classList.add("selected", "focused");
        selectedItem = item;
        focusedItem = item;
      } else {
        selectedItem = null;
        focusedItem = null;
      }
    });

    grid.addEventListener("dblclick", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Record double-click time to suppress subsequent click events
      lastDblClickTime = Date.now();
      
      // Ignore if already navigating
      if (isNavigating) return;
      
      const item = e.target.closest(".project-item");
      if (item && item.dataset.index !== undefined) {
        openItem(item);
      }
    });

    grid.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const item = e.target.closest(".project-item");

      grid
        .querySelectorAll(".project-item")
        .forEach((i) => i.classList.remove("selected", "focused"));

      if (item) {
        item.classList.add("selected", "focused");
        selectedItem = item;
        focusedItem = item;
        showContextMenu(e.clientX, e.clientY, item);
      } else {
        selectedItem = null;
        focusedItem = null;
        showContextMenu(e.clientX, e.clientY, null);
      }
    });

    contextMenu.addEventListener("click", (e) => {
      const menuItem = e.target.closest(".context-menu-item");
      if (!menuItem || menuItem.classList.contains("disabled")) return;

      const action = menuItem.dataset.action;

      if (action === "open" && selectedItem) {
        openItem(selectedItem);
      } else if (action === "explore" && selectedItem) {
        const items = fileSystem[currentPath];
        const data = items[selectedItem.dataset.index];
        if (data.type === "folder") {
          const newPath = currentPath + data.name + "/";
          navigateTo(newPath);
        }
      } else if (action === "properties" && selectedItem) {
        showProperties(selectedItem);
      }

      hideContextMenu();
    });

    document.addEventListener("click", (e) => {
      if (!contextMenu.contains(e.target)) {
        hideContextMenu();
      }
    });

    // Toolbar buttons
    btnBack.addEventListener("click", () => {
      if (!btnBack.classList.contains("disabled")) goBack();
    });

    btnForward.addEventListener("click", () => {
      if (!btnForward.classList.contains("disabled")) goForward();
    });

    btnUp.addEventListener("click", () => {
      if (!btnUp.classList.contains("disabled")) goUp();
    });

    btnProperties.addEventListener("click", () => {
      if (selectedItem) {
        showProperties(selectedItem);
      }
    });

    // Properties dialog buttons
    propsClose.addEventListener("click", hideProperties);
    propsOk.addEventListener("click", hideProperties);
    propsCancel.addEventListener("click", hideProperties);

    // Properties dialog dragging
    propsTitlebar.addEventListener("mousedown", (e) => {
      if (e.target.closest(".props-titlebar-close")) return;
      propsDragState = {
        startX: e.clientX,
        startY: e.clientY,
        startLeft: propsDialog.offsetLeft,
        startTop: propsDialog.offsetTop,
      };
    });

    document.addEventListener("mousemove", (e) => {
      if (!propsDragState) return;
      const newLeft =
        propsDragState.startLeft + (e.clientX - propsDragState.startX);
      const newTop =
        propsDragState.startTop + (e.clientY - propsDragState.startY);
      propsDialog.style.left = `${Math.max(0, newLeft)}px`;
      propsDialog.style.top = `${Math.max(0, newTop)}px`;
    });

    document.addEventListener("mouseup", () => {
      propsDragState = null;
    });

    propsOverlay.addEventListener("click", (e) => {
      if (e.target === propsOverlay) {
        hideProperties();
      }
    });

    // Keyboard navigation for grid
    container.addEventListener("keydown", (e) => {
      const items = grid.querySelectorAll(".project-item");
      if (items.length === 0) return;

      const itemsArray = Array.from(items);
      const currentIndex = focusedItem ? itemsArray.indexOf(focusedItem) : -1;

      // Calculate grid columns for arrow navigation
      const gridStyle = window.getComputedStyle(grid);
      const gridTemplateColumns = gridStyle.getPropertyValue("grid-template-columns");
      const columns = gridTemplateColumns.split(" ").length || 1;

      let newIndex = currentIndex;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          newIndex = Math.min(currentIndex + 1, itemsArray.length - 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          newIndex = Math.max(currentIndex - 1, 0);
          break;
        case "ArrowDown":
          e.preventDefault();
          newIndex = Math.min(currentIndex + columns, itemsArray.length - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          newIndex = Math.max(currentIndex - columns, 0);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedItem) {
            // Select and open the focused item
            grid.querySelectorAll(".project-item").forEach((i) => i.classList.remove("selected"));
            focusedItem.classList.add("selected");
            selectedItem = focusedItem;
            openItem(focusedItem);
          }
          return;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = itemsArray.length - 1;
          break;
        default:
          return;
      }

      // Move focus to new item (without selecting)
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < itemsArray.length) {
        items.forEach((i) => i.classList.remove("focused"));
        const newFocusedItem = itemsArray[newIndex];
        newFocusedItem.classList.add("focused");
        focusedItem = newFocusedItem;
        // Scroll into view if needed
        newFocusedItem.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });

    // Make the grid focusable for keyboard events
    grid.setAttribute("tabindex", "0");
    grid.style.outline = "none";

    // Initial render
    renderFolder("/");
  },
};

export default Projects;
