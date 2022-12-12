import { withPluginApi } from "discourse/lib/plugin-api";
import lazyLoadSetUp from "../lib/lazy-load";

function initLazyLoad(api) {
  api.decorateCookedElement(
    (elem) => {
      const lazyContainers = elem.querySelectorAll(".lazy-container");
      if (lazyContainers.length === 0) {
        return;
      } else {
        for (let container of lazyContainers) {
          lazyLoadSetUp(container, {
            preventCloak() {
              const postId = elem.closest("article").dataset.postId;
              if (postId) {
                api.preventCloak(parseInt(postId, 10));
              }
            },
          });
        }
      }
    },
    { id: "lazy-videos" }
  );
}

export default {
  name: "lazy-videos",

  initialize() {
    withPluginApi("1.5.0", initLazyLoad);
  },
};
