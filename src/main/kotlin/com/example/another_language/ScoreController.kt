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

    @GetMapping("/player")
    fun getPlayer (): Array<Players> {
        return scoreRpository.fetchPlayers()
    }

    @GetMapping("/golf_course")
    fun getCourse():Array<GolfCourse> {
        return scoreRpository.fetchCourese()
    }

    @GetMapping("/score_card")
    fun getScore():Array<Score> {
        println("#############################################get################################")
        return scoreRpository.fetchScores()
    }

    @GetMapping("/score_card/{id}")
    fun getScoreById(@PathVariable("id") id:Long):ResponseEntity<Array<Score>> {
        val response = scoreRpository.fetchScoreById(id)
        if(response.isEmpty()) {
            return  ResponseEntity(HttpStatus.NOT_FOUND)
        }
        return ResponseEntity.ok(response)
    }

    @PostMapping("/score_card")
    fun saveScore(@RequestBody scoreRequest: ScoreRequest) :Long {
        println("----------------------------------------post------------------------------------")
        val res = scoreRpository.postScore(scoreRequest)
        return res
    }

    @DeleteMapping("/score_card/{id}")
    fun deleteScore(@PathVariable("id") id:Long):ResponseEntity.HeadersBuilder<*> {
        val res = scoreRpository.deleteScore(id)
        if (res == 0) {
            return  ResponseEntity.notFound()
        }
        println("==================delete id:$id ================================")
        return ResponseEntity.ok()
    }



}