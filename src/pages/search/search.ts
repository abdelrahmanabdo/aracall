import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams,AlertController, ToastController,LoadingController,ActionSheetController} from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import {ChathandlerPage} from '../chathandler/chathandler'
import {NewChatPage} from '../new-chat/new-chat'

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  friends;myInput ;friendsnames = []; names = [] ;userid;serverURL='http://192.168.1.252/arabface/'
  constructor(private database:DatabaseProvider, public navCtrl: NavController , public navParams: NavParams,public alert :AlertController,public loadingctrl :LoadingController ,  public toast: ToastController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    this.userid =localStorage.getItem('userid') 
    
  }


  
  ionViewDidLoad() {
    let loading = this.loadingctrl.create({
  showBackdrop : false 
});
loading.present() ; 
  
  console.log('ionViewDidLoad search');
   this.database.getfriends.subscribe (data => {
     loading.dismiss();
this.friends = data ; 
this.friendsnames = this.friends ; 


    
  })
  
 
}
onInput(evt) {
  this.names = this.friends;
  let val = evt.target.value ; 
  
  
  if (val && val.trim() != '') {
    this.friendsnames = [];
  for(let i = 0 ; i < this.names.length ; i ++) {
  
       if(this.names[i].name.toLowerCase().indexOf(val.toLowerCase()) == 0) {
  this.friendsnames.push(this.names[i]) ; 
       }else {
         this.friendsnames.splice(i,1)
       }
      }
      console.log(this.names)
  }
  if(!val) {
  console.log('da5l')
    this.friendsnames = this.friends;
    console.log(this.friends)
  }
  
  
  
  
  }

  goTochatPage(other_userid,userid=this.userid)
  {
    this.database.check_chat_history(other_userid,userid).subscribe(res => {
      if(res.status == 1)
      {
        this.navCtrl.push(ChathandlerPage,{'data':res.cid,'avatar': res.avatar,'title':res.name,'is_blocked':res.is_blocked  })
      }else{

        this.navCtrl.push(NewChatPage,{'data':res.cid,'avatar':res.avatar,'title':res.name,'is_blocked':res.is_blocked  })
        
      }
    })

  }

}
