import React from 'react';
import TextChracter from './TextCharacter';
import TextBoxScript from './TextBoxScript';
import { useAppStore } from '../../../../../AppProvider';
import TextBoxEditingScript from './TextBoxEditingScript';

export default function TextBoxSection() {
  const { scriptItems, selectedIndex, updateScriptText, textEditing, setTextEditing } = useAppStore();

  const currentItem = scriptItems[selectedIndex] ?? { scriptString: { script: "" } };
  const scriptString = currentItem;

  const handleSave = (script: string) => {
    if (!script.trim()) return;
    updateScriptText(script)
    setTextEditing(false);
  };

  return (
    <div style={styles.container}>
      <TextChracter />
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