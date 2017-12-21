import './page-5.scss'
let HTML: string = require('./page-5.html');

import { DomAPI } from "../../lib/DomAPI-0.0.4";
import { assetMap } from "../assetUtil";
import { routes } from '../router';
import { Page } from '../../lib/Page-0.1.1';
import { getLastImage } from '../page-4/page-4';
import { setTimeout } from 'timers';
import { getUserNameAndTeam, RealMadrid, Barcelona } from '../page-2/page-2';


export class Page5 extends Page {
  canvasContainer: DomAPI;
  constructor() {
    super();
  }
  initPageElem(): void{
    this.DOMAPI = DomAPI.CreateByHtmlString(HTML);
    this.pDOMAPI.append(this.DOMAPI.getElemList());

    this.canvasContainer = this.DOMAPI.find('.canvas-container');
  }
  initPageEvent(): void{
    this.DOMAPI.find('.again-btn').on('click', () => {
      routes.go('page2');
    })
  }
  setBackground():void{
    let background = DomAPI.CreateByHtmlString(`<img class="bg" src=${assetMap.bgCommon}>`);
    this.DOMAPI.appendBefore(background.getElemList());
  }
  showbefore(){
    this.canvasContainer.empty();
    this.createLastImage()
  }
  createLastImage(){
    let canvas = document.createElement('canvas');
    // <canvas id="canvas" height="624" width="352" ></canvas>
    canvas.width = 352;
    canvas.height = 624;
    let c = canvas.getContext('2d');

    let imageList = [];
    let bg: any = DomAPI.CreateByHtmlString(`<img src="${assetMap.lastImageBg}">`).getEl(0);
    imageList.push(bg);

    let base64Image: any = DomAPI.CreateByHtmlString(`<img src="${getLastImage()}">`).getEl(0);
    imageList.push(base64Image);

    let name = getUserNameAndTeam().userName.substring(0, 4);
    let _txt2 = '', _txt1 = '', otherNews;

    if(getUserNameAndTeam().teamSelect == RealMadrid){
      otherNews = DomAPI.CreateByHtmlString(`<img src="${assetMap.lastImageNewsRe}">`).getEl(0);
      _txt1 = `国家德比皇马3-0大胜，全都靠${name}`;
      _txt2 = `面对巴萨一夜成名，${name}有何话说？`;
    }else if(getUserNameAndTeam().teamSelect == Barcelona){
      otherNews = DomAPI.CreateByHtmlString(`<img src="${assetMap.lastImageNewsBa}">`).getEl(0);
      _txt1 = `国家德比${name}绝杀，巴萨2-1皇马`;
      _txt2 = `面对皇马一夜成名，${name}有何话说？`;
      
    }
    imageList.push(otherNews);

    DomAPI.CreateByElemList(imageList).on('load', () => {
      imageList.pop();
      if(imageList.length == 0){
        c.drawImage(bg, 0, 0, canvas.width, canvas.height);
        c.drawImage(base64Image, 23, 102, 305, 171);

        c.fillStyle = 'rgba(0, 0, 0, .8)';
        c.fillRect(23,102 + 171 - 32 ,305, 32);

        c.font ="bold 16px/30px SourceHanSansCN";
        c.fillStyle = '#fff'
        c.textBaseline="middle";
        c.fillText(_txt1, 23 + 10, 102 + 171 - 16 );

        c.drawImage(otherNews, 284, 285, 44, 44);
        
        c.font ="14px/30px SourceHanSansCN";
        c.fillStyle = '#000'
        c.textBaseline="middle";
        c.fillText(_txt2, 23, 102 + 171 + 50 - 16 );

        let lastVersionImage = document.createElement('img');
        lastVersionImage.src = canvas.toDataURL('image/jpeg');
        lastVersionImage.className = 'canvas'
        this.canvasContainer.append([lastVersionImage])
      }
    })
  }
}