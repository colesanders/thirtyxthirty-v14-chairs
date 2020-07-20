import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChairsFacade } from '@thirty/core-state'
import { Chair } from '@thirty/api-interfaces';

import { Animations } from './chairs.animations';
import { SnackBarService } from '@thirty/core-data';

@Component({
  selector: 'thirty-chairs',
  templateUrl: './chairs.component.html',
  styleUrls: ['./chairs.component.scss'],
  animations: Animations,
})
export class ChairsComponent implements OnInit {
  chairs$: Observable<Chair[]> = this.chairFacade.allChairs$;
  chair$: Observable<Chair> = this.chairFacade.selectedChair$;
  detailOpen = false;

  constructor(
    private chairFacade: ChairsFacade,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.chairFacade.loadChairs();
    this.chairFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Chair ' + trigger[1] + 'd';
    this.focusoutDetail();
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.chairFacade.resetSelectedChair();
    this.chairFacade.loadChairs();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(chair: Chair): void{
    this.chairFacade.selectChair(chair.id);
    this.focusDetail();
  }

  delete(chair: Chair): void{
    this.chairFacade.deleteChair(chair);
  }

  save(chair: Chair): void{
    if(chair.id !== null){
      this.chairFacade.updateChair(chair);
    }else {
      this.chairFacade.createChair(chair);
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.chairFacade.resetSelectedChair();
  }

}
