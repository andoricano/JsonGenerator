import { BehaviorSubject } from "rxjs";

interface ScriptItem {
  id: number;
  type: string;
  name: string;
  cmd1: number;
  cmd2: number;
  text: string;
}

export class MainStore {
  private imagesSubject = new BehaviorSubject<{ id: number; url: string }[]>([]);
  images$ = this.imagesSubject.asObservable();
  get images() { return this.imagesSubject.getValue(); }

  addImage(url: string) {
    const newImage = { id: Date.now(), url };
    this.imagesSubject.next([...this.imagesSubject.getValue(), newImage]);
  }

  removeImage(id: number) {
    this.imagesSubject.next(this.images.filter(img => img.id === id));
  }


  private defaultScriptItem: ScriptItem = {
    id: 1,
    type: "default",
    name: "User",
    cmd1: 0,
    cmd2: 0,
    text: "please input your text",
  };
  private scriptItemsSubject = new BehaviorSubject<ScriptItem[]>([this.defaultScriptItem]);
  scriptItems$ = this.scriptItemsSubject.asObservable();

  constructor() {
    this.scriptItems$.subscribe(items => {
      console.log("[MainStore] scriptItems updated:", items);
    });
  }

  get scriptItems() {
    return this.scriptItemsSubject.getValue();
  }

  addScriptItem(item: ScriptItem) {
    const current = this.scriptItemsSubject.getValue();
    this.scriptItemsSubject.next([...current, item]);
  }

  removeScriptItem(id: number) {
    this.scriptItemsSubject.next(this.scriptItems.filter(item => item.id !== id));
  }

  scriptToJSON() {
    return {
      images: this.images,
      scriptItems: this.scriptItems,
    };
  }

  private _selectedIndex = new BehaviorSubject<number>(0);
  selectedIndex$ = this._selectedIndex.asObservable();

  get selectedIndex() {
    return this._selectedIndex.getValue();
  }

  set selectedIndex(index: number) {
    this._selectedIndex.next(index);
  }
}

export const mainStore = new MainStore();