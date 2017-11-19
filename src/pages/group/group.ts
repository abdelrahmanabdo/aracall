import { MorePage } from './../more/more';
import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { GroupChatPage} from '../group-chat/group-chat'
import { CreatbcPage } from './../creatbc/creatbc';
import { CreatgroupPage } from './../creatgroup/creatgroup';
/**
 * Generated class for the GroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
  styleUrls : ['../../assets/main.css','../../assets/ionicons.min.css']
})


export class GroupPage {
  chats =[] ; hidesearch = false ;
  userid

textMessage ; msgs ; hide = true ; myInput  ; chatsCount
  constructor(public navCtrl: NavController, public database : DatabaseProvider,public alert:AlertController) {
//     this.database.getconvo1().subscribe (data => {
  this.userid =localStorage.getItem('userid')

// this.chats = data ;


//     })
// alert("qe")
    this.getConversations()

  }

  getConversations()
  {
    this.database.getConverstationsList(this.userid).subscribe(res =>
      {

      for(let chatUsers of res)
      {
        if(chatUsers.type == 'multiple')
        {
          this.chats.push(chatUsers)
        }
      }
        console.log(this.chats)
        this.chatsCount = this.chats.length
      })

  }

  openGroupChat(index,chatID,userid=this.userid)
  {
      this.database.usersCoversation(chatID,userid).subscribe(res =>{
        console.log(res)
        this.navCtrl.push(GroupChatPage,{'messages': res,'chatUserName':this.chats[index].group_name,'group_admin':this.chats[0].group_admin,'cid':this.chats[index].cid})

      })
  }


      newgroup () {

    this.navCtrl.push(CreatgroupPage)
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



//   ngOnInit () {

//     for(let i = 0 ; i < 150 ; i ++) {

//       this.msgs.push({number : i}) ;
//     }
//   }
// send(msg) {

//   console.log(msg)
// }
// hidesearch() {(this.hide ==true)?(this.hide=false):(this.hide=true)}

// onInput(evnt){console.log(evnt.target.value)}
