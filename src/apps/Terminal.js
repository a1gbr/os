/**
 * Terminal App - Command line interface
 */

export const Terminal = {
  title: 'Command Prompt',
  icon: 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect x="2" y="2" width="28" height="28" fill="#000000" stroke="#808080" stroke-width="1"/>
      <text x="4" y="14" fill="#c0c0c0" font-family="monospace" font-size="10">C:\\&gt;_</text>
    </svg>
  `),
  width: 650,
  height: 400,

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
        .terminal {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          background: #000000;
          color: #c0c0c0;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 8px;
          box-sizing: border-box;
        }
        .terminal-output {
          flex: 1;
          overflow-y: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .terminal-output a {
          color: #00ff00;
        }
        .terminal-input-line {
          display: flex;
          align-items: center;
        }
        .terminal-prompt {
          color: #c0c0c0;
          margin-right: 4px;
        }
        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #00ff00;
          font-family: inherit;
          font-size: inherit;
          caret-color: #00ff00;
        }
        .terminal-cursor {
          display: inline-block;
          width: 8px;
          height: 14px;
          background: #c0c0c0;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .terminal-green { color: #00ff00; }
        .terminal-yellow { color: #ffff00; }
        .terminal-cyan { color: #00ffff; }
        .terminal-red { color: #ff0000; }
      </style>
      
      <div class="terminal">
        <div class="terminal-output" id="terminal-output">a1gbr Command Prompt [Version 1.0.0]
(C) 2024 a1gbr. All rights reserved.

Type 'help' for a list of commands.

</div>
        <div class="terminal-input-line">
          <span class="terminal-prompt">C:\\&gt;</span>
          <input type="text" class="terminal-input" id="terminal-input" autofocus spellcheck="false" autocomplete="off">
        </div>
      </div>
      
      <script>
        (function() {
          const output = document.getElementById('terminal-output');
          const input = document.getElementById('terminal-input');
          const history = [];
          let historyIndex = -1;
          
          const commands = {
            help: () => \`
<span class="terminal-yellow">Available Commands:</span>
  help      - Show this help message
  about     - Learn about me
  whoami    - Display current user
  skills    - List my technical skills
  projects  - Show my projects
  contact   - Get my contact info
  github    - Open my GitHub
  linkedin  - Open my LinkedIn
  email     - Send me an email
  clear     - Clear the terminal
  date      - Show current date/time
  echo      - Echo a message
  secret    - ???
\`,
            about: () => \`
<span class="terminal-cyan">About Me</span>
━━━━━━━━━━━
I'm a full-stack developer passionate about creating
unique web experiences. This portfolio is a love letter
to the golden age of computing - Windows 98 style!

I believe in clean code, creative solutions, and
never forgetting where we came from.
\`,
            whoami: () => '<span class="terminal-green">visitor@a1gbr.com</span>',
            
            skills: () => \`
<span class="terminal-cyan">Technical Skills</span>
━━━━━━━━━━━━━━━━━
<span class="terminal-yellow">Languages:</span>    JavaScript, TypeScript, Python, SQL
<span class="terminal-yellow">Frontend:</span>     React, Vue, HTML/CSS, Tailwind
<span class="terminal-yellow">Backend:</span>      Node.js, Express, FastAPI
<span class="terminal-yellow">Database:</span>     PostgreSQL, MongoDB, Redis
<span class="terminal-yellow">Tools:</span>        Git, Docker, AWS, Cloudflare
\`,
            projects: () => \`
<span class="terminal-cyan">My Projects</span>
━━━━━━━━━━━━
📁 Windows93 Portfolio - This site!
📁 Project Alpha       - Full-stack web app
📁 Data Visualizer     - Interactive dashboards
📁 CLI Tool            - Developer productivity
📁 Mobile App          - Cross-platform app

<span class="terminal-yellow">Tip:</span> Open the Projects folder for more details!
\`,
            contact: () => \`
<span class="terminal-cyan">Contact Information</span>
━━━━━━━━━━━━━━━━━━━━
📧 Email:    hello@a1gbr.com
🐙 GitHub:   github.com/a1gbr
💼 LinkedIn: linkedin.com/in/a1gbr
🌐 Website:  a1gbr.com
\`,
            github: () => {
              window.open('https://github.com/a1gbr', '_blank');
              return '<span class="terminal-green">Opening GitHub...</span>';
            },
            linkedin: () => {
              window.open('https://linkedin.com/in/a1gbr', '_blank');
              return '<span class="terminal-green">Opening LinkedIn...</span>';
            },
            email: () => {
              window.open('mailto:hello@a1gbr.com');
              return '<span class="terminal-green">Opening email client...</span>';
            },
            clear: () => {
              output.innerHTML = '';
              return '';
            },
            date: () => new Date().toString(),
            echo: (args) => args.join(' ') || '',
            secret: () => \`
<span class="terminal-yellow">🎉 You found the secret!</span>

  ██╗  ██╗██╗
  ██║  ██║██║
  ███████║██║
  ██╔══██║██║
  ██║  ██║██║
  ╚═╝  ╚═╝╚═╝

Thanks for exploring! You're awesome. 🚀
\`,
          };
          
          function processCommand(cmd) {
            const [command, ...args] = cmd.trim().toLowerCase().split(' ');
            
            if (!command) return '';
            
            if (commands[command]) {
              return commands[command](args);
            }
            
            return \`<span class="terminal-red">'\${command}' is not recognized as a command.
Type 'help' for a list of available commands.</span>\`;
          }
          
          function appendOutput(text) {
            output.innerHTML += text + '\\n';
            output.scrollTop = output.scrollHeight;
          }
          
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              const cmd = input.value;
              appendOutput('C:\\\\>' + cmd);
              
              if (cmd.trim()) {
                history.unshift(cmd);
                historyIndex = -1;
                const result = processCommand(cmd);
                if (result) appendOutput(result);
              }
              
              input.value = '';
              appendOutput('');
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
              }
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              if (historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
              } else {
                historyIndex = -1;
                input.value = '';
              }
            }
          });
          
          // Focus input when clicking terminal
          document.querySelector('.terminal').addEventListener('click', () => {
            input.focus();
          });
        })();
      </script>
    `;
  }
};

export default Terminal;
