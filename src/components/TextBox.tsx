import React from 'react';

export type Message = {
  id: number;
  sender: 'npc' | 'player';
  text: string;
};

type Props = {
  messages: Message[];
};

export default function TextBox({ messages }: Props) {
  return (
    <div style={styles.container}>
      {messages.map(msg => (
        <div
          key={msg.id}
          style={{
            ...styles.bubble
          }}
        >
          <span style={{ color: msg.sender === 'npc' ? 'red' : '#fff' }}>
            {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#4caf50',
    flexDirection: 'column',
    width: '100%',
    height: '400px',
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