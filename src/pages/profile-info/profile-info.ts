import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { TabsPage } from './../tabs/tabs';

import { ChathandlerPage } from './../chathandler/chathandler';
import { AudiohandlerPage } from './../audiohandler/audiohandler';
import { Videohandler2Page } from './../videohandler2/videohandler2';
import { VideohandlerPage } from './../videohandler/videohandler';
/**
 * Generated class for the ProfileInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-info',
  templateUrl: 'profile-info.html',
})
export class ProfileInfoPage {
  Friend_Id;
  chat_Id;
  userID
  remoteavatar;
 title;
  user=
  {
    'first_name' : '',
    'email_address' : '',
    'username' : '',
    'last_name' : '',
   'avatar':'',
  }
  status='';
  name;
  img;
  cover;
  constructor(public loadingctrl : LoadingController,public database:DatabaseProvider,public navCtrl: NavController,public alert:AlertController, public navParams: NavParams) {
    this.userID =localStorage.getItem('userid')

    this.Friend_Id =  this.navParams.get('currentUserID');
    this.chat_Id =  this.navParams.get('id');
    console.log(this.Friend_Id)
    this.get_user_status(this.Friend_Id)

    this.remoteavatar= this.navParams.get('remoteavatar');
    this.title= this.navParams.get('title');
    this.show_data();
 // alert("dd"+this.chat_Id+this.remoteavatar+this.title);
  }
  show_data()
  {

    let loading1 = this.loadingctrl.create({
      showBackdrop : false
    });

    this.database.getfriendprofile(this.Friend_Id).then (data => {
     // alert(data['name'])
     console.log(data)
      this.name=data['name']
      this.img=data['avatar']
      this.cover=data['cover']
//      loading1.present();
// this.database.getfriendData(this.Friend_Id).then (data => {
//   this.name=data['firstname'].slice(1, -1)+"\t"+data['lastName'].slice(1, -1)
//   this.img=data['Avatar'].slice(1, -1)
 // var res =  this.name.substring('\');

// alert(JSON.stringify( data) )
//   console.log(JSON.stringify(data))


})

  // this.user.first_name = res
  // alert(this.user.first_name)

//});
//this.database.getUserData('avatar',  this.Friend_Id).then(res => {this.user.avatar = res[0].avatar


//});
// this.database.getUserData('last_name',this.Friend_Id).then(res => {this.user.last_name = res});

// this.database.getUserData('email_address', userId).subscribe(res => {this.user.email_address = res});
// this.database.getUserData('username', userId).subscribe(res => {this.user.username = res});
loading1.dismiss()
//this.name=this.user.first_name


  }
  SendMessage()
  {
    this.navCtrl.pop();

  //  this.navCtrl.push(ChathandlerPage,{data , title,avatar});
  }
  VoiceCall()
  {
    let loading1 = this.loadingctrl.create({
      showBackdrop : false
    });
    loading1.present();
  let number = Math.floor(Math.random()*1000000000) ;
   this.database.remoteid (this.title).then (data => {
  this.database.sendnumber(data , number , 'audio') ;
  let avatar = this.remoteavatar ;
  loading1.dismiss()
  this.navCtrl.push(AudiohandlerPage , {avatar,data , number , remote : false});

   })
  }
  VideoCall() {
   let loading1 = this.loadingctrl.create({
    showBackdrop : false
  });
  loading1.present();
//    this.database.remoteid (this.title).then (data => {
// this.navCtrl.push(VideohandlerPage , {type : 'local' , candidate : 'anything' , id :data })

//    })

let number = Math.floor(Math.random()*1000000000) ;

 this.database.remoteid (this.title).then (data => {
this.database.sendnumber(data , number , 'video') ;
let avatar = this.remoteavatar ;
loading1.dismiss()
this.navCtrl.push(Videohandler2Page , {name:this.title , avatar,data , number , remote : false});

 })


}
get_user_status(userid)
{
   this.database.get_user_chat_status(userid).subscribe(res => {
     console.log(res)
     this.status = res.chat_status;

   })
}
Block(blockedUser)
{

  let editGroupName = this.alert.create(
    {
      title : 'Block user',
      message: "Do you want block this user ! ",

      buttons : [
        {
          text: 'ok',
          handler: data => {
            this.database.blockUser(blockedUser,this.userID).subscribe(res =>{
              loading1.dismiss()

              if(res.status==1){


                // window.location.reload();

                this.navCtrl.push(TabsPage);

              }
          // alert("xxx"+JSON.stringify(res) )
         //   firebase.database().ref(userID + '/chats').delete();
            }
          )
          }

        },
        {
          'text': 'cancel',
          role:'cancel'
        }
      ],

    })
  editGroupName.present()
  // alert(this.cid)
  let loading1 = this.loadingctrl.create({
          showBackdrop : false
        });

  // chat/delete/messages

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileInfoPage');
  }
  back(){
    this.navCtrl.pop()
  }
}
