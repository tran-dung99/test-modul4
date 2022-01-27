import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AwesomeService} from "../../../service/awesome.service";
import {Awesome} from "../../../model/awesome";


@Component({
  selector: 'app-awesome-create',
  templateUrl: './awesome-create.component.html',
  styleUrls: ['./awesome-create.component.css']
})
export class AwesomeCreateComponent implements OnInit {
  createForm: FormGroup | any;
  awesome : Awesome[] = [];

  constructor(private fb: FormBuilder, private router: Router, private awesomeService: AwesomeService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      tag: [''],
      url: [''],
      descriptions: ['']
    })
  }
  create() {
    let data: any = this.createForm?.value
    let awesomeData: any = {
      tag: data.tag,
      url: data.url,
      descriptions: data.descriptions
    }
    this.awesomeService.create(awesomeData).subscribe(res => {
      this.awesome.push(res)
      this.router.navigate([""])
    })
  }

}
