import { useStoreLogic } from "../../../../stores/AppStore";
import ImageUploader from "./uploader/Uploader";



export default function Character() {

  return (

    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxSizing: 'border-box',
      }}
    >
      <ImageUploader />
    </div>
  );
}