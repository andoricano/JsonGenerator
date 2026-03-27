import React, { useState, useEffect } from 'react';
import { useStore } from '../../../../stores/useStore';
import { AppState } from '../../../../stores/storeType';

export default function ScriptInspector() {

    return (
        <div style={styles.container}>
            <div style={styles.header}>Scriptor INSPECTOR</div>

        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div style={styles.container}>
            <div style={styles.header}>Script Inspector</div>
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
    emptyState: { justifyContent: "center", alignItems: "center", textAlign: "center", color: "#999" }
};