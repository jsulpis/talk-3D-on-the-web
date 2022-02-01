import * as dat from "dat.gui";
import useCurrentSlide from "./useCurrentSlide";

export default function useGui(slideId: string) {
  const gui = new dat.GUI({ closed: true });
  gui.hide();

  const { onSlideEnter, onSlideLeave } = useCurrentSlide(slideId);

  // open or close the GUI with the shortcut "G"
  onSlideEnter(() => document.addEventListener("keyup", showGui));
  onSlideLeave(() => {
    document.removeEventListener("keyup", showGui);
    gui.hide();
    gui.close();
  });

  function showGui(e) {
    if (e.key === "g") {
      toggleGui();
    }
  }

  const toggleGui = () => {
    if (gui.closed) {
      gui.open();
      gui.show();
    } else {
      gui.hide();
      gui.close();
    }
  };

  const destroyGui = () => gui.destroy();

  return {
    gui,
    toggleGui,
    destroyGui,
  };
}
