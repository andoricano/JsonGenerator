import TextBoxSection from './TextBox/TextBoxSection';
import SideBar from '../../../aside/SideBar';


export default function Scriptor() {

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
                <TextBoxSection/>
            </div>
        </div>
    );
}