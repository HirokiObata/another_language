package com.example.another_language

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class PlayerRowMapper : RowMapper<Players> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Players {
        return  Players(rs.getLong(1),rs.getString(2))
    }
}

@Component
class  CourseRowMapper : RowMapper<GolfCourse> {
    override fun mapRow(rs: ResultSet, rowNum: Int): GolfCourse {
        return  GolfCourse(rs.getLong(1),rs.getString(2),rs.getLong(3))
    }
}
@Component
class ScoreRowMapper : RowMapper<Score> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Score{
        return Score(
            id = rs.getLong("id"),
            hole1 = rs.getLong("hole_1"),
            hole2 = rs.getLong("hole_2"),
            hole3 = rs.getLong("hole_3"),
            hole4 = rs.getLong("hole_4"),
            hole5 = rs.getLong("hole_5"),
            hole6 = rs.getLong("hole_6"),
            hole7 = rs.getLong("hole_7"),
            hole8 = rs.getLong("hole_8"),
            hole9 = rs.getLong("hole_9"),
            hole10 = rs.getLong("hole_10"),
            hole11 = rs.getLong("hole_11"),
            hole12 = rs.getLong("hole_12"),
            hole13 = rs.getLong("hole_13"),
            hole14 = rs.getLong("hole_14"),
            hole15 = rs.getLong("hole_15"),
            hole16 = rs.getLong("hole_16"),
            hole17 = rs.getLong("hole_17"),
            hole18 = rs.getLong("hole_18"),
            date = rs.getDate("date"),
            playerid = rs.getLong("player_id"),
            courseid = rs.getLong("course_id"),
            cardno = rs.getLong("card_no")

        )
    }
}

@Component
class ScoreRowMapperJoin : RowMapper<ScoresPlayerAndCourse> {
    override fun mapRow(rs: ResultSet, rowNum: Int): ScoresPlayerAndCourse {
        return ScoresPlayerAndCourse(
            id = rs.getLong("id"),
            hole1 = rs.getLong("hole_1"),
            hole2 = rs.getLong("hole_2"),
            hole3 = rs.getLong("hole_3"),
            hole4 = rs.getLong("hole_4"),
            hole5 = rs.getLong("hole_5"),
            hole6 = rs.getLong("hole_6"),
            hole7 = rs.getLong("hole_7"),
            hole8 = rs.getLong("hole_8"),
            hole9 = rs.getLong("hole_9"),
            hole10 = rs.getLong("hole_10"),
            hole11 = rs.getLong("hole_11"),
            hole12 = rs.getLong("hole_12"),
            hole13 = rs.getLong("hole_13"),
            hole14 = rs.getLong("hole_14"),
            hole15 = rs.getLong("hole_15"),
            hole16 = rs.getLong("hole_16"),
            hole17 = rs.getLong("hole_17"),
            hole18 = rs.getLong("hole_18"),
            date = rs.getDate("date"),
            cardno = rs.getLong("card_no"),
            player = rs.getString(22),
            course = rs.getString(23),
            playerid = rs.getLong("player_id"),
            courseid = rs.getLong("course_id"),


        )
    }
}





@Repository
class ScoreRpository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val playerRowMapper: PlayerRowMapper,
    @Autowired val courseRowMapper: CourseRowMapper,
    @Autowired val scoreRowMapper: ScoreRowMapper,
    @Autowired val scoreRowMapperJoin: ScoreRowMapperJoin
) {

    fun fetchPlayers():Array<Players> {
        val players = jdbcTemplate.query("SELECT id,name FROM player",playerRowMapper)
        return players.toTypedArray()
    }

    fun fetchCourese() : Array<GolfCourse> {
        val courses = jdbcTemplate.query(
            "SELECT * FROM golf_course",
            courseRowMapper
        )
        return  courses.toTypedArray()
    }

    fun fetchScores() :Array<Score> {
        val score = jdbcTemplate.query("SELECT * FROM score_card ORDER BY id DESC",scoreRowMapper)
        return score.toTypedArray()
    }

    fun fetchScoresAll() : Array<ScoresPlayerAndCourse> {
        val scores = jdbcTemplate.query("SELECT score_card.id , hole_1 , hole_2 , hole_3 , hole_4 , hole_5 , hole_6 , hole_7 , hole_8 , hole_9 , hole_10 , hole_11 , hole_12 , hole_13 , hole_14 , hole_15 , hole_16 , hole_17 , hole_18 ,date, card_no,player.name, golf_course.course_name ,player_id ,course_id  from score_card   left outer join player on score_card.player_id = player.id left outer join golf_course on score_card.course_id = golf_course.id ORDER BY id DESC",
            scoreRowMapperJoin)
        return scores.toTypedArray()
    }

    fun fetchScoreById(id:Long):Array<Score> {
        val score = jdbcTemplate.query("SELECT * FROM score_card WHERE player_id = $id ORDER BY id DESC",scoreRowMapper)
        return  score.toTypedArray()
    }


    fun fetchScoreByIdAll(id:Long):Array<ScoresPlayerAndCourse> {
        val score = jdbcTemplate.query("SELECT score_card.id , hole_1 , hole_2 , hole_3 , hole_4 , hole_5 , hole_6 , hole_7 , hole_8 , hole_9 , hole_10 , hole_11 , hole_12 , hole_13 , hole_14 , hole_15 , hole_16 , hole_17 , hole_18 ,date, card_no,player.name, golf_course.course_name ,player_id ,course_id  from score_card   left outer join player on score_card.player_id = player.id left outer join golf_course on score_card.course_id = golf_course.id WHERE player_id = $id ORDER BY id DESC",
            scoreRowMapperJoin)
        return  score.toTypedArray()
    }





    fun postScore(scoreRequest: ScoreRequest) :Long {
        jdbcTemplate.update("INSERT INTO score_card (course_id,date,hole_1,hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9, hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, player_id,card_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            scoreRequest.courseid,
            scoreRequest.date,
            scoreRequest.hole1,
            scoreRequest.hole2,
            scoreRequest.hole3,
            scoreRequest.hole4,
            scoreRequest.hole5,
            scoreRequest.hole6,
            scoreRequest.hole7,
            scoreRequest.hole8,
            scoreRequest.hole9,
            scoreRequest.hole10,
            scoreRequest.hole11,
            scoreRequest.hole12,
            scoreRequest.hole13,
            scoreRequest.hole14,
            scoreRequest.hole15,
            scoreRequest.hole16,
            scoreRequest.hole17,
            scoreRequest.hole18,
            scoreRequest.playerid,
            scoreRequest.cardno

            )

//        val result = jdbcTemplate.query("SELECT id FROM score_card ORDER BY id DESC LIMIT 1",scoreRowMapper)
        val result = jdbcTemplate.query("SELECT * FROM score_card ORDER BY id DESC LIMIT 1",scoreRowMapper)
        return  result[0].id
    }

    fun deleteScore(id:Long) :Int{
        val res = jdbcTemplate.update("DELETE FROM score_card WHERE id = ?",id)
        return res
    }

}




