import { BehaviorSubject } from "rxjs";

export class AppStore {
    private projectNameSubject = new BehaviorSubject<string>("I Love yo yoU");
    projectName$ = this.projectNameSubject.asObservable();
    get projectName() { return this.projectNameSubject.getValue(); }
    setProjectName(name: string) { this.projectNameSubject.next(name); }

    private langSubject = new BehaviorSubject<"en" | "ko">("en");
    lang$ = this.langSubject.asObservable();
    get lang() { return this.langSubject.getValue(); }
    setLang(l: "en" | "ko") { this.langSubject.next(l); }
}

export const appStore = new AppStore();