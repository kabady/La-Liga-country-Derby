import { AjaxPost } from '../js-lib/build/AjaxPost-0.0.1.js'
import { getLastImage } from './page-4/page-4';
import { getUserNameAndTeam, RealMadrid, Barcelona } from './page-2/page-2';



export function ajaxSend(handle: () => void) {
  let form = document.createElement('form');
  form.enctype = 'multipart/form-data';
  let data = new FormData(form);
  data.append('pic', getLastImage())
  if(getUserNameAndTeam().teamSelect == RealMadrid){
    data.append('team', 'realmadrid')
  }else if(getUserNameAndTeam().teamSelect == Barcelona){
    data.append('team', 'fcbarcelona')
  }
  
  AjaxPost({
    url: '//mns.hupu.com/ELClasico/ajax',
    type: 'post',
    data: data,
    dataType: 'json',
    success: function (jsondata) {
      if(jsondata.code == 0){
        handle();
        try{
          let _window: any = window;
          _window.ajax_callback = _window.ajax_callback || {};
          if(getUserNameAndTeam().teamSelect == RealMadrid){
            _window.ajax_callback.send_complete_ok && _window.ajax_callback.send_complete_ok('realmadrid');
          }else if(getUserNameAndTeam().teamSelect == Barcelona){
            _window.ajax_callback.send_complete_ok && _window.ajax_callback.send_complete_ok('fcbarcelona');
          }
        }catch(e){
          console.log('send_complete_ok error run')
        }
      }
    },
    error: function () {

    },
    complete: function () {

    }
  })
}
