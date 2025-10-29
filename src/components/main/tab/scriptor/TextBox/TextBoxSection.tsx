import React, { useState } from 'react';
import TextBoxChracter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';
import TextBoxEditingScript from './TextBoxEditingScript';
import { Character, Script } from '../../../../../scene';


type TextBoxSectionProps = {
  scriptString: Script;
  updateScriptText: (script: string) => void;
  onCharacter: (character: Character) => void;
};

export default function TextBoxSection(
  {
    scriptString, updateScriptText, onCharacter
  }: TextBoxSectionProps
) {
  var [editing, setEditing] = useState(false);

  const handleSave = (script: string) => {
    if (!script.trim()) return;
    updateScriptText(script)
    setEditing(false);
  };

  return (
    <div style={styles.container}
      onClick={() => setEditing(true)}
    >
      <TextBoxChracter
        scriptString={scriptString}
        onCharacter={onCharacter}
      />
      {editing ? (
        <TextBoxEditingScript
          scriptString={scriptString}
          onSave={handleSave}
          onCancel={() => handleSave}
        />
      ) : (
        <TextBoxScript
          scriptString={scriptString}
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
    cursor: "pointer",
  },
  bubble: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '12px',
    display: 'block',
    maxWidth: '80%',
  },
};