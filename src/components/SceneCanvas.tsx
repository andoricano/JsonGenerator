import TextBox, { Message } from './TextBox'; 
import React, { useState } from 'react';

interface SceneCanvasProps {
    messages: Message[];
}

export default function SceneCanvas({ messages }: SceneCanvasProps) {
    const latestMessage = messages.length > 0 ? [messages[messages.length - 1]] : [];

    return (
        <div
            style={{
                flex: 1,           
                minHeight: '200px',
                border: '1px solid #ccc',
                padding: '16px',
                overflowY: 'auto', 
                backgroundColor:'black'
            }}
        >
            <TextBox messages={latestMessage} />
        </div>
    );
}