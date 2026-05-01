/* ===== Adams Chart Visual Companion - script.js ===== */

/* -------- Panels configuration -------- */
const PANELS = {
  full: {
    title: "Full Chart",
    description: "The complete Adams Synchronological Chart. Use this view for orientation across the entire timeline.",
    image: "assets/adams-full.jpg"
  },
  p1:  { title: "Panel 1",  description: "Panel 1 of the Adams Chart.",  image: "assets/panel-01.jpg" },
  p2:  { title: "Panel 2",  description: "Panel 2 of the Adams Chart.",  image: "assets/panel-02.jpg" },
  p3:  { title: "Panel 3",  description: "Panel 3 of the Adams Chart.",  image: "assets/panel-03.jpg" },
  p4:  { title: "Panel 4",  description: "Panel 4 of the Adams Chart.",  image: "assets/panel-04.jpg" },
  p5:  { title: "Panel 5",  description: "Panel 5 of the Adams Chart.",  image: "assets/panel-05.jpg" },
  p6:  { title: "Panel 6",  description: "Panel 6 of the Adams Chart.",  image: "assets/panel-06.jpg" },
  p7:  { title: "Panel 7",  description: "Panel 7 of the Adams Chart.",  image: "assets/panel-07.jpg" },
  p8:  { title: "Panel 8",  description: "Panel 8 of the Adams Chart.",  image: "assets/panel-08.jpg" },
  p9:  { title: "Panel 9",  description: "Panel 9 of the Adams Chart.",  image: "assets/panel-09.jpg" },
  p10: { title: "Panel 10", description: "Panel 10 of the Adams Chart.", image: "assets/panel-10.jpg" }
};

// Order used for Previous / Next navigation
const PANEL_ORDER = ["full", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];

/* -------- Search index --------
   Each entry: { title, type, panel, keywords }
   "panel" must match a key in PANELS (e.g. "p1", "p5", "full").
   Easily expandable: add new objects here or load from a JSON file later.
*/
const SEARCH_INDEX = [
  { title: "Adam",        type: "Person",  panel: "p1",  keywords: ["adam", "creation", "genesis", "first man"] },
  { title: "Noah",        type: "Person",  panel: "p1",  keywords: ["noah", "ark", "flood", "deluge"] },
  { title: "Abraham",     type: "Person",  panel: "p2",  keywords: ["abraham", "patriarch", "ur", "canaan"] },
  { title: "Moses",       type: "Person",  panel: "p2",  keywords: ["moses", "exodus", "law", "sinai"] },
  { title: "Egypt",       type: "Empire",  panel: "p2",  keywords: ["egypt", "pharaoh", "nile", "egyptian"] },
  { title: "Assyria",     type: "Empire",  panel: "p3",  keywords: ["assyria", "assyrian", "nineveh"] },
  { title: "Babylon",     type: "Empire",  panel: "p3",  keywords: ["babylon", "babylonian", "nebuchadnezzar"] },
  { title: "Persia",      type: "Empire",  panel: "p4",  keywords: ["persia", "persian", "cyrus", "darius"] },
  { title: "Greece",      type: "Empire",  panel: "p4",  keywords: ["greece", "greek", "alexander", "hellenistic"] },
  { title: "Rome",        type: "Empire",  panel: "p5",  keywords: ["rome", "roman", "republic", "empire", "caesar"] },
  { title: "Christ",      type: "Person",  panel: "p5",  keywords: ["christ", "jesus", "nativity", "messiah"] },
  { title: "Constantine", type: "Person",  panel: "p6",  keywords: ["constantine", "byzantium", "edict of milan"] },
  { title: "Charlemagne", type: "Person",  panel: "p7",  keywords: ["charlemagne", "frankish", "holy roman empire"] },
  { title: "Columbus",    type: "Person",  panel: "p8",  keywords: ["columbus", "1492", "discovery", "america"] },
  { title: "Luther",      type: "Person",  panel: "p9",  keywords: ["luther", "reformation", "1517", "protestant"] },
  { title: "Napoleon",    type: "Person",  panel: "p10", keywords: ["napoleon", "bonaparte", "french empire", "waterloo"] },
  { title: "1881",        type: "Date",    panel: "p10", keywords: ["1881", "nineteenth century"] }
];

/* -------- DOM references -------- */
const titleEl       = document.getElementById("viewerTitle");
const descEl        = document.getElementById("viewerDescription");
const navButtons    = document.querySelectorAll(".nav-btn");
const searchInput   = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const prevBtn       = document.getElementById("prevBtn");
const nextBtn       = document.getElementById("nextBtn");
const openTabBtn    = document.getElementById("openTabBtn");

/* -------- State -------- */
let currentKey = "full";

/* -------- Initialize OpenSeadragon (single viewer, image type) -------- */
const viewer = OpenSeadragon({
  id: "openseadragon-viewer",
  prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
  tileSources: {
    type: "image",
    url: PANELS[currentKey].image
  },
  showNavigationControl: true,
  showNavigator: false,
  gestureSettingsTouch: { pinchToZoom: true, flickEnabled: true },
  animationTime: 0.4,
  blendTime: 0.1,
  maxZoomPixelRatio: 4
});

/* -------- Load a panel by key -------- */
function loadPanel(key) {
  if (!PANELS[key]) return;
  currentKey = key;
  const panel = PANELS[key];

  // Update header text
  titleEl.textContent = panel.title;
  descEl.textContent  = panel.description;

  // Swap the image in the existing viewer (no new viewer instance)
  viewer.open({
    type: "image",
    url: panel.image
  });

  // Highlight the active button
  navButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.key === key);
  });

  // Enable/disable prev/next at edges
  const idx = PANEL_ORDER.indexOf(key);
  prevBtn.disabled = idx <= 0;
  nextBtn.disabled = idx === -1 || idx >= PANEL_ORDER.length - 1;
}

/* -------- Reset zoom whenever a new image is opened -------- */
viewer.addHandler("open", () => {
  viewer.viewport.goHome(true);
});

/* -------- Navigation buttons -------- */
navButtons.forEach(btn => {
  btn.addEventListener("click", () => loadPanel(btn.dataset.key));
});

/* -------- Previous / Next -------- */
prevBtn.addEventListener("click", () => {
  const idx = PANEL_ORDER.indexOf(currentKey);
  if (idx > 0) loadPanel(PANEL_ORDER[idx - 1]);
});

nextBtn.addEventListener("click", () => {
  const idx = PANEL_ORDER.indexOf(currentKey);
  if (idx >= 0 && idx < PANEL_ORDER.length - 1) loadPanel(PANEL_ORDER[idx + 1]);
});

/* -------- Open current image in a new tab -------- */
openTabBtn.addEventListener("click", () => {
  const url = PANELS[currentKey].image;
  window.open(url, "_blank", "noopener");
});

/* -------- Search -------- */
function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
    return;
  }

  const matches = SEARCH_INDEX.filter(item => {
    if (item.title.toLowerCase().includes(q)) return true;
    if (item.type.toLowerCase().includes(q))  return true;
    return item.keywords.some(k => k.toLowerCase().includes(q));
  });

  searchResults.innerHTML = "";

  if (matches.length === 0) {
    const li = document.createElement("li");
    li.className = "no-result";
    li.textContent = "No results found.";
    searchResults.appendChild(li);
  } else {
    matches.forEach(item => {
      const li = document.createElement("li");

      const titleSpan = document.createElement("span");
      titleSpan.className = "result-title";
      titleSpan.textContent = item.title;

      const metaSpan = document.createElement("span");
      metaSpan.className = "result-meta";
      const panelLabel = PANELS[item.panel] ? PANELS[item.panel].title : item.panel;
      metaSpan.textContent = `${item.type} · ${panelLabel}`;

      li.appendChild(titleSpan);
      li.appendChild(metaSpan);

      li.addEventListener("click", () => {
        loadPanel(item.panel);
        searchResults.hidden = true;
        searchInput.value = item.title;
        // Scroll viewer into view (especially helpful on mobile)
        document.getElementById("openseadragon-viewer")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      });

      searchResults.appendChild(li);
    });
  }

  searchResults.hidden = false;
}

searchInput.addEventListener("input", e => runSearch(e.target.value));

// Hide results when clicking outside the search section
document.addEventListener("click", e => {
  if (!e.target.closest(".search-section")) {
    searchResults.hidden = true;
  }
});

/* -------- Initial load -------- */
loadPanel("full");
