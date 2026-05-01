/* ===== Adams Chart Visual Companion - script.js ===== */

/* -------- Panels configuration -------- */
const PANELS = {
  full: {
    title: "Full Chart",
    subtitle: "Adams Chart of History — Complete Overview",
    description: "The complete Adams Synchronological Chart of Universal History, spanning from creation to 1881. This panoramic view shows the rise and fall of nations, the lineage of key figures, and the flow of world history in a single sweeping timeline.",
    image: "assets/adams-full.dzi",
    download: "assets/adams-full.jpg"
  },
  p1: {
    title: "Panel 1",
    subtitle: "Creation to the Flood",
    description: "The beginning of the world, the creation of Adam and Eve, the Garden of Eden, the Fall, the generations from Adam to Noah, and the Great Flood.",
    image: "assets/panel-01.dzi",
    download: "assets/panel-01.jpg"
  },
  p2: {
    title: "Panel 2",
    subtitle: "Post-Flood to the Patriarchs",
    description: "The descendants of Noah, the scattering of nations at Babel, the call of Abraham, and the lives of Isaac and Jacob.",
    image: "assets/panel-02.dzi",
    download: "assets/panel-02.jpg"
  },
  p3: {
    title: "Panel 3",
    subtitle: "The Patriarchs to the Exodus",
    description: "The sojourn in Egypt, the life of Joseph, the oppression under Pharaoh, and the birth and calling of Moses.",
    image: "assets/panel-03.dzi",
    download: "assets/panel-03.jpg"
  },
  p4: {
    title: "Panel 4",
    subtitle: "The Exodus and the Law",
    description: "The deliverance from Egypt, the giving of the Law at Sinai, the wilderness wanderings, and the preparation to enter the Promised Land.",
    image: "assets/panel-04.dzi",
    download: "assets/panel-04.jpg"
  },
  p5: {
    title: "Panel 5",
    subtitle: "Conquest to the United Kingdom",
    description: "The conquest of Canaan under Joshua, the era of the Judges, the rise of Saul, and the golden age of David and Solomon.",
    image: "assets/panel-05.dzi",
    download: "assets/panel-05.jpg"
  },
  p6: {
    title: "Panel 6",
    subtitle: "The Divided Kingdom to Assyrian Captivity",
    description: "The division of Israel and Judah, the ministries of Elijah and Elisha, the prophets, and the Assyrian conquest of the northern kingdom.",
    image: "assets/panel-06.dzi",
    download: "assets/panel-06.jpg"
  },
  p7: {
    title: "Panel 7",
    subtitle: "Babylonian Exile to Persian Restoration",
    description: "The fall of Jerusalem, the Babylonian captivity, the rise of Persia under Cyrus, the return and rebuilding of the Temple.",
    image: "assets/panel-07.dzi",
    download: "assets/panel-07.jpg"
  },
  p8: {
    title: "Panel 8",
    subtitle: "The Greek Empire and Intertestamental Period",
    description: "Alexander the Great, the Hellenistic kingdoms, the Ptolemies and Seleucids, the Maccabean revolt, and the rise of Rome.",
    image: "assets/panel-08.dzi",
    download: "assets/panel-08.jpg"
  },
  p9: {
    title: "Panel 9",
    subtitle: "The Roman Empire and the Life of Christ",
    description: "The Roman world, the birth and ministry of Jesus Christ, the crucifixion and resurrection, and the spread of the early Church.",
    image: "assets/panel-09.dzi",
    download: "assets/panel-09.jpg"
  },
  p10: {
    title: "Panel 10",
    subtitle: "Constantine to the Modern Era (1881)",
    description: "Constantine and the Christian empire, Charlemagne, the Crusades, the Reformation under Luther, the age of discovery with Columbus, Napoleon, and the modern world to 1881.",
    image: "assets/panel-10.dzi",
    download: "assets/panel-10.jpg"
  }
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
const subtitleEl    = document.getElementById("viewerSubtitle");
const descEl        = document.getElementById("viewerDescription");
const navButtons    = document.querySelectorAll(".nav-btn");
const searchInput   = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const prevBtn       = document.getElementById("prevBtn");
const nextBtn       = document.getElementById("nextBtn");
const openTabBtn    = document.getElementById("openTabBtn");

/* -------- State -------- */
let currentKey = "full";

/* -------- Initialize OpenSeadragon (single viewer, DZI tile source) -------- */
const viewer = OpenSeadragon({
  id: "openseadragon-viewer",
  prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
  tileSources: PANELS[currentKey].image,
  showNavigationControl: true,
  showNavigator: false,
  gestureSettingsTouch: { pinchToZoom: true, flickEnabled: true },
  animationTime: 0.4,
  blendTime: 0.1,
  maxZoomPixelRatio: 2,
  immediateRender: true
});

/* -------- Load a panel by key -------- */
function loadPanel(key) {
  if (!PANELS[key]) return;
  currentKey = key;
  const panel = PANELS[key];

  // Update header text
  titleEl.textContent    = panel.title;
  subtitleEl.textContent = panel.subtitle || "";
  descEl.textContent     = panel.description;

  // Show loading overlay
  showLoading(true);

  // Swap the image in the existing viewer (no new viewer instance)
  viewer.open(panel.image);

  // Highlight the active button
  navButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.key === key);
  });

  // Enable/disable prev/next at edges
  const idx = PANEL_ORDER.indexOf(key);
  prevBtn.disabled = idx <= 0;
  nextBtn.disabled = idx === -1 || idx >= PANEL_ORDER.length - 1;
}

/* -------- Loading overlay helper -------- */
function showLoading(visible) {
  const el = document.getElementById("loadingOverlay");
  if (el) el.hidden = !visible;
}

/* -------- Reset zoom and hide loader when image is ready -------- */
viewer.addHandler("open", () => {
  viewer.viewport.goHome(true);
  showLoading(false);
});

viewer.addHandler("open-failed", () => {
  showLoading(false);
  titleEl.textContent = PANELS[currentKey].title + " — failed to load";
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
  const url = PANELS[currentKey].download || PANELS[currentKey].image;
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
