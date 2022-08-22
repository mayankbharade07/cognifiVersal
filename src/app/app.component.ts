import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { THEMES} from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'itac_ui';

  themes = [
    'Default',
    'Dark',
    'Light'
  ]

  constructor(public overlayContainer: OverlayContainer) { }

  @HostBinding('class') componentCssClass: any;

  ngOnInit(): void {
    var currentTheme = localStorage.getItem("currentTheme");
    var theme = currentTheme != 'undefined' ? currentTheme : 'Default';
    this.setTheme(theme);
  }

  setTheme(theme: string) {
    var colorTheme = THEMES[theme];
    this.overlayContainer.getContainerElement().classList.remove('dark-theme','light-theme');
    this.overlayContainer.getContainerElement().classList.add(colorTheme);
    this.componentCssClass = colorTheme;
    localStorage.setItem("currentTheme", theme);
  }
}