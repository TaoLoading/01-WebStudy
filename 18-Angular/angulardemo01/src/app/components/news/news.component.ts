import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public infoData: string = '我是一条数据'
  public infoProp: string = '我是一条属性'
  public infoHtml: string = '<div>我是一条html数据<div>'
  public infoArr: string[] = ['第一', '第二', '第三']
  public flagIf: boolean = true
  public flagSwitch: boolean = true
  public nowTime: any = new Date()
  public keyWords: string = '这是默认值'
  constructor() { }

  ngOnInit(): void {
  }
  clickFun() {
    alert(this.infoData)
  }
  keyDownFun(e: any) {
    console.log(e)
  }
}
