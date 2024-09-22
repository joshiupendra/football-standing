import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FootballAPIService } from '../../services/football-api.service';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrl: './football.component.scss'
})
export class FootballComponent {

  leagueId: number = 0;
  footballForm: FormGroup;
  footballData: any;

  constructor(
    private formBuilder: FormBuilder,
    private fooballService: FootballAPIService
  ) {
    this.footballForm = this.formBuilder.group({
      leagueId: [0]
    });
  }

  onSubmit() {
    const leagueId = this.footballForm.get("leagueId")?.value;
    if (leagueId > 0) {
      this.getByLeague(leagueId);
    }
  }

  getByLeague(leagueId: number) {
    this.fooballService.getFootballByLeague(leagueId).pipe().subscribe((data) => {
      console.log(data);
      this.footballData = data;
    });
  }
}
