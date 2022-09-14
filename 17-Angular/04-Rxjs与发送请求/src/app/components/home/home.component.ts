import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service'
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public request: RequestService) { }

  ngOnInit(): void {

    // 1.接收数据
    var rxjsData = this.request.getRxjsData()
    var d = rxjsData.subscribe((data) => {
      console.log(data)
    })

    // 2.一秒后取消订阅
    /* setTimeout(() => {
      d.unsubscribe()
    }, 1000); */

    // 3.多次执行
    /* var rxjsIntervalData = this.request.getRxjsIntervalData()
    rxjsIntervalData.subscribe((dataInterval) => {
      console.log(dataInterval)
    }) */

    // 4.使用工具函数对返回的数据进行处理
    /* var rxjshandleData = this.request.getRxjsIntervalNum()
    rxjshandleData.pipe(
      filter((value) => {
        if (value % 2 == 0) {
          return true
        }
      })
    ).subscribe((dataHandle) => {
      console.log(dataHandle)
    }) */
  }
}
