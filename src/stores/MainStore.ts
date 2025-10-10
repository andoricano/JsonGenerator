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


  private scriptItemsSubject = new BehaviorSubject<ScriptItem[]>([]);
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
}

export const mainStore = new MainStore();