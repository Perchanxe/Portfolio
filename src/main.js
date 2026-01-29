(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let index = 0;
  let slides = [];

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function getJsonForPage() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes("deadends")) return "/deadEnds.json";
    if (path.includes("mothjelly")) return "/mjs.json";

    return null;
  }

  async function loadImages() {
    try {
      const jsonPath = getJsonForPage();

      console.log("Page:", window.location.pathname);
      console.log("track found?", !!track, "prev?", !!prevBtn, "next?", !!nextBtn);
      console.log("Using JSON path:", jsonPath);

      if (!jsonPath) throw new Error("No JSON mapping for this page.");

      const res = await fetch(jsonPath, { cache: "no-store" });

      console.log("Fetching:", jsonPath, "Status:", res.status);

      if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`);

      const data = await res.json();

      // Clear in case of hot reload
      track.innerHTML = "";

      data.images.forEach((img) => {
        const el = document.createElement("img");
        el.src = img.src;
        el.alt = img.alt || "";
        track.appendChild(el);
      });

      slides = Array.from(track.children);
      index = 0;
      updateCarousel();
    } catch (err) {
      console.error("Failed to load carousel images:", err);
    }
  }

  prevBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!slides.length) return;
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!slides.length) return;
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  loadImages();
})();
