import { Component,OnInit } from '@angular/core';
import { NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { EditProfilePage } from './../edit-profile/edit-profile';

/**import { DatabaseProvider } from './../../providers/database/database';
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let userData;
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
    styleUrls : ['../../assets/main.css']
})
export class ProfilePage {
  user=
  {
    'first_name' : '',
    'email_address' : '',
    'username' : '',
    'last_name' : '',
   'avatar':'',
  }
  userStatus = ''
  onlineStatus= ''
  newOnlineStatus=''
  userId
  constructor(public database:DatabaseProvider,public navCtrl: NavController,public alert:AlertController, public navParams: NavParams,public loadingctrl : LoadingController) {
   // this.user = {}
   this.userId =localStorage.getItem('userid') 
   this.get_user_status(this.userId);
   this.get_online_status(this.userId)
   this.getUserData()
   
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  getUserData(){
      this.database.getLoggedInUSerProfile(this.userId).subscribe(res=>{
        console.log(res)
        this.user.first_name=res.first_name;
        this.user.last_name=res.last_name;
        this.user.avatar = res.avatar;
        this.user.username = res.first_name+' '+ res.last_name
        })

 }
 Edit()
 {
  this.navCtrl.push(EditProfilePage);
 }

 get_user_status(userid)
 {
    this.database.get_user_chat_status(userid).subscribe(res => {
      console.log(res)
      this.userStatus = res.chat_status;

    })
 }
 changeStatus(userid = this.userId)
 {
  let editGroupName = this.alert.create(
    {
      title : 'change status',
      inputs : [{
        name:'newStatus',
        placeholder : this.userStatus
      }],
      buttons : [
        {
          text: 'save',
          handler: data => {
              this.database.set_user_chat_status(this.userId,data.newStatus).subscribe(res =>{
                console.log(res)
                this.userStatus = res.status
              })
          }

        }
      ]
    })
  editGroupName.present()
 }

 get_online_status(userid)
 {
  this.database.get_user_chat_online_status(userid).subscribe(res => {
    console.log(res)
    this.onlineStatus = res.online_status;

  })
 }

 onChange(online_status)
 {
   console.log(online_status)
  this.database.set_user_chat_online_status(this.userId,online_status).subscribe(res =>{
    console.log(res)
    this.onlineStatus = res.online_status
  })
 }

 back(){
   this.navCtrl.pop()
 }
}
