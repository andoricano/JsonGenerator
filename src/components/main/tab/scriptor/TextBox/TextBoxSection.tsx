import React from 'react';
import TextChracter from './TextCharacter';
import TextBoxScript from './TextBoxScript';
import { useAppStore } from '../../../../../AppProvider';
import TextBoxEditingScript from './TextBoxEditingScript';

export default function TextBoxSection() {
  const { scriptItems, selectedIndex, setScriptItems, textEditing, setTextEditing } = useAppStore();

  // 안전하게 접근, 기본값 설정
  const currentItem = scriptItems[selectedIndex] ?? { scriptString: { script: "" } };
  const scriptString = currentItem.scriptString;

  const handleSave = (script: string) => {
    if (!script.trim()) return;

    setScriptItems(prev =>
      prev.map((item, idx) =>
        idx === selectedIndex
          ? { ...item, scriptString: { ...item.scriptString, script } }
          : item
      )
    );
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