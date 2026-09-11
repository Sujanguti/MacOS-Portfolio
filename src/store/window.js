import { create } from "zustand"; 
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                // The image viewer measures each image on load, so never
                // reuse the previous image's window size.
                if (windowKey === "imgfile" && data) {
                    win.width = null;
                    win.height = null;
                }
                state.nextZIndex++;
         }),
        resizeWindow: (windowKey, width, height) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (width != null) win.width = width;
                if (height != null) win.height = height;
         }),
        closeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
            win.width = null;
            win.height = null;
         }),

        focusWindow: (windowKey) => 
            set((state) => {
                const win = state.windows[windowKey];
                win.zIndex = state.nextZIndex++ ;
         }),
        
        })),
    );

    export default useWindowStore;