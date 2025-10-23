import { useAppStore } from "../../../../../AppProvider";


export default function CharacterInfo() {
    const { selectedCharacter } = useAppStore();

    if (!selectedCharacter) {
        return <EmptyState message="선택된 캐릭터가 없습니다." />;
    }

    const profileImg = selectedCharacter.img?.[0]
        ? URL.createObjectURL(selectedCharacter.img[0])
        : null;

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.imageWrapper}>
                    {profileImg ? (
                        <ProfileImage src={profileImg} alt={selectedCharacter.name} />
                    ) : (
                        <div style={styles.placeholderImage}></div>
                    )}
                </div>

                <CharacterDetails
                    name={selectedCharacter.name}
                />
            </div>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div style={{ ...styles.content, ...styles.emptyState }}>
            {message}
        </div>
    );
}

function ProfileImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} style={styles.image} />;
}

function CharacterDetails({ name }: { name: string; }) {
    return (
        <div style={styles.textContainer}>
            <div style={styles.characterInfo}>이름: {name}</div>
        </div>
    );
}

export const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "30%",
        minWidth: "200px",
        height: "100%",
        minHeight: "500px",
        marginRight: "10px",
        backgroundColor: "#b5d9b6ff",
        borderRadius: "12px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "16px",
    },
    emptyState: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        backgroundColor: "#b5d9b6ff",
        minHeight: "500px",
    },
    imageWrapper: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    image: {
        width: "60%",
        aspectRatio: "1 / 1",
        borderRadius: "8px",
        objectFit: "cover",
    },
    placeholderImage: {
        width: "80%",
        aspectRatio: "1 / 1",
        borderRadius: "8px",
        backgroundColor: "#ddd",
        marginBottom: "16px",
    },
    textContainer: {
        width: "80%",
        color: "#053b07ff",
    },
    characterInfo: {
        fontWeight: "bold",
        fontSize: "18px",
    },
};