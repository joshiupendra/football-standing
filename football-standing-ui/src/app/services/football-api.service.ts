import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballAPIService {

  api = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getFootballByLeague(leagueId: number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/football/league?leagueId=" + leagueId);
  }
}
