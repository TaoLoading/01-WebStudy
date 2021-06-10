import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  // 定义数据
  public title = "这是定义的第一个数据"
  public arr: any[] = [1, 2, 3]
  public peopleInfo: any = {
    username: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
