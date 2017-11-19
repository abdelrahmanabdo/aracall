import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController ,ToastController} from 'ionic-angular';
let grpmembers ; 
/**
 * Generated class for the AddmemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addmember',
  templateUrl: 'addmember.html',
  styleUrls : ['../../assets/main.css']
})
export class AddmemberPage {
  groupid ; 
friends;myInput ;friendsnames = []; names = [] ;  chosenUsers =[] ;currentMembers

  constructor(public alertctrl:AlertController,public database:DatabaseProvider,public toast:ToastController,public loadingctrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  
  this.groupid = this.navParams.get('id')
  this.currentMembers = this.navParams.get('currentMembers')
  
}

  ionViewDidLoad() {
    let loading = this.loadingctrl.create({
    showBackdrop : false 
  });
loading.present() ; 
    
    console.log('ionViewDidLoad add member');
     this.database.getfriends.subscribe (data => {
       loading.dismiss();
this.friends = data ; 
this.friendsnames = this.friends ;
console.log(this.currentMembers)
console.log(this.friendsnames)
for(let current = 0 ; current < this.currentMembers.length ;current++)

{
  for(let all = 0 ; all < this.friendsnames.length ; all++)
  
  {
      if(this.friendsnames[all].userid == this.currentMembers[current].userid )
      {
        this.friendsnames.splice(all,1)  
      }

  }

}
  });

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


// onclick (value) {


//   // let loading = this.loadingctrl.create({
//   //   content: 'Please wait...'
//   // });

//   // loading.present();
  
// value.users = [] ; 
// //console.log(value)
// var arr = Object.keys(value).map(function (key) { return value[key]; });

// for(let i = 0 ; i < arr.length-1 ; i ++) {

//   if(arr[i]==true) {
//     //console.log(i)
//     //console.log(this.friendsnames[i].userid)
//     // if(value.users){
//     //  value.users.push(this.friendsnames[i].userid) ;  
//     // }else{
//     //   value.users = "" ; 
//     //   value.users += this.friendsnames[i].userid ; 
//     // }
//     value.users.push({userid : this.friendsnames[i].userid , title:this.friendsnames[i].name});
  
//   }
// }

//   this.database.getgrpmembers(this.groupid).then(data => {
//   grpmembers = data ; 
//   console.log(grpmembers.length)
//   for(let g = 0 ; g < value.users.length ; g++){
//   for(let i = 0 ; i < grpmembers.length ; i ++) {
  
// console.log(i)
//  console.log(grpmembers)
//     if(value.users[g].userid==JSON.parse(grpmembers[i]).userid){
//       let alert1 = this.alertctrl.create({
//     title: 'Error',
//     subTitle: value.users[g].title + ' already a memeber in the group',
//     buttons: ['ok']
//   });
//   alert1.present();
//  break ; 
//   }else if (i+1 == grpmembers.length) {
    
// this.database.add2group(this.groupid,value.users).then(data => {
//   if(data ==1){
    
//     console.log('success');
//     let alert1 = this.alertctrl.create({
//     title: 'Success',
//     subTitle: 'Members Has Been Added To The Group',
//     buttons: [ {
//         text: 'Ok',
//         handler: () => {
//            let navTransition = alert1.dismiss();

//       // start some async method
      
//         // once the async operation has completed
//         // then run the next nav transition after the
//         // first transition has finished animating out

//         navTransition.then(() => {
//           this.navCtrl.pop();
//         });
      
//       return false;
//     }
//         }]
//   });
//   alert1.present();
   
  
// }else{console.log('error')}
// })
//   }
// }

//   }
// })

//   }
  onclick (value) {
    value.users = [] ; 
    var arr = Object.keys(value).map(function (key) { return value[key]; });
    for(let i = 0 ; i < arr.length ; i ++) {
    
      if(arr[i]==true) {
        // if(value.users){
        //  value.users.push(this.friendsnames[i].userid) ;  
        // }else{
        //   value.users = "" ; 
        //   value.users += this.friendsnames[i].userid ; 
        // }
    
        this.chosenUsers.push(this.friendsnames[i].userid)
      }
    }
    
    
    
    }
    public add_member(index,userid)
    {
      this.database.add_group_member(this.groupid,userid).subscribe(res=>
        
        {
          console.log(res)
          if(res)
          {
            let toast=this.toast.create({
              message:'Member added successfully',duration:2000

            })
            toast.present()
          }
        }
    )
      this.friendsnames.splice(index,1)
    }
}