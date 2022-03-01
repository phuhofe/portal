import { EventEmitter, Component, ElementRef, NgZone, Input, Output, NgModule } from '@angular/core';
import { dispatchEditorEvents, appendEditor, openEditor, overlayEditor } from 'pintura';

import * as ɵngcc0 from '@angular/core';

const _c0 = ["*"];
class PinturaEditorAbstractComponent {
    constructor(element, zone) {
        this.unsubs = [];
        this.src = undefined;
        this.options = undefined;
        this.loadstart = new EventEmitter();
        this.loaderror = new EventEmitter();
        this.loadprogress = new EventEmitter();
        this.load = new EventEmitter();
        this.processstart = new EventEmitter();
        this.processerror = new EventEmitter();
        this.processprogress = new EventEmitter();
        this.process = new EventEmitter();
        this.update = new EventEmitter();
        this.undo = new EventEmitter();
        this.redo = new EventEmitter();
        this.revert = new EventEmitter();
        this.destroy = new EventEmitter();
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
        this.close = new EventEmitter();
        this.addshape = new EventEmitter();
        this.selectshape = new EventEmitter();
        this.updateshape = new EventEmitter();
        this.removeshape = new EventEmitter();
        this.routeEvent = (e) => {
            const emitter = this[e.type.split(':')[1]];
            if (!emitter)
                return;
            emitter.emit(e.detail);
        };
        this.element = element;
        this.zone = zone;
    }
    initEditor(element, props) {
        return undefined;
    }
    ngAfterViewInit() {
        this.element.nativeElement.classList.add('PinturaRootWrapper');
        // will block angular from listening to events inside the editor
        this.zone.runOutsideAngular(() => {
            this.editor = this.initEditor(this.element.nativeElement, Object.assign({}, this.options, { src: this.src }));
            this.unsubs = dispatchEditorEvents(this.editor, this.element.nativeElement);
        });
        // route events
        Object.keys(this)
            .filter((key) => this[key] instanceof EventEmitter)
            .forEach((key) => {
            this.element.nativeElement.addEventListener(`pintura:${key}`, this.routeEvent);
        });
    }
    ngOnChanges() {
        if (!this.editor)
            return;
        Object.assign(this.editor, this.options, { src: this.src });
    }
    ngOnDestroy() {
        if (!this.editor)
            return;
        this.editor.destroy();
        // unsubscribe
        this.unsubs.forEach((unsub) => unsub());
        this.unsubs = [];
        // unroute events
        Object.keys(this)
            .filter((key) => this[key] instanceof EventEmitter)
            .forEach((key) => {
            this.element.nativeElement.removeEventListener(`pintura:${key}`, this.routeEvent);
        });
        this.editor = undefined;
    }
    ngOnInit() { }
}
PinturaEditorAbstractComponent.ɵfac = function PinturaEditorAbstractComponent_Factory(t) { return new (t || PinturaEditorAbstractComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
PinturaEditorAbstractComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: PinturaEditorAbstractComponent, selectors: [["pintura-editor"]], inputs: { src: "src", options: "options" }, outputs: { loadstart: "loadstart", loaderror: "loaderror", loadprogress: "loadprogress", load: "load", processstart: "processstart", processerror: "processerror", processprogress: "processprogress", process: "process", update: "update", undo: "undo", redo: "redo", revert: "revert", destroy: "destroy", show: "show", hide: "hide", close: "close", addshape: "addshape", selectshape: "selectshape", updateshape: "updateshape", removeshape: "removeshape" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function PinturaEditorAbstractComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
PinturaEditorAbstractComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
PinturaEditorAbstractComponent.propDecorators = {
    src: [{ type: Input }],
    options: [{ type: Input }],
    loadstart: [{ type: Output }],
    loaderror: [{ type: Output }],
    loadprogress: [{ type: Output }],
    load: [{ type: Output }],
    processstart: [{ type: Output }],
    processerror: [{ type: Output }],
    processprogress: [{ type: Output }],
    process: [{ type: Output }],
    update: [{ type: Output }],
    undo: [{ type: Output }],
    redo: [{ type: Output }],
    revert: [{ type: Output }],
    destroy: [{ type: Output }],
    show: [{ type: Output }],
    hide: [{ type: Output }],
    close: [{ type: Output }],
    addshape: [{ type: Output }],
    selectshape: [{ type: Output }],
    updateshape: [{ type: Output }],
    removeshape: [{ type: Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PinturaEditorAbstractComponent, [{
        type: Component,
        args: [{
                selector: 'pintura-editor',
                template: ` <ng-content></ng-content> `
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }]; }, { src: [{
            type: Input
        }], options: [{
            type: Input
        }], loadstart: [{
            type: Output
        }], loaderror: [{
            type: Output
        }], loadprogress: [{
            type: Output
        }], load: [{
            type: Output
        }], processstart: [{
            type: Output
        }], processerror: [{
            type: Output
        }], processprogress: [{
            type: Output
        }], process: [{
            type: Output
        }], update: [{
            type: Output
        }], undo: [{
            type: Output
        }], redo: [{
            type: Output
        }], revert: [{
            type: Output
        }], destroy: [{
            type: Output
        }], show: [{
            type: Output
        }], hide: [{
            type: Output
        }], close: [{
            type: Output
        }], addshape: [{
            type: Output
        }], selectshape: [{
            type: Output
        }], updateshape: [{
            type: Output
        }], removeshape: [{
            type: Output
        }] }); })();

class PinturaEditorComponent extends PinturaEditorAbstractComponent {
    initEditor(element, props) {
        return appendEditor(element, props);
    }
}
PinturaEditorComponent.ɵfac = /*@__PURE__*/ function () { let ɵPinturaEditorComponent_BaseFactory; return function PinturaEditorComponent_Factory(t) { return (ɵPinturaEditorComponent_BaseFactory || (ɵPinturaEditorComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(PinturaEditorComponent)))(t || PinturaEditorComponent); }; }();
PinturaEditorComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: PinturaEditorComponent, selectors: [["pintura-editor"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function PinturaEditorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PinturaEditorComponent, [{
        type: Component,
        args: [{
                selector: 'pintura-editor',
                template: ` <ng-content></ng-content> `
            }]
    }], null, null); })();

class PinturaEditorModalComponent extends PinturaEditorAbstractComponent {
    initEditor(element, props) {
        return openEditor(props);
    }
    showEditor() {
        this.editor.show();
    }
    hideEditor() {
        this.editor.hide();
    }
    ngOnDestroy() {
        if (!this.editor)
            return;
        this.editor = undefined;
    }
}
PinturaEditorModalComponent.ɵfac = /*@__PURE__*/ function () { let ɵPinturaEditorModalComponent_BaseFactory; return function PinturaEditorModalComponent_Factory(t) { return (ɵPinturaEditorModalComponent_BaseFactory || (ɵPinturaEditorModalComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(PinturaEditorModalComponent)))(t || PinturaEditorModalComponent); }; }();
PinturaEditorModalComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: PinturaEditorModalComponent, selectors: [["pintura-editor-modal"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function PinturaEditorModalComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PinturaEditorModalComponent, [{
        type: Component,
        args: [{
                selector: 'pintura-editor-modal',
                template: ` <ng-content></ng-content> `
            }]
    }], null, null); })();

class PinturaEditorOverlayComponent extends PinturaEditorAbstractComponent {
    initEditor(element, props) {
        return overlayEditor(element, props);
    }
}
PinturaEditorOverlayComponent.ɵfac = /*@__PURE__*/ function () { let ɵPinturaEditorOverlayComponent_BaseFactory; return function PinturaEditorOverlayComponent_Factory(t) { return (ɵPinturaEditorOverlayComponent_BaseFactory || (ɵPinturaEditorOverlayComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(PinturaEditorOverlayComponent)))(t || PinturaEditorOverlayComponent); }; }();
PinturaEditorOverlayComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: PinturaEditorOverlayComponent, selectors: [["pintura-editor-overlay"]], features: [ɵngcc0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function PinturaEditorOverlayComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PinturaEditorOverlayComponent, [{
        type: Component,
        args: [{
                selector: 'pintura-editor-overlay',
                template: ` <ng-content></ng-content> `
            }]
    }], null, null); })();

class AngularPinturaModule {
}
AngularPinturaModule.ɵfac = function AngularPinturaModule_Factory(t) { return new (t || AngularPinturaModule)(); };
AngularPinturaModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: AngularPinturaModule });
AngularPinturaModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(AngularPinturaModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    PinturaEditorComponent,
                    PinturaEditorModalComponent,
                    PinturaEditorOverlayComponent,
                ],
                imports: [],
                exports: [PinturaEditorComponent, PinturaEditorModalComponent, PinturaEditorOverlayComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AngularPinturaModule, { declarations: [PinturaEditorComponent, PinturaEditorModalComponent, PinturaEditorOverlayComponent], exports: [PinturaEditorComponent, PinturaEditorModalComponent, PinturaEditorOverlayComponent] }); })();

/*
 * Public API Surface of angular-pintura
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularPinturaModule, PinturaEditorComponent, PinturaEditorModalComponent, PinturaEditorOverlayComponent, PinturaEditorAbstractComponent as ɵa };

//# sourceMappingURL=angular-pintura.js.map