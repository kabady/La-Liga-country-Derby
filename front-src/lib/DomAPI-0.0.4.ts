export class DomAPI {
  elemList: Array<Element>;
  elemSelector: string;
  elemParents: Array<Element>;
  constructor(elemSelector?: string, elemParents?: Array<Element>) {
    this.elemSelector = elemSelector;
    this.elemParents = elemParents || [];
  }
  setElemList(elemList: Array<Element>): void {
    this.elemList = elemList;
  }
  size(): number {
    return this.getElemList().length;
  }
  getElemList(index?: number): Array<Element> {
    if (this.elemList == null) {
      this.elemParents = [].slice.call(this.elemParents);
      if (this.elemParents.length === 0) {
        this.elemList = _$s(this.elemSelector);
      } else {
        this.elemList = [];
        this.elemParents.forEach((elemParent) => {
          this.elemList = ([].slice.call(_$s(this.elemSelector, elemParent))).concat(this.elemList);
        })
      }
    }
    return this.elemList;
  }
  getEl(index: number) {
    let list: Array<Element> = this.getElemList();
    return list[index];
  }
  find(selector: string): DomAPI {
    return new DomAPI(selector, this.getElemList());
  }
  append(insertElemList: Array<Element>) {
    this.getElemList().forEach((elem) => {
      insertElemList.forEach((insertElem) => {
        elem.appendChild(insertElem)
      })
    })
  }
  appendBefore(insertElemList: Array<Element>) {
    this.getElemList().forEach((elem) => {
      insertElemList.forEach((insertElem) => {
        elem.insertBefore(insertElem, elem.children[0])
      })
    })
  }
  remove() {
    this.getElemList().forEach(elem => {
      if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    })
  }
  replace(newElem: Element) {
    this.getElemList().forEach(oldElem => oldElem.parentElement.replaceChild(newElem, oldElem));
  }
  on(eventType: string, handle: (ev) => void) {
    EventCustomize.On(this.getElemList(), eventType, handle);
  }
  off(eventType: string, handle: (ev) => void) {
    EventCustomize.Off(this.getElemList(), eventType, handle);
  }
  css(cssStyle: Object): void{
    this.getElemList().forEach( elem => {
      try{
        for(let cssName in cssStyle){
          if(cssStyle.hasOwnProperty(cssName)){
            let anyElem: any = elem;
            anyElem.style[cssName] = cssStyle[cssName];
          }
        }
      }catch(e){
        console.error('DomAPI.css error');
      }
    })
  }
  getAttr(name): string{
    if(this.getElemList()[0]){
      return CommonAttr.get(this.getElemList()[0], name);
    }else{
      return '';
    }    
  }
  setAttr(name: string, value: string): void{
    this.getElemList().forEach( elem => CommonAttr.set(elem, name, value) );
  }
  removeAttr(name): void{
    this.getElemList().forEach( elem => CommonAttr.remove(elem, name) );
  }
  static CreateByHtmlString(htmlStr: string): DomAPI {
    let a: DomAPI = new DomAPI();
    a.setElemList(CommonFastRender(htmlStr));
    return a;
  }
  static CreateByElemList(elemList: Array<Element>): DomAPI {
    let a: DomAPI = new DomAPI();
    a.setElemList(elemList);
    return a;
  }
  static CreateByElem(elem: Element): DomAPI {
    return DomAPI.CreateByElemList([elem]);
  }
  static Create(elemList: Array<Element>): DomAPI {
    return DomAPI.CreateByElemList(elemList);
  }
}
class CommonAttr {
  static get(elem: Element, name: string): string{
    return elem.getAttribute(name);
  }
  static set(elem: Element, name: string, value: string): void{
    elem.setAttribute(name, value);
  }
  static remove(elem: Element, name: string): void{
    elem.removeAttribute(name);
  }
}
class EventCustomize {
  static On(elemList: Array<Element>, eventType: string, next: (ev) => void, useCapture = true) {
    elemList.forEach((elem) => {
      EventCustomize.Bind(elem, eventType, next, useCapture);
    })
  }
  static Bind(elem: Element, eventType: string, next: (ev) => void, useCapture) {
    let eventTypes: Array<string> = eventType.split(' ');
    eventTypes.forEach((eventType) => {
      elem.addEventListener(eventType, next, useCapture);
    });
  }
  static Off(elemList: Array<Element>, eventType: string, next: (ev) => void, useCapture = true) {
    elemList.forEach((elem) => {
      EventCustomize.UnBind(elem, eventType, next, useCapture);
    })
  }
  static UnBind(elem: Element, eventType: string, next: (ev) => void, useCapture) {
    let eventTypes: Array<string> = eventType.split(' ');
    eventTypes.forEach((eventType) => {
      elem.removeEventListener(eventType, next, useCapture);
    });
  }
}
function CommonFastRender(str: string): Array<Element> {
  let div: Element = document.createElement('div');
  div.innerHTML = str;

  let childElements: Array<Element> = [];
  for (var i = 0, len = div.children.length - 1; i <= len; i++) {
    if (div.children[i].nodeType == 1) {
      childElements.push(div.children[i]);
    }
  }
  return childElements;
}

function _$(selector: string, elem?: Element): Element {
  return elem ? elem.querySelector(selector) : document.querySelector(selector)
}

function _$s(selector: string, elem?: Element): Array<Element> {
  let nodeList: NodeListOf<Element> = elem ? elem.querySelectorAll(selector) : document.querySelectorAll(selector);
  let elemList: Array<Element> = [];
  for (let i = 0, len = nodeList.length; i < len; i++) {
    elemList[i] = nodeList[i]
  }
  return elemList;
}