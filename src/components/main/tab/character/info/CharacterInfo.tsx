import { useAppStore } from "../../../../../AppProvider";

export default function CharacterInfo() {
    const { selectedCharacter } = useAppStore();

    if (!selectedCharacter) {
        return <EmptyState message="선택된 캐릭터가 없습니다." />;
    }

    const selectedIdx = selectedCharacter.selectedImageIndex;
    const profileImg = selectedCharacter.img?.[selectedIdx]
        ? URL.createObjectURL(selectedCharacter.img[selectedIdx])
        : null;

    console.log(selectedIdx)
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

                <CharacterDetails name={selectedCharacter.name} />
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
    return (
        <div style={styles.imageContainer}>
            <div style={styles.imageLabel}>대표 이미지</div>
            <img src={src} alt={alt} style={styles.image} />
        </div>
    );
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
        width: "70%",
        aspectRatio: "1 / 1",
        borderRadius: "8px",
        objectFit: "cover",
        padding: "10px",
        border: "2px solid #2a5b2e",
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

    wrapper: {
        position: "relative",
        display: "inline-block",
        width: "80px",
        height: "80px",
        borderRadius: "8px",
        overflow: "hidden",
    },
    label: {
        position: "absolute",
        top: "4px",
        left: "4px",
        background: "rgba(0, 0, 0, 0.6)",
        color: "white",
        padding: "2px 6px",
        fontSize: "12px",
        borderRadius: "4px",
    },
    imageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
    },
    imageLabel: {
        fontWeight: "bold",
        fontSize: "14px",
        color: "#053b07ff",
    },

};