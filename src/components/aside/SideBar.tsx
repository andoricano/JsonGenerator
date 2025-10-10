import ChatList from "./ChatList";

export default function SideBar() {
    return (
        <div
            style={{
                height: '100%',        
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
            }}
        >
            <ChatList />
        </div>
    );
}