import TextBox, { Message } from './TextBox';
interface SceneCanvasProps {
    messages: Message[];
}
export default function SceneCanvas({ messages }: SceneCanvasProps) {
    const latestMessage = messages.length > 0 ? [messages[messages.length - 1]] : [];

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
            <TextBox messages={latestMessage} />
        </div>
    );
}