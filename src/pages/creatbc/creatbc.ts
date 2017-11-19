import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController,AlertController  } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import {ChathandlerPage} from '../chathandler/chathandler'
import {NewChatPage} from '../new-chat/new-chat'
/**
 * Generated class for the CreatbcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-creatbc',
  templateUrl: 'creatbc.html',
  styleUrls : ['../../assets/main.css']
})
export class CreatbcPage {
  friends;myInput ;friendsnames = []; names = [] ; pepperoni ; message ; chosenUsers =[] ;userid;newChatTitle;getCIDForSelectedUser=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public database:DatabaseProvider,public loadingctrl : LoadingController) {
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
console.log(evt)

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
    // if(value.users){
    //  value.users.push(this.friendsnames[i].userid) ;  
    // }else{
    //   value.users = "" ; 
    //   value.users += this.friendsnames[i].userid ; 
    // }
    this.chosenUsers.push({'userid':this.friendsnames[i].userid,'username':this.friendsnames[i].name,'new':true})
  }
}

console.log(this.chosenUsers)
// this.database.getConverstationsList(this.userid).subscribe (data => {
// this.getCIDForSelectedUser.push(data)
// console.log(this.getCIDForSelectedUser)
// for(let  index = 0 ; index < this.chosenUsers.length;index++)
// {
//   for(let friendsLoop=0; friendsLoop < this.getCIDForSelectedUser[0].length;friendsLoop++)
//     {        console.log(this.chosenUsers[index].username +'zzzz'+this.getCIDForSelectedUser[0][friendsLoop].title)
    
//       if(this.chosenUsers[index].username == this.getCIDForSelectedUser[0][friendsLoop].title)
//       {
        
//         this.database.broadcasting('testExistanceOfcid',this.getCIDForSelectedUser[0][friendsLoop].cid,this.message,this.userid).subscribe(res=>{
//           console.log(res)
       
//         })
//         this.chosenUsers[index].new=false
//         break
//       }
    
   
    
//     }
//     if(this.chosenUsers[index].new == true)
//       {  
//         this.database.broadcasting('',this.chosenUsers[index].userid,this.message,this.userid).subscribe(res=>{
//          console.log(res)
//           })
//       }
// }


// })
for(let o=0 ; o < this.chosenUsers.length ; o++)
{

  this.database.check_chat_history(this.userid,this.chosenUsers[o].userid).subscribe(res => {
    console.log(res)
    if(res.status == 1)
    {
      this.database.broadcasting('haveChatHistory',res.cid,this.message,this.userid).subscribe(res2=>{
                 console.log(res2)
      //this.navCtrl.push(ChathandlerPage,{'data':res.cid,'avatar':res.avatar,'title':res.first_name })
      })
      //this.navCtrl.push(ChathandlerPage,{'data':res.cid,'avatar': res.avatar,'title':res.first_name })
    }else{
     // this.navCtrl.push(NewChatPage,{'data':res.cid,'avatar':res.avatar,'title':res.first_name })
     this.database.broadcasting('',this.chosenUsers[o].userid,this.message,this.userid).subscribe(res2=>{
      console.log(res2)
//this.navCtrl.push(ChathandlerPage,{'data':res.cid,'avatar':res.avatar,'title':res.first_name })
})
    }
})
}




const alert = this.alertCtrl.create({
  title: 'Boroadcast',
  subTitle: 'Boroadcast message sent successfully',
  buttons: ['ok']
});
alert.present();
this.navCtrl.pop()
}

  }



