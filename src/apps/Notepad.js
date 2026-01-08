/**
 * Notepad App - Simple text editor
 */
import { notepad as notepadIcon } from '../icons/win98Icons.js';

export const Notepad = {
  title: 'Notepad',
  icon: notepadIcon,
  width: 500,
  height: 350,

  getConfig(params = {}) {
    const { filename = 'Untitled', content = '' } = params;
    
    return {
      title: `${filename} - Notepad`,
      icon: this.icon,
      width: this.width,
      height: this.height,
      menubar: ['File', 'Edit', 'Format', 'View', 'Help'],
      content: this.getContent(content),
      statusbar: 'Ln 1, Col 1'
    };
  },

  getContent(initialContent = '') {
    return `
      <style>
        .notepad {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .notepad-textarea {
          flex: 1;
          width: 100%;
          padding: 4px;
          border: none;
          outline: none;
          resize: none;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.4;
          background: white;
        }
        .notepad-textarea:focus {
          outline: none;
        }
      </style>
      
      <div class="notepad">
        <textarea class="notepad-textarea" id="notepad-content" spellcheck="false">${initialContent}</textarea>
      </div>
      
      <script>
        (function() {
          const textarea = document.getElementById('notepad-content');
          
          // Update status bar on cursor move
          textarea.addEventListener('click', updateStatus);
          textarea.addEventListener('keyup', updateStatus);
          
          function updateStatus() {
            const text = textarea.value.substring(0, textarea.selectionStart);
            const lines = text.split('\\n');
            const line = lines.length;
            const col = lines[lines.length - 1].length + 1;
            
            const statusbar = textarea.closest('.window-content').querySelector('.window-statusbar');
            if (statusbar) {
              statusbar.innerHTML = \`<span class="window-statusbar-section">Ln \${line}, Col \${col}</span>\`;
            }
          }
          
          textarea.focus();
        })();
      </script>
    `;
  }
};

export default Notepad;
