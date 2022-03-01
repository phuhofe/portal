import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  @Input() defaultLanguage: string = 'en';


  languageOptions = [
    { label: 'Česky', value: 'cs', flag: 'assets/flags/czech.png' },
    { label: 'Dansk', value: 'da', flag: 'assets/flags/dansk.png' },
    { label: 'Nederlands', value: 'nl', flag: 'assets/flags/netherlands.png' },
    { label: 'English', value: 'en', flag: 'assets/flags/english.png' },
    { label: 'Deutsch', value: 'de', flag: 'assets/flags/deutsch.png' },
    { label: 'Norsk', value: 'nb', flag: 'assets/flags/norway.png' },
    { label: 'Slovensky', value: 'sk', flag: 'assets/flags/slovakia.png' },
    { label: 'Svenska', value: 'sv', flag: 'assets/flags/svenska.png' },
  ];

  selectedLanguage = undefined;

  constructor() { 
    this.selectedLanguage = this.languageOptions.find(option => option.value === this.defaultLanguage)
  }

  ngOnInit(): void {}

  onSelectLanguageItem(item) {
    this.selectedLanguage = item;
  }

}
