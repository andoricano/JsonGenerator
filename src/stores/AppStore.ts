import { useState } from "react";
import { ScriptItem, defaultScript } from "../types";

export function useStoreLogic() {
  // ===== AppStore =====
  const [projectName, setProjectName] = useState("I Love yo yoU");
  const [lang, setLang] = useState<"en" | "ko">("en");
  const [darkMode, setDarkMode] = useState(false);
  const [activeTool, setActiveTool] = useState("Scriptor");

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const resetAppStore = () => {
    setProjectName("I Love yo yoU");
    setLang("en");
    setDarkMode(false);
    setActiveTool("Scriptor");
  };

  // ===== Logic Store =====
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const defaultScriptItem: ScriptItem = defaultScript
  const [scriptItems, setScriptItems] = useState<ScriptItem[]>([defaultScriptItem]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const addScriptItem = (item: ScriptItem) => setScriptItems(prev => [...prev, item]);

  const addImage = (url: string) => setImages(prev => [...prev, { id: Date.now(), url }]);
  const removeImage = (id: number) => setImages(prev => prev.filter(img => img.id !== id));

  const removeScriptItem = (idx: number) =>
    setScriptItems(prev => prev.filter((_, index) => index !== idx));

  const resetMainStore = () => {
    setImages([]);
    setScriptItems([defaultScriptItem]);
    setSelectedIndex(0);
  };

  const resetAll = () => {
    resetAppStore();
    resetMainStore();
  };

  const scriptToJSON = () => ({
    images,
    scriptItems,
  });

  return {
    // AppStore
    projectName,
    setProjectName,
    lang,
    setLang,
    darkMode,
    toggleDarkMode,
    activeTool,
    setActiveTool,
    resetAppStore,

    // Logic Store
    images,
    addImage,
    removeImage,
    scriptItems,
    setScriptItems,
    addScriptItem,
    removeScriptItem,
    selectedIndex,
    setSelectedIndex,
    resetMainStore,
    scriptToJSON,

    // 전체 초기화
    resetAll,
  };
}