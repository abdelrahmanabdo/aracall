import { DatabaseProvider } from './../../providers/database/database';
//import { FirebaseProvider } from './../../providers/firebase/firebase2';
import { CreataccountPage } from './../creataccount/creataccount';
import { Component,ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormControl , FormGroup , Validators } from '@angular/forms'
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http'
import { FileChooser } from '@ionic-native/file-chooser';
import { TabsPage } from './../tabs/tabs';



let firebase ; let x=true;
// import stylefile from '../assets/main.css' ; 
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',  
  styleUrls : ['../../assets/main.css']
})
export class LoginPage {
 
  
  map: any;
email ; 
password ; 
  constructor(public fileChooser: FileChooser,public database : DatabaseProvider,public http: Http ,public navCtrl: NavController, public navParams: NavParams,public geolocation: Geolocation) {
  firebase = this.database ; 
// this.getlocation();
}
// selectfile()
// {
//   alert("asfsafds")
//   this.fileChooser.open().then(uri =>
// //     this.database.uploadfile(uri[0]).then(data => {
// //     alert("data"+data)
      
     
   
// // this.send(data)
//      alert(uri)
// //   })
    
//     )
//     // 
 
//   .catch(e => 
//   alert(e)
//   );
// }
  userForm = new FormGroup ({
     
      username : new FormControl (null , [Validators.required , Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]) , 
      
       password : new FormControl (null , [Validators.required,Validators.minLength(6)]) , 
     

  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  // addMarker(){
    
     
    
  //  }
//   addInfoWindow(marker, content){
    
//      let infoWindow = new google.maps.InfoWindow({
//        content: content
//      });
    
//      google.maps.event.addListener(marker, 'click', () => {
//        infoWindow.open(this.map, marker);
//      });
    
//    }
//   getlocation()
//   {
//     this.geolocation.getCurrentPosition().then((resp) => {
//       var lat=resp.coords.latitude;
//       var long=resp.coords.longitude;
//       let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
//      // currentPosMarker.setPosition(latLng);
      
//       let mapOptions = {
//         center: latLng,
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       }
      
//       this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

//       let marker = new google.maps.Marker({
//         map: this.map,
//         animation: google.maps.Animation.DROP,
//         position: this.map.getCenter()
//       });
     
//       let content = "<h4>Information!</h4>";         
     
//      this.addInfoWindow(marker, content);
  
    // https://www.bing.com/maps/default.aspx?where1=30.0444196, 31.2357116
    // http://maps.google.com/?q=30.0444196,31.2357116
    // var url = "  http://maps.google.com/?q="+30.0444196+","+ 31.2357116;
//      var url2=" https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=" +resp.coords.latitude+","+resp.coords.longitude;
//      var url = "http://maps.google.com/maps?saddr=" +resp.coords.latitude+","+resp.coords.longitude;
//     console.log(url2)
      
//     //  this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true').map(res=>res.json()).subscribe(data => {
//     //       var address = data.results[0];
//     //    var location=address.formatted_address;
//     //    alert(location)
//     //      });
// }).catch((error) => {
// console.log('Error getting location', error);
// });
     
//   }
  login ({valid,value}) {
   // alert(JSON.stringify(value) )
    
    if(valid)  
    {
      firebase.login(this.userForm.value)
      localStorage.setItem('login','1');
      // if(firebase.login(this.userForm.value) )
      // this.navCtrl.push(TabsPage) 
    }
  
    
    else x=false


    // alert(x)
     // console.log(this.userForm.value)
    
  
  }
  //Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])
  validateEmail(email) {
    console.log(email)
    if(email == ""){return true ; }
  if(email==null){return true ; }
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(email))
    return re.test(email);
}
creat () {
  this.navCtrl.push(CreataccountPage) ; 
  console.log("creat")
}
out() {

  firebase.signout () ; 
}
}
