package com.example.another_language

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.boot.test.web.client.getForEntity as getForEntity1

@SpringBootTest (webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AnotherLanguageApplicationTests (
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int
){

	@Test
	fun contextLoads() {
	}

//	@Test
//	fun `GETリクエストでOKを返す`(){
//		val response = restTemplate.getForEntity1(url = "http://localhost:$port/player", Array<Players>::class.java)
//		assertThat(response.size, equalTo(0)
//	}




}
