import GLightbox from "./glightbox/glightbox.min.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  const lightbox = GLightbox({
    selector: ".gallery-item",
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    closeButton: true,
    closeOnOutsideClick: true,
    videosWidth: "960px",
    iframeAttributes: {
      allow: "autoplay; encrypted-media; picture-in-picture; web-share; fullscreen",
      allowFullscreen: true,
    },
  });

  // Handle URL hash for direct image links
  if (window.location.hash.substring(1).length > 1) {
    const target = window.location.hash.substring(1);
    const items = gallery.querySelectorAll("a.gallery-item");
    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset["target"] === target) {
        lightbox.openAt(i);
        break;
      }
    }
  }

  // Update URL hash when navigating and stop inline iframes on slide change
  lightbox.on("slide_changed", ({ prev, current }) => {
    if (prev.slideNode) {
      const iframe = prev.slideNode.querySelector(".gslide-inline iframe");
      if (iframe) {
        iframe.src = "";
      }
    }
    const element = gallery.querySelectorAll("a.gallery-item")[current.index];
    if (element && element.dataset["target"]) {
      history.replaceState("", document.title, "#" + element.dataset["target"]);
    }
  });

  // Clear hash on close
  lightbox.on("close", () => {
    history.replaceState("", document.title, window.location.pathname);
  });
}
