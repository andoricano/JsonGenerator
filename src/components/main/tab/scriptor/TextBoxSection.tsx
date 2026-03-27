import React, { useEffect, useState } from 'react';
import TextBoxEditGroup from './TextBoxEditing/TextBoxEditGroup';
import TextBoxDisplayGroup from './TextBoxDisplay/TextBoxDisplayGroup';
import { useCurrentLine } from '../../../../stores/useStore';

export default function TextBoxSection() {
  const [editing, setEditing] = useState(false);
  const currentLine = useCurrentLine();

  useEffect(() => {
    setEditing(false);
  }, [currentLine?.id]);

  return (
    <div
      style={styles.container}
      onClick={() => !editing && setEditing(true)}
    >
      {editing ? (
        <TextBoxEditGroup onExit={() => setEditing(false)} />
      ) : (
        <TextBoxDisplayGroup />
      )}
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