import '../js-lib/build/reset-1.0.0.css'
import '../style/style.scss';

import { RemInit } from '../lib/Rem';
import { routes } from './router';

import { Page1 } from "./page-1/page-1";
import { Page2 } from './page-2/page-2';
import { Page3 } from './page-3/page-3';
import { Page4 } from './page-4/page-4';
import { Page5 } from './page-5/page-5';

function initApp(){
  RemInit();
  routes.set('page1', new Page1());
  routes.set('page2', new Page2());
  routes.set('page3', new Page3());
  routes.set('page4', new Page4());
  routes.set('page5', new Page5());
  

  routes.router('page1', () => {
    closePage();
    routes.get('page1').show();
  });
  routes.router('page2', () => {
    closePage();
    routes.get('page2').show();
  });
  routes.router('page3', () => {
    closePage();
    routes.get('page3').show();
  });
  routes.router('page4', () => {
    closePage();
    routes.get('page4').show();
  });
  routes.router('page5', () => {
    closePage();
    routes.get('page5').show();
  });
}
function closePage(){
  routes.pages.forEach( page => {
    page.page.hide();
  })
}

initApp();

routes.go('page1');