/**
 * Windows 98 Authentic Icons
 *
 * Authentic Windows 98 system icons sourced from the official Win98 icon archive
 * at win98icons.alexmeub.com (maintained by Alex Meub)
 *
 * Modern social icons (GitHub, LinkedIn) remain as custom SVGs for compatibility
 * as these services didn't exist in 1998.
 */

// Encoding function for custom SVG icons
const encode = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg.trim());

// ============================================================================
// AUTHENTIC WINDOWS 98 ICONS (32x32)
// ============================================================================

/**
 * About Me / User icon - Authentic Win98 address book user icon
 * Source: address_book_user.png from Win98 icon archive
 */
export const aboutMe = '/assets/icons/system/32x32/user.png';

/**
 * Terminal / MS-DOS Prompt icon - Authentic Win98 MS-DOS icon
 * Source: ms_dos-0.png from Win98 icon archive
 */
export const terminal = '/assets/icons/system/32x32/terminal.png';

/**
 * Notepad icon - Authentic Win98 Notepad application icon
 * Source: notepad-0.png from Win98 icon archive
 */
export const notepad = '/assets/icons/system/32x32/notepad.png';

/**
 * Folder icon - Authentic Win98 yellow folder with 3D shading
 * Source: directory_closed-3.png from Win98 icon archive
 */
export const folder = '/assets/icons/system/32x32/folder.png';

/**
 * URL/Internet Shortcut icon - Authentic Win98 internet shortcut
 * Source: url1-0.png from Win98 icon archive
 */
export const urlShortcut = '/assets/icons/system/32x32/url-shortcut.png';

/**
 * Text file icon - Authentic Win98 document icon
 * Source: document-0.png from Win98 icon archive
 */
export const textFile = '/assets/icons/system/32x32/text-file.png';

/**
 * Programs folder - Authentic Win98 program group icon
 * Source: file_program_group-0.png from Win98 icon archive
 */
export const programsFolder = '/assets/icons/system/32x32/programs-folder.png';

// ============================================================================
// AUTHENTIC WINDOWS 98 ICONS (16x16)
// ============================================================================

/**
 * Small folder icon - Authentic Win98 folder (16x16)
 * Source: directory_closed-3.png from Win98 icon archive
 */
export const folderSmall = '/assets/icons/system/16x16/folder.png';

/**
 * Small URL shortcut icon - Authentic Win98 internet shortcut (16x16)
 * Source: url1-0.png from Win98 icon archive
 */
export const urlShortcutSmall = '/assets/icons/system/16x16/url-shortcut.png';

/**
 * Shut Down icon - Authentic Win98 computer icon
 * Source: computer_2-0.png from Win98 icon archive
 */
export const shutDown = '/assets/icons/system/16x16/shutdown.png';

/**
 * Windows Start button logo - Authentic Win98 Windows logo
 * Source: windows_button-0.png from Win98 icon archive
 */
export const startLogo = '/assets/icons/system/16x16/start-logo.png';

// ============================================================================
// CUSTOM SVG ICONS (Modern services that didn't exist in Win98)
// ============================================================================

/**
 * GitHub icon - Custom pixelated design matching Win98 aesthetic
 * GitHub was founded in 2008, so no authentic Win98 icon exists
 */
export const github = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <!-- Circle background -->
  <circle cx="8" cy="8" r="7" fill="#000" stroke="#000"/>
  <!-- Octocat body (simplified pixel version) -->
  <rect x="5" y="3" width="6" height="4" fill="#FFF"/>
  <rect x="4" y="5" width="2" height="4" fill="#FFF"/>
  <rect x="10" y="5" width="2" height="4" fill="#FFF"/>
  <rect x="5" y="7" width="6" height="4" fill="#FFF"/>
  <rect x="6" y="11" width="1" height="2" fill="#FFF"/>
  <rect x="9" y="11" width="1" height="2" fill="#FFF"/>
  <!-- Eyes -->
  <rect x="6" y="5" width="1" height="2" fill="#000"/>
  <rect x="9" y="5" width="1" height="2" fill="#000"/>
</svg>
`);

/**
 * LinkedIn icon - Custom pixelated design matching Win98 aesthetic
 * LinkedIn was founded in 2002, so no authentic Win98 icon exists
 */
export const linkedin = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <!-- Blue background -->
  <rect x="1" y="1" width="14" height="14" fill="#0077B5"/>
  <!-- 3D effect -->
  <path d="M1 1h14M1 1v14" stroke="#00A0DC" fill="none"/>
  <path d="M15 1v14M1 15h14" stroke="#004B7A" fill="none"/>
  <rect x="1" y="1" width="14" height="14" fill="none" stroke="#000"/>
  <!-- "i" -->
  <rect x="3" y="4" width="2" height="2" fill="#FFF"/>
  <rect x="3" y="7" width="2" height="5" fill="#FFF"/>
  <!-- "n" -->
  <rect x="7" y="7" width="2" height="5" fill="#FFF"/>
  <rect x="7" y="6" width="4" height="2" fill="#FFF"/>
  <rect x="10" y="7" width="2" height="5" fill="#FFF"/>
</svg>
`);

// ============================================================================
// EXPORTS
// ============================================================================

export const icons = {
  // 32x32 authentic Win98 icons
  aboutMe,
  terminal,
  notepad,
  folder,
  urlShortcut,
  textFile,
  programsFolder,

  // 16x16 authentic Win98 icons
  folderSmall,
  urlShortcutSmall,
  shutDown,
  startLogo,

  // 16x16 custom modern icons
  github,
  linkedin
};

export default icons;
