const RESUME_PDF = "resume/Abhishek-Simgekar-Resume.pdf";
const ATTACHMENTS_MANIFEST = "attachments/manifest.json";
const LOCAL_PHOTO = "assets/photo.jpg";

async function existsWithType(url, typePrefix) {
  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) return false;
    const type = (res.headers.get("content-type") || "").toLowerCase();
    return type.startsWith(typePrefix);
  } catch {
    return false;
  }
}

async function setupResume() {
  const download = document.getElementById("resume-download");
  const placeholder = document.getElementById("resume-placeholder");
  if (!download || !placeholder) return;

  const ready = await existsWithType(RESUME_PDF, "application/pdf");
  download.hidden = !ready;
  placeholder.hidden = ready;
}

async function setupPhoto() {
  const img = document.getElementById("portrait-image");
  if (!img) return;
  if (await existsWithType(LOCAL_PHOTO, "image/")) {
    img.src = LOCAL_PHOTO;
  }
}

async function setupAttachments() {
  const list = document.getElementById("attachment-list");
  const empty = document.getElementById("attachment-empty");
  if (!list || !empty) return;

  try {
    const res = await fetch(ATTACHMENTS_MANIFEST, { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) return;

    list.replaceChildren(
      ...items.map((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `attachments/${encodeURIComponent(item.file)}`;
        const title = document.createElement("span");
        title.textContent = item.title || item.file;
        const kind = document.createElement("span");
        kind.textContent = item.kind || "file";
        a.append(title, kind);
        li.appendChild(a);
        return li;
      })
    );
    empty.hidden = true;
  } catch {
    // Keep the empty state if the manifest cannot be read.
  }
}

setupPhoto();
setupResume();
setupAttachments();
