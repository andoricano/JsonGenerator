import React, { useState } from 'react';
import { Script, ScriptCharacter } from '../../../../scene';


type ImageSceneSectionProps = {
  script: Script;
  onCharacter: (idx: number) => void;
};

export default function ImageSceneSection(
  {
    script,
     onCharacter
  }: ImageSceneSectionProps
) {
  var [editing, setEditing] = useState(false);
  var [character, setCharacter] = useState(script.character);

  const handleSave = (idx : number) => {
    onCharacter(idx)
  }

  return (
    <div style={styles.container}
      onClick={() => setEditing(true)}
    >

      {editing ? (
        <div>
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
}

export const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#7cc0d857',
    left: 20,
    right: 20,
    bottom: 20,
    height: '400px',
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