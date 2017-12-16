import { AjaxPost } from '../js-lib/build/AjaxPost-0.0.1.js'
import { getLastImage } from './page-4/page-4';
import { getUserNameAndTeam, RealMadrid, Barcelona } from './page-2/page-2';

export function ajaxSend(handle: () => void) {
  let data = {
    team: 'errorTeam',
    pic: getLastImage()
  };
  if(getUserNameAndTeam().teamSelect == RealMadrid){
    data = {
      team: 'realmadrid',
      pic: getLastImage()
    }
  }else if(getUserNameAndTeam().teamSelect == Barcelona){
    data = {
      team: 'fcbarcelona',
      pic: getLastImage()
    }
  }
  
  // AjaxPost({
  //   url: 'http://mns.hupu.com/ELClasico',
  //   type: 'post',
  //   data: data,
  //   dataType: 'json',
  //   success: function () {

  //   },
  //   error: function () {

  //   },
  //   complete: function () {

  //   }
  // })
  handle();
}