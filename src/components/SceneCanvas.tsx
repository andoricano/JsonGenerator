import TextBox, { Message } from './TextBox';
import React, { useState } from 'react';
interface SceneCanvasProps {
    messages: Message[];
    style?: React.CSSProperties; 
}
export default function SceneCanvas({ messages, style }: SceneCanvasProps) {
    const latestMessage = messages.length > 0 ? [messages[messages.length - 1]] : [];

    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                backgroundColor: 'black',
                overflowY: 'auto',
                ...style, 
            }}
        >
            <TextBox messages={latestMessage} />
        </div>
    );
}