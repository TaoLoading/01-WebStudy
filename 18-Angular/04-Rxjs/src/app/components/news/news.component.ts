import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public list: any[] = []
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  getData() {
    let api = "http://a.itying.com/api/productlist"
    this.http.get(api).subscribe((res: any) => {
      console.log(res)
      this.list = res.result
    })
  }
}
