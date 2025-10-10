import { useState } from 'react';
import TextBoxSection from './TextBoxSection';
import InputSection from './InputSection';
import SideBar from '../../../aside/SideBar';

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

    const handleMenuSelect = (menu: string) => {
        console.log('선택된 메뉴:', menu);
    };
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <aside
                style={{
                    width: '20%',
                    height: '100%',
                    background: '#ddd',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <SideBar/>
            </aside>


            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px',
                    backgroundColor: 'black',
                    boxSizing: 'border-box',
                }}
            >
                <TextBoxSection messages={messages} />
                <InputSection onSend={handleSend} />
            </div>
        </div>
    );
}