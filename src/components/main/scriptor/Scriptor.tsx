import { useState } from 'react';
import TextBox, { Message } from '../../TextBox';
import FooterInput from '../../footer/FooterInput';

interface SceneCanvasProps {
    messages: Message[];
}
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
            <TextBox messages={messages} />
            <FooterInput onSend={handleSend} />
        </div>
    );
}