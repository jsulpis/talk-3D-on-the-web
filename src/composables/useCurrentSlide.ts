import Reveal from "reveal.js";
import { ref } from "vue";

/**
 * Callbacks used to activate the animations and event listeners
 * only on the current slide
 */
export default function useCurrentSlide(slideId: string) {
  let onEnterCallback = () => {};
  let onLeaveCallback = () => {};
  const isCurrentSlide = ref(false);

  function onSlideEnter(callback: () => any) {
    onEnterCallback = callback;
  }

  function onSlideLeave(callback: () => any) {
    onLeaveCallback = callback;
  }

  Reveal.on("ready", ({ currentSlide }) => {
    if (currentSlide.id === slideId) {
      isCurrentSlide.value = true;
      onEnterCallback();
    }
  });

  Reveal.on("slidechanged", ({ currentSlide, previousSlide }) => {
    if (currentSlide.id === slideId) {
      isCurrentSlide.value = true;
      onEnterCallback();
    } else if (previousSlide && previousSlide.id === slideId) {
      isCurrentSlide.value = false;
      onLeaveCallback();
    }
  });

  return { isCurrentSlide, onSlideEnter, onSlideLeave };
}
