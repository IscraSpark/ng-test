import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { Iurl } from './interface/img';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-test';

  breed = 'birm';
  limit = '10';
  responce!: Iurl[];
  sub!: Subscription;
  imgUrl: string[] = [];
  toppings = new FormControl('');
  toppingList: string[] = [
    'Birman',
    'British Longhair',
    'British Shorthair',
    'Egyptian Mau',
    'Himalayan',
    'Japanese Bobtail',
  ];
  it_list: string[] = ['birm', 'bslo', 'bsho', 'emau', 'hima', 'jbob'];
  amount = 0;

  constructor(private service: AppService) {}

  search(num: string, selected: any) {
    this.limit = num;
    this.imgUrl = [];
    let flag: boolean = true;

    if (!selected.length) {
      selected = ['Birman'];
      console.log(selected);
    }

    for (let val of selected) {
      let len = selected.length;
      console.log(selected)
      for (let i = 0; i < this.toppingList.length; i++) {
        if (val.value == this.toppingList[i]) {
          this.breed = this.it_list[i];
        }
      }

      this.amount = Math.floor(parseInt(this.limit) / len);
      if (flag) {
        this.amount = this.amount + (parseInt(this.limit) % len);
        flag = false;
      }

      this.sub = this.service
        .getImg(this.breed, this.amount)
        .subscribe((responce: Iurl[]) => {
          this.responce = responce;
          for (let i = 0; i < this.responce.length; i++) {
            this.imgUrl.push(this.responce[i]['url']);
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
