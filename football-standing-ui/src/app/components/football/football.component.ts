import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FootballAPIService } from '../../services/football-api.service';
import { FootballData } from '../../models/footballData';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrl: './football.component.scss'
})
export class FootballComponent {

  leagueId: number = 0;
  footballForm: FormGroup;
  footballData: FootballData[] = [];

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
      // Remove Duplicates from array
      data = data.filter((item: FootballData, index: any, self: FootballData[]) => index == self.findIndex((p) => p.team_id === item.team_id));

      this.footballData = data;
    });
  }
}
