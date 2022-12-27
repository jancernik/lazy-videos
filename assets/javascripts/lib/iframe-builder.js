export default function buildIFrame(provider, id, params) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("allowFullScreen", "");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("seamless", "seamless");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  );

  switch (provider) {
    case "youtube":
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${id}?autoplay=1&${params}`
      );
      break;
    case "vimeo":
      iframe.setAttribute(
        "src",
        `https://player.vimeo.com/video/${id}?autoplay=1`
      );
      break;
    default:
      break;
  }
  return iframe;
}
