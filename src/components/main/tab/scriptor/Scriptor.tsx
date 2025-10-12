import { useState, useEffect } from 'react';
import TextBoxSection from './TextBoxSection';
import InputSection from './InputSection';
import SideBar from '../../../aside/SideBar';
import { useStores } from '../../../../AppProvider';
import { useObservable } from '../../../../hooks/useObservable';


export default function Scriptor() {
    const { mainStore } = useStores();
    const selectedIndex = useObservable(mainStore.selectedIndex$, mainStore.selectedIndex);

    const [messages, setMessages] = useState<
        { id: number; sender: 'player'; text: string }[]
    >([]);



    useEffect(() => {
        const script = mainStore.scriptItems[selectedIndex];
        if (script) {
            setMessages([
                {
                    id: script.id,
                    sender: "player",
                    text: script.text,
                },
            ]);
        } else {
            setMessages([]);
        }
    }, [selectedIndex, mainStore.scriptItems]);


    const handleSend = (msg: string) => {
        setMessages(prev => [
            ...prev,
            { id: prev.length + 1, sender: 'player', text: msg },
        ]);
        mainStore.selectedIndex = mainStore.scriptItems.length - 1;
        console.log(msg)
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
                <SideBar />
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