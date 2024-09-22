package com.football.upendra.controller;

import com.football.upendra.service.FootballAPIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/football")
@RequiredArgsConstructor
public class FootballAPIController {

    private final FootballAPIService footballAPIService;

    @GetMapping("/league")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> getStandingsByLeague(@RequestParam String leagueId) {
        return footballAPIService.getStandings(leagueId);
    }
}
