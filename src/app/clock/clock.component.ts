import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  hourInput: number = 0;
  minuteInput: number = 0;
  intervalId: any;

  constructor(private _storageService: StorageService) { }
  ngOnInit(): void {
    this.hourInput = this._storageService.getData("hourInput") == null ? 9 : Number(this._storageService.getData("hourInput"));
    this.minuteInput = this._storageService.getData("minuteInput") == null ? 15 : Number(this._storageService.getData("minuteInput"));

    this.intervalId = setInterval(() => { // update time every sec but update effect on UI after 5 mintus
      this.generateTime();
    }, 1000);
  }
  ngOnDestroy(): void { // remove the interbla once page app close.
    clearInterval(this.intervalId);
  }

  onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
  }

  generateTime(): void { // genrate time and upadte things

    const hour = this.hourInput;
    const minute = this.minuteInput;
    const hourArr = this.getFibonacciArray(hour);
    const minuteArr = this.getFibonacciArray(minute / 5);
    const red = [];
    const blue = [];
    const green = [];
    const white = [];
    const tds = document.getElementsByTagName("td");
    for (let j = 0; j < tds.length; j++) {
      tds[j].style.removeProperty("background-color");
    }
    const fibonacciSeries = [1, 1, 2, 3, 5];
    for (let i = 0; i < fibonacciSeries.length; i++) {
      const val = fibonacciSeries[i];
      if (hourArr.indexOf(val) > -1 && minuteArr.indexOf(val) > -1) {
        blue.push(val);
        hourArr.splice(hourArr.indexOf(val), 1);
        minuteArr.splice(minuteArr.indexOf(val), 1);
        this.applyColor(val, "blue");
      } else if (hourArr.indexOf(val) > -1 && minuteArr.indexOf(val) == -1) {
        red.push(val);
        hourArr.splice(hourArr.indexOf(val), 1);
        this.applyColor(val, "red");
      } else if (hourArr.indexOf(val) == -1 && minuteArr.indexOf(val) > -1) {
        green.push(val);
        minuteArr.splice(minuteArr.indexOf(val), 1);
        this.applyColor(val, "green");
      } else {
        white.push(val);
        this.applyColor(val, "white");
      }
    }
    console.log("*************");
    console.log("Red :" + red);
    console.log("Blue :" + blue);
    console.log("Green :" + green);
    console.log("White :" + white);
    this.setTimeInToLocalstorage();
  }

  getFibonacciArray(value: number): number[] { // genrate Fibonacci Array 
    let sum = 1;
    const firstVal = (value == 0) ? 0 : 1;
    let nextValue = 1;
    const fibArray = [];
    fibArray.push(firstVal);
    while (value > sum) {
      fibArray.push(nextValue);
      nextValue = fibArray[fibArray.length - 1] + fibArray[fibArray.length - 2];
      sum = fibArray.reduce((a, b) => a + b);
    }

    const newArr = [];
    let newArrSum = 0;
    let i = fibArray.length - 1;
    if (fibArray[i] <= value) {
      newArr.push(fibArray[i]);
    }
    newArrSum = newArr.reduce((a) => a);

    while (newArrSum < value && i != 0) {
      i = i - 1;
      newArr.push(fibArray[i]);
      newArrSum = newArr.reduce((a, b) => a + b);
      if (newArrSum > value) {
        newArr.pop();
        i = i - 1;
        newArrSum = newArr.reduce((a, b) => a + b);
      }
    }
    return newArr;
  }
  applyColor(value: number, color: string): void { // apply colir on time change base on value 
    let tds: HTMLCollectionOf<Element> | null = null;
    if (value == 2) {
      tds = document.getElementsByClassName("two");
      (tds[0] as HTMLElement).style.backgroundColor = color;
    } else if (value == 3) {
      tds = document.getElementsByClassName("three");
      (tds[0] as HTMLElement).style.backgroundColor = color;
    } else if (value == 5) {
      tds = document.getElementsByClassName("five");
      (tds[0] as HTMLElement).style.backgroundColor = color;
    } else if (value == 1) {
      tds = document.getElementsByClassName("one");
      if ((tds[0] as HTMLElement).style.backgroundColor == "") {
        (tds[0] as HTMLElement).style.backgroundColor = color;
      } else if ((tds[1] as HTMLElement).style.backgroundColor == "") {
        (tds[1] as HTMLElement).style.backgroundColor = color;
      }
    }
  }
  next() { // to handel handel time and hours
    if (this.minuteInput == 55) {
      if (this.hourInput < 12) {
        this.hourInput += 1;
      }
      this.minuteInput = 0;
      this.generateTime();
    } else {
      this.minuteInput += 5;
      this.generateTime();
    }
  }


  back() {
    if (this.minuteInput !== 0) {
      this.minuteInput -= 5;
      this.generateTime();
    } else {
      if (this.hourInput !== 0) { // add condition to check if hourInput is not 0
        this.hourInput -= 1;
        this.minuteInput = 55;
        this.generateTime();
      }
    }
  }

  setTimeInToLocalstorage() {
    this._storageService.setData("hourInput", this.hourInput.toString());
    this._storageService.setData("minuteInput", this.minuteInput.toString());
  }
}
