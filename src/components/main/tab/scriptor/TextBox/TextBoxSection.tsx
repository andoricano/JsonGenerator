import React, { useState } from 'react';
import TextBoxChracter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';
import TextBoxEditingScript from './TextBoxEditing/TextBoxEditingScript';
import { Character, Script } from '../../../../../scene';
import TextBoxChracterEditing from './TextBoxEditing/TextBoxEditingCharacter';


type TextBoxSectionProps = {
  scriptString: Script;
  updateScriptText: (script: string) => void;
  onCharacter: (character: Character) => void;
  characterList : Character[];
};

export default function TextBoxSection(
  {
    scriptString, updateScriptText, onCharacter,characterList
  }: TextBoxSectionProps
) {
  var [editing, setEditing] = useState(false);


  const handleSelectingCharacter = (character : Character[]) =>{

    setEditing(false);
  }
  const handleSave = (script: string) => {
    updateScriptText(script)
    setEditing(false);
  };

  const handleCancel = () =>{
    setEditing(false);
  }

  return (
    <div style={styles.container}
      onClick={() => setEditing(true)}
    >

      {editing ? (
        <div>
          <TextBoxChracterEditing
            characterList={characterList}
            onSave={handleSave}
            onCancel={handleCancel}
          />
          <TextBoxEditingScript
            scriptString={scriptString}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <div>
          <TextBoxChracter
            scriptString={scriptString}
            onCharacter={onCharacter}
          />
          <TextBoxScript
            scriptString={scriptString}
          />

        </div>
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