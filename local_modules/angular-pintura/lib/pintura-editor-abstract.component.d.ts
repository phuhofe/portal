import { EventEmitter, ElementRef, NgZone, OnInit } from '@angular/core';
import { ImageSource, PinturaEditorOptions, PinturaEditor } from 'pintura';
import * as ɵngcc0 from '@angular/core';
export declare class PinturaEditorAbstractComponent implements OnInit {
    protected element: ElementRef;
    protected editor: PinturaEditor;
    protected zone: NgZone;
    private unsubs;
    src: ImageSource;
    options: PinturaEditorOptions;
    loadstart: EventEmitter<any>;
    loaderror: EventEmitter<any>;
    loadprogress: EventEmitter<any>;
    load: EventEmitter<any>;
    processstart: EventEmitter<any>;
    processerror: EventEmitter<any>;
    processprogress: EventEmitter<any>;
    process: EventEmitter<any>;
    update: EventEmitter<any>;
    undo: EventEmitter<any>;
    redo: EventEmitter<any>;
    revert: EventEmitter<any>;
    destroy: EventEmitter<any>;
    show: EventEmitter<any>;
    hide: EventEmitter<any>;
    close: EventEmitter<any>;
    addshape: EventEmitter<any>;
    selectshape: EventEmitter<any>;
    updateshape: EventEmitter<any>;
    removeshape: EventEmitter<any>;
    constructor(element: ElementRef, zone: NgZone);
    private routeEvent;
    protected initEditor(element: HTMLElement, props: any): PinturaEditor;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<PinturaEditorAbstractComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<PinturaEditorAbstractComponent, "pintura-editor", never, { "src": "src"; "options": "options"; }, { "loadstart": "loadstart"; "loaderror": "loaderror"; "loadprogress": "loadprogress"; "load": "load"; "processstart": "processstart"; "processerror": "processerror"; "processprogress": "processprogress"; "process": "process"; "update": "update"; "undo": "undo"; "redo": "redo"; "revert": "revert"; "destroy": "destroy"; "show": "show"; "hide": "hide"; "close": "close"; "addshape": "addshape"; "selectshape": "selectshape"; "updateshape": "updateshape"; "removeshape": "removeshape"; }, never, ["*"]>;
}

//# sourceMappingURL=pintura-editor-abstract.component.d.ts.map