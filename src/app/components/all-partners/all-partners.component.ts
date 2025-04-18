import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partners } from 'src/app/models/partners';
import { CommonModule } from '@angular/common';
import { PartnerService } from 'src/app/services/partner.service';


@Component({
  selector: 'app-all-partners',
  imports: [CommonModule],
  templateUrl: './all-partners.component.html',
  styleUrl: './all-partners.component.scss'
})
export class AllPartnersComponent {
  partnersList: Array<Partners> = [];

  constructor(
    private partnerService:PartnerService,

    private router:Router

) { }

ngOnInit(){
  this.getAllPartners();
}

getAllPartners(){
  this.partnerService.getAllPartners().subscribe((data)=>{
    console.log(data )
  })
}
}
