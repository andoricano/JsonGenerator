import { BehaviorSubject } from "rxjs";

export class HeaderStore {  
  private projectNameSubject = new BehaviorSubject<string>("I Love yo yoU");
  projectName$ = this.projectNameSubject.asObservable();
  get projectName() { return this.projectNameSubject.getValue(); }
  setProjectName(name: string) { this.projectNameSubject.next(name); }

  private langSubject = new BehaviorSubject<"en" | "ko">("en");
  lang$ = this.langSubject.asObservable();
  get lang() { return this.langSubject.getValue(); }
  setLang(l: "en" | "ko") { this.langSubject.next(l); }

  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();
  get darkMode() { return this.darkModeSubject.getValue(); }
  toggleDarkMode() { this.darkModeSubject.next(!this.darkModeSubject.getValue()); }


  private activeToolSubject = new BehaviorSubject<string>("Scriptor");
  activeTool$ = this.activeToolSubject.asObservable();
  get activeTool() { return this.activeToolSubject.getValue(); }
  setActiveTool(tool: string) { this.activeToolSubject.next(tool); }
}

export class CanvasStore {
  private messagesSubject = new BehaviorSubject<{ id: number; text: string }[]>([]);
  messages$ = this.messagesSubject.asObservable();
  get messages() { return this.messagesSubject.getValue(); }
  addMessage(msg: string) {
    this.messagesSubject.next([...this.messagesSubject.getValue(), { id: Date.now(), text: msg }]);
  }
}

export class LogicStore {
  private openSubject = new BehaviorSubject<boolean>(true);
  open$ = this.openSubject.asObservable();
  get isOpen() { return this.openSubject.getValue(); }
  toggle() { this.openSubject.next(!this.openSubject.getValue()); }
}

export type Lang = "en" | "ko";
export const headerStore = new HeaderStore();
export const canvasStore = new CanvasStore();
export const logicStore = new LogicStore();