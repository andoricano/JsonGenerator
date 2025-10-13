import TextBoxSection from './TextBox/TextBoxSection';
import InputSection from './TextBox/InputSection';
import SideBar from '../../../aside/SideBar';
import { useAppStore } from '../../../../AppProvider';


export default function Scriptor() {
    const { scriptItems,selectedIndex } = useAppStore();

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
                <TextBoxSection scriptString ={scriptItems[selectedIndex].scriptString} />
                <InputSection />
            </div>
        </div>
    );
}