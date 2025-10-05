import { useStores } from "../../../AppProvider";
import { useObservable } from "../../../hooks/useObservable";
import { useState } from "react";

export default function Config() {
    const { mainStore } = useStores();
    const [projectName, setProjectName] = useState("");
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);

    
    const handleChange = (field: "projectName" | "width" | "height", value: string | number) => {
        if (field === "projectName") setProjectName(value as string);
        if (field === "width") setWidth(Number(value));
        if (field === "height") setHeight(Number(value));
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
                borderBottom: "2px solid #ccc",
                padding: "6px 10px",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "14px" }}>프로젝트 이름</label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => handleChange("projectName", e.target.value)}
                    style={{
                        border: "1px solid #aaa",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        width: "180px",
                    }}
                    placeholder="프로젝트 이름 입력"
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "14px" }}>화면 가로 (px)</label>
                <input
                    type="number"
                    value={width}
                    onChange={(e) => handleChange("width", e.target.value)}
                    style={{
                        border: "1px solid #aaa",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        width: "100px",
                    }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "14px" }}>화면 세로 (px)</label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    style={{
                        border: "1px solid #aaa",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        width: "100px",
                    }}
                />
            </div>
        </div>
    );
}