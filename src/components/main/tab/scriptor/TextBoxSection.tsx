import React from 'react';
import TextBoxDisplayGroup from './TextBoxDisplay/TextBoxDisplayGroup';
import { useCurrentLine } from '../../../../stores/useStore';

export default function TextBoxSection() {
  const currentLine = useCurrentLine();

  if (!currentLine) return null;

  return (
    <div style={styles.container}>
      <TextBoxDisplayGroup />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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