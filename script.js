```js
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const assetGrid = document.getElementById("asset-grid");

const assets = [];

function classifyType(file) {
  const type = file.type;
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type.startsWith("image/")) return "image";
  return "other";
}

function createAssetCard(asset) {
  const card = document.createElement("div");
  card.className = "asset-card";

  const thumb = document.createElement("div");
  thumb.className = "asset-thumb";
  const thumbLabel = document.createElement("span");
  thumbLabel.textContent = asset.type.toUpperCase();
  thumb.appendChild(thumbLabel);

  const meta = document.createElement("div");
  meta.className = "asset-meta";

  const name = document.createElement("div");
  name.className = "asset-name";
  name.textContent = asset.file.name;

  const type = document.createElement("div");
  type.className = "asset-type";
  type.textContent = asset.type;

  const tagStrip = document.createElement("div");
  tagStrip.className = "asset-tag-strip";

  const defaultTag = document.createElement("span");
  defaultTag.className = "asset-tag";
  defaultTag.textContent = "UNTAGGED";
  tagStrip.appendChild(defaultTag);

  meta.appendChild(name);
  meta.appendChild(type);
  meta.appendChild(tagStrip);

  card.appendChild(thumb);
  card.appendChild(meta);

  return card;
}

function renderAssets() {
  assetGrid.innerHTML = "";
  assets.forEach((asset) => {
    const card = createAssetCard(asset);
    assetGrid.appendChild(card);
  });
}

function handleFiles(fileList) {
  const files = Array.from(fileList);
  files.forEach((file) => {
    const asset = {
      id: crypto.randomUUID(),
      file,
      type: classifyType(file),
      tags: [],
    };
    assets.push(asset);
  });
  renderAssets();
}

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files.length > 0) {
    handleFiles(e.target.files);
    fileInput.value = "";
  }
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFiles(e.dataTransfer.files);
  }
});
```
