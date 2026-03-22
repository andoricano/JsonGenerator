import React, { useState, useEffect } from 'react';
import TextBoxChracter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';
import TextBoxChracterEditing from './TextBoxEditing/TextBoxEditingCharacter';
import TextBoxEditingScript from './TextBoxEditing/TextBoxEditingScript';
import ActionBar from '../../../../component/ActionBar';
import { Character, Script, ScriptCharacter } from '../../../../../stores/storeType';


type TextBoxSectionProps = {
  scriptString: Script;
  updateScriptText: (text: string) => void;
  onCharacter: (character: ScriptCharacter[]) => void;
  characterList: Character[];
};

export default function TextBoxSection({
  scriptString,
  updateScriptText,
  onCharacter,
  characterList
}: TextBoxSectionProps) {
  const [editing, setEditing] = useState(false);

  const [script, setScript] = useState(scriptString.text);
  const [character, setCharacter] = useState(scriptString.character);

  useEffect(() => {
    setScript(scriptString.text);
    setCharacter(scriptString.character);
  }, [scriptString]);

  const handleSave = () => {
    updateScriptText(script);
    onCharacter(character);
    setEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScript(scriptString.text);
    setCharacter(scriptString.character);
    setEditing(false);
  };

  return (
    <div
      style={styles.container}
      onClick={() => !editing && setEditing(true)}
    >
      {editing ? (
        <div onClick={(e) => e.stopPropagation()}>
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