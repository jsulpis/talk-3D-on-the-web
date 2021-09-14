import * as dat from "dat.gui";

export default function useGui() {
  const gui = new dat.GUI({ closed: true });
  gui.hide();

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
