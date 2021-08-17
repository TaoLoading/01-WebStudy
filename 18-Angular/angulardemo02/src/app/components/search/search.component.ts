import { Component, OnInit, ViewChild } from '@angular/core';
// 引入服务
import { StorageService } from '../../services/storage.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keyWords: string = ''
  public historyList: any[] = []
  constructor(public storage: StorageService) {
    let s = this.storage.get()
    console.log(s)
  }

  // 获取DOM
  @ViewChild('myBtn') btn: any

  ngOnInit(): void {
    // 此阶段组件和指令的初始化完成，并不是真正的DOM加载完成
  }
  ngAfterViewInit(): void {
    // 视图/DOM加载完成后触发的方法，可操作DOM

    this.btn.nativeElement.style = "color:red"
  }

  doSearch() {
    if (this.historyList.indexOf(this.keyWords) == -1) {
      this.historyList.push(this.keyWords)
    }
    this.keyWords = ''
  }
  delete(key: number) {
    this.historyList.splice(key, 1)
  }
}
