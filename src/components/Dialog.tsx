import { useState } from "react";

interface DialogProps {
  open: boolean;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}

export default function Dialog({ open, title, placeholder, defaultValue = "", onClose, onConfirm }: DialogProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 8,
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* 제목 + 닫기 버튼 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{title}</span>
          <button onClick={onClose} style={{ cursor: "pointer" }}>X</button>
        </div>

        {/* 입력 필드 */}
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: 8 }}
        />

        {/* 확인 버튼 */}
        <button onClick={() => onConfirm(inputValue)} style={{ padding: 8, cursor: "pointer" }}>
          확인
        </button>
      </div>
    </div>
  );
}