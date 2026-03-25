import React, { useState, useEffect } from 'react';
import TextBoxChracter from './TextBoxCharacter';
import TextBoxScript from './TextBoxScript';
import TextBoxChracterEditing from './TextBoxEditing/TextBoxEditingCharacter';
import TextBoxEditingScript from './TextBoxEditing/TextBoxEditingScript';
import ActionBar from '../../../../component/ActionBar';
import { Character, LineItem, LineActor } from '../../../../../stores/canvasType';

type TextBoxSectionProps = {
  scriptString: LineItem;
  updateScriptText: (text: string) => void;
  onCharacter: (character: LineActor[]) => void;
  characterList: Character[];
};

export default function TextBoxSection({
  scriptString,
  updateScriptText,
  onCharacter,
  characterList
}: TextBoxSectionProps) {
  const [editing, setEditing] = useState(false);

  // LineItem 구조에 맞춰 첫 번째 액터의 텍스트와 액터 리스트를 초기값으로 설정
  const [script, setScript] = useState(scriptString.actors[0]?.actorText || "");
  const [character, setCharacter] = useState(scriptString.actors);

  useEffect(() => {
    setScript(scriptString.actors[0]?.actorText || "");
    setCharacter(scriptString.actors);
  }, [scriptString]);

  const handleSave = () => {
    updateScriptText(script);
    onCharacter(character);
    setEditing(false);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScript(scriptString.actors[0]?.actorText || "");
    setCharacter(scriptString.actors);
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
            scriptCharacter={scriptString.actors}
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