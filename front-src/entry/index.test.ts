import './app';
import { DomAPI } from '../lib/DomAPI-0.0.4';
import { routes } from './router';

let a: any = new DomAPI('.page-2 .input-container input').getEl(0);
a.value = '李杨无敌英雄';

a = new DomAPI('.page-2 .right-select img').getEl(0);
// a = new DomAPI('.page-2 .left-select img').getEl(0);
a.click();

routes.go('page4')