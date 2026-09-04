import { Directive, effect, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: '[appFocusOnVisible]',
})
export class FocusOnVisibleDirective {
    private readonly elementRef = inject(ElementRef<HTMLInputElement>);
    readonly appFocusOnVisible = input.required<boolean>();

    constructor() {
        effect(() => {
            if (this.appFocusOnVisible()) {
                this.elementRef.nativeElement.focus();
            }
        });
    }
}
