import './page-3.scss'

import { Page } from "../page";
import { DomAPI } from "../../lib/DomAPI-0.0.4";
import { assetMap } from "../assetUtil";
import { routes } from '../router';

let HTML: string = require('./page-3.html');

export class Page3 extends Page {
  constructor() {
    super();
  }
  initPageElem(): void{
    this.DOMAPI = DomAPI.CreateByHtmlString(HTML);
    this.pDOMAPI.append(this.DOMAPI.getElemList());
  }
  initPageEvent(): void{
    this.DOMAPI.find('.action-enter-next').on('click', () => {
      routes.go('page4');
    })
  }
  setBackground():void{
    let background = DomAPI.CreateByHtmlString(`<img class="bg" src=${assetMap.bgPage3}>`);
    this.DOMAPI.appendBefore(background.getElemList());
  }
}