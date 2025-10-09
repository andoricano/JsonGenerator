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
                height: '100%',        
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
            }}
        >
            <Contents obj={dummyData} />
        </div>
    );
}