import escape from "discourse-common/lib/escape";
import buildIFrame from "./iframe-builder";

export default function lazyLoadSetUp(elem) {
  const id = escape(elem.dataset.videoId),
    title = escape(elem.dataset.videoTitle),
    provider = elem.dataset.providerName,
    params = elem.dataset.parameters || "",
    width = elem.getAttribute("width"),
    height = elem.getAttribute("height");

  const thumbnailImg = elem.querySelector("img");
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("video-thumbnail");
  thumbnail.classList.add(provider);
  thumbnail.setAttribute("tabIndex", "0");
  thumbnail.appendChild(thumbnailImg);

  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.classList.add(`${provider}-logo`);
  thumbnail.appendChild(logo);

  const link = elem.querySelector("a");
  const linkUrl = link.getAttribute("href");

  const titleContainer = document.createElement("div");
  const titleWrapper = document.createElement("div");
  const titleLink = document.createElement("a");

  titleContainer.classList.add("title-container");
  titleWrapper.classList.add("title-wrapper");

  titleLink.classList.add("title-link");
  titleLink.setAttribute("href", linkUrl);
  titleLink.setAttribute("target", "_blank");

  titleLink.innerText = title;
  titleWrapper.appendChild(titleLink);
  titleContainer.appendChild(titleWrapper);

  link.replaceWith(thumbnail);
  elem.appendChild(titleContainer);

  function loadEmbed(e) {
    e.preventDefault();
    const iframe = buildIFrame(provider, id, params);
    thumbnail.replaceWith(iframe);
  }

  thumbnail.addEventListener("click", loadEmbed);
  thumbnail.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      loadEmbed(e);
    }
  });
}
