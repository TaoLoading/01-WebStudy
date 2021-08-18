import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  getRxjsData() {
    return new Observable((observer) => {
      setTimeout(() => {
        var data = '这是一条用于测试异步的数据'
        // 成功的回调
        observer.next(data)
      }, 2000);
    })
  }

  getRxjsIntervalData() {
    return new Observable((observer) => {
      setInterval(() => {
        var dataInterval = '这是一条用于测试异步的数据(多次执行)'
        // 成功的回调
        observer.next(dataInterval)
      }, 2000);
    })
  }

  getRxjsIntervalNum() {
    var count = 0
    return new Observable((observer) => {
      setInterval(() => {
        count++
        observer.next(count)
      }, 2000)
    })
  }
}
