import { useState } from "react";

export interface ScriptItem {
  id: number;
  type: string;
  name: string;
  cmd1: number;
  cmd2: number;
  text: string;
}

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
  const defaultScriptItem: ScriptItem = {
    id: 1,
    type: "default",
    name: "User",
    cmd1: 0,
    cmd2: 0,
    text: "please input your text",
  };
  const [scriptItems, setScriptItems] = useState<ScriptItem[]>([defaultScriptItem]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addImage = (url: string) => setImages(prev => [...prev, { id: Date.now(), url }]);
  const removeImage = (id: number) => setImages(prev => prev.filter(img => img.id !== id));

  const addScriptItem = (item: ScriptItem) => setScriptItems(prev => [...prev, item]);
  const removeScriptItem = (id: number) => setScriptItems(prev => prev.filter(i => i.id !== id));

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