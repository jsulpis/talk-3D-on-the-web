import Reveal from "reveal.js";

/**
 * Callbacks used to activate the animations and event listeners
 * only on the current slide
 */
export default function useCurrentSlide(slideId: string) {
  let onEnterCallback = () => {};
  let onLeaveCallback = () => {};

  function onSlideEnter(callback: () => any) {
    onEnterCallback = callback;
  }

  function onSlideLeave(callback: () => any) {
    onLeaveCallback = callback;
  }

  Reveal.on("ready", ({ currentSlide }) => {
    if (currentSlide.id === slideId) {
      onEnterCallback();
    }
  });

  Reveal.on("slidechanged", ({ currentSlide, previousSlide }) => {
    if (currentSlide.id === slideId) {
      onEnterCallback();
    } else if (previousSlide && previousSlide.id === slideId) {
      onLeaveCallback();
    }
  });

  return { onSlideEnter, onSlideLeave };
}
