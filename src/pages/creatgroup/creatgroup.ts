import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController ,AlertController} from 'ionic-angular';
import {FormControl , FormGroup , Validators } from '@angular/forms'
import { GroupChatPage} from '../group-chat/group-chat'

/**
 * Generated class for the CreatgroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-creatgroup',
  templateUrl: 'creatgroup.html',
  styleUrls : ['../../assets/main.css']
})
export class CreatgroupPage {
friends;myInput ;friendsnames = []; names = [] ; pepperoni ; message ; chosenUsers =[] ;userid;newChatTitle
  constructor(public navCtrl: NavController, public navParams: NavParams,public database:DatabaseProvider,public alert:AlertController,public loadingctrl : LoadingController) {
    this.userid =localStorage.getItem('userid') 
    
}


  
  ionViewDidLoad() {
      let loading = this.loadingctrl.create({
    showBackdrop : false 
  });
loading.present() ; 
    
    console.log('ionViewDidLoad CreatbcPage');
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


onclick (value) {
value.users = [] ; 
var arr = Object.keys(value).map(function (key) { return value[key]; });
for(let i = 0 ; i < arr.length ; i ++) {

  if(arr[i]==true) {
    console.log(this.friendsnames[i].userid)
    // if(value.users){
    //  value.users.push(this.friendsnames[i].userid) ;  
    // }else{
    //   value.users = "" ; 
    //   value.users += this.friendsnames[i].userid ; 
    // }

    this.chosenUsers.push(this.friendsnames[i].userid)
  }
}

console.log(this.chosenUsers)
let editGroupName = this.alert.create(
  {
    title : 'Group name',
    inputs : [{
      name:'groupName',
      placeholder : 'Enter group name !'
    }],
    buttons : [
      {
        text: 'ok',
        handler: data => {
          // if (User.isValid(data.username, data.password)) {
          //   // logged in!
          // } else {
          //   // invalid login
          //   return false;

          let group_name = data.groupName
          this.database.createGroup(group_name,this.chosenUsers,this.message,this.userid).subscribe(res=>{
            console.log(res)
            if(res.status == 1 )
            {
              this.database.set_group_name(res.cid,group_name).subscribe(res => console.log(res))    
              this.database.set_group_admin(res.cid,this.userid).subscribe(res2=> console.log(res2))
              this.database.usersCoversation(res.cid,this.userid).subscribe(res3 =>{
                    this.message=''
                    this.chosenUsers=[]
                    this.navCtrl.push(GroupChatPage,{'messages': res3,'chatUserName':group_name,'cid':res.cid,'group_admin':this.userid})
                    
                     })  
           
            }
          
          })
        }

      }
    ]
  })
editGroupName.present()


}
}
