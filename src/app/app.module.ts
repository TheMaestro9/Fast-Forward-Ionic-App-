import { TutorialPage } from './../pages/tutorial/tutorial';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Deeplinks } from '@ionic-native/deeplinks';
import { FieldsPage } from '../pages/fields/fields';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {Applicants} from '../pages/applicants/applicants';
import {Requestdate} from '../pages/requestdate/requestdate';
import {Registerform} from '../pages/registerform/registerform';
import {Videos} from '../pages/videos/videos';
import {SimulationsListPage} from '../pages/simulations-list/simulations-list';
import { CompanyPage} from '../pages/company/company'
import { Profile } from "../pages/profile/profile";
import {EditProfilePage } from "../pages/edit-profile/edit-profile";
import {AddSimulationPage } from "../pages/add-simulation/add-simulation";
import {AddSimulationDetailsPage } from "../pages/add-simulation-details/add-simulation-details"
import {LoginPage  } from "../pages/login/login";
import{DataService} from '../providers/data-service';
import { User } from '../providers/user';
import { AcceptapplicantsPage } from "../pages/acceptapplicants/acceptapplicants";
import { PaymentMethodPage } from '../pages/payment-method/payment-method';
//import {ExpotimerPage} from '../pages/expotimer/expotimer';
import {CardPaymentPage} from'../pages/card-payment/card-payment'; 
import { VrVideoPage } from '../pages/vr-video/vr-video' ; 


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Facebook } from '@ionic-native/facebook';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Ionic2RatingModule } from 'ionic2-rating';
import { DatePickerModule } from 'datepicker-ionic2';
import {IonicStorageModule} from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafepipePipe } from '../pipes/safepipe/safepipe';
import { CountdownPipe } from '../pipes/countdown/countdown';
import { Network } from '@ionic-native/network';
import {VersionCheckPage} from '../pages/version-check/version-check';
import { RatingPipe } from '../pipes/rating/rating';
import {AngularFireModule} from "angularfire2" ; 
import { SimulationDatesPage } from '../pages/simulation-dates/simulation-dates';
import { AddSimulationDatePage } from '../pages/add-simulation-date/add-simulation-date';
import { EditCompanyPage } from '../pages/edit-company/edit-company';
import { EditSimulationPage } from '../pages/edit-simulation/edit-simulation';
import { ChooseCompanyPage } from '../pages/choose-company/choose-company';
import { EditDatePage } from '../pages/edit-date/edit-date';
import {FeedbackPage} from '../pages/feedback/feedback';
import {IonRatingPage} from '../pages/ion-rating/ion-rating';
import {EditSimulationDatePage} from '../pages/edit-simulation-date/edit-simulation-date';
import { FeedbackToUserPage } from '../pages/feedback-to-user/feedback-to-user';



 var config = {
    apiKey: "AIzaSyDLdE-P0vHPTnxIpnA5-Nm3yFlabOaUE78",
    authDomain: "wello-trial.firebaseapp.com",
    databaseURL: "https://wello-trial.firebaseio.com",
    projectId: "wello-trial",
    storageBucket: "",
    messagingSenderId: "694576382775"
  };
@NgModule({
  declarations: [
    MyApp,
    FieldsPage,
    ContactPage,
    HomePage,
    TabsPage,
    Applicants,
    Requestdate,
    Videos,
    Registerform,
    SimulationsListPage,
    CompanyPage,
    Profile,
    SafepipePipe,
    LoginPage,
    EditProfilePage,
    EditCompanyPage,
    EditSimulationPage,
    ChooseCompanyPage,
    SimulationDatesPage,
    AddSimulationDatePage,
    AddSimulationPage,
    AddSimulationDetailsPage,
    CountdownPipe,
    VersionCheckPage,
    AcceptapplicantsPage,
    RatingPipe,
    TutorialPage,
    PaymentMethodPage,
    CardPaymentPage,
    EditDatePage,
    FeedbackPage,
    FeedbackToUserPage,
    IonRatingPage,
    EditSimulationDatePage, 
    VrVideoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    DatePickerModule,
     HttpModule,
     BrowserAnimationsModule,
     IonicStorageModule.forRoot(),  
     AngularFireModule.initializeApp(config) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FieldsPage,
    ContactPage,
    HomePage,
    TabsPage,
    Applicants,
    Requestdate,
     Videos,
    Registerform,
    SimulationsListPage,
    CompanyPage,
    Profile,
    LoginPage,
    AddSimulationPage,
    AddSimulationDetailsPage,
    EditProfilePage,
    EditCompanyPage,
    EditSimulationPage,
    ChooseCompanyPage,
    SimulationDatesPage,
    AddSimulationDatePage,
    VersionCheckPage,
    AcceptapplicantsPage,
    TutorialPage,
    PaymentMethodPage,
     CardPaymentPage,   
     EditDatePage,
     FeedbackPage,
     FeedbackToUserPage,
     IonRatingPage,
     EditSimulationDatePage,
     VrVideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    AndroidPermissions,
    DataService,
    User,
    InAppBrowser,
    Deeplinks,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network
  ]
})
export class AppModule {}
