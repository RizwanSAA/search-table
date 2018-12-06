import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject, combineLatest } from 'rxjs';

import { DataService } from '../data-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // this variable will capture data from backend
  asyncData$ = new BehaviorSubject<any[]>([]) 

  // this variable will be source for table
  tableDataSource$ = new BehaviorSubject<any[]>([])

  // this variable will be source for column-names of the table
  displayedColumns$ = new BehaviorSubject<string[]>([
    'id',
    'name',
    'email',
    'website',
    'address'
  ])

  // this variable will capture the search keyword
  searchFormControl = new FormControl()

  // this variable will capture the column-names as key
  sortKey$ = new BehaviorSubject<string>('name')

  // this variable will be source for sort direction
  sortDirection$ = new BehaviorSubject<string>('asc')

  constructor(private dataService: DataService) { }

  ngOnInit() {

    // this is where all the action takes place
    combineLatest(this.asyncData$, this.searchFormControl.valueChanges, this.sortKey$, this.sortDirection$).subscribe(([asyncData, searchTerm, sortKey, sortDirection]) => {
      const asyncDataArray = Object.values(asyncData)
      let filteredAsyncData: any[]

      if(!searchTerm) {
        filteredAsyncData = asyncDataArray
      } else {
        const filteredResults =  asyncDataArray.filter(data => {
          return Object.values(data).reduce((prev, curr) => {
            return prev || curr.toString().toLowerCase().includes(searchTerm.toLowerCase())
          }, false)
        })
        filteredAsyncData = filteredResults
        
      }

      const sortAsyncData = filteredAsyncData.sort((a, b) => {
        if(a[sortKey] > b[sortKey]) {
          return sortDirection === 'asc' ? 1 : -1
        }

        if(a[sortKey] < b[sortKey]) {
          return sortDirection === 'asc' ? -1 : 1
        }

        return 0
      })


      this.tableDataSource$.next(sortAsyncData)
    })

    this.searchFormControl.setValue('')
    
  }

  // this function will fetch data from backend. it is binded to click event in the template
  // getData() {
  //   setTimeout(() => {
  //     this.asyncData$.next(this.dataService.pushData())
  //   }, 2000)    
  // }

  getData() {
    this.dataService.getDatafromURL().subscribe(res => {
      console.log(res)
      this.asyncData$.next(res)
    }, error => console.log(error))
  }

  // this function get the keys(column-names) for sorting.
  adjustSort(key: string) {
    if(this.sortKey$.value === key) {
      if(this.sortDirection$.value === 'asc') {
        this.sortDirection$.next('desc')
      } else {
        this.sortDirection$.next('asc')
      }
      return
    }

    this.sortKey$.next(key)
    this.sortDirection$.next('asc')
  }

}
