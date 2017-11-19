import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController ,ToastController} from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { ProfilePage } from './../profile/profile';

/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user=
  {
    'first_name' : '',
    'email_address' : '',
    'username' : '',
    'last_name' : '',
   'avatar':'',
  }
  userID
  userAvatar
  constructor(public database:DatabaseProvider,public loadingctrl : LoadingController,public toast :ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.userID =localStorage.getItem('userid')
   // this.userId =localStorage.getItem('userid')


   this. getUserData()
  console.log(this.user.avatar)
  }

  ionViewDidLoad() {

  }
  getUserData(){
    this.database.getLoggedInUSerProfile(this.userID).subscribe(res=>{
      console.log(res)
      this.user.first_name=res.first_name;
      this.user.last_name=res.last_name;
     this.userAvatar = res.avatar;
      this.user.username = res.first_name+' '+ res.last_name
      })
//var this.userID=  localStorage.getItem('this.userID')
  // alert(id)
  //  var this.userID= 25;
  let loading1 = this.loadingctrl.create({
          showBackdrop : false
        });

         loading1.present();
    this.database.getUserData('first_name',this.userID).subscribe(res => {
      this.user.first_name = res

    });
    this.database.getUserData('last_name', this.userID).subscribe(res => {this.user.last_name = res});
    this.database.getUserData('email_address', this.userID).subscribe(res => {this.user.email_address = res});
    this.database.getUserData('username', this.userID).subscribe(res => {this.user.username = res});
    loading1.dismiss()
    this.database.getUserData('avatar', this.userID).subscribe(res => {this.user.avatar ='http://192.168.1.252/arabface/'+ res});

 }




// saveSettings(first, last, email, username, gender, country, city, state, bio){
// console.log(first, last, email, username, gender, country, city, state, bio);
// remoteService.settingsGeneral" target="_new">this.remoteService.settingsGeneral(first, last, email, username, gender, country, city, state, bio, this.this.userID).subscribe(res => {
// let toast = toastCtrl.create" target="_new">this.toastCtrl.create({
// message: 'Settings saved successfully',
// duration: 3000,
// position: 'top'
// });
// toast.present();
// navCtrl.pop" target="_new">this.navCtrl.pop();
// });

 Edit()
 {
   //alert(this.user.first_name)
   let toast = this.toast.create({
     message: "Updated successfully",
     duration: 3000,
     position: 'bottom'
   });

   toast.onDidDismiss(() => {
     console.log('Dismissed toast');
   });
   let loading1 = this.loadingctrl.create({
    showBackdrop : false
  });
  loading1.present();

  this.database.editprofile(this.userID,this.user.first_name,this.user.last_name,this.user.username,this.user.email_address).subscribe(res => {
    loading1.dismiss()

    toast.present();

  //alert(JSON.stringify(res))
 })
 this.navCtrl.push(ProfilePage);

}
}
