import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CourseDataService } from './course-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';

export const appRoutes: Routes = [
  { path: '', component: AppComponent, children: [
    { path: ':courseId', component: CardComponent }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CourseDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
