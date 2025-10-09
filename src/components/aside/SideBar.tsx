import Contents from "./Contents";

type Props = {
    onSelect: (menu: string) => void;
};

export default function SideBar({ onSelect }: Props) {
    const dummyData = {
        Script: ["Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending", "Intro Scene", "Battle Start", "Ending",],
        Character: ["Hero", "Villain", "Merchant"],
        Resource: ["background.png", "music.mp3", "sprite.png"],
    };
    return (
        <div
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #ccc",
            }}
        >
            <div
                style={{
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <Contents obj={dummyData} />
            </div>
        </div>
    )
}