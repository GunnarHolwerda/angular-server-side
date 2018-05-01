import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule  } from '@angular/platform-server';

import { AppModule, appRoutes } from './app.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
