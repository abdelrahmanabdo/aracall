import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ToastController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the UploadImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImagePage {
  lastImage: string = null;
  userId
  loading: Loading;
  type
  cid
  constructor(public loadingCtrl: LoadingController, public toast: ToastController, private transfer: FileTransfer, private file: File, public navCtrl: NavController, public navParams: NavParams) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.lastImage = navParams.get("image");
    this.cid = navParams.get("cid");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadImagePage');
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
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

  public uploadImage() {
      var filename = this.lastImage;
      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);
    // Destination URL
    var url, options;
      url = "http://192.168.1.252/arabface/api/14789632/chat/messages/change/group/avatar";
      options = {
        fileKey: "avatar",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'cid': this.cid, 'avatar': filename}
      };
    

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options, true).then(data => {
      this.loading.dismissAll()


      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      // alert(err.code);
      // alert(err.source);
      // alert(err.target);
      // alert(err.http_status);
      // alert(err.body);
      // alert(err.exception);
      this.presentToast('Error while uploading file.');
    });

    this.navCtrl.pop();
  }

}