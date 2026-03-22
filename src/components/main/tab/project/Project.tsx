import Dialog from "../../../Dialog";
import { useStore } from "../../../../stores/useStore";

export default function Project() {
    const projectInfo = useStore((state) => state.projectInfo);
    const setProjectInfo = useStore((state) => state.setProjectInfo);

    const { projectName, width, height, resourcePath } = projectInfo;

    const handleChange = (key: keyof typeof projectInfo, value: string | number) => {
        setProjectInfo({ [key]: value });
    };

    const handleSave = () => {
        console.log("Saved Project Info:", projectInfo);
        alert("설정이 저장되었습니다.");
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Project Settings</h3>

            <div style={styles.content}>
                {/* 프로젝트 이름 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Project Name</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => handleChange("projectName", e.target.value)}
                        style={styles.inputName}
                        placeholder="프로젝트 명을 입력하세요"
                    />
                </div>

                {/* 리소스 경로 설정 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Resource Path</label>
                    <input
                        type="text"
                        value={resourcePath}
                        onChange={(e) => handleChange("resourcePath", e.target.value)}
                        style={styles.inputName}
                        placeholder="C:/resources/assets/..."
                    />
                </div>

                {/* 해상도 설정 */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Resolution (px)</label>
                    <div style={styles.resContainer}>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => handleChange("width", Number(e.target.value))}
                            style={styles.inputNumber}
                        />
                        <span style={styles.x}>×</span>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => handleChange("height", Number(e.target.value))}
                            style={styles.inputNumber}
                        />
                    </div>
                </div>

                {/* 저장 버튼 */}
                <button onClick={handleSave} style={styles.saveButton}>
                    Save Project
                </button>
            </div>

            <Dialog
                open={false}
                title="Edit Name"
                defaultValue={projectName}
                onClose={() => { }}
                onConfirm={(newName) => handleChange("projectName", newName.trim())}
            />
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "24px",
        width: "360px",
        backgroundColor: "#fff",
    },
    title: {
        margin: "0 0 10px 0",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#1a1a1a",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#555",
    },
    inputName: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        fontSize: "14px",
        outline: "none",
        backgroundColor: "#fafafa",
    },
    resContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    inputNumber: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        width: "100px",
        fontSize: "14px",
        textAlign: "center",
    },
    x: {
        color: "#aaa",
        fontSize: "14px",
    },
    saveButton: {
        marginTop: "10px",
        padding: "14px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
    }
};