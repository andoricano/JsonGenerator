import { useState } from "react";
import sanmiDraw from "/assets/sanmi-draw.png";
import girlSkyBlueHip from "/assets/girl_skyblue_hip.png";
import mascot from "/assets/mascot.png";
import girlSchoolBlack from "/assets/girl_school_black.png";
import girlSportBlack from "/assets/girl_sport_black.png";
import { Script, defaultScript, defaultCharacter, Character } from "../scene";

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
  const [scriptItems, setScriptItems] = useState<Script[]>([defaultScript]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const addScriptItem = () => {
    setScriptItems(prev => [
      ...prev,
      { ...defaultScript, id: crypto.randomUUID() }
    ]);
    setSelectedIndex(scriptItems.length)
  };

  const updateScriptCharacter = (newCharacters: Character[]) => {
    const updated = newCharacters.map((char, idx) => ({
      character: char,
      position: idx,
      tone: 0,
    }));

    setScriptItems(prev =>
      prev.map(item => ({
        ...item,
        character: updated,
      }))
    );
  };

  const addImage = (url: string) => setImages(prev => [...prev, { id: Date.now(), url }]);
  const removeImage = (id: number) => setImages(prev => prev.filter(img => img.id !== id));

  const removeScriptItem = (idx: number) =>
    setScriptItems(prev => prev.filter((_, index) => index !== idx));

  const resetMainStore = () => {
    setImages([]);
    setScriptItems([defaultScript]);
    setSelectedIndex(0);
  };


  const scriptToJSON = () => ({
    images,
    scriptItems,
  });

  //Scriptor
  const updateScriptText = (newText: string) => {
    setScriptItems(prev =>
      prev.map((item, idx) =>
        idx === selectedIndex
          ? { ...item, text: newText }
          : item
      )
    );
  };

  const [textEditing, setTextEditing] = useState(false);

  const resetScriptorStore = () => {
    setTextEditing(false)
  };

  const resetAll = () => {
    resetAppStore();
    resetMainStore();
    resetScriptorStore();
  };


  //Character
  const [characterList, setCharacterList] = useState(defaultCharacter);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    defaultCharacter[0] ?? null
  );

  const updateSelectedCharacter = (updated: Character) => {
    setSelectedCharacter(updated);
    setCharacterList(prev =>
      prev.map(char => char === selectedCharacter ? updated : char)
    );
  };

  const addCharacter = () => {
    const newCharacter: Character = {
      name: "New Character",
      img: [],
      selectedImageIndex: 0
    };

    setCharacterList((prev) => [...prev, newCharacter]);
    setSelectedCharacter(newCharacter);
  };

  const addCharacterImage = (file: File) => {
    if (!selectedCharacter) return;

    const updatedCharacter: Character = {
      ...selectedCharacter,
      img: [...selectedCharacter.img, file],
    };

    updateSelectedCharacter(updatedCharacter);
  };

  const removeImageFromCharacter = (index: number) => {
    if (!selectedCharacter) return;

    const updatedCharacter: Character = {
      ...selectedCharacter,
      img: selectedCharacter.img.filter((_, i) => i !== index),
    };

    updateSelectedCharacter(updatedCharacter);
  };

  //Character img
  const changeCharacterThumbnail = (index: number) => {
    if (!selectedCharacter) return;
    if (index < 0 || index >= selectedCharacter.img.length) return;

    const updatedCharacter: Character = {
      ...selectedCharacter,
      selectedImageIndex: index,
    };

    console.log(updatedCharacter)
    updateSelectedCharacter(updatedCharacter);
  };


  const initDefaultCharacterImages = async () => {
    if (!characterList || characterList.length < 2) return;

    const fetchAsFile = async (url: string, name: string) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return new File([blob], name, { type: blob.type });
    };

    const defaultFiles = await Promise.all([
      fetchAsFile(sanmiDraw, "sanmi-draw.png"),
      fetchAsFile(girlSkyBlueHip, "girl_skyblue_hip.png"),
      fetchAsFile(mascot, "mascot.png"),
      fetchAsFile(girlSchoolBlack, "girl_school_black.png"),
      fetchAsFile(girlSportBlack, "girl_sport_black.png"),
    ]);

    const firstCharacter = { ...characterList[0], img: defaultFiles.slice(0, 2) };
    const secondCharacter = { ...characterList[1], img: defaultFiles.slice(2) };

    const newCharacterList = [firstCharacter, secondCharacter];

    setCharacterList(newCharacterList);
    setSelectedCharacter(firstCharacter);



    // ScriptItem에도 새 캐릭터 연결
    updateScriptCharacter(newCharacterList);

    console.log(newCharacterList);
  };


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
    updateScriptText,
    updateScriptCharacter,
    removeImage,
    scriptItems,
    setScriptItems,
    addScriptItem,
    removeScriptItem,
    selectedIndex,
    setSelectedIndex,
    resetMainStore,
    scriptToJSON,

    //Sctiptor
    textEditing,
    setTextEditing,
    resetScriptorStore,


    //Chracter
    characterList,
    setCharacterList,
    addCharacter,
    selectedCharacter,
    setSelectedCharacter,
    addCharacterImage,
    removeImageFromCharacter,
    changeCharacterThumbnail,
    // 전체 초기화
    resetAll,

    //초기값
    initDefaultCharacterImages,
  };
}