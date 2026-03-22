import Dialog from "../../../Dialog";
import { useStore } from "../../../../stores/useStore";

export default function Project() {
    const projectInfo = useStore((state) => state.projectInfo);
    const setProjectInfo = useStore((state) => state.setProjectInfo);

    const { projectName, width, height } = projectInfo;

    const handleChange = (key: keyof typeof projectInfo, value: string | number) => {
        setProjectInfo({ [key]: value });
    };

    return (
        <div style={styles.container}>
            {/* 프로젝트 이름 */}
            <div style={styles.inputGroup}>
                <label style={styles.label}>프로젝트 이름</label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => handleChange("projectName", e.target.value)}
                    style={styles.inputName}
                    placeholder="프로젝트 이름 입력"
                />
            </div>

            {/* 화면 가로 */}
            <div style={styles.inputGroup}>
                <label style={styles.label}>화면 가로 (px)</label>
                <input
                    type="number"
                    value={width}
                    onChange={(e) => handleChange("width", Number(e.target.value))}
                    style={styles.inputNumber}
                />
            </div>

            {/* 화면 세로 */}
            <div style={styles.inputGroup}>
                <label style={styles.label}>화면 세로 (px)</label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => handleChange("height", Number(e.target.value))}
                    style={styles.inputNumber}
                />
            </div>

            {/* Dialog는 현재 코드에서 트리거가 없으나, 필요시 projectName 수정을 위해 유지 */}
            <Dialog
                open={false} // 필요에 따라 상태 추가
                title="프로젝트 이름 변경"
                placeholder="새 프로젝트 이름"
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
        alignItems: "center",
        gap: "30px",
        borderBottom: "2px solid #ccc",
        padding: "6px 10px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },
    label: {
        fontSize: "14px",
        fontWeight: "bold"
    },
    inputName: {
        border: "1px solid #aaa",
        borderRadius: "6px",
        padding: "4px 8px",
        width: "180px",
    },
    inputNumber: {
        border: "1px solid #aaa",
        borderRadius: "6px",
        padding: "4px 8px",
        width: "100px",
    }
};