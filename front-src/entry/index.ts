import '../style/style.scss';


import { Page1 } from "./page-1/page-1";
import { RemInit } from '../lib/Rem';
import { routes } from './router';
import { Page2 } from './page-2/page-2';
import { Page3 } from './page-3/page-3';

function initApp(){
  RemInit();
  routes.set('page1', new Page1());
  routes.set('page2', new Page2());
  routes.set('page3', new Page3());
  

  routes.router('page1', () => {
    routes.get('page1').show();
  });
  routes.router('page2', () => {
    routes.get('page1').hide();
    routes.get('page2').show();
  });
  routes.router('page3', () => {
    routes.get('page2').hide();
    routes.get('page3').show();
  });
}

initApp();

routes.go('page1');