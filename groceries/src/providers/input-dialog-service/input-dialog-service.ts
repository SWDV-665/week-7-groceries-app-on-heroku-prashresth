import { Injectable } from '@angular/core';
import {AlertController, ItemSliding, ModalController, ToastController} from "ionic-angular";
import {GroceriesServiceProvider} from "../groceries-service/groceries-service";

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public groceryService: GroceriesServiceProvider,
              public modalController: ModalController) {

  }

  async showPrompt(item?, index?, slidingItem?: ItemSliding) {
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item
        ? "Fill out the form below to edit the grocery item"
        : "Fill out the form below to add a grocery item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
        {
          name: 'price',
          placeholder: 'Price',
          value: item ? item.price : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            if (index != undefined) {
              slidingItem.close()
            }
            const message = index
              ? `It's ok, edit the item some other time...`
              : `It's ok, add an item some other time...`;
            const toast = this.createToast(message, "toast-primary");
            toast.present();
          }
        },
        {
          text: item ? 'Save' : 'Add',
          handler: data => {
            if (index != undefined) {
              slidingItem.close()
              this.groceryService.editItem(item._id, data).then(data => {
                this.createSuccessToast(data, index);
              });
            }
            else {
              this.groceryService.addItem(data).then(data => {
                this.createSuccessToast(data);
              });
            }
          }
        }
      ]
    });
    await prompt.present();
  }

  createToast(message, cssClass, duration?) {
    return this.toastCtrl.create({
      message: message,
      duration: duration ? duration : 3000,
      cssClass: cssClass
    });
  }

  async createDeleteToast(item) {
    const toast = this.createToast(
      `Item: ${item.name} removed from the list.`,
      "toast-danger"
    )
    await toast.present();
  }

  async createSuccessToast(data, index?) {
    const message = index
      ? `Item updated successfully.`
      : `Item: ${data.name} added to the list.`
    const cssClass = index ? "toast-primary" : "toast-success"
    const toast = this.createToast(
      message,
      cssClass
    );
    await toast.present();
  }
}
