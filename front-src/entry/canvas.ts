import { getUserNameAndTeam, RealMadrid, Barcelona } from "./page-2/page-2";
import { assetMap } from "./assetUtil";

export function page4LastImage(imgbasesrc, handle: (base64) => void) {
  let imageList = [];
  let a = document.createElement('img');
  a.src = imgbasesrc;
  imageList.push(a);

  let bg = document.createElement('img');
  imageList.push(bg);
  if (getUserNameAndTeam().teamSelect == RealMadrid) {
    bg.src = `${assetMap.ReTeamPersonMask}`;
  } else if (getUserNameAndTeam().teamSelect == Barcelona) {
    bg.src = `${assetMap.BaTeamPersonMask}`;
  }

  let canvas = document.createElement('canvas');
  canvas.width = 544;
  canvas.height = 306;

  let ctx = canvas.getContext("2d");

  a.onload = bg.onload = function () {
    imageList.pop();
    if(imageList.length == 0){
      if (getUserNameAndTeam().teamSelect == RealMadrid) {
        ctx.drawImage(a, 0, 0, a.naturalWidth, a.naturalHeight, 216, 55, 66, 92);
      } else if (getUserNameAndTeam().teamSelect == Barcelona) {
        ctx.drawImage(a, 0, 0, a.naturalWidth, a.naturalHeight, 293, 28, 56, 76);
      }
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      handle(canvas.toDataURL('image/jpeg'))
    }
    
  }
  return imgbasesrc;
}