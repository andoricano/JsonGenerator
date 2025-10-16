import { useStoreLogic } from "../../../../stores/AppStore";
import ImageUploader from "./uploader/Uploader";
import { Character } from "../../../../types";
import ChracterInfo from "./info/CharacterInfo";
import CharacterImageSlider from "./info/CharacterImageSlider";



export default function Character() {

  return (

    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        padding:'10px'
      }}
    >
      <ChracterInfo/>
      <CharacterImageSlider/>
      {/* <ImageUploader /> */}
    </div>
  );
}