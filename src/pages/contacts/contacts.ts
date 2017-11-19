import { MorePage } from './../more/more';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import {ChathandlerPage} from '../chathandler/chathandler'
import {NewChatPage} from '../new-chat/new-chat'
let data ; 
/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
    styleUrls : ['../../assets/main.css']
})
export class ContactsPage {
friends ;data1 ; 
hidesearch = true ;  userid
  constructor(public navCtrl: NavController, public navParams: NavParams,public database:DatabaseProvider,public loadingctrl:LoadingController) {
    this.userid =localStorage.getItem('userid') 
    
  }

  ionViewDidLoad() {
      let loading = this.loadingctrl.create({
    showBackdrop : false 
  });
loading.present() ; 
    console.log('ionViewDidLoad ContactsPage');
       this.database.getfriends.subscribe (data => {
         loading.dismiss();
this.friends = data ; 

      console.log(data) ; 
    })
  }

  openchat(name,avatar) {
    console.log("da5l ")
this.database.getconvo1().subscribe(data => {
  
this.data1 = data ; 
console.log(this.data1)
  for (let i = 0 ; i < this.data1.length ; i ++) {
    
if(this.data1[i].title == name){
  console.log(this.data1[i])
  data = this.data1[i].cid ; 
  console.log("fds.flkdsfudiduo"+this.data1[i].cid);
  this.navCtrl.push(ChathandlerPage,{data,title:this.data1[i].title,avatar:avatar})
}

  }
})
  }

    search () {

    (this.hidesearch == true)?(this.hidesearch=false):(this.hidesearch=true) ; 
  }
  more() {
    this.navCtrl.push(MorePage);
  }
  goTochatPage(other_userid,userid=this.userid)
  {
    this.database.check_chat_history(other_userid,userid).subscribe(res => {
      if(res.status == 1)
      {
        console.log(res)
        this.navCtrl.push(ChathandlerPage,{'data':res.cid,'avatar':res.avatar,'title':res.name ,'is_blocked':res.is_blocked })
      }else{
        this.navCtrl.push(NewChatPage,{'data':res.cid,'avatar':res.avatar,'title':res.name,'is_blocked':res.is_blocked })
        
      }
    })

  }
}
