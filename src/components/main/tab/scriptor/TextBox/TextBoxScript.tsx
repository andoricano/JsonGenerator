import React from 'react';
import { Script } from '../../../../../stores/storeType';

type TextBoxScriptProps = {
    scriptString: Script;
};

export default function TextBoxScript({ scriptString }: TextBoxScriptProps) {
    const hasText = scriptString.text.trim() !== "";

    return (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                padding: '8px',
                backgroundColor: '#4caf50',
                marginBottom: '10px',
                borderRadius: '4px',
            }}
        >
            <div
                style={{
                    padding: '12px',
                    borderRadius: '12px',
                    minWidth: '10%',
                    maxWidth: '90%',
                    backgroundColor: '#136415ff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <span
                    style={{
                        color: hasText ? '#fff' : '#ffffffb3',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                    }}
                >
                    {hasText ? scriptString.text : "대사를 입력해주세요."}
                </span>
            </div>
        </div>
    );
}