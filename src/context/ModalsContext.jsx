import { createContext, useContext, useState, useCallback } from "react";
import { markcollectionDismissed } from "../hooks/useAutoPopup.js";

const ModalsContext = createContext(null);

const collection_DAILY_KEY = "khansaab:collection-last-shown";
const todayStamp = () => new Date().toISOString().slice(0, 10);

export function ModalsProvider({ children }) {
  const [collectionOpen, setcollectionOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const opencollection = useCallback(() => setcollectionOpen(true), []);
  const closecollection = useCallback(() => {
    setcollectionOpen(false);
    markcollectionDismissed();
  }, []);
  const openSizeGuide = useCallback(() => setSizeGuideOpen(true), []);
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), []);

  return (
    <ModalsContext.Provider
      value={{
        collectionOpen,
        opencollection,
        closecollection,
        sizeGuideOpen,
        openSizeGuide,
        closeSizeGuide,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalsContext);
  if (!ctx) throw new Error("useModals must be used inside <ModalsProvider>");
  return ctx;
}
