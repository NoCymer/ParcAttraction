import { Component, Inject, LOCALE_ID, NgModule } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './Service/auth.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValueChangeEvent } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NgbModule, TranslatePipe, TranslateDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parc';
  currentLang = localStorage.getItem('lang') || 'en';

  constructor(
    public authService: AuthService,
    public router: Router,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.authService.setUser()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  switchLanguage(event: Event) {
    let lang: string = (event.target as HTMLSelectElement).value;
    localStorage.setItem('lang', lang);
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/${lang}/`;
  }
}
