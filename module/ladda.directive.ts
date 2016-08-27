import { Directive, ElementRef, Input, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Directive({
    selector: '[ladda]'
})
export class LaddaDirective implements OnInit, OnDestroy, DoCheck {
    
    private el: HTMLElement;
    private _dataStyle: string;
    private _dataSpinnerSize: string;
    private _dataSpinnerColor: string;
    private _ladda;
    
    @Input('ladda') loading: boolean;
    
    @Input() set dataStyle(dataStyle: string){
        this._dataStyle = dataStyle || this._dataStyle;
    }

    @Input() set dataSpinnerSize(dataSpinnerSize: string){
        this._dataSpinnerSize = dataSpinnerSize || this._dataSpinnerSize;
    }
    
    @Input() set dataSpinnerColor(dataSpinnerColor: string){
        this._dataSpinnerColor = dataSpinnerColor || this._dataSpinnerColor;
    }
    
    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }
    
    ngOnInit() {
        this.el.className += ' ladda-button';
        let Ladda = require('ladda');
        this._ladda = Ladda.create(this.el);
    }
    
    ngDoCheck() {
        if (this.loading) {
            this._ladda.start();
            return;
        }
        
        this._ladda.stop();
    }
    
    ngOnDestroy() {
        this._ladda.remove();
    }
}