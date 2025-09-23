import { useState, useRef, useEffect } from "react";

type DropdownProps = {
  label: string;
  items: { label: string; onClick: () => void }[];
};

export function Dropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {label} ▾
      </button>

      {open && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "4px",
            listStyle: "none",
            padding: "4px 0",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minWidth: "150px",
            zIndex: 1000,
          }}
        >
          {items.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={item.onClick}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}