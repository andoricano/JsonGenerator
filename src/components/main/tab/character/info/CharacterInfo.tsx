import { useAppStore } from "../../../../../AppProvider";

export default function CharacterInfo() {
    const { selectedCharacter } = useAppStore();

    if (!selectedCharacter) {
        return <EmptyState message="선택된 캐릭터가 없습니다." />;
    }

    const { name, role, img } = selectedCharacter;
    const profileImg = img?.[0] ? `/assets/${img[0]}` : null;

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {profileImg && <ProfileImage src={profileImg} alt={name} />}
                <CharacterDetails name={name} role={role} />
            </div>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div style={styles.container}>
            <div style={styles.emptyMessage}>{message}</div>
        </div>
    );
}

function ProfileImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} style={styles.image} />;
}

function CharacterDetails({ name, role }: { name: string; role: string }) {
    return (
        <div style={styles.textContainer}>
            <div style={styles.characterInfo}>이름: {name}</div>
            <div style={styles.characterInfo}>역할: {role}</div>
        </div>
    );
}

export const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "20%",
        minWidth: "200px",
        height: "100%",
        minHeight: "500px",
        marginRight: "10px",
        backgroundColor: "#b5d9b6ff",
        borderRadius: "12px",
        boxSizing: "border-box",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "16px",
        width: "100%",
    },
    image: {
        width: "70%",
        aspectRatio: "1 / 1",
        borderRadius: "8px",
        objectFit: "cover",
    },
    textContainer: {
        width: "80%",
        color: "#053b07ff",
    },
    characterInfo: {
        fontWeight: "bold",
        fontSize: "18px",
    },
    emptyMessage: {
        color: "white",
        padding: "16px",
    },
};