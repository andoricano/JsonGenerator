import { useState } from 'react';
import TextBoxSection from './TextBoxSection';
import InputSection from './InputSection';

export default function Scriptor() {
    const [messages, setMessages] = useState<
        { id: number; sender: 'player'; text: string }[]
    >([]);

    const handleSend = (msg: string) => {
        setMessages(prev => [
            ...prev,
            { id: prev.length + 1, sender: 'player', text: msg },
        ]);
        console.log(msg)
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                backgroundColor: 'black',
                height: '100vh',
                marginTop: '100px',
                boxSizing: 'border-box',
            }}
        >
            
            <TextBoxSection messages={messages} />
            <InputSection onSend={handleSend} />
        </div>
    );
}