import { MorePage } from './../more/more';
import { ChathandlerPage } from './../chathandler/chathandler';
import { GroupChatPage } from './../group-chat/group-chat';

import { CreatbcPage } from './../creatbc/creatbc';
import { CreatgroupPage } from './../creatgroup/creatgroup';
import { GroupPage } from './../group/group';
import { SearchPage } from './../search/search';

import { DatabaseProvider } from './../../providers/database/database';
import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
// import { SqlStorage, Storage} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs'
// import {StatusBar, SQLite} from '@ionic-native/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Events } from 'ionic-angular';
import * as $ from 'jquery'
import {Platform} from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  styleUrls : ['../../assets/main.css','../../assets/ionicons.min.css']
})
export class ChatPage {
  items=[];
  public db: SQLiteObject
  public storage: Storage;
  public personList: Array<Object>;
  public todos = [];
  public text : any;
chats ; hidesearch = false ; 
msgs=[];
  constructor(protected platform : Platform,public sqlite: SQLite,public events: Events,public alert :AlertController,public navCtrl: NavController, public navParams: NavParams , public database : DatabaseProvider,public loadingctrl : LoadingController) {
  // this.data();
  // this
  // .platform
  // .ready()
  // .then(() => {
  //   this
  //   .database
  //   .openDb()
    
  //   // this
  //   //   .database
  //   //   .getRows()
  //   //   .then(s => {
  //   //     alert("s"+JSON.stringify(s))
  //   //     this.todos = this.database.arr;
  //   //     alert(" this.todos"+JSON.stringify(this.todos))
        
  //   //   });
  // })
  //this.create();
  // this.insert()
 events.subscribe('clicked', (user) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    if (this.hidesearch) {
      this.hidesearch = false ; 
    }else {
      this.hidesearch = true ; 
    }
  });  
  
}

  ionViewDidLoad() {
//       let loading = this.loadingctrl.create({
//     showBackdrop : false 
//   });
// loading.present() ; 
    console.log('ionViewDidLoad ChatPage');
    this.events.publish('callended', "user");
    this.database.getconvo1().subscribe (data => {
      // loading.dismiss();
this.chats = data ; 
 
console.log(this.chats)
// ionic cordova plugin add cordova-plugin
    })
    
 //   this.find()
  }
//  find()
//  {
  
//     this.database.getApiMessages(25,45).subscribe(res =>
//       {
     
//         this.msgs.push(res)
//        console.log(" this.msgs"+ JSON.stringify(this.msgs) )
//       }
//       )
 
  
//  }
  // create(){
    
  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default'
  //     })
  //     .then((db: SQLiteObject) => {
  //       this.db=db
  //       this.createtable()
  //     })
  //     .catch(e => alert(JSON.stringify(e)));
  // }
    
      //create table section
      // createtable(){
      //   this.db.executeSql('CREATE TABLE IF NOT EXISTS Todo(id INTEGER PRIMARY KEY AUTOINCREMENT,cid,message)', {})
      //   .then(() =>{
         
      //    alert('Executed SQL')
      //    this.db.executeSql('DELETE from Todo', {}).then(() => {
        
      //     alert('TABLE data deleted');
      //   }, (err:any) => {
      //    alert('Unable to execute sql: ');
      //   });
      //   alert("fffffffffff"+JSON.stringify(this.chats))
      //   for(var i = 0; i < this.msgs.length; i++) this.db.executeSql("INSERT INTO Todo (cid,message) VALUES (?, ?)", [this.chats[i].cid, this.chats[i].message])
      
      //    .then(() =>
      //    {
      //     alert('Executed SQL')
      //     this.insert()}
      //    )
      //    .catch(e => console.log(e));
      //   })
      //   .catch(e => console.log(e));
      // }
    
      
      //data insert section
      // insert(){

       
      //   this.db.executeSql('select * from Todo', {}).then((data) => {
          
       
      //     this.items = [];
      //     alert(data.rows.length);
      //     if(data.rows.length > 0) {
      //     for(var i = 0; i < data.rows.length; i++) {
      
      //     // this.items.push(data);
      //     this.items.push({
      //       "id": data.rows.item(i).id,
      //       "cid": data.rows.item(i).cid,
      //       "message": data.rows.item(i).message,
      //   });
      //     alert(JSON.stringify( this.items))
      //     }
      //     }
          
      //     }, (err) => {
      //     alert('Unable to execute sql: '+JSON.stringify(err));
      //     });
      // }
     
        
      makeMessageRead(index)
      {
        this.chats[index].unread = '0';
//      console.log( reduceUnread.unreadMessagesCount) 
      }
        
  
 
  group () {

    this.navCtrl.setRoot(GroupPage) ; 
  }
  newbc () {
this.navCtrl.push(CreatbcPage);

  }
  newMessage () {

this.navCtrl.push(SearchPage)
  }
  search () {

    (this.hidesearch == true)?(this.hidesearch=false):(this.hidesearch=true) ; 
   
    
  }
  doRefresh(refresher) {
    this.database.getconvo1().subscribe (data => {this.chats = data ; 
      
     console.log(JSON.stringify(this.chats))})      
    if(refresher != 0)
        refresher.complete();
  } 
   openchat(index , type , data , title , avatar,is_blocked) {
    if(type == 'multiple')
    {
      this.database.usersCoversation(this.chats[index].cid,data).subscribe(res =>{
        console.log(res)
        this.navCtrl.push(GroupChatPage,{'messages': res,'chatUserName':this.chats[index].group_name,'group_admin':this.chats[index].group_admin,'group_name':this.chats[index].group_name,'cid':this.chats[index].cid})
        
      })
      
    }else
    {
      this.navCtrl.push(ChathandlerPage,{data , title,avatar,'is_blocked':is_blocked});
      
    }
  }
  more () {

    this.navCtrl.push(MorePage) ; 
  }

  delete_chat_by_id(index,cid)
  {
    let editGroupName = this.alert.create(
      {
        title : 'Delete post',
     message:'Do you want to delete this post ?',
        buttons : [
          {
            text: 'ok',
            handler: data => {
              this.database.delete_chat(cid).subscribe(res => 
                {
                  if(res.status==1)
                  {
                    this.chats.splice(index,1)
                  }
                })
            
            }
    
          },
          {
            text : 'Cancle',
            role:'cancle'
          }
        ]
      })
    editGroupName.present()

  }
}
