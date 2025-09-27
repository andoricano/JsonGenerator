import { BehaviorSubject } from "rxjs";

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
}

export const mainStore = new MainStore();