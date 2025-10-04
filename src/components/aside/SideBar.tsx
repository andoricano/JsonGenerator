type Props = {
    onSelect: (menu: string) => void;
};

export default function SideBar({ onSelect }: Props) {
    return (
        <div
            style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex"
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    minWidth: '200px',
                    minHeight: '500px',
                    borderRight: "1px solid #ccc",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <h3 style={{ marginBottom: "16px" }}>Settings</h3>
                <button onClick={() => onSelect("profile")}>Profile</button>
                <button onClick={() => onSelect("upload")}>Notifications</button>
                <button onClick={() => onSelect("content-box")}>Theme</button>
                <button onClick={() => onSelect("theme")}>About</button>
            </div>
        </div>
    );
}