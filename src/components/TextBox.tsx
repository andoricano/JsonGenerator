import React from 'react';

type Message = {
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
      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            ...styles.bubble,
            ...(msg.sender === 'npc' ? styles.npcBubble : styles.playerBubble),
          }}
        >
          <span
            style={{
              color: msg.sender === 'npc' ? 'red' : '#fff',
            }}
          >
            {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  bubble: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '12px',
    display: 'inline-block',
  },
  npcBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  playerBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4caf50',
  },
};
