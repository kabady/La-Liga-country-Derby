import './page-2.scss'

import { Page } from "../page";
import { DomAPI } from "../../lib/DomAPI-0.0.4";
import { assetMap } from "../assetUtil";
import { routes } from '../router';

let HTML: string = require('./page-2.html');

export class Page2 extends Page {
  constructor() {
    super();
  }
  initPageElem(): void{
    this.DOMAPI = DomAPI.CreateByHtmlString(HTML);
    this.pDOMAPI.append(this.DOMAPI.getElemList());
  }
  initPageEvent(): void{
    this.DOMAPI.find('.action-enter-next').on('click', () => {
      try{
        let input: any = this.DOMAPI.find('.input-container input').getEl(0);
        userName = input.value;
      }catch(e){
        throw new Error('获取input值错误')
      }
      if(userName == ''){
        alert('请填写你的名字');
        return
      }
      if(teamSelect == ''){
        alert('请选择你要加入的球队');
        return
      }
      routes.go('page3');
    });
    let logoLeft = this.DOMAPI.find('.left-select img');
    logoLeft.on('click', () => {
      teamSelect = 'Real-Madrid'
      logoRight.setAttr('src', `${assetMap.logoRight}`);
      logoLeft.setAttr('src', `${assetMap.logoLeftSelected}`);
    });
    let logoRight = this.DOMAPI.find('.right-select img')
    logoRight.on('click', () => {
      teamSelect = 'Barcelona'
      logoLeft.setAttr('src', `${assetMap.logoLeft}`);
      logoRight.setAttr('src', `${assetMap.logoRightSelected}`);
    });
  }
  setBackground():void{
    let background = DomAPI.CreateByHtmlString(`<img class="bg" src=${assetMap.bgPage2}>`);
    this.DOMAPI.appendBefore(background.getElemList());
    this.DOMAPI.find('.left-select img').setAttr('src', `${assetMap.logoLeft}`);
    this.DOMAPI.find('.right-select img').setAttr('src', `${assetMap.logoRight}`);
  }
}
let userName: string = '';
export function getUserName(){
  return userName;
}
let teamSelect: string = ''
export function getUserTeam(){
  return teamSelect;
}