package com.example.another_language

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity

import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus



@SpringBootTest (webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AnotherLanguageApplicationTests (
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int
){

	@Test
	fun contextLoads() {
		assertThat(1+2 , equalTo(3))
	}

	@Test
	fun `GETリクエストPlayer取得18ninn`(){
		val response = restTemplate.getForEntity("http://localhost:$port/api/player", Array<Players>::class.java)
		val player = response.body!!
		assertThat(player.size, equalTo(18))

	}


	@Test
	fun `GETリクエストscore取得`(){
		val response = restTemplate.getForEntity("http://localhost:$port/api/score_card", Array<ScoresPlayerAndCourse>::class.java)
		val player = response.body!!
		assertThat(player[0].id, equalTo(28))

	}




}
