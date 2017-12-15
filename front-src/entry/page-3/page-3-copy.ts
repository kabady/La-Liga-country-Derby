import { RealMadrid, Barcelona, getUserNameAndTeam } from '../page-2/page-2';

import './page-3.scss'

import { Page } from "../page";
import { DomAPI } from "../../lib/DomAPI-0.0.4";
import { assetMap } from "../assetUtil";
import { routes } from '../router';

let HTML: string = require('./page-3.html');

let QuestionObj = {};
let RealMadridQuestion: Array<Question> = [{
  title: `你是卡斯蒂亚的一员小将，在国家德比前，你被齐达内从卡斯蒂亚临时提拔到了一线队。<br> 
  这是你在一线队训练的第一天，当你来到巴尔德贝巴斯训练场时，你发现齐达内和大多数球员都已经来了，你会？`,
  answers: [`A. 摸摸齐达内的秃头；`, `B. 和所有人都打声招呼。`],
  rightAnswer: 'B',
  fail: 'xxx训练中调戏主帅，被驱逐出队'
}, {
  title: `齐达内和一线队的球员们对你满意的点点头，随后就开始了今天的训练，在训练中你非常吃力才跟上了他们的节奏。<br>
  现在训练已经结束，大部分球员已经离开，只有C罗还在一旁独自练习着任意球，这时你会？`,
  answers: ['A. 训练这么累，早点回去休息吧', 'B. 和C罗一起训练！'],
  rightAnswer: 'B',
  fail: 'xxx训练态度消极，主教练决定将其下放'
}, {
  title: `你加入了C罗的任意球练习，在你踢出几脚极佳的任意球后，C罗对你非常赞赏，表示要向齐达内推荐你，在国家德比中上场比赛。<br>
  转眼就到了国家德比，你并没有出现在赛前的首发名单中，不过在比赛开始前，齐达内悄悄把你叫到了一边，告诉你一旦情况有变，你是他的第一选择！<br>
  这场国家德比对于皇马而言并不算顺利，梅西早早在伯纳乌打入一球，随后贝尔又受伤离场，齐达内什么也没说，拍拍你的肩膀，就让你上场了。<br>
  上场不久，皇马获得了角球机会，克罗斯主罚的角球被对方解围，皮球冲你飞来，你在禁区弧顶获得了一个绝佳的远射机会，不过这时候皮克也飞铲过来，想要抢在你前面将球解围，这时你会`,
  answers: ['A. 不管那么多，先射了再说；', 'B. 皮克这么大块头，先躲了再说；'],
  rightAnswer: 'B',
  fail: 'xxx为射门奋不顾身，重伤离场直接宣布退役'
}, {
  title: `你看到皮克来势汹汹，马上选择避让，没想到皮球被皮克解围后打在了你的屁股上，随后以一个诡异的弧线穿过巴萨后防和特尔施特根，飞进了球网，你帮助皇马扳平了比分！<br>
  进球后皇马士气大振，开始在巴萨门前围攻，比赛最后时刻，乌姆蒂蒂铲倒C罗，送给皇马一个位置极佳的任意球，看着站在皮球前的C罗，你会：`,
  answers: ['A. C罗就是C罗，我看着他罚球就好了', 'B. 关键时刻看我的，我要罚球！'],
  rightAnswer: 'B',
  fail: 'C罗任意球绝杀，xxx成为背景帝',
  result: '你立刻走上前冲C罗耳语几句，C罗在思考片刻后将主罚权让了出来，你想起了之前在球场上的训练和C罗的夸赞，不禁信心倍增，罚出的任意球又快又刁，冲破了特尔施特根的十指关，绝杀了比赛！'
}]
QuestionObj[RealMadrid] = RealMadridQuestion;

let BarcelonaQuestion: Array<Question> = [{
  title: `作为足坛炙手可热的新星，你在今年夏天来到了巴塞罗那，在梦之队的半个赛季，你发挥尚称良好，但是离出类拔萃还有些距离，和队友的配合也总差那么一点意思。<br>
  马上就要国家德比了，你们正在紧张的训练和备战，在某一天训练结束后，巴尔韦德邀请所有球员去他家吃晚饭，你会选择：`,
  answers: ['A. 教练邀请怎能不去！', 'B. 我和你很熟吗，不去！'],
  rightAnswer: 'A',
  fail: 'xxx没有在国家德比中出场，半赛季后被甩卖到其他球队'
}, {
  title: `当天晚上，你如约来到巴尔韦德家，发现大部分球员已经到了，你和队友们一边烤肉一边聊天，气氛十分融洽。<br>
  饭后，梅西邀请你一起在PS4上玩足球游戏，你选择：`,
  answers: ['A. 球王的邀请怎能不答应！', 'B. 太晚了，还是回去休息吧…'],
  rightAnswer: 'A',
  fail: 'xxx比赛中毫无表现，失去主帅信任',
}, {
  title: `在游戏中，你和梅西一组对抗小白和皮克，你们配合默契，不时在游戏中做出巧妙的配合，最终大比分胜出，旁边的巴尔韦德看着也十分开心。<br>
  到了比赛那天，巴尔韦德安排你打首发，并且悄悄告诉你：就像那天打游戏时一样踢！<br>
  比赛开始后，你和梅西、苏亚雷斯的配合给皇马后防线造成了巨大的压力，在一次进攻中，你获得了一个好机会，不过旁边的梅西也在向你招手，你选择：`,
  answers: ['A. 传给梅西', 'B. 自己来一脚'],
  rightAnswer: 'A',
  fail: 'xxx射门被纳瓦斯奋力扑出，巴萨在国家德比中惨遭失利'
}, {
  title: `纳瓦斯完全没有料到你会传出这样一脚漂亮球，本来已经做好扑救动作的他扑了个空，梅西轻松得手，1-0！你和梅西激动的抱在了一起。<br>
  不过好景不长，下半场刚刚开始，皮克和乌姆蒂蒂防守出现失误，C罗打入扳平比分的进球，在丢球后，两名队友开始互相抱怨起来，这时你会：`,
  answers: ['A. 安慰队友，鼓励他们再进一球', 'B. 抱怨队友的眼神防守。'],
  rightAnswer: 'A',
  fail: '巴萨场上球员互相争吵无心恋战，国家德比草草收场。'
}, {
  title: `在你和其他队友的安慰下，两名球员很快恢复了正常，重新投入到比赛中。<br>
  比赛的最后几分钟，你在边路高速突破后和梅西连续做出踢墙配合，你的最后一传已经为梅西创造了非常好的进球机会，这时你的体力已经频临极限，你选择：`,
  answers: ['A. 再跑一跑，梅西可能会传球！', 'B. 有点累，就看梅西进球吧'],
  rightAnswer: 'A',
  fail: '你浪费了最后的绝杀机会，成为舆论的嘲弄对象。',
  result: `果然，梅西把球又给回了你，你没有在犹豫，使出最后的力气再度攻破了球门！<br>
  成功了，你不仅帮助巴萨赢下了国家德比，还领悟到团队合作以及和队友间关系的重要性，一代球王之路在向你招手！`
}]
QuestionObj[Barcelona] = BarcelonaQuestion;

export class Page3 extends Page {
  questionList: Array<Question>;
  curQuestionIndex: number;
  questionTitle: DomAPI;
  answer_A: DomAPI;
  answer_B: DomAPI;
  prevQuestionBtn: DomAPI;
  successQustionBtn: DomAPI;
  
  constructor() {
    super();
  }
  initPageElem(): void{
    this.DOMAPI = DomAPI.CreateByHtmlString(HTML);
    this.pDOMAPI.append(this.DOMAPI.getElemList());
    
    this.questionTitle = this.DOMAPI.find('.question-title');
    this.answer_A = this.DOMAPI.find('.action-btn').eq(0);
    this.answer_B = this.DOMAPI.find('.action-btn').eq(1);
    this.prevQuestionBtn = this.DOMAPI.find('.action-btn.prev-question');
    this.successQustionBtn = this.DOMAPI.find('.success-question');

  }
  initPageEvent(): void{
    this.successQustionBtn.on('click', () => {
      routes.go('page4');
    })
    this.answer_A.on('click', ev => {
      this.setUserSelect('A');
    })
    this.answer_B.on('click', ev => {
      this.setUserSelect('B');
    })
    this.prevQuestionBtn.on('click', ev => {
      this.prevQuestion();
    })
  }
  setBackground():void{
    let background = DomAPI.CreateByHtmlString(`<img class="bg" src=${assetMap.bgCommon}>`);
    this.DOMAPI.appendBefore(background.getElemList());
  }
  setUserSelect(select: string): void{
    if(select == this.getCurQuestion().rightAnswer){
      this.nextQuestion();
    }else{
      this.failQuestion();
    }
  }
  getCurQuestion(): Question{
    return this.questionList[this.curQuestionIndex];
  }
  /**
   * 用户选择了错误答案
   * 
   * @memberof Page3
   */
  failQuestion(){
    this.questionTitle.text(this.getCurQuestion().fail.replace('xxx', getUserNameAndTeam().userName));
    this.clearBtnState();

    this.answer_B.css({display: 'none'});
    this.answer_A.css({display: 'none'});
    this.prevQuestionBtn.css({display: 'block'});

    this.curQuestionIndex++;
  }
  successQustion(): void{
    this.questionTitle.text(this.getCurQuestion().result.replace('xxx', getUserNameAndTeam().userName));
    this.clearBtnState();

    this.answer_B.css({display: 'none'});
    this.answer_A.css({display: 'none'});
    this.prevQuestionBtn.css({display: 'none'})
    this.successQustionBtn.css({display: 'block'});

    this.curQuestionIndex++;
  }
  clearBtnState(): void{
    this.answer_A.removeClass('default');
    this.answer_B.removeClass('default');
  }
  nextQuestion(): void{
    if(this.curQuestionIndex == undefined){
      this.curQuestionIndex = -1;
    }
    let question = this.questionList[this.curQuestionIndex + 1];
    if(question){
      this.curQuestionIndex++;
      this.showQuestion(question);
    }else{
      this.successQustion();
    }
  }
  prevQuestion(): void{
    if(this.curQuestionIndex < 0){
      this.curQuestionIndex = 0;
    }
    let question = this.questionList[this.curQuestionIndex - 1];

    if(question){
      this.curQuestionIndex--;
      this.showQuestion(question);
    }
  }
  showQuestion(question: Question){
    this.clearBtnState();

    this.questionTitle.html(question.title);

    this.successQustionBtn.css({display: 'none'});
    this.answer_B.css({display: 'block'});
    this.answer_A.css({display: 'block'});
    this.answer_A.text(question.answers[0])
    this.answer_B.text(question.answers[1])
    
    if(question == this.questionList[0]){
      this.prevQuestionBtn.css({display: 'none'})
    }else{
      this.prevQuestionBtn.css({display: 'block'})
    }
    // 设置默认选项
    if(question.answers[0][0] == question.rightAnswer){
      this.answer_A.addClass('default')
    }
    if(question.answers[1][0] == question.rightAnswer){
      this.answer_B.addClass('default')
    }
  }
  setTeamQuestion(questionList: Array<Question>){
    this.questionList = questionList;
  }
  showbefore(): void{
    let teamSelect = getUserNameAndTeam().teamSelect;
    this.setTeamQuestion(QuestionObj[teamSelect]);
    this.nextQuestion()
  }
  showafter(): void{

  }
  hidebefore(): void{

  }
  hideafter(): void{

  }
}

class Question{
  title: string;
  answers: Array<string>;
  rightAnswer: string;
  fail: string;
  result?: string;
}
