package com.football.upendra.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class FootballAPIService {

    RestTemplate restTemplate = new RestTemplate();
    String apiFootball = "https://apiv3.apifootball.com/";
    @Value("${spring.application.football.apiKey}")
    String apiKey;

    public ResponseEntity<String> getStandings(String leagueId) {
        //int leagueId = 152;
        String url = apiFootball + "?action=get_standings&league_id=" + leagueId + "&APIkey=" + apiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        System.out.println(response);
        return response;
    }

}
