import { BehaviorSubject } from "rxjs";

interface FooterItem {
  id: number;
  type: string;
  cmd1: number;
  cmd2: number;
  text: string;
}
export class FooterStore {
  private itemsSubject = new BehaviorSubject<FooterItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    this.items$.subscribe(items => {
      console.log("[FooterStore] items updated:", items);
    });
  }

  get items() {
    return this.itemsSubject.getValue();
  }

  addItem(item: FooterItem) {
    const current = this.itemsSubject.getValue();
    this.itemsSubject.next([...current, item]);
  }

  toJSON() {
    return {
      items: this.items,
    };
  }
}

export const footerStore = new FooterStore();