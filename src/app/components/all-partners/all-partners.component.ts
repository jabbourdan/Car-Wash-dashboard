import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partners } from 'src/app/models/partners';


@Component({
  selector: 'app-all-partners',
  imports: [],
  templateUrl: './all-partners.component.html',
  styleUrl: './all-partners.component.scss'
})
export class AllPartnersComponent {
  partnersList: Array<Partners> = [];

  constructor(

    private router:Router

) { }

ngOnInit(){
}
}
