import React, { useState, useEffect } from 'react';
import { useStore } from "../../../../../stores/useStore";
import { AppState } from "../../../../../stores/storeType";
import CharacterMemoField from "./CharacterMemoField";
import CharacterNameField from './CharacterNameField';

export default function CharacterInspector() {
    const selectedCharacter = useStore((state: AppState) => state.selectedCharacter);
    const updateSelectedCharacter = useStore((state: AppState) => state.updateSelectedCharacter);

    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState("");
    const [tempMemo, setTempMemo] = useState("");

    useEffect(() => {
        if (selectedCharacter) {
            setTempName(selectedCharacter.name);
            setTempMemo(selectedCharacter.memo || "");
            setIsEditing(false);
        }
    }, [selectedCharacter?.id]);

    if (!selectedCharacter) {
        return <EmptyState message="캐릭터를 선택하여 속성을 확인하세요." />;
    }

    const profileUrl = selectedCharacter.previewUrls?.[selectedCharacter.thumbnail] || null;
    const isNameValid = tempName.trim().length > 0;

    const handleSave = () => {
        if (!isNameValid) return;
        updateSelectedCharacter({
            ...selectedCharacter,
            name: tempName.trim(),
            memo: tempMemo,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempName(selectedCharacter.name);
        setTempMemo(selectedCharacter.memo || "");
        setIsEditing(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>CHARACTER INSPECTOR</div>


            <div style={styles.content}>
                {/* 1. 이미지 영역 (유지) */}
                <div style={styles.imageWrapper}>
                    {profileUrl ? (
                        <div style={styles.imageContainer}>
                            <img src={profileUrl} alt={selectedCharacter.name} style={styles.image} />
                            <div style={styles.representativeBadge}>REPRESENTATIVE</div>
                        </div>
                    ) : (
                        <div style={styles.placeholderImage}>No Image</div>
                    )}
                </div>

                {/* 2. 정보 필드 영역 */}
                <div style={styles.inspectorFields}>
                    <div style={styles.field}>
                        <label style={styles.fieldLabel}>NAME</label>
                        <CharacterNameField
                            isEditing={isEditing}
                            value={isEditing ? tempName : selectedCharacter.name}
                            onChange={setTempName}
                            isValid={isNameValid}
                            placeholder="이름을 입력하세요"
                        />
                    </div>

                    {/* MEMO 섹션: 삼항 연산자 없이 컴포넌트 하나로 해결 */}
                    <div style={styles.memoField}>
                        <label style={styles.fieldLabel}>MEMO</label>
                        <CharacterMemoField
                            isEditing={isEditing}
                            value={isEditing ? tempMemo : (selectedCharacter.memo || "")}
                            onChange={setTempMemo}
                            placeholder="메모를 입력하세요..."
                        />
                    </div>
                </div>
            </div>

            <div style={styles.footer}>
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            style={{
                                ...styles.saveButton,
                                opacity: isNameValid ? 1 : 0.5,
                                cursor: isNameValid ? "pointer" : "not-allowed"
                            }}
                            disabled={!isNameValid}
                        >확인</button>
                        <button onClick={handleCancel} style={styles.cancelButton}>취소</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} style={styles.editButton}>수정하기</button>
                )}
            </div>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div style={styles.container}>
            <div style={styles.header}>CHARACTER INSPECTOR</div>
            <div style={{ ...styles.content, ...styles.emptyState }}>{message}</div>
        </div>
    );
}



const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff", 
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderLeft: "1px solid #ddd"
    },
    header: { 
        padding: "12px", 
        backgroundColor: "#333", 
        color: "#fff", 
        fontSize: "11px", 
        fontWeight: "bold", 
        textAlign: "left", 
        letterSpacing: "1px" 
    },
    content: {
        flex: 1,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        overflowY: "auto"
    },
    imageWrapper: { 
        flexShrink: 0, 
        display: "flex", 
        justifyContent: "center" 
    },
    imageContainer: { 
        position: "relative", 
        width: "100%" 
    },
    image: { 
        width: "100%", 
        aspectRatio: "1/1", 
        borderRadius: "4px", // 8px -> 4px (더 각진 느낌)
        objectFit: "cover", 
        border: "1px solid #eee", 
        backgroundColor: "#f5f5f5" 
    },
    representativeBadge: { 
        position: "absolute", 
        bottom: "8px", 
        right: "8px", 
        backgroundColor: "rgba(51, 51, 51, 0.8)", 
        color: "white", 
        fontSize: "9px", 
        padding: "2px 6px", 
        borderRadius: "2px",
        fontWeight: "bold"
    },
    inspectorFields: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflow: "hidden"
    },
    field: { 
        flexShrink: 0, 
        display: "flex", 
        flexDirection: "column", 
        gap: "8px" 
    },
    memoField: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        minHeight: 0
    },
    fieldLabel: { 
        fontSize: "10px", 
        fontWeight: "bold", 
        color: "#999", 
        letterSpacing: "0.5px"
    },
    readOnlyValue: { 
        fontSize: "13px", 
        fontWeight: "500", 
        color: "#333", 
        paddingBottom: "4px", 
        borderBottom: "1px solid #eee"
    },
    input: { 
        padding: "8px", 
        fontSize: "12px",
        borderRadius: "2px", 
        border: "1px solid #ddd", 
        outline: "none",
        backgroundColor: "#fafafa"
    },
    footer: { 
        padding: "12px 16px", 
        display: "flex", 
        gap: "8px", 
        backgroundColor: "#fff", 
        borderTop: "1px solid #eee" 
    },
    editButton: { 
        flex: 1, 
        padding: "10px", 
        backgroundColor: "#444",
        color: "white", 
        border: "none", 
        borderRadius: "4px", 
        cursor: "pointer", 
        fontWeight: "bold",
        fontSize: "11px"
    },
    saveButton: { 
        flex: 1, 
        padding: "10px", 
        backgroundColor: "#333", 
        color: "white", 
        border: "none", 
        borderRadius: "4px", 
        fontWeight: "bold",
        fontSize: "11px"
    },
    cancelButton: { 
        flex: 1, 
        padding: "10px", 
        backgroundColor: "#eee", 
        color: "#666", 
        border: "none", 
        borderRadius: "4px", 
        cursor: "pointer", 
        fontWeight: "bold",
        fontSize: "11px"
    },
    placeholderImage: { 
        width: "100%", 
        aspectRatio: "1/1", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "4px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        color: "#ccc",
        border: "1px solid #eee",
        fontSize: "11px"
    },
    emptyState: { 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center", 
        color: "#999",
        fontSize: "11px"
    }
};