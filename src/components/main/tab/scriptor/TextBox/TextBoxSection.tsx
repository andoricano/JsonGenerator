import React, { useState } from 'react';
import TextBoxChracter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';
import { useAppStore } from '../../../../../AppProvider';
import TextBoxEditingScript from './TextBoxEditingScript';
import { Character } from '../../../../../scene';

export default function TextBoxSection() {
  const { scriptItems, selectedIndex, updateScriptText, textEditing, setTextEditing, updateScriptorCharacter } = useAppStore();

  const [editingScript] = useState(scriptItems[selectedIndex]);
  console.log("??:" + editingScript.text)


  const currentItem = scriptItems[selectedIndex] ?? { scriptString: { script: "" } };
  const scriptString = currentItem;

  const handleSave = (script: string) => {
    if (!script.trim()) return;
    updateScriptText(script)
    setTextEditing(false);
  };

  const handleSelectingCharacter = (character: Character) => {
    updateScriptorCharacter(character);
  };
  return (
    <div style={styles.container}>
      <TextBoxChracter 
        scriptString ={scriptItems[selectedIndex]}
        onCharacter = {handleSelectingCharacter}
       />
      {textEditing ? (
        <TextBoxEditingScript
          scriptString={scriptString}
          onSave={handleSave}
          onCancel={() => setTextEditing(false)}
        />
      ) : (
        <TextBoxScript
          scriptString={scriptString}
          onEditStart={() => setTextEditing(true)}
        />
      )}
    </div>
  );
}

export const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#4caf50',
    left: 20,
    right: 20,
    bottom: 20,
    height: '200px',
    boxSizing: 'border-box',
  },
  bubble: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '12px',
    display: 'block',
    maxWidth: '80%',
  },
};