import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AboutComponent} from './components/about/about.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {HighlightDirective} from './components/navbar/highlight.directive';
import {StatisticsComponent} from './components/statistics/statistics.component';

import { ChatComponent } from './components/chat/chat.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: 'chat/:username',
    component: ChatComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ProfileComponent,
    HighlightDirective,
    StatisticsComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
