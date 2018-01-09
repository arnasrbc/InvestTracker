import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/entities/entities';
import {ContactPage} from '../pages/configuration/configuration';
import {HomePage} from '../pages/timeline/timeline';
import {TabsPage} from '../pages/tabs/tabs';
import {TimelineComponent, TimelineItemComponent, TimelineTimeComponent} from '../components/timeline/timeline';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


import {HttpModule} from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {FirebaseProvider} from '../providers/firebase/firebase';
import {ElasticsearchProvider} from '../providers/elasticsearch/elasticsearch';
import {AngularFirestoreModule, AngularFirestoreProvider} from 'angularfire2/firestore';
import {ComponentsModule} from "../components/components.module";
import {FilterTypesProvider} from '../providers/filter-types/filter-types';

const firebaseConfig = {
  apiKey: "AIzaSyBt9o6Dr_8tlIm5HKUl_le4cfUT8eP0Cuw",
  authDomain: "hackathon-60430.firebaseapp.com",
  databaseURL: "https://hackathon-60430.firebaseio.com",
  projectId: "hackathon-60430",
  storageBucket: "hackathon-60430.appspot.com",
  messagingSenderId: "700145879292"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFirestoreModule,
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AngularFirestoreProvider,
    ElasticsearchProvider,
    FilterTypesProvider
  ]
})
export class AppModule {}
