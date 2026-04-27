import { Character, LineItem } from "../../stores/canvasType";
import { SaveItemForm, SaveActorItem } from "./SaveType";

/**
 * 1. 내부 변환 로직 (Private 성격)
 * 원본 데이터를 SaveItemForm 구조로 가공합니다.
 */
export const convertToSaveForm = (
    lineItems: LineItem[],
    characterList: Character[]
): SaveItemForm[] => {
    return lineItems.map((line) => {
        const actorPaths: SaveActorItem[] = line.actors.map((actor) => {
            const targetChar = characterList.find((c) => c.id === actor.characterId);
            return {
                actorPath: targetChar?.path || "",
                actorState: actor.actorEffect || "default",
            };
        });

        return {
            id: line.id,
            actorPaths: actorPaths,
            speakers: line.speakers,
            text: line.text,
            effect: line.effect,
        };
    });
};




/**
 * 2. 실제 저장 실행 함수 (Public)
 * 외부(컴포넌트)에서는 이 함수만 호출하면 됩니다.
 */
export const saveProjectLines = (
    lineItems: LineItem[],
    characterList: Character[],
    projectName: string
) => {
    // 데이터 가공
    const saveData = convertToSaveForm(lineItems, characterList);

    // JSON 문자열화
    const jsonString = JSON.stringify(saveData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // 다운로드 실행
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectName || "untitled"}.json`;
    document.body.appendChild(link);
    link.click();

    // 정리
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};



/**
 * 3. 목업 로그 출력 함수 (Debug)
 * 실제 저장될 JSON 문자열만 콘솔에 깔끔하게 출력합니다.
 */
export const mockupSaveProjectLog = (
    lineItems: LineItem[],
    characterList: Character[],
    projectName: string
) => {
    const saveData = convertToSaveForm(lineItems, characterList);
    const jsonString = JSON.stringify(saveData, null, 2);

    console.log(`[File Content Preview: ${projectName || "untitled"}.json]\n`, jsonString);

    return jsonString;
};