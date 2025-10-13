import React from 'react';
import { useAppStore } from '../../../../../AppProvider';
import TextChracter from './TextCharacter';



export default function TextBoxSection() {
  const { scriptItems, selectedIndex } = useAppStore();
  const scriptString = scriptItems[selectedIndex].scriptString

  return (
    <div style={styles.container}>
      <TextChracter/>
      {scriptString && (
        <div style={styles.bubble}>
          <span style={{ color: '#fff' }}>
            {scriptString.script}
          </span>
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
  },
  bubble: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '12px',
    display: 'block',
    maxWidth: '80%',
  },
};