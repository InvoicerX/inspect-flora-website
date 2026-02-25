console.log("Inspect Flora landing page loaded.");

document.addEventListener("DOMContentLoaded", () => {
  /* --------- Smooth scroll for internal anchors --------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* --------- Download button placeholders --------- */
  const playLink = document.getElementById("play-link");
  const topBtn = document.getElementById("download-btn-top");
  const heroBtn = document.getElementById("download-btn-hero");

  // TODO: put your real Google Play URL here
  const GOOGLE_PLAY_URL = "#";

  if (playLink) playLink.href = GOOGLE_PLAY_URL;

  function openDownload() {
    const dl = document.getElementById("download");
    if (dl) dl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  [topBtn, heroBtn].forEach(b => b && b.addEventListener("click", (e) => {
    // if #, just scroll
    if (GOOGLE_PLAY_URL === "#") {
      e.preventDefault();
      openDownload();
    }
  }));

  /* --------- Trailer modal (YouTube) --------- */
  const modal = document.getElementById("video-modal");
  const watchBtn = document.getElementById("watch-trailer-btn");
  const closeBtn = document.getElementById("close-modal");
  const iframe = document.getElementById("youtube-video");

  // TODO: Replace with your Inspect Flora trailer ID when ready
  const VIDEO_ID = "Vz3xEaUKc18"; // placeholder
  const videoUrl = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`;

  function openModal() {
    if (!modal || !iframe) return;
    iframe.src = videoUrl;
    modal.style.display = "grid";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal || !iframe) return;
    iframe.src = "";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (watchBtn) watchBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* --------- Lightbox screenshots --------- */
  const shots = Array.from(document.querySelectorAll(".shots-grid img"));
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbClose = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let current = 0;

  function show(i) {
    if (!lb || !lbImg) return;
    current = (i + shots.length) % shots.length;
    lbImg.src = shots[current].src;
  }

  function openLightbox(i) {
    if (!lb) return;
    show(i);
    lb.style.display = "grid";
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lb) return;
    lb.style.display = "none";
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  shots.forEach((img, idx) => {
    img.addEventListener("click", () => openLightbox(idx));
  });

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => show(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => show(current + 1));

  window.addEventListener("keydown", (e) => {
    if (!lb || lb.style.display !== "grid") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  if (lb) {
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
  }

  /* --------- To top button --------- */
  const toTopBtn = document.getElementById("toTopBtn");
  window.addEventListener("scroll", () => {
    if (!toTopBtn) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    toTopBtn.style.display = y > 400 ? "block" : "none";
  });

  if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------- Demo buttons (non-functional UI hints) --------- */
  const openCamDemo = document.getElementById("open-camera-demo");
  const viewGalleryDemo = document.getElementById("view-gallery-demo");

  if (openCamDemo) {
    openCamDemo.addEventListener("click", () => {
      alert("Demo button. In the Android app, this opens the camera.");
    });
  }
  if (viewGalleryDemo) {
    viewGalleryDemo.addEventListener("click", () => {
      alert("Demo button. In the Android app, this opens your saved gallery.");
    });
  }
});