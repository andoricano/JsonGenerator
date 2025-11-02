import React, { useState } from 'react';
import TextBoxChracter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';
import { Character, Script, ScriptCharacter } from '../../../../../scene';
import TextBoxChracterEditing from './TextBoxEditing/TextBoxEditingCharacter';
import TextBoxEditingScript from './TextBoxEditing/TextBoxEditingScript';
import ActionBar from '../../../../component/ActionBar';


type TextBoxSectionProps = {
  scriptString: Script;
  updateScriptText: (script: string) => void;
  onCharacter: (character: ScriptCharacter[]) => void;
  characterList: Character[];
};

export default function TextBoxSection(
  {
    scriptString, updateScriptText, onCharacter, characterList
  }: TextBoxSectionProps
) {
  var [editing, setEditing] = useState(false);
  var [script, setScript] = useState(scriptString.text);
  var [character, setCharacter] = useState(scriptString.character);

  const handleSave = () => {
    updateScriptText(script);
    setEditing(false);
    onCharacter(character)
  }

  const handleCancel = () => {
    console.log("handleCancel")
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
            onChanging={setCharacter}
            onCancel={handleCancel}
          />
          <TextBoxEditingScript
            scriptString={scriptString}
            onInputChange={setScript}
            onSave={handleSave}
          />
          <ActionBar
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <div>
          <TextBoxChracter
            scriptCharacter={scriptString.character}
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