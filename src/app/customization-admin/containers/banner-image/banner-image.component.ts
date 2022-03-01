import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { createDefaultImageReader, createDefaultImageWriter, getEditorDefaults, locale_en_gb, markup_editor_defaults, markup_editor_locale_en_gb, plugin_annotate, plugin_annotate_locale_en_gb, plugin_crop, plugin_crop_locale_en_gb, plugin_filter, plugin_filter_defaults, plugin_filter_locale_en_gb, plugin_finetune, plugin_finetune_defaults, plugin_finetune_locale_en_gb, setPlugins } from 'local_modules/pintura/pintura';


setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent implements OnInit {

  @Input() isDiscardChanges: boolean;
  @Input() isSaveSettings: boolean;
  @Output() isChanged = new EventEmitter();

  imageChangedEvent: any;


  editorOptions: any = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    ...plugin_finetune_defaults,
    ...plugin_filter_defaults,
    ...markup_editor_defaults,
    locale: {
      ...locale_en_gb,
      ...plugin_crop_locale_en_gb,
      ...plugin_finetune_locale_en_gb,
      ...plugin_filter_locale_en_gb,
      ...plugin_annotate_locale_en_gb,
      ...markup_editor_locale_en_gb,
    },
  };

  // inline
  inlineSrc: string = './assets/images/bg_picture.png';
  inlineResult: string = undefined;


  // modal
  modalSrc: string = './assets/images/bg_picture.png';
  modalResult: string = undefined;
  modalVisible: boolean = false;

  // overlay
  overlaySrc: string = './assets/images/bg_picture.png';
  overlayVisible: boolean = false;
  overlayResult: string = undefined;
  overlayOptions: any = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    locale: {
      ...locale_en_gb,
      ...plugin_crop_locale_en_gb,
    },
  };


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes && (this.isDiscardChanges || this.isSaveSettings)) {
  //     this.imageChangedEvent = null;
  //   }

  // }

  // fileChangeEvent(event: any): void {
  //   this.imageChangedEvent = event;
  //   this.isChanged.emit(true);
  // }

  // onClearImage(): void {
  //   this.imageChangedEvent = null;
  //   this.isChanged.emit(false);
  // }


  handleInlineLoad($event) {
    console.log('inline load', $event);
  }

  handleInlineProcess($event) {
    console.log('inline process', $event);
    const objectURL = URL.createObjectURL($event.dest);
    this.inlineResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
  }


  handleModalLoad($event) {
    console.log('modal load', $event);
  }

  handleModalProcess($event) {
    console.log('modal process', $event);
    const objectURL = URL.createObjectURL($event.dest);
    this.modalResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
  }




  handleOverlayLoad($event) {
    console.log('overlay load', $event);
  }

  handleOverlayProcess($event) {
    const objectURL = URL.createObjectURL($event.dest);
    this.overlayResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
    this.overlayOptions = {
      ...this.overlayOptions,
      imageState: $event.imageState,
    };

    this.overlayVisible = false;
  }

}
