import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the ChatSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat-settings',
  templateUrl: 'chat-settings.html',
})
export class ChatSettingsPage {
  settings;
  userID
  constructor(public navCtrl: NavController, public navParams: NavParams, public database:DatabaseProvider) {
    this.userID =localStorage.getItem('userid') 
    this.settings=this.navParams.get('settings')
    if(this.settings['last_seen_status'] == "1"){
      this.settings['last_seen_status'] = true
    }else{
      this.settings['last_seen_status'] = false
    }


    if(this.settings['read_receipt_status'] == "1"){
      this.settings['read_receipt_status'] = true
    }else{
      this.settings['read_receipt_status'] = false
    }

    console.log(this.settings);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatSettingsPage');
  }




  change_value(clicked,item){
    console.log(item)
    console.log(clicked)
    if(clicked == 'last_seen')
    {
      let  read_receipt = this.settings['read_receipt_status']
      console.log('last_seen'+read_receipt+'clicked'+clicked+'item'+item)
      
      if(item == true)
      {
        if(read_receipt == true)
          {
           this.database.set_user_chat_settings(this.userID,'1','1').subscribe(res=>console.log(res))
          }else{
            this.database.set_user_chat_settings(this.userID,'1','0').subscribe(res=>console.log(res))
          }
      }else{
        if(read_receipt == false)
        {
         this.database.set_user_chat_settings(this.userID,'0','1').subscribe(res=>console.log(res))
        }else{
          this.database.set_user_chat_settings(this.userID,'0','1').subscribe(res=>console.log(res))
        }
      }
    }else if(clicked == 'read_receipt'){
      let  last_seen=this.settings['last_seen_status']
console.log('last_seen'+last_seen+'clicked'+clicked+'item'+item)
      if(item == true)
      {
        if(last_seen == true)
          {
           this.database.set_user_chat_settings(this.userID,'1','1').subscribe(res=>console.log(res))
          }else{
            this.database.set_user_chat_settings(this.userID,'0','1').subscribe(res=>console.log(res))   
          }
      }else{
        if(last_seen == false)
        {
         this.database.set_user_chat_settings(this.userID,'0','0').subscribe(res=>console.log(res))
        }else{
          this.database.set_user_chat_settings(this.userID,'1','0').subscribe(res=>console.log(res))
        }
      }
    }
   
  }
}
