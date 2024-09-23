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
  displayData: FootballData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private fooballService: FootballAPIService
  ) {
    this.footballForm = this.formBuilder.group({
      leagueId: [0],
      countryName: "",
      leagueName: "",
      teamName: ""
    });
  }

  onSubmit() {
    const leagueId = this.footballForm.get("leagueId")?.value;
    if (leagueId > 0) {
      this.getByLeague(leagueId);
    }
  }

  onFilter() {
    const countryName = this.footballForm.get("countryName")?.value;
    const leagueName = this.footballForm.get("leagueName")?.value;
    const teamName = this.footballForm.get("teamName")?.value;
    let fields = [];
    console.log("Filter  " + countryName + "  " + leagueName + "  " + teamName);
    if (countryName.length > 0) {
      fields.push({
        name: "countryName",
        value: countryName
      });
    }
    if (leagueName.length > 0) {
      fields.push({
        name: "leagueName",
        value: leagueName
      });
    }
    if (teamName.length > 0) {
      fields.push({
        name: "teamName",
        value: teamName
      });
    }
    this.filterData(fields);
  }

  getByLeague(leagueId: number) {
    this.fooballService.getFootballByLeague(leagueId).pipe().subscribe((data) => {
      console.log(data);
      // Remove Duplicates from array
      data = data.filter((item: FootballData, index: any, self: FootballData[]) => index == self.findIndex((p) => p.team_id === item.team_id));

      this.footballData = data;
      this.displayData = this.footballData;
    });
  }

  filterData(fields: {name: string, value: string}[]) {
    let tempData: FootballData[] = this.footballData;
    fields.forEach((field) => {
      console.log(field);
      if (field.name === "countryName") {
        tempData = tempData.filter((item) => item.country_name === field.value);
      }
      if (field.name === "leagueName") {
        tempData = tempData.filter((item) => item.league_name === field.value);
      }
      if (field.name === "teamName") {
        tempData = tempData.filter((item) => item.team_name === field.value);
      }
    });
    
    this.displayData = tempData;
  }
}
