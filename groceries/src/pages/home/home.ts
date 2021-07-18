import { Component } from '@angular/core';
import {ModalController, ItemSliding, NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from "../../providers/groceries-service/groceries-service";
import { InputDialogServiceProvider } from "../../providers/input-dialog-service/input-dialog-service";
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = 'Groceries List';
  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public groceryService: GroceriesServiceProvider,
              public inputDialogService: InputDialogServiceProvider,
              public modalController: ModalController,
              public socialSharing: SocialSharing) {
    groceryService.dataChanged$.subscribe(async (dataChanged: boolean) => {
      if (dataChanged) {
        await this.loadItems();
      }
    });
  }

  async ionViewCanEnter() {
    await this.loadItems();
  }

  loadItems() {
    return new Promise((resolve, reject) => {
      this.groceryService.getAllItems()
        .subscribe(
          items => {
            this.items = items['data']
            resolve(items)
          },
          error => {
            this.errorMessage = <any>error
            reject(error)
          }
        );
    });
  }

  async addItem() {
    await this.inputDialogService.showPrompt();
  }

  async editItem(item, index, itemSliding) {
    await this.inputDialogService.showPrompt(item, index, itemSliding);
  }

  async shareItem(item, slidingItem?: ItemSliding) {
    let message = `Grocery Item - Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`;
    let subject = 'Shared via groceries app';
    try {
      await this.socialSharing.share(message, subject);
      slidingItem.close();
    } catch (err) {
      console.error('Error occurred', err);
    }
  }

  async deleteItem(item) {
    this.groceryService.deleteItem(item).then(item => {
      console.log(item)
      this.ionViewCanEnter();
    }).then(() => {
      this.inputDialogService.createDeleteToast(item);
    });
  }
}
