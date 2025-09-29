import { useObservable } from "../../hooks/useObservable";
import { useStores } from "../../AppProvider";
import { useState } from "react";
import Scriptor from "./scriptor/Scriptor";
import ImageUploader from "./user/Uploader";
import Editer from "./editer/Editer";

export default function Canvas() {

    const { headerStore } = useStores();
    const activeTool = useObservable(
        headerStore.activeTool$,
        headerStore.activeTool
    );

  return (
    <>
      <main>
        {activeTool === "Scriptor" && <Scriptor/>}
        {activeTool === "Uploader" && <ImageUploader />}
        {activeTool === "Editer" && <Editer />}
      </main>
    </>
  );
}