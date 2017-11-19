import { AudiohandlerPage } from './../pages/audiohandler/audiohandler';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import {MaplocationPage} from './../pages/maplocation/maplocation';
import { Videohandler2Page } from './../pages/videohandler2/videohandler2';
import { VideohandlerPage } from './../pages/videohandler/videohandler';
import { ChathandlerPage } from './../pages/chathandler/chathandler';
import { ProfilePage } from './../pages/profile/profile';
import { CreatgroupPage } from './../pages/creatgroup/creatgroup';
import { CreatbcPage } from './../pages/creatbc/creatbc';
import { MorePage } from './../pages/more/more';
import { PhotoselectionPage } from './../pages/photoselection/photoselection';
import { ChatPage } from './../pages/chat/chat';
import { ContactsPage } from './../pages/contacts/contacts';
import { GroupPage } from './../pages/group/group';
import { GroupChatPage } from './../pages/group-chat/group-chat';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SearchPage} from '../pages/search/search'
import { HttpModule } from '@angular/http';
import { CreataccountPage } from './../pages/creataccount/creataccount';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LongPressModule } from 'ionic-long-press';
import { PopupPage } from './../pages/popup/popup';
import { ProfileInfoPage } from './../pages/profile-info/profile-info';
import {GroupInfoPage} from './../pages/group-info/group-info';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DatabaseProvider } from '../providers/database/database';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { CDVPhotoLibraryPipe } from '../providers/pipes/cdvphotolibrary.pipe';
import { ImagePicker } from '@ionic-native/image-picker';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { Geolocation } from '@ionic-native/geolocation';
import { FileChooser } from '@ionic-native/file-chooser';
import { ChatSettingsPage } from '../pages/chat-settings/chat-settings';
import { NotificationSettingsPage } from '../pages/notification-settings/notification-settings';
import { BlockedUsersPage } from '../pages/blocked-users/blocked-users';
import { Media, MediaObject } from '@ionic-native/media';
import {AddmemberPage} from '../pages/addmember/addmember';
import {NewChatPage} from '../pages/new-chat/new-chat';
import {GroupchathandlerPage} from '../pages/groupchathandler/groupchathandler';
import {Popover1Page} from '../pages/popover1/popover1';

import { UploadImagePage } from '../pages/upload-image/upload-image';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


export const firebaseConfig = {
   apiKey: "AIzaSyBt7QkH8xuPVP29slUrCQ2iUtE3-DXBH5g",
    authDomain: "inderm-11508.firebaseapp.com",
    databaseURL: "https://inderm-11508.firebaseio.com",
    projectId: "inderm-11508",
    storageBucket: "inderm-11508.appspot.com",
    messagingSenderId: "960511319068"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,LoginPage,TabsPage,CreataccountPage,GroupPage,ContactsPage,ChatPage,PhotoselectionPage,GroupchathandlerPage,Popover1Page
  ,CDVPhotoLibraryPipe,MorePage,CreatbcPage,CreatgroupPage,ProfilePage,ChathandlerPage,VideohandlerPage,NewChatPage
  ,Videohandler2Page,AudiohandlerPage,UpdateProfilePage,MaplocationPage,PopupPage,EditProfilePage,GroupChatPage,UploadImagePage,
  ProfileInfoPage,ChatSettingsPage,NotificationSettingsPage,BlockedUsersPage,GroupInfoPage,SearchPage,AddmemberPage
  ],
  imports: [
    BrowserModule,
     EmojiPickerModule.forRoot(),
    IonicModule.forRoot(MyApp , {
      tabsHideOnSubPages:true
    }),
    AngularFireModule.initializeApp(firebaseConfig),HttpModule,
    ScrollToModule.forRoot(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,LoginPage,TabsPage,CreataccountPage,GroupPage,ContactsPage,ChatPage,PhotoselectionPage,GroupchathandlerPage,Popover1Page,NewChatPage,MorePage,UploadImagePage
  ,CreatbcPage,CreatgroupPage,ProfilePage,ChathandlerPage,VideohandlerPage,Videohandler2Page,UpdateProfilePage,GroupChatPage,AddmemberPage
  ,AudiohandlerPage,GroupInfoPage,MaplocationPage,PopupPage,EditProfilePage,ProfileInfoPage,SearchPage,ChatSettingsPage,NotificationSettingsPage,BlockedUsersPage],
  providers: [
    StatusBar,
    SplashScreen,
    FilePath,
    FileTransfer,
    File,
    Camera,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    DatabaseProvider,DatabaseProvider,PhotoLibrary,Diagnostic,ImagePicker,FileChooser,Geolocation,Media,LongPressModule,SQLite
  ]
})
export class AppModule {}
