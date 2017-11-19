import { Injectable } from '@angular/core';
import { Http , Headers , URLSearchParams,Response } from '@angular/http';
import {AlertController,LoadingController} from 'ionic-angular'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import * as $ from 'jquery'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

declare var firebase ; 

let myname ; 
let alert1,downloadURL,avatar,name ; let signupres ; let signupresult ; 
let userID; let cids ; let result = [] ; let friends ; let result5 = []; let msgs ; let chatid = [] ; let insideget ; 
let friends2 ;let addchat ;  let getremote  ; let remoteid ; let result34 ; let apichat ; let firebasemsgs ; let apimsgs ; 
var config = {
  apiKey: "AIzaSyAL3i1e4LBKuzAj0fycA_7KYjCUJ_srXfM",
  authDomain: "aracall-42934.firebaseapp.com",
  databaseURL: "https://aracall-42934.firebaseio.com",
  projectId: "aracall-42934",
  storageBucket: "aracall-42934.appspot.com",
  messagingSenderId: "1003915001962"
};


// let config = {
//      apiKey: "AIzaSyBvXvFFmIM--9WbD07aemNah3ONCY22Ml4",
//     authDomain: "aracall-3cda0.firebaseapp.com",
//     databaseURL: "https://aracall-3cda0.firebaseio.com",
//     projectId: "aracall-3cda0",
//     storageBucket: "aracall-3cda0.appspot.com",
//     messagingSenderId: "712599379890"
//   };
  let user ; 
  
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  response ; 
  userData={
    'firstname':'',
    'lastName':'',
    'Avatar':'',

  }
  public db: SQLiteObject
  public items = [];
  public text : string = "";
 // public db = null;
  public arr = [];
  constructor(public sqlite: SQLite,public loadingctr : LoadingController,public alertctrl:AlertController,public http: Http) {
    userID =localStorage.getItem('userid') 
    
    this.init() ;
    getremote = this.remoteid 
    firebase.initializeApp(config)
    alert1 = this.alertctrl ; 
    addchat = this.addchats() ; 
    
  }
  getGroupChatMembers(cid)
  {
  return  this.http.get('https://arabface.online/demo/api/147896325/chat/messages/group/members?cid='+cid).map((res: Response)=> res.json())

  }
  get_group_name(cid)
  {
    return  this.http.get('https://arabface.online/demo/api/147896325/chat/messages/group/get/group_name?cid='+cid).map((res: Response)=> res.json())
    
  }
  createGroup(group_name,users,text,userid)
  {
    let body = new URLSearchParams() ; 
    for(let  index = 0 ; index < users.length;index++) body.append('theuserid['+index+']' , users[index] )
    body.append('userid' , userid )
    body.append('text' , text )
    body.append('group_name' , group_name )
    body.append('group_admin',userid)
    body.append('group_avatar','')
    let body1 = body.toString() ;
    console.log(body1) 
    let  headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
  return this.http.post('https://arabface.online/demo/api/147896325/chat/send/message' , body1 , {headers : headers}).map((res : Response ) =>
  
  
  res.json())
  }
  public set_group_admin(cid,userid)
  {
  
      return this.http.get('https://arabface.online/demo/api/147896325/chat/messages/add/group/admin?cid='+cid+'&group_admin='+userid ).map((res : Response ) =>{console.log(res.json())})
    
  }
  public set_group_name(cid,group_name)
  {
    return this.http.get('https://arabface.online/demo/api/147896325/chat/messages/set/group_name?cid='+cid+"&group_name="+group_name ).map((res : Response ) =>
    res.json())
  }
  public check_chat_history(other_userid,userid)
  {
    
   return this.http.get('https://arabface.online/demo/api/147896325/chat/messages/check/chat/history?userid='+userid+'&other_userid='+other_userid).map((res:Response) => res.json());
  }
  public eidt_group_name(cid,groupName)
  {
      return this.http.get("https://arabface.online/demo/api/147896325/chat/messages/change/group_name?cid="+cid+"&group_name="+groupName).map((res : Response) => res.json());
  }
  delete_group_member(cid,userid)

  {
    return this.http.get('https://arabface.online/demo/api/147896325/chat/messages/delete/group_member?cid='+cid+'&userid='+userid).map((res:Response)=> res.json())
  }
  ChatMessagesSend(cID,userID,msg):any
  {
   return this.http.get('https://arabface.online/demo/api/147896325/chat/send/message?text='+msg+"&cid="+cID+"&userid="+userID).
  
   do((res : Response ) => console.log(res.json()))
  .map((res : Response ) => res.json());
  }
  
  getConverstationsList(userid)
  {
   return this.http.get('https://arabface.online/demo/api/147896325/chat/conversations?userid='+userid).map((res : Response ) => res.json());
   
  }
  get_unread_message_count(userid)
  {
    console.log(userid)
   return this.http.get('https://arabface.online/demo/api/147896325/chat/messages/unread/count?userid='+userid).map((res:Response)=>res.json())
  }
  usersCoversation(cID,userID)
  {
    return this.http.get('https://arabface.online/demo/api/147896325/chat/get/messages?cid='+cID+"&userid="+userID).
  
    do((res : Response ) => console.log('fafaf'+res.json()))
   .map((res : Response ) => res.json());
  }

  delete_chat(cid)
  {
    return this.http.get('https://arabface.online/demo/api/147896325/chat/conversations/delete?cid='+cid).map((res:Response)=> res.json())
  }
  openDb() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then
      
      //create table section
      this.db.executeSql('CREATE TABLE IF NOT EXISTS Todo(id INTEGER PRIMARY KEY AUTOINCREMENT,cid,message)', {})
      .then(() =>
        
        alert('Executed SQL')
       
       )
      .catch(e => console.log(e));
    
}

  addItem(i) {
    return new Promise(resolve => {
     
      //  var InsertQuery = "INSERT INTO Todo (todoItem) VALUES (?)";
     // db.executeSql("INSERT INTO user (firstname, lastname, castletype, castleHealth) VALUES (?, ?, ?, ?)", ['Jan', 'Klaassen', 'mannelijk', '10']
       this.db.executeSql("INSERT INTO Todo (cid,message) VALUES (?, ?, ?, ?)", ['1', 'Klaassen'])
       .then(() =>
       {
        alert('Executed SQL')
        this
        .getRows()
        .then(s => {
             resolve(true)
          });
       })
      
       .catch(e => console.log(e));
     
    })
  }

  //Refresh everytime

  getRows() {
   
    return new Promise(res => {
      this.db.executeSql('select * from Todo', {}).then((data) => {
        
        this.items = [];
        if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
        //alert(data.rows.item(i).name);�
        this.items.push(data);
        // alert(JSON.stringify( this.items))
        }
        }
        
        }, (err) => {
        // alert('Unable to execute sql: '+JSON.stringify(err));
        });
      })
  }
    
        
  
     

  
  
  ionViewDidLoad(){
   console.log('database provider loaded')
  }
  login = (data) => {
     let loader = this.loadingctr.create({
      
      showBackdrop : false 
    });
    loader.present();
    const url = 'https://arabface.online/demo/api/147896325/login?' + 'username=' + data.username + '&password=' + data.password;
     
     var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(url,headers).subscribe(data3 => {
      this.response = data3.text() ; 
     
      this.response = JSON.parse(this.response) ; 

    
      if(this.response.status == 1) {
       localStorage.setItem('userid' , this.response.id) 
       
      avatar = this.response.avatar ; 
      name = this.response.name ; 
      userID = this.response.id ; 
        firebase.auth().signInWithEmailAndPassword(data.username, data.password).then(() => {
          
          loader.dismiss();
        
  
        }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;

  if(errorCode == "auth/network-request-failed"){
     loader.dismiss();
     let alert = alert1.create({
      title: 'Error',
      subTitle: 'Check Your Internet Connection And Try Again',
      buttons: ['OK']
    });
    alert.present();
  }

    if(errorCode == "auth/user-not-found"){
     
     loader.dismiss();
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'



 var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, 'test.jpg'));
        });
    };

    getFileObject(avatar, function(fileObject) {
        var uploadTask = storageRef.child('images/test.jpg').put(fileObject);

        uploadTask.on('state_changed', function(snapshot) {
            
        }, function(error) {
            
        }, function() {
            downloadURL = uploadTask.snapshot.downloadURL;
          
            
    firebase.auth().createUserWithEmailAndPassword(data.username, data.password).then (() => {
loader.dismiss();
       var user = firebase.auth().currentUser;
       user.updateProfile({
         
  displayName: name,
  photoURL:downloadURL , 
}).then(function() {

}).catch(function(error) {
  // An error happened.
});
    }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  let alert = alert1.create({
      title: 'Error',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present();
});




        });
    });

 
firebase.database().ref(userID + '/chats').set({ 0: "undefined" }) ; 
firebase.database().ref(userID + '/incoming').set({ 0: "undefined" }) ; 

  }

});
      }else {
        loader.dismiss();
         let alert = alert1.create({
      title: 'Error',
      subTitle: 'Wrong Email OR Password',
      buttons: ['OK']
    });
    alert.present();
      }
    })
    

  }



 
  creat1 (email,password,name,data) {
    // alert( "1"+data.firstname+"//"+data.lastname+"//"+name+"//"+data.email_address+"//"+password)
  //  alert( "2"+data.firstname+"//"+data.lastname+"//"+data.name+"//"+data.email_address+"//"+data.password)
    
//  let loader = this.loadingctr.create({
      
//       showBackdrop : false 
//     });

//     loader.present();
   let body = new URLSearchParams();
body.append('firstname', data.firstname);
body.append('lastname', data.lastname);
body.append('username', name);
body.append('email_address', data.email_address);
body.append('password', password);
 let body1 = body.toString () ; 


 
  let url = 'https://arabface.online/demo/api/147896325/signup?' + 'firstname=' + data.firstname + '&lastname=' + data.lastname + '&username=' + name + '&email_address=' + data.email_address + '&password='+password ;
let url2 = 'https://arabface.online/demo/api/147896325/signup' ; 

let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
this.http.post (url2,body1,{headers: headers}).subscribe(data => {

let data1 = data.text() ; 
data = JSON.parse(data1) ; 
signupresult = data ; 
localStorage.setItem('userid' , signupresult.userid)
alert(data.status)
 if (data.status == 1) {
alert("1")
// loader.dismiss()

 done () ; 

 }
});
function done () {
  alert("77777")
 
firebase.auth().createUserWithEmailAndPassword(data.email_address, password).then (() => {
// loader.dismiss()
       user = firebase.auth().currentUser;
       user.updateProfile({
  displayName: data.username
}).then(function() {
  
  


}).catch(function(error) {
  // An error happened.
});
    }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  let alert = alert1.create({
      title: 'Error',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present();
});


}
    
  }

  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            
            
    }
    public creat2 (email,password,name,photo,firstname,lastname) {
       let url = 'https://arabface.online/demo/api/147896325/signup?' + 'firstname=' + firstname + 'lastname=' + lastname + 'username=' + name + 'email_address=' + email + 'password='+password ;
var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
this.http.post (url,headers).subscribe(data => {

  signupres = data ;
  userID = signupres.id;
});
//first
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'



 var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, 'test.jpg'));
        });
    };

    getFileObject(photo, function(fileObject) {
        var uploadTask = storageRef.child('images/test.jpg').put(fileObject);

        uploadTask.on('state_changed', function(snapshot) {
       
        }, function(error) {
            
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
           
            // handle image here
        });
    });
//final
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then (() => {

       user = firebase.auth().currentUser;
       user.updateProfile({
  displayName: name,
  photoURL:photo , 
}).then(function() {
  
firebase.database().ref(userID + '/chats').set({ 0: "undefined" }) ; 
firebase.database().ref(userID + '/incoming').set({ 0: "undefined" }) ; 
 

}).catch(function(error) {
  // An error happened.
});
    }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  let alert = alert1.create({
      title: 'Error',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present();
});

  }
 user = new Observable(observer => {
 firebase.auth().onAuthStateChanged(function(user) {
   
  if (user) {

    // User is signed in.
    var displayName = user.displayName;
  
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
  
    observer.next("logged")
    observer.next({name:displayName})
  } else {
 
   observer.next("not here")
  }
});

}) ;
  
  init() {


 
  }
  broadcasting(test='haveChatHistory',user,text,userid)
  {  
    if( test == '')
    {
      let body = new URLSearchParams() ; 
      
       body.append('theuserid' , user )
       body.append('userid' , userid )
       body.append('text' , text )
       let body1 = body.toString() ;
       console.log(body1) 
      let  headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
     return this.http.post('https://arabface.online/demo/api/147896325/chat/send/message' , body1 , {headers : headers}).map((res : Response ) => res.json())
    }else{
      return this.http.get('https://arabface.online/demo/api/147896325/chat/send/message?text='+text+"&cid="+user+"&userid="+userid).map((res : Response ) => res.json())
      
    }
  
  
    
  
  
  }
  blockUser(id, userid){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id );
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post("https://arabface.online/demo/api/147896325/block/user", body, {headers: headers})
    .map((res : Response ) => res.json());
  }
  unblockUser(id, userid){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id );
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post("https://arabface.online/demo/api/147896325/unblock/user", body, {headers: headers})
    .map((res : Response ) => res.json());
  }
  isBlocked(id, userid){
    return this.http.get("https://arabface.online/demo/api/147896325/blocked?id=" + id + "&userid=" + userid)
    .map((res : Response ) => res.json());
  }
  getAllBlocked(userid){
    return this.http.get("https://arabface.online/demo/api/147896325/all/blocked?userid=" + userid)
    .map((res : Response ) => res.json());
  }
  signout () {

    firebase.auth().signOut().then(function() {
  console.log("success")
}).catch(function(error) {
  
});
  }

  getconvo = new Observable (observer => {
    let body = new URLSearchParams() ; 
    body.append('userid' , userID )
    let body1 = body.toString() ; 
   let  headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
this.http.post('https://arabface.online/demo/api/147896325/chat/conversations' , body1 , {headers : headers}).subscribe(data => {
let data1 = data.text();
console.log(data1)
data = JSON.parse(data1); 

//from here 
 cids = data ; 
 
for (let i =0 ; i < cids.length ; i ++ ) {
check(cids[i]);

}
function check(cid) {

 firebase.database().ref(userID + '/chats').once('value').then(function(snapshot) { 

   let result1 = snapshot.val() ; 

   for ( let i = 0 ; i < result1.length ; i ++) {
    console.log(cid.cid)
if(result1[i].cid==cid.cid) {
  
    getmessages(cid.cid).then(data => {
      insideget = data 
firebase.database().ref(userID + '/mesages'+'/' + cid.cid).once('value').then(function(snapshot) { 
  
  var array = $.map(snapshot.val(), function(value, index) {
    return [value];
});

  if(insideget.length > array.length){
    
    console.log('there is plus messages');
    console.log(cid.cid)
    console.log(result1[i].cid)
 console.log('firebase messages is')
    console.log(array)
    console.log('api messages is')
    console.log(insideget)
    firebase.database().ref(userID + '/mesages'+'/' + cid.cid).set('undefined') ;
    for(let i = 0 ; i < insideget.length ; i ++ ) {
      
firebase.database().ref(userID + '/mesages'+'/' + cid.cid).push(insideget[i]) ; 
    }
  }else {
    console.log('no added messages')
    console.log(cid.cid)
    console.log(result1[i].cid)
    console.log('firebase messages is')
    console.log(array)
    console.log('api messages is')
    console.log(insideget)
    
  }
})

})
}
     if (i+1 == result1.length) {
if(result1[i].cid==cid.cid){
  break ; 
}else {

  console.log('added')
  result.push(cid) ; 
  chatid.push(cid.cid)
  getmessages(cid.cid).then(data => {
    insideget = data ; 
    for(let i = 0 ; i < insideget.length ; i ++ ) {
      
firebase.database().ref(userID + '/mesages'+'/' + cid.cid).push(insideget[i]) ; 
    }

  });
  firebase.database().ref(userID + '/chats').set(result) ; 
  
 
}

     }
   }
 }) 
}


 
function getmessages (cid) {
return new Promise (resolve => {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://arabface.online/demo/api/147896325/chat/get/messages?cid="+cid,
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "postman-token": "0fc107e4-b5c8-93f3-0f88-b9e9da082f92"
  }
}

$.ajax(settings).done(function (response) {
  resolve(JSON.parse(response))

});
//    this.http.get("https://arabface.online/demo/api/147896325/chat/get/messages?cid="+cid+"&userid="+userID).subscribe(data => {
// 		let data1 = data.text() ;
// data = JSON.parse(data1) ;
// resolve(data) ; 
// })
})
  
}
//to here 
  observer.next(data) ; 
})

  })

  addchats () {
    return new Observable (observer => {
 
this.getconvo2().subscribe(data => {
  apichat = data ;
  for (let i = 0 ; i < apichat.length ; i ++) {
    this.getmsg(apichat[i].cid).subscribe(data =>{
      firebasemsgs = data ; 
     
      this.getmessagesfromapi(apichat[i].cid).then(data => {
        
        apimsgs = data  ; 
        alert("apimsgs"+JSON.stringify(apimsgs))
        alert("firebasemsgs"+JSON.stringify(firebasemsgs))
 if (firebasemsgs == null) {
   for(let v = 0 ; v < apimsgs.length ; v ++) {
firebase.database().ref(userID + '/mesages/' + apichat[i].cid).push(apimsgs[v])
   }
        

      }else {
    
if(apimsgs.length > firebasemsgs.length) {
  
  firebase.database().ref(userID + '/mesages/' + apichat[i].cid).set("undefined")
  for(let v = 0 ; v < apimsgs.length ; v ++) {
firebase.database().ref(userID + '/mesages/' + apichat[i].cid).push(apimsgs[v])
   }
}
      }
      })
     
    })
  } 

})

    })
   
  }

    getmsg(cID) {
   


      return new Observable(observer => {
//             this.http.get("https://arabface.online/demo/api/147896325/chat/get/messages?cid="+cID+"&userid="+userID).subscribe(data => {
// 		let data1 = data.text() ;
// data = JSON.parse(data1) ;

// resolve(data) ; 
//             });
//comment
//  firebase.database().ref(userID + '/mesages/' + cID.toString()).once('value').then(function(snapshot) {

//    var array = $.map(snapshot.val(), function(value, index) {
//     return [value];
// });
// observer.next(array)
//   })

        });
}
UnBlock(userid,cid){
  
    return this.http.get("https://arabface.online/demo/api/147896325/chat/delete/messages?userid="+ userid + "&cid=" + cid)
    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
     
    //  firebase.database().ref(userID + '/chats').delete(); 
  }
Block(userid,cid){
  
    return this.http.get("https://arabface.online/demo/api/147896325/block/user?userid="+ userid + "&cid=" + cid)
    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
     
    //  firebase.database().ref(userID + '/chats').delete(); 
  }
Delete_conversation(userid,cid){

  return this.http.get("https://arabface.online/demo/api/147896325/chat/delete/messages?userid="+ userid + "&cid=" + cid)
  //do((res : Response ) => console.log(res.json()))
    .map((res : Response ) => res.json());
   
  //  firebase.database().ref(userID + '/chats').delete(); 
}
Delete_conversationfirebase(cid){
  // alert(userID)
  // alert(userID + '/messages/'+cid)
  firebase.database().ref(userID + '/mesages/'+cid ).remove().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});

    
  
}

  getmessagesfromapi (cid) {
return new Promise (resolve => {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://arabface.online/demo/api/147896325/chat/get/messages?cid="+cid,
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "postman-token": "0fc107e4-b5c8-93f3-0f88-b9e9da082f92"
  }
}

$.ajax(settings).done(function (response) {
  resolve(JSON.parse(response))

});
//    this.http.get("https://arabface.online/demo/api/147896325/chat/get/messages?cid="+cid+"&userid="+userID).subscribe(data => {
// 		let data1 = data.text() ;
// data = JSON.parse(data1) ;
// resolve(data) ; 
// })
})
  }

    getfriends = new Observable (observer => {
    let body = new URLSearchParams() ; 
    body.append('userid' , userID )
    let body1 = body.toString() ; 
   let  headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
this.http.post('https://arabface.online/demo/api/147896325/profile/friends' , body1 , {headers : headers}).subscribe(data => {
let data1 = data.text() ;
data = JSON.parse(data1) ;  
 friends = data ; 
for (let i =0 ; i < friends.length ; i ++ ) {
check(friends[i]);

}
function check(friend) {
 

 firebase.database().ref(userID + '/firends').once('value').then(function(snapshot) { 

   let result1 = snapshot.val() ; 
 if(result1 == null) {
result5.push(friend) ; 
  firebase.database().ref(userID + '/firends').set(result5) ; 
 }else {
   for ( let i = 0 ; i < result1.length ; i ++) {
if(result1[i].id==friend.id) {
  break ; 
}
     if (i+1 == result1.length) {
if(result1[i].id==friend.id){
  break ; 
}else {
  console.log('added friends')
  result5.push(friend) ; 
  firebase.database().ref(userID + '/firends').set(result5) ; 
}
     }
   }
 }

 }) 
}




  observer.next(data) ; 
})

  })


sendmsg (msg,cid,remoteid) {

  console.log(msg , cid , remoteid)
firebase.database().ref(userID + '/mesages/' + cid).push(msg);
msg.from_me = false ;
firebase.database().ref(remoteid + '/mesages/' + cid).push(msg);
this.http.get("https://arabface.online/demo/api/147896325/chat/send/message?text="+msg.text+"&cid="+cid+"&userid="+userID).subscribe(data => {
let data1 = data.text() ;
data = JSON.parse(data1) ;

console.log(data)

});


}

send_New_Msg (msg,cid,remoteid) {
  
    console.log(msg , cid , remoteid)
  firebase.database().ref(userID + '/mesages/' + cid).push(msg);
  msg.from_me = false ;
  firebase.database().ref(remoteid + '/mesages/' + cid).push(msg);
  this.http.get("https://arabface.online/demo/api/147896325/chat/send/message?text="+msg.text+'&theuserid='+remoteid+"&userid="+userID).subscribe(data => {
  let data1 = data.text() ;
  data = JSON.parse(data1) ;
  
  console.log(data)
  
  });
  
  
  }

getLoggedInUSerProfile(userid)
{
return this.http.get("https://arabface.online/demo/api/147896325/chat/profile?userid="+userID).map((res:Response)=> res.json())

}
getfriendprofile (userID) {
  return new Promise (resolve => {
 this.http.get("https://arabface.online/demo/api/147896325/profile/details?userid="+userID).subscribe(data => {
let data1 = data.text() ;
data = JSON.parse(data1) ;
resolve(data) ; 
 })
  })
 
}
getprofile () {
  return new Promise (resolve => {
 this.http.get("https://arabface.online/demo/api/147896325/profile/details?userid=" + userID).subscribe(data => {
let data1 = data.text() ;
data = JSON.parse(data1) ;
resolve(data) ; 
 })
  })
 
}
newmsg (cid){
return new Observable (observer => {

  firebase.database().ref(userID + '/mesages/'+ cid).on('child_added' , function (data) {
// console.log(data.val())
observer.next(data.val()) ; 

  });
})
 
}

settyping (cid) {
firebase.database().ref(userID + '/messages/'+ cid + '/status/typing').set(true)

}

removetyping(cid) {

firebase.database().ref(userID + '/messages/'+ cid + '/status/typing').set(false)
}
profileDetailsApiCall(userid,theUserId)
{
  let url = 'https://arabface.online/demo/api/147896325/profile/details?userid='+userid+'&the_userid='+theUserId+'&the_userid='+theUserId
  return  this.http.get(url).map((res : Response ) => res.json());

}
getfriendData(userid){
  return new Promise (resolve => {
   this.http.get("https://arabface.online/demo/api/147896325/get/user/data?userid=" + userid + "&attr=first_name").subscribe(data => {
 //console.log(data['_body'])
 this.userData.firstname = data['_body']
// }) //do((res : Response ) => console.log(res.json()))
//((res : Response ) => console.log(res.json()))
//  //   .map((res : Response ) => res.json());
//alert(JSON.stringify("111"+this.userData))
this.http.get("https://arabface.online/demo/api/147896325/get/user/data?userid=" + userid + "&attr=last_name").subscribe(data2 => {
  //console.log(data['_body'])
  this.userData.lastName =data2['_body']
}) //do((res : Response ) => console.log(res.json()))
 this.http.get("https://arabface.online/demo/api/147896325/get/user/data?userid=" + userid + "&attr=avatar").subscribe(data3 => {
  
  this.userData.Avatar =data3['_body']
//  console.log( data['_body'])
   
console.log("1111"+JSON.stringify(this.userData))
resolve ( JSON.stringify(this.userData));

})

  })

  })

}
getUserData(attr, userid){
  return this.http.get("https://arabface.online/demo/api/147896325/get/user/data?userid=" + userid + "&attr=" + attr)
  //do((res : Response ) => console.log(res.json()))
    .map((res : Response ) => res.json());
}
remoteid(title) {

  return new Promise (resolve => {

let body = new URLSearchParams() ; 
    body.append('userid' , userID )
    let body1 = body.toString() ; 
   let  headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
this.http.post('https://arabface.online/demo/api/147896325/profile/friends' , body1 , {headers : headers}).subscribe(data => {
let data1 = data.text() ;
data = JSON.parse(data1) ;  
 friends2 = data ; 
for (let i = 0 ; i < friends2.length;  i ++ ){

  if(friends2[i].name == title) {

resolve(friends2[i].userid)
  }
}
})

  })
 
}

watchtype (id,cid) {

  return new Observable (observer => {

    firebase.database().ref(userID + '/mesages/' + cid + '/status/typing').on('value' , function(snapshot) {
     // console.log('remote status of typing is' + snapshot.val()) 
      observer.next(snapshot.val())
    })
  })
}
listenoninit (type) {
  return new Observable (observer => {

  
    firebase.database().ref(userID + '/' + type + '/init').on('value' , function(snapshot) {

      observer.next(snapshot.val())
    })
  })
}
remotelisten (type) {
  return new Observable (observer => {

  
    firebase.database().ref(userID + '/' + type + '/remote').on('value' , function(snapshot) {

      observer.next(snapshot.val())
    })
  })
}

sendtoremote(id,msg,type) {
firebase.database().ref(id + '/'+type+'/remote').set({ sender: userID, message: msg }) ; 

}
sendtoinit(id,msg,type) {
firebase.database().ref(id + '/'+type+'/init').set({ sender: userID, message: msg }) ; 

}
sendnumber (id,number,type) {
  remoteid = id ; 
firebase.database().ref(id + '/incoming').set({number,type:type}); 

this.getprofile().then(data => {
result34 = data ;
  console.log(result34)
  firebase.database().ref(id + '/call_status/caller_data').set({avatar :result34.avatar,name:result34.name}) ; 
})

}

placelistener (number) {
   return new Observable (observer => {
  firebase.database().ref('/' +number).on('child_added' , function (data) {

    observer.next(data.val())
  })
  
  
  })
} 

incominglistener() {

    return new Observable (observer => {

  
    firebase.database().ref(userID +'/incoming').on('value' , function(snapshot) {

      observer.next(snapshot.val())
    })
  })
}
writetodb (number,data) {
 
firebase.database().ref(number).push(data) ; 

}

// mutesound()
// {
//   alert
//   for (var i = 0, l = audioTracks.length; i < l; i++) {
//     audioTracks[i].enabled = !audioTracks[i].enabled;
//   }
  
// }
   
endcall () {
firebase.database().ref(remoteid + '/incoming').set({0 : "undefined"}) ; 

}

callee_accept_set (id , value) {
  if(id == undefined) {
  firebase.database().ref(userID + '/call_status/callee_accept').set(value); }
  else {firebase.database().ref(id + '/call_status/callee_accept').set(value); }
}
callee_deny_set (id , value) {
  if(id == undefined){
  firebase.database().ref(userID + '/call_status/callee_deny').set(value); }else{
    firebase.database().ref(id + '/call_status/callee_deny').set(value);
  } 
}
calee_recieved_set (id , value) {
  if(id == undefined){firebase.database().ref(userID + '/call_status/callee_recieved').set(value);  }else{
  firebase.database().ref(id + '/call_status/callee_recieved').set(value);  }
}
callee_end_set (value) {
  firebase.database().ref(userID + '/call_status/callee_end').set(value);  
}
caller_end_set (id,value) {
firebase.database().ref(id + '/call_status/caller_end').set(value); 
}
callee_accept_listen (id) {
return new Observable (observer => {

  
    firebase.database().ref(id + '/call_status/callee_accept').on('value' , function(snapshot) {

      observer.next(snapshot.val())
    })
  })
}
callee_deny_listen (id) {
return new Observable (observer => {

  
    firebase.database().ref(id + '/call_status/callee_deny').on('value' , function(snapshot) {

      observer.next(snapshot.val())
    })
  })
}
callee_recieved_listen (id) {
return new Observable (observer => {

  
    firebase.database().ref(id + '/call_status/callee_recieved').on('value' , function(snapshot) {

      observer.next(snapshot.val())
    })
  })
}
callee_end_listen (id) {
  return new Observable (observer => {

  
    firebase.database().ref(id + '/call_status/callee_end').on('value' , function(snapshot) {
console.log('calee end listen is fired from database')
      observer.next(snapshot.val())
    })
  }) 
}
caller_end_listen () {
return new Observable (observer => {

  
    firebase.database().ref(userID + '/call_status/caller_end').on('value' , function(snapshot) {
console.log('caller end listen fired')
      observer.next(snapshot.val())
    })
  })
}
set_userid (id) {
  userID = id.toString() ; 
  console.log('userid is set to' + userID)
}
set_incoming (id,value) {
  if(id == undefined){
firebase.database().ref(userID + '/incoming').set(value)
  }else {
firebase.database().ref(id + '/incoming').set(value)
  }
  
}
set_active (value) {
  firebase.database().ref(userID + '/active').set(value)
}
caller_data_listen () {
  return new Observable (observer => {

  
    firebase.database().ref(userID + '/call_status/caller_data').on('value' , function(snapshot) {

      observer.next(snapshot.val())
    })
  })
}
set_caller_data (id) {
  if(id == undefined){
 firebase.database().ref(userID + '/call_status/caller_data').set({0 : "undefined"})
  }else {
    firebase.database().ref(id + '/call_status/caller_data').set({0 : "undefined"})
  }
  
}
getconvo1 () {

  return new Observable (observer => {
    let body = new URLSearchParams() ; 
    body.append('userid' , userID )
    let body1 = body.toString() ; 
   let  headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
 
this.http.post('https://arabface.online/demo/api/147896325/chat/conversations' , body1 , {headers : headers}).subscribe(data => {
 // alert(JSON.stringify("dddddddd"+data))
let data1 = data.text();

data = JSON.parse(data1); 
// comments importanat
// console.log(JSON.stringify(data) )
// alert(JSON.stringify(data))

observer.next(data)
//alert(JSON.stringify("2222222222"+data))
this.addchats().subscribe(data => {
})
})
  })

}
getconvo2 () {
  return new Observable (observer => {
    let body = new URLSearchParams() ; 
    body.append('userid' , userID )
    let body1 = body.toString() ; 
   let  headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
 
this.http.post('https://arabface.online/demo/api/147896325/chat/conversations' , body1 , {headers : headers}).subscribe(data => {
let data1 = data.text();

data = JSON.parse(data1); 
observer.next(data)

})
  })

}

// return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/settings/general', body, {headers: headers})

editprofile(userid,firstname, lastname, username, email){
 // alert(firstname)
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let urlSearchParams = new URLSearchParams();
  urlSearchParams.append('first_name', firstname );
  urlSearchParams.append('last_name', lastname);
  urlSearchParams.append('username', username );
  urlSearchParams.append('email_address', email );
  // urlSearchParams.append('privacy', privacy );
  // urlSearchParams.append('who_can_post', canPost );
  // urlSearchParams.append('who_can_add_member', canAddMember );
  let body = urlSearchParams.toString()
 
  return this.http.post( 'https://arabface.online/demo/api/147896325/settings/general?userid='+ userid , body, {headers: headers})
  
  //do((res : Response ) => console.log(res.json()))
  .map((res : Response ) => res.json());
  }

  





// new


creatgroup (array,groupname) {                                                                                                 
  
return new Promise (resolve => {
  var chatid = firebase.database().ref('groups').push({chat:0 , members:0 ,last_message:0,admin:0,avatar:"https://www.2gocompanies.com/wp-content/uploads/Depositphotos_3365578_l.jpg" ,groupname:groupname,groupid:0}).key
  firebase.database().ref('groups/' + chatid.toString() + '/groupid').set(chatid.toString())
  firebase.database().ref('groups/' + chatid.toString() + '/last_message').set({type:"text" , text : "Group Has Been Created by "+myname , sendername:myname , time:Date.now() , senderid : userID});
   firebase.database().ref('groups/' + chatid.toString() + '/admin').push(userID);
     firebase.database().ref('groups/' + chatid.toString() + '/chat').push({type:"text" , text : "Group Has Been Created by " +myname , sendername:myname , time:Date.now() , senderid : userID});
  for(let i = 0 ; i < array.length ;i ++) {
 var memberid = firebase.database().ref('groups/' + chatid.toString() + '/members').push(JSON.stringify(array[i])).key
  firebase.database().ref(array[i].userid.toString() + '/joinedgroups/' + chatid.toString()).set(memberid.toString());
}
  firebase.database().ref(userID + '/joinedgroups/' + chatid.toString()).set(chatid.toString());

resolve(1)
})
}
sendmessage(groupid , message ,type){
  if(type == 'text'){
firebase.database().ref('groups/' + groupid + "/chat").push({type:'text' , text:message , time:Date.now() , sendername:myname , senderid : userID}) ; 
 firebase.database().ref('groups/' + groupid + "/last_message").set({type:'text' , text:message , time:Date.now() , sendername:myname , senderid : userID}) ; 
}

}
getgroups () {
  return new Observable(observer => {
  console.log('fired')
//   firebase.database().ref(userID + '/joinedgroups').on('child_removed') , (snapshot) => {
// console.log(snapshot.val())
//   }
  firebase.database().ref(userID + '/joinedgroups').on('value' , (snapshot) => {
    if(snapshot.val()!=null){

        var array = Object.keys(snapshot.val())
    console.log(array)
let groupchats = [] ; 
for(let i = 0 ; i < array.length ; i ++) {
  firebase.database().ref('groups/' + array[i]).once('value').then((snapshot) => {
var messages = $.map(snapshot.val(), function(value, index) {
    return [value];
});
groupchats.push(snapshot.val())

  })
}
observer.next(groupchats)
    }
  
  })
  })

}
compareid(id){
  return new Promise (resolve => {
    if(id == userID){
      resolve(1)
    }else {resolve(0)}
  })
}

getmyid () {
  return new Promise (resolve => {
    resolve (userID)
  })
}
groupmsg(groupid) {
  console.log(groupid)
  return new Observable (observer => {

  firebase.database().ref('groups/' + groupid + '/chat').on('child_added' , function (data) {
// console.log(data.val())
console.log(data.val())
observer.next(data.val()) ; 

  });
})
 
}

add_group_member(cid,addedUsers)
{

    return this.http.get('https://arabface.online/demo/api/147896325/chat/messages/add/group/members?cid='+cid+'&users='+addedUsers).map((res:Response)=>
    
    {res.json()
      
    })
    
  

}

add2group (id,friends) {

  return new Promise (resolve => {
    for (let i = 0 ; i < friends.length ; i ++) {
var memberid = firebase.database().ref('groups/' + id + '/members').push(JSON.stringify(friends[i])).key
firebase.database().ref(friends[i].userid + '/joinedgroups/'+memberid.toString()).set(id);
    }
    resolve(1)
    
  })
}

getgrpmembers (id) {
  console.log(id)
  return new Promise (resolve => {
    firebase.database().ref('groups/' + id + '/members').once('value').then((snapshot) => {
 var array = $.map(snapshot.val(), function(value, index) {
    return [value];
});
resolve(array)
    })
  })
}
 getApiMessages(userid,cid)
{
  
    return this.http.get("https://arabface.online/demo/api/147896325/chat/get/messages?userid=" + userid + "&cid=" + cid)
    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
 
// return this.http.get("https://arabface.online/demo/api/147896325/chat/get/messages?userid=25&cid="+cid).map((res : Response ) => res.json());
}
getApiMessages2(userid,cid)
{
  
  return new Promise (resolve => {
    this.http.get("https://arabface.online/demo/api/147896325/chat/get/messages?userid=" + userid + "&cid=" + cid).subscribe(data => {
   let data1 = data.text() ;
   data = JSON.parse(data1) ;
   resolve(data) ; 
    })
     })
    
}
deletegroup (id) {
firebase.database().ref('groups/' + id + '/admin').once('value').then((snapshot)=> {
    var array = $.map(snapshot.val(), function(value, index) {
    return [value];
});
for(let i = 0 ; i < array.length ; i ++) {
 if (array[i]==userID){
   firebase.database().ref(userID + '/joinedgroups/'+id).set(null)
 }
}
})
  firebase.database().ref(userID + '/joinedgroups/'+id).once('value').then((snapshot)=>{
    firebase.database().ref('groups/' + id +'/members/'+snapshot.val().toString()).set(null)
    firebase.database().ref(userID + '/joinedgroups/'+id).set(null)
  });
 
}
uploadfile(file)
{

  return new Promise (resolve => {
    var storageRef = firebase.storage().ref();
    var getFileBlob = function(url, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.addEventListener('load', function() {
          cb(xhr.response);
      });
      xhr.send();
  };

  var blobToFile = function(blob, name) {
      blob.lastModifiedDate = new Date();
      blob.name = name;
      return blob;
  };

  var getFileObject = function(filePathOrUrl, cb) {
      getFileBlob(filePathOrUrl, function(blob) {
          cb(blobToFile(blob, 'test.jpg'));
      });
  };

  getFileObject(file, function(fileObject) {
    var uploadTask=storageRef.put(fileObject).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    }, function(error) {
      
  }, function() {
      var downloadURL = uploadTask.snapshot.downloadURL;
     alert("downloadURL"+ JSON.stringify(downloadURL) )
      resolve(downloadURL)
    });
          
  })
          
       
      })

}
// uploadfile (photo) {
//   return new Promise (resolve => {
// var storageRef = firebase.storage().ref();

// // Create a reference to 'mountains.jpg'



//  var getFileBlob = function(url, cb) {
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", url);
//         xhr.responseType = "blob";
//         xhr.addEventListener('load', function() {
//             cb(xhr.response);
//         });
//         xhr.send();
//     };

//     var blobToFile = function(blob, name) {
//         blob.lastModifiedDate = new Date();
//         blob.name = name;
//         return blob;
//     };

//     var getFileObject = function(filePathOrUrl, cb) {
//         getFileBlob(filePathOrUrl, function(blob) {
//             cb(blobToFile(blob, 'test.jpg'));
//         });
//     };

//     getFileObject(photo, function(fileObject) {
     
//      var  uploadTask= storageRef.put(fileObject).then(function(snapshot) {
//         alert('Uploaded a blob or file!');
//         uploadTask.on('state_changed', function(snapshot) {
          
//            }, function(error) {
               
//            }, function() {
//                var downloadURL = uploadTask.snapshot.downloadURL;
//               alert(downloadURL)
//                resolve(downloadURL)
//            });
//        });
//       });

//       } ) // var uploadTask = storageRef.child('files').put(fileObject);
       

// }
upload(photo) {
  return new Promise (resolve => {
    var storageRef = firebase.storage().ref();
    alert("1")
    // Create a reference to 'mountains.jpg'
    
    
    
     var getFileBlob = function(url, cb) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.addEventListener('load', function() {
                cb(xhr.response);
            });
            xhr.send();
        };
    
        var blobToFile = function(blob, name) {
            blob.lastModifiedDate = new Date();
            blob.name = name;
            return blob;
        };
    
        var getFileObject = function(filePathOrUrl, cb) {
            getFileBlob(filePathOrUrl, function(blob) {
                cb(blobToFile(blob, 'test.png'));
            });
        };
    
        getFileObject(photo, function(fileObject) {
          alert("2")
          const filename = Math.floor(Date.now() / 1000);
        
            var uploadTask = storageRef.child('filesss/mountains.jpg').put(fileObject);
    
            uploadTask.on('state_changed', function(snapshot) {
           
            }, function(error) {
              alert(error)
                
            }, function() {
                var downloadURL = uploadTask.snapshot.downloadURL;
               
                resolve(downloadURL)
            });
         });
      })
//   alert(fileObject)
//   alert("1")
//   return new Promise (resolve => {
//   let storageRef = firebase.storage().ref();
//   // Create a timestamp as filename
//   const filename = Math.floor(Date.now() / 1000);
//   var uploadTask = storageRef.child('files'+filename).put(fileObject);
//   alert("2")
//           uploadTask.on('state_changed', function(snapshot) {
         
//           }, function(error) {
//             alert(JSON.stringify(error))
              
//           }, function() {
//             alert("done")
//               var downloadURL = uploadTask.snapshot.downloadURL;
             
//               resolve(downloadURL)
//           });
  
// })
}
uploadimage (photo) {
  return new Promise (resolve => {
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'



 var getFileBlob = function(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
            cb(xhr.response);
        });
        xhr.send();
    };

    var blobToFile = function(blob, name) {
        blob.lastModifiedDate = new Date();
        blob.name = name;
        return blob;
    };

    var getFileObject = function(filePathOrUrl, cb) {
        getFileBlob(filePathOrUrl, function(blob) {
            cb(blobToFile(blob, 'test.png'));
        });
    };

    getFileObject(photo, function(fileObject) {
        var uploadTask = storageRef.child('images'+photo+".png").put(fileObject);

        uploadTask.on('state_changed', function(snapshot) {
       
        }, function(error) {
            
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
           
            resolve(downloadURL)
        });
    });
  })

}
delete_message(userID,id)
{
  return new Promise (resolve => {
     this.http.get("https://arabface.online/demo/api/147896325/chat/delete/message?id="+id+"&userid="+userID).subscribe(data => {
		let data1 = data.text() ;
data = JSON.parse(data1) ;
resolve(data) ; 
})
})
}
 
public get_user_chat_settings(userid)
{
  console.log(userid)
  return this.http.get('https://arabface.online/demo/api/147896325/settings/chat/chat_settings?userid='+userid).map((res:Response)=> res.json());
}
public set_user_chat_settings(userid,last_seen_status,read_receipt_status)
{
  return this.http.get('https://arabface.online/demo/api/147896325/settings/chat/change/chat_settings?userid='+userid+'&last_seen_status='+last_seen_status+'&read_receipt_status='+read_receipt_status).map((res:Response)=> res.json());
}

public get_user_chat_status(userid)
{
  return this.http.get('https://arabface.online/demo/api/147896325/chat/profile/get/chat/status?userid='+userid).map((res:Response)=> res.json());
}

public set_user_chat_status(userid , newChatStatus)
{
  return this.http.get('https://arabface.online/demo/api/147896325/chat/profile/update/chat/status?userid='+userid+'&status='+newChatStatus).map((res:Response)=> res.json());
}
public get_user_chat_online_status(userid)
{
  return this.http.get('https://arabface.online/demo/api/147896325/chat/profile/get/chat/online_status?userid='+userid).map((res:Response)=> res.json());
}

public set_user_chat_online_status(userid , newChatStatus)
{
  return this.http.get('https://arabface.online/demo/api/147896325/chat/profile/update/chat/online_status?userid='+userid+'&status='+newChatStatus).map((res:Response)=> res.json());
}

}

