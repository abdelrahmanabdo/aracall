import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams,AlertController, ToastController,LoadingController,ActionSheetController} from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import {AddmemberPage} from '../addmember/addmember';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { UploadImagePage } from '../upload-image/upload-image';
import { File } from '@ionic-native/file';
import {ChathandlerPage} from '../chathandler/chathandler'
import {NewChatPage} from '../new-chat/new-chat'


/**
 * Generated class for the GroupInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;

@Component({
  selector: 'page-group-info',
  templateUrl: 'group-info.html',
})
export class GroupInfoPage {
  groupName ;cid;groupMembers;numberOfParticipants;customized_group_name = [];cover
  imageURI:any;
  imageFileName:any;
  lastImage: string = null;
  url = "http://192.168.1.252/arabface/"
  userid
  group_admin
  constructor(private database:DatabaseProvider, private filePath: FilePath, private transfer: FileTransfer, private file: File, public camera: Camera, public navCtrl: NavController, public navParams: NavParams,public alert :AlertController,public loadingCtrl :LoadingController ,  public toast: ToastController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    this.groupName= this.navParams.get('title');
    this.cid= this.navParams.get('cid');
    this.group_admin= this.navParams.get('group_admin');
    console.log(this.group_admin)
    this.userid =localStorage.getItem('userid') 
    
    console.log(this.groupName);
    this.get_chat_members(this.cid);
    this.get_group_Data(this.cid);
    console.log(this.cover)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupInfoPage');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Select Image Source',
      buttons: [
        {
          text: 'Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);

          }
        }
      ]
    });
    actionSheet.present();

  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
  goTochatPage(other_userid,userid=this.userid)
  {
    this.database.check_chat_history(other_userid,userid).subscribe(res => {
      if(res.status == 1)
      {
        this.navCtrl.push(ChathandlerPage,{'data':res.cid,'avatar': res.avatar,'title':res.name })
      }else{
        this.navCtrl.push(NewChatPage,{'data':res.cid,'avatar':res.avatar,'title':res.name })
        
      }
    })

  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.navCtrl.push(UploadImagePage,{
        cid: this.cid,
        image: this.lastImage
      })
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  openEditPage()
  {
    let editGroupName = this.alert.create(
      {
        title : 'Group name',
        message: "Edit group name",
        inputs : [{
          name:'newName',
          placeholder : this.groupName
        }],
        buttons : [
          {
            text: 'save',
            handler: data => {
              // if (User.isValid(data.username, data.password)) {
              //   // logged in!
              // } else {
              //   // invalid login
              //   return false;
              // }
              this.database.eidt_group_name(this.cid,data.newName).subscribe(res => 
              {
                if(res.status == 1)
                {

                  const toast = this.toast.create({
                    message: 'Name changed successfully ',
                    duration: 2000,
                    position: 'bottom'
                  });
                  toast.present()
                  console.log(res)
                  this.customized_group_name.unshift(res.group_name);
                  
                }
              })
            }

          }
        ]
      })
    editGroupName.present()
  }
  presentToast(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
  deleteMember(i,userid)
  {
     
          let editGroupName = this.alert.create(
            {
              title : 'Delete member',
           message:'Do you want to delete this member?',
              buttons : [
                {
                  text: 'ok',
                  handler: data => {
                    this.database.delete_group_member(this.cid,userid).subscribe(
                      (res)=>{console.log(res)
                      if(res.status == 1 )
                      {
                    this.groupMembers.splice(i,1)
                    this.numberOfParticipants-=1
                           }
                       }
                     )
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
  get_chat_members(cid)
  {
    this.database.getGroupChatMembers(cid).subscribe(res =>{console.log(res);this.groupMembers=res;this.numberOfParticipants = res.length})
  }
  get_group_Data(cid)
  {
    this.database.get_group_name(cid).subscribe(res =>{this.customized_group_name.push(res.group_name) ;this.cover=res.group_avatar})
    
  }
  add_member_to_group()
  {
    this.navCtrl.push(AddmemberPage,{'id':this.cid,'currentMembers':this.groupMembers})
  }
 

  back()
  {
    this.navCtrl.pop();
  }
}
