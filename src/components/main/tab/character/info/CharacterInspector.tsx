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
        backgroundColor: "#f9fbf9",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    header: { padding: "12px", backgroundColor: "#2a5b2e", color: "white", fontSize: "11px", fontWeight: "bold", textAlign: "center" },

    content: {
        flex: 1,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflow: "hidden"
    },

    imageWrapper: { flexShrink: 0, display: "flex", justifyContent: "center" },
    imageContainer: { position: "relative", width: "100%" },
    image: { width: "100%", aspectRatio: "1/1", borderRadius: "8px", objectFit: "cover", border: "1px solid #ddd", backgroundColor: "white" },
    representativeBadge: { position: "absolute", bottom: "8px", right: "8px", backgroundColor: "#2a5b2e", color: "white", fontSize: "9px", padding: "2px 6px", borderRadius: "4px" },

    inspectorFields: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        overflow: "hidden"
    },
    field: { flexShrink: 0, display: "flex", flexDirection: "column", gap: "6px" },

    memoField: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minHeight: 0
    },

    fieldLabel: { fontSize: "10px", fontWeight: "bold", color: "#666" },
    readOnlyValue: { fontSize: "18px", fontWeight: "bold", color: "#1a3b1d", paddingBottom: "4px", borderBottom: "2px solid #2a5b2e" },

    input: { padding: "8px", borderRadius: "4px", border: "1px solid #ddd", outline: "none" },
    footer: { padding: "16px", display: "flex", gap: "8px", backgroundColor: "#fff", borderTop: "1px solid #eee" },
    editButton: { flex: 1, padding: "12px", backgroundColor: "#2a5b2e", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    saveButton: { flex: 1, padding: "12px", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" },
    cancelButton: { flex: 1, padding: "12px", backgroundColor: "#eee", color: "#666", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    placeholderImage: { width: "100%", aspectRatio: "1/1", backgroundColor: "#eee", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", color: "#aaa" },
    emptyState: { justifyContent: "center", alignItems: "center", textAlign: "center", color: "#999" }
};