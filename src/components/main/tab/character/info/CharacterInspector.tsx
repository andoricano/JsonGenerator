import React, { useState, useEffect } from 'react';
import { useStore } from "../../../../../stores/useStore";
import { AppState } from "../../../../../stores/storeType";

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
                <div style={styles.imageWrapper}>
                    {profileUrl ? (
                        <div style={styles.imageContainer}>
                            <img src={profileUrl} alt={selectedCharacter.name} style={styles.image} />
                        </div>
                    ) : (
                        <div style={styles.placeholderImage}>No Image</div>
                    )}
                </div>

                <div style={styles.inspectorFields}>
                    {/* NAME 섹션 */}
                    <div style={styles.field}>
                        <label style={styles.fieldLabel}>NAME</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                style={{
                                    ...styles.input,
                                    borderColor: isNameValid ? "#2a5b2e" : "#f44336" // 비어있으면 빨간 테두리
                                }}
                                placeholder="이름을 입력하세요 (필수)"
                            />
                        ) : (
                            <div style={styles.readOnlyValue}>{selectedCharacter.name}</div>
                        )}
                    </div>

                    {/* MEMO 섹션 */}
                    <div style={styles.field}>
                        <label style={styles.fieldLabel}>MEMO</label>
                        {isEditing ? (
                            <textarea
                                value={tempMemo}
                                onChange={(e) => setTempMemo(e.target.value)}
                                style={styles.textarea}
                                placeholder="메모를 입력하세요 (선택)"
                            />
                        ) : (
                            <div style={styles.readOnlyMemo}>{selectedCharacter.memo || "메모가 없습니다."}</div>
                        )}
                    </div>
                </div>
            </div>

            <div style={styles.footer}>
                {isEditing ? (
                    <>
                        {/* 확인 버튼 좌측 배치 및 유효성 검사 적용 */}
                        <button
                            onClick={handleSave}
                            style={{
                                ...styles.saveButton,
                                opacity: isNameValid ? 1 : 0.5,
                                cursor: isNameValid ? "pointer" : "not-allowed"
                            }}
                            disabled={!isNameValid}
                        >
                            확인
                        </button>
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
    return <div style={{ ...styles.content, ...styles.emptyState }}>{message}</div>;
}

const styles: Record<string, React.CSSProperties> = {
    container: { width: "30%", minWidth: "240px", height: "100%", backgroundColor: "#b5d9b6ff", borderRadius: "12px", display: "flex", flexDirection: "column", overflow: "hidden", border: "2px solid #2a5b2e" },
    header: { padding: "10px", backgroundColor: "#2a5b2e", color: "white", fontSize: "12px", fontWeight: "bold", textAlign: "center" },
    content: { flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" },
    imageWrapper: { display: "flex", justifyContent: "center" },
    imageContainer: { position: "relative", width: "100%", maxWidth: "160px" },
    image: { width: "100%", aspectRatio: "1/1", borderRadius: "8px", objectFit: "cover", border: "2px solid #2a5b2e", backgroundColor: "white" },
    inspectorFields: { display: "flex", flexDirection: "column", gap: "16px" },
    field: { display: "flex", flexDirection: "column", gap: "6px" },
    fieldLabel: { fontSize: "11px", fontWeight: "bold", color: "#1a3b1d" },
    readOnlyValue: { fontSize: "18px", fontWeight: "bold", padding: "4px 0", borderBottom: "1px solid rgba(42, 91, 46, 0.3)" },
    readOnlyMemo: { fontSize: "14px", lineHeight: "1.5", color: "#333", whiteSpace: "pre-wrap" },
    input: { padding: "8px", borderRadius: "4px", border: "1px solid #2a5b2e", outline: "none" },
    textarea: { padding: "8px", borderRadius: "4px", border: "1px solid #2a5b2e", minHeight: "100px", resize: "none", outline: "none" },
    footer: { padding: "12px", display: "flex", gap: "8px", borderTop: "1px solid rgba(42, 91, 46, 0.2)", backgroundColor: "rgba(255,255,255,0.2)" },
    editButton: { flex: 1, padding: "10px", backgroundColor: "#2a5b2e", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    saveButton: { flex: 1, padding: "10px", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" },
    cancelButton: { flex: 1, padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    placeholderImage: { width: "160px", height: "160px", backgroundColor: "#ddd", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", color: "#888" },
    emptyState: { justifyContent: "center", alignItems: "center", textAlign: "center", color: "#2a5b2e" }
};