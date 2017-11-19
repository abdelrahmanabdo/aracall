import { DatabaseProvider } from './../../providers/database/database';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { ChatSettingsPage } from '../chat-settings/chat-settings';
import { NotificationSettingsPage } from '../notification-settings/notification-settings';
import { BlockedUsersPage } from '../blocked-users/blocked-users';
/**
 * Generated class for the MorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
  styleUrls : ['../../assets/main.css','../../assets/ionicons.min.css']
})
export class MorePage {
  userid
  constructor(public navCtrl: NavController, public navParams: NavParams,public database:DatabaseProvider) {
    this.userid=localStorage.getItem('userid')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  openaccount () {
   // this.navCtrl.push(UpdateProfilePage) ; 

    this.navCtrl.push(ProfilePage) ; 
  }
  signout () {
    // alert("sdfsdf")
     localStorage.setItem('userid' ,'')
this.database.signout() ;
 this.navCtrl.push(LoginPage) ;


  }
  chatSettings()
  {
    
        this.database.get_user_chat_settings(this.userid).subscribe(res=>
          {
            this.navCtrl.push(ChatSettingsPage,{'settings':res})
            
          })
    
  }
  notificationSettings(){
    this.navCtrl.push(NotificationSettingsPage)
    
  }
  blockedUsers(){
    this.navCtrl.push(BlockedUsersPage)
    
  }
}
