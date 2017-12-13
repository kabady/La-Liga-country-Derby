import { DomAPI } from "../lib/DomAPI-0.0.4";

export abstract class Page {
  DOMAPI: DomAPI;
  pDOMAPI: DomAPI = new DomAPI('body');
  constructor() {
    this.initPageElem();
    this.initPageEvent();
    this.setBackground();
  }
  show(): void {
    this.DOMAPI.css({ display: 'block' })
  }
  hide(): void {
    this.DOMAPI.css({ display: 'none' })
  }
  abstract initPageElem(): void;
  abstract initPageEvent(): void;
  abstract setBackground(): void;
}