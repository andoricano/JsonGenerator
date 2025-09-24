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
                flexDirection: 'column',
                padding: '16px',
                backgroundColor: 'black',
                marginTop: '100px',
                ...style,
            }}
        >
            <TextBox messages={latestMessage} />
        </div>
    );
}