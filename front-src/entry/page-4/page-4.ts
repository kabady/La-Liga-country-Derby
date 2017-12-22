import './page-4.scss'

import { DomAPI } from "../../lib/DomAPI-0.0.4";
import { assetMap } from "../assetUtil";
import { routes } from '../router';
import { Page } from '../../lib/Page-0.1.1';
import { getUserNameAndTeam, Barcelona, RealMadrid } from '../page-2/page-2';
import { ImageRotateFilter } from '../../js-lib/build/ImgKind.js';
import ImgMove from '../../js-lib/build/ImgMove-0.0.1.js';
import CanvasImg from '../../js-lib/build/CanvasImg.js';
import { ajaxSend } from '../ajax';
import { page4LastImage } from '../canvas';

let HTML: string = require('./page-4.html');

let lastImage = '';
export function getLastImage() {
  return lastImage
}
export function setLastImage(image, handle) {
  page4LastImage(image, base64 => {
    lastImage = base64
    handle()
  });
}
export class Page4 extends Page {
  personMakElem: DomAPI;
  fileInput: DomAPI;
  fileInput2: DomAPI;
  updateBtn: DomAPI;
  userImgMove: any;
  userImage: HTMLImageElement;
  userOperteElem: DomAPI;
  fileInputContainer: DomAPI;
  fileInput2Container: DomAPI;
  userImageContainer: DomAPI;
  pictureContainer: DomAPI;
  touchViewElem: DomAPI;
  canvasImgRender: any;
  constructor() {
    super();
  }
  initPageElem(): void {
    this.DOMAPI = DomAPI.CreateByHtmlString(HTML);
    this.pDOMAPI.append(this.DOMAPI.getElemList());

    this.pictureContainer = this.DOMAPI.find('.picture-container');
    this.personMakElem = this.DOMAPI.find('.picture-container .success-mask');
    this.fileInputContainer = this.DOMAPI.find('.select-file-container');
    this.fileInput = this.DOMAPI.find('.select-file');
    this.fileInput2Container = this.DOMAPI.find('.action-again-select');
    this.fileInput2 = this.DOMAPI.find('.action-again-select .select-file');
    this.updateBtn = this.DOMAPI.find('.action-enter-next');
    this.userOperteElem = this.DOMAPI.find('.touch-view');
    this.userImageContainer = this.DOMAPI.find('.user-img-container');
    this.touchViewElem = this.DOMAPI.find('.touch-view');

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if (isAndroid) {
      // this.fileInput.setAttr('capture', 'camera');
      // this.fileInput2.setAttr('capture', 'camera');
    }
  }
  initPageEvent(): void {
    this.updateBtn.on('click', () => {
      this.canvasImgRender = new CanvasImg();
      this.canvasImgRender.setConatinerClip(this.userImgMove.getConatinerClip());
      this.canvasImgRender.pushImgMove(this.userImgMove);
      setLastImage(this.canvasImgRender.render(), () => ajaxSend(() => routes.go('page5')));

    });
    this.fileInput.on('change', e => {
      this.imgSelected(e.target || e.srcElement)
    })
    this.fileInput2.on('change', e => {
      this.imgSelected(e.target || e.srcElement)
    })
  }
  imgSelected(target) {
    this.touchViewElem.show();
    this.fileInputContainer.hide();
    this.updateBtn.removeClass('pointer-events-none');
    this.fileInput2Container.removeClass('pointer-events-none');
    this.getFileImg(target, (img) => {
      this.userImage = img;
      this.userImageContainer.empty();
      this.userImageContainer.append([this.userImage])
      this.userImgMove = new ImgMove(this.userImage, null, this.userOperteElem.getEl(0));

      let containerWidth = this.userImageContainer.getEl(0).clientWidth;
      let containerHeight = this.userImageContainer.getEl(0).clientHeight;
      this.userImgMove.setConatinerClip({
        width: containerWidth,
        height: containerHeight
      });

      let clip;
      if (this.userImage.naturalHeight / this.userImage.naturalWidth < containerHeight / containerWidth) {
        clip = {
          width: this.userImage.clientHeight / this.userImage.naturalHeight * this.userImage.naturalWidth,
          height: containerHeight,
          clientX: 0,
          clientY: 0
        }
        // img.style.cssText = 'height: 100%;width: auto;'
      } else {
        // img.style.cssText = 'width: 100%;height: auto;'
        clip = {
          width: containerWidth,
          height: this.userImage.clientWidth / this.userImage.naturalWidth * this.userImage.naturalHeight,
          clientX: 0,
          clientY: 0
        }
      }
      this.userImgMove.setClip(clip);
    })
  }
  getFileImg(target, hande: (img) => void) {
    if (target && target.files && target.files[0]) {
      ImageRotateFilter(target.files[0], (img) => {
        hande(img);
      });
    }
  }
  setBackground(): void {
    let background = DomAPI.CreateByHtmlString(`
      <img class="bg" src=${assetMap.bgCommon}>
      <img class="bg mask" src=${assetMap.bgPage4}>
    `);
    this.DOMAPI.appendBefore(background.getElemList());
  }
  showbefore() {
    let fileInput: any = this.fileInput.getEl(0);
    try {
      fileInput.value = '';
    }
    catch (e) {
      console.error('init file input fail');
    }
    this.userImageContainer.empty();
    this.updateBtn.addClass('pointer-events-none');
    this.fileInput2Container.addClass('pointer-events-none');
    this.fileInputContainer.show();
    this.touchViewElem.hide();
    this.pictureContainer.addClass(getUserNameAndTeam().teamSelect.toLocaleLowerCase());
    if (getUserNameAndTeam().teamSelect == Barcelona) {
      this.personMakElem.setAttr('src', `${assetMap.leftTeamPersonMask}`);
    } else if (getUserNameAndTeam().teamSelect == RealMadrid) {
      this.personMakElem.setAttr('src', `${assetMap.rightTeamPersonMask}`);
    }
  }
}