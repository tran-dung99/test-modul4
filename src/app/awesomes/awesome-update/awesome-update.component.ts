import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AwesomeService} from "../../../service/awesome.service";
import {Awesome} from "../../../model/awesome";

@Component({
  selector: 'app-awesome-update',
  templateUrl: './awesome-update.component.html',
  styleUrls: ['./awesome-update.component.css']
})
export class AwesomeUpdateComponent implements OnInit {
  updateForm: FormGroup | any
  id: any
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private awesomeService: AwesomeService, private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get("id")
      this.getById(this.id)
    })
  }

  ngOnInit(): void {

  }

  getById(id: any) {
    this.awesomeService.getById(id).subscribe(res => {
      console.log(res)
      this.updateForm = this.fb.group({
        tag: res.tag,
        url: res.url,
        descriptions: res.descriptions
      })
    })
  }

  update(id: any){

    let awesome = this.updateForm.value
    this.awesomeService.update(id, awesome).subscribe(() => {
      this.router.navigate([''])
    })

  }

}
