/**
 * Windows 98 Authentic Icons
 * Pixel-perfect SVG icons following Win98 design rules:
 * - 32x32 or 16x16 pixel grids
 * - 1px black outlines
 * - 3D shading (highlight top-left, shadow bottom-right)
 * - Authentic color palette
 */

const encode = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg.trim());

// ============================================================================
// 32x32 ICONS
// ============================================================================

/**
 * About Me / User icon - Win98 Users style
 * Person silhouette with blue shirt
 */
export const aboutMe = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- Background -->
  <rect x="1" y="1" width="30" height="30" fill="#C0C0C0"/>
  <!-- 3D border -->
  <path d="M1 1h30M1 1v30" stroke="#FFFFFF" fill="none"/>
  <path d="M31 1v30M1 31h30" stroke="#808080" fill="none"/>
  <path d="M2 30h28M30 2v28" stroke="#404040" fill="none"/>
  <!-- Head -->
  <rect x="12" y="5" width="8" height="8" fill="#FFCC99"/>
  <rect x="12" y="5" width="8" height="1" fill="#FFE0B3"/>
  <rect x="12" y="5" width="1" height="8" fill="#FFE0B3"/>
  <rect x="12" y="5" width="8" height="8" fill="none" stroke="#000"/>
  <!-- Hair -->
  <rect x="12" y="4" width="8" height="2" fill="#4A3000"/>
  <!-- Body/Shirt -->
  <path d="M8 26V19c0-3 3-5 8-5s8 2 8 5v7z" fill="#000080"/>
  <path d="M8 19c0-3 3-5 8-5" stroke="#0000B0" fill="none"/>
  <path d="M8 26V19c0-3 3-5 8-5s8 2 8 5v7z" fill="none" stroke="#000"/>
  <!-- Collar -->
  <path d="M14 15l2 3 2-3" fill="#FFF" stroke="#000" stroke-width="0.5"/>
</svg>
`);

/**
 * Terminal / MS-DOS Prompt icon
 * Black window with command prompt
 */
export const terminal = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- Window frame -->
  <rect x="2" y="2" width="28" height="28" fill="#C0C0C0"/>
  <path d="M2 2h28M2 2v28" stroke="#FFF" fill="none"/>
  <path d="M30 2v28M2 30h28" stroke="#404040" fill="none"/>
  <!-- Title bar -->
  <rect x="3" y="3" width="26" height="4" fill="#000080"/>
  <!-- Title dots -->
  <rect x="5" y="4" width="6" height="2" fill="#FFF"/>
  <!-- Close button area -->
  <rect x="25" y="4" width="3" height="2" fill="#C0C0C0"/>
  <!-- Black terminal area -->
  <rect x="3" y="8" width="26" height="21" fill="#000"/>
  <!-- C:\> prompt -->
  <rect x="5" y="10" width="2" height="3" fill="#C0C0C0"/>
  <rect x="8" y="10" width="1" height="3" fill="#C0C0C0"/>
  <rect x="10" y="13" width="1" height="1" fill="#C0C0C0"/>
  <rect x="12" y="10" width="2" height="1" fill="#C0C0C0"/>
  <rect x="12" y="12" width="2" height="1" fill="#C0C0C0"/>
  <!-- Cursor block -->
  <rect x="16" y="10" width="3" height="3" fill="#C0C0C0"/>
</svg>
`);

/**
 * Notepad icon - Win98 style with spiral binding
 */
export const notepad = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- Paper with fold -->
  <path d="M6 2h14l6 6v22H6z" fill="#FFFFF0"/>
  <path d="M6 2h14l6 6v22H6z" fill="none" stroke="#000"/>
  <!-- Dog-ear fold -->
  <path d="M20 2v6h6" fill="#C0C0C0" stroke="#000"/>
  <path d="M20 8L26 2" stroke="#808080" fill="none"/>
  <!-- Spiral binding -->
  <rect x="3" y="5" width="2" height="2" fill="#000080" rx="1"/>
  <rect x="3" y="10" width="2" height="2" fill="#000080" rx="1"/>
  <rect x="3" y="15" width="2" height="2" fill="#000080" rx="1"/>
  <rect x="3" y="20" width="2" height="2" fill="#000080" rx="1"/>
  <rect x="3" y="25" width="2" height="2" fill="#000080" rx="1"/>
  <!-- Text lines -->
  <rect x="9" y="10" width="10" height="1" fill="#000080"/>
  <rect x="9" y="14" width="14" height="1" fill="#000080"/>
  <rect x="9" y="18" width="12" height="1" fill="#000080"/>
  <rect x="9" y="22" width="8" height="1" fill="#000080"/>
</svg>
`);

/**
 * Folder icon - Win98 yellow folder with 3D shading
 */
export const folder = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- Folder tab (back) -->
  <path d="M2 7h10l2-4h4v4h12v1H2z" fill="#CC9900"/>
  <path d="M2 7h10l2-4h4v4h12" fill="none" stroke="#000"/>
  <!-- Folder body -->
  <rect x="2" y="8" width="28" height="21" fill="#FFCC00"/>
  <!-- 3D highlight -->
  <path d="M2 8h28M2 8v21" stroke="#FFE066" fill="none"/>
  <!-- 3D shadow -->
  <path d="M30 8v21M2 29h28" stroke="#996600" fill="none"/>
  <path d="M29 9v19M3 28h26" stroke="#B38600" fill="none"/>
  <!-- Border -->
  <rect x="2" y="8" width="28" height="21" fill="none" stroke="#000"/>
  <!-- Folder opening highlight -->
  <rect x="4" y="9" width="24" height="2" fill="#FFE066"/>
</svg>
`);

/**
 * URL/Internet Shortcut icon - Document with globe
 */
export const urlShortcut = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- Document base -->
  <path d="M4 2h14l6 6v22H4z" fill="#FFF"/>
  <path d="M4 2h14l6 6v22H4z" fill="none" stroke="#000"/>
  <!-- Dog-ear -->
  <path d="M18 2v6h6" fill="#C0C0C0" stroke="#000"/>
  <!-- Globe -->
  <circle cx="14" cy="18" r="7" fill="#0066CC" stroke="#000"/>
  <!-- Globe lines -->
  <ellipse cx="14" cy="18" rx="3" ry="7" fill="none" stroke="#6699FF"/>
  <path d="M7 18h14M14 11v14" stroke="#6699FF" fill="none"/>
  <!-- Shortcut arrow box -->
  <rect x="2" y="22" width="8" height="8" fill="#FFF" stroke="#000"/>
  <!-- Arrow -->
  <path d="M4 28l4-4M6 24h2v2" fill="none" stroke="#000" stroke-width="1.5"/>
</svg>
`);

/**
 * Text file icon - README.txt style
 */
export const textFile = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- Document -->
  <path d="M6 2h14l6 6v22H6z" fill="#FFF"/>
  <path d="M6 2h14l6 6v22H6z" fill="none" stroke="#000"/>
  <!-- Dog-ear -->
  <path d="M20 2v6h6" fill="#C0C0C0" stroke="#000"/>
  <path d="M20 8l6-6" stroke="#808080" fill="none"/>
  <!-- Text lines -->
  <rect x="9" y="12" width="14" height="1" fill="#808080"/>
  <rect x="9" y="15" width="10" height="1" fill="#808080"/>
  <rect x="9" y="18" width="12" height="1" fill="#808080"/>
  <rect x="9" y="21" width="8" height="1" fill="#808080"/>
  <rect x="9" y="24" width="11" height="1" fill="#808080"/>
</svg>
`);

/**
 * Programs folder - Folder with window icon
 */
export const programsFolder = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- Folder tab -->
  <path d="M2 7h10l2-4h4v4h12v1H2z" fill="#CC9900"/>
  <path d="M2 7h10l2-4h4v4h12" fill="none" stroke="#000"/>
  <!-- Folder body -->
  <rect x="2" y="8" width="28" height="21" fill="#FFCC00"/>
  <path d="M2 8h28M2 8v21" stroke="#FFE066" fill="none"/>
  <path d="M30 8v21M2 29h28" stroke="#996600" fill="none"/>
  <rect x="2" y="8" width="28" height="21" fill="none" stroke="#000"/>
  <!-- Window overlay -->
  <rect x="10" y="13" width="12" height="10" fill="#C0C0C0" stroke="#000"/>
  <rect x="10" y="13" width="12" height="3" fill="#000080"/>
  <path d="M10 13h12" stroke="#FFF" fill="none"/>
  <path d="M10 13v10" stroke="#FFF" fill="none"/>
</svg>
`);

// ============================================================================
// 16x16 ICONS (Small variants)
// ============================================================================

/**
 * Small folder icon
 */
export const folderSmall = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <!-- Tab -->
  <path d="M1 4h4l1-2h3v2h6v1H1z" fill="#CC9900"/>
  <path d="M1 4h4l1-2h3v2h6" fill="none" stroke="#000" stroke-width="0.5"/>
  <!-- Body -->
  <rect x="1" y="5" width="14" height="10" fill="#FFCC00"/>
  <path d="M1 5h14M1 5v10" stroke="#FFE066" fill="none" stroke-width="0.5"/>
  <path d="M15 5v10M1 15h14" stroke="#996600" fill="none" stroke-width="0.5"/>
  <rect x="1" y="5" width="14" height="10" fill="none" stroke="#000" stroke-width="0.5"/>
</svg>
`);

/**
 * Small URL shortcut icon
 */
export const urlShortcutSmall = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <!-- Document -->
  <path d="M2 1h7l3 3v11H2z" fill="#FFF"/>
  <path d="M2 1h7l3 3v11H2z" fill="none" stroke="#000" stroke-width="0.5"/>
  <!-- Fold -->
  <path d="M9 1v3h3" fill="#C0C0C0" stroke="#000" stroke-width="0.5"/>
  <!-- Globe -->
  <circle cx="7" cy="9" r="4" fill="#0066CC" stroke="#000" stroke-width="0.5"/>
  <ellipse cx="7" cy="9" rx="1.5" ry="4" fill="none" stroke="#6699FF" stroke-width="0.5"/>
  <path d="M3 9h8" stroke="#6699FF" fill="none" stroke-width="0.5"/>
  <!-- Arrow box -->
  <rect x="1" y="11" width="4" height="4" fill="#FFF" stroke="#000" stroke-width="0.5"/>
  <path d="M2 14l2-2M3 12h1v1" fill="none" stroke="#000" stroke-width="0.75"/>
</svg>
`);

/**
 * GitHub icon - Pixelated octocat
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
 * LinkedIn icon - Pixelated "in"
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

/**
 * Shut Down icon - Power button
 */
export const shutDown = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <!-- Button background -->
  <rect x="2" y="2" width="12" height="12" fill="#C0C0C0"/>
  <!-- 3D effect -->
  <path d="M2 2h12M2 2v12" stroke="#FFF" fill="none"/>
  <path d="M14 2v12M2 14h12" stroke="#808080" fill="none"/>
  <rect x="2" y="2" width="12" height="12" fill="none" stroke="#000"/>
  <!-- Power symbol circle -->
  <circle cx="8" cy="9" r="4" fill="none" stroke="#FF0000" stroke-width="1.5"/>
  <!-- Power symbol line -->
  <rect x="7" y="4" width="2" height="5" fill="#C0C0C0"/>
  <rect x="7" y="4" width="2" height="5" fill="none" stroke="#FF0000" stroke-width="0.5"/>
</svg>
`);

/**
 * Windows Start button logo - Flying window
 */
export const startLogo = encode(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <!-- Red pane (top-left) -->
  <path d="M1 2L7 1V7H1Z" fill="#FF0000"/>
  <path d="M1 2L7 1V7H1Z" fill="none" stroke="#000" stroke-width="0.5"/>
  <!-- Green pane (top-right) -->
  <path d="M9 1L15 2V7H9Z" fill="#00AA00"/>
  <path d="M9 1L15 2V7H9Z" fill="none" stroke="#000" stroke-width="0.5"/>
  <!-- Blue pane (bottom-left) -->
  <path d="M1 9H7V14L1 15Z" fill="#0000FF"/>
  <path d="M1 9H7V14L1 15Z" fill="none" stroke="#000" stroke-width="0.5"/>
  <!-- Yellow pane (bottom-right) -->
  <path d="M9 9H15V15L9 14Z" fill="#FFCC00"/>
  <path d="M9 9H15V15L9 14Z" fill="none" stroke="#000" stroke-width="0.5"/>
</svg>
`);

// ============================================================================
// EXPORTS
// ============================================================================

export const icons = {
  // 32x32 icons
  aboutMe,
  terminal,
  notepad,
  folder,
  urlShortcut,
  textFile,
  programsFolder,

  // 16x16 icons
  folderSmall,
  urlShortcutSmall,
  github,
  linkedin,
  shutDown,
  startLogo
};

export default icons;
