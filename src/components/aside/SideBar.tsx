type Props = {
    onSelect: (menu: string) => void;
};

export default function SideBar({ onSelect }: Props) {
    return (
        <div
            style={{
                position: "fixed",
                top: 160,
                bottom: 0,
                width: "20%",
                left: 0,
                transition: "width 0.3s ease",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    height: "100%",
                    minWidth: '200px',
                    minHeight: '500px',
                    backgroundColor: "#f5f5f5",
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