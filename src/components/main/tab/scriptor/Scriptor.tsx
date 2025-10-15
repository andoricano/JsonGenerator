import TextBoxSection from './TextBox/TextBoxSection';

export default function Scriptor() {

    return (

        <div
            style={{
                display: 'flex',
                flex:1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                backgroundColor: 'black',
                boxSizing: 'border-box',
            }}
        >
            <TextBoxSection />
        </div>
    );
}