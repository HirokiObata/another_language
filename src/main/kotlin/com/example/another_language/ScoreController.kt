package com.example.another_language

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@RestController
class ScoreController(@Autowired val scoreRpository: ScoreRpository) {

    @GetMapping("/api/player")
    fun getPlayer (): Array<Players> {
        return scoreRpository.fetchPlayers()
    }

    @GetMapping("/api/golf_course")
    fun getCourse():Array<GolfCourse> {
        return scoreRpository.fetchCourese()
    }

    @GetMapping("/api/score_cardall")
    fun getScore():Array<Score> {
        return scoreRpository.fetchScores()
    }

    @GetMapping("/api/score_card")
    fun getScore2():Array<ScoresPlayerAndCourse> {
        return scoreRpository.fetchScoresAll()
    }

    @GetMapping("/api/score_card/{id}")
    fun getScoreById(@PathVariable("id") id:Long):ResponseEntity<Array<ScoresPlayerAndCourse>> {
        val response = scoreRpository.fetchScoreByIdAll(id)
        if(response.isEmpty()) {
            return  ResponseEntity(HttpStatus.NOT_FOUND)
        }
        return ResponseEntity.ok(response)
    }

    @GetMapping("/api/score_cardall/{id}")
    fun getScoreById2(@PathVariable("id") id:Long):ResponseEntity<Array<Score>> {
        val response = scoreRpository.fetchScoreById(id)
        if(response.isEmpty()) {
            return  ResponseEntity(HttpStatus.NOT_FOUND)
        }
        return ResponseEntity.ok(response)
    }



    @PostMapping("/api/score_card")
    fun saveScore(@RequestBody scoreRequest: ScoreRequest) :Long {
        val res = scoreRpository.postScore(scoreRequest)
        return res
    }

    @DeleteMapping("/api/score_card/{id}")
    fun deleteScore(@PathVariable("id") id:Long) :Int{//:ResponseEntity.HeadersBuilder<*> {

       return scoreRpository.deleteScore(id)
    }



}