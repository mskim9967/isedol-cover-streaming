package ms.backend.controller;

import ms.backend.domain.Music;
import ms.backend.domain.MusicDto;
import ms.backend.repository.MemoryMemberRepository;
import ms.backend.repository.MusicRepository;
import ms.backend.service.MemberService;
import ms.backend.service.MusicService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
class MusicControllerTest {

    @Autowired MusicController musicController;
    @Autowired MusicService musicService;
    @Autowired MusicRepository musicRepository;

    private MusicDto new1, new2;
    private Music music1, music2;

    @Value("${post-key}")
    private String postKey;


    @BeforeEach
    public void beforeEach() {
        new1 = new MusicDto();
        new1.setKey(postKey);
        new1.setTitleKor("제목1한글");
        new1.setTitleEng("제목1영어");
        new1.setSinger("viichan");
        music1 = musicService.post(new1);

        new2 = new MusicDto();
        new2.setKey(postKey);
        new2.setTitleKor("제목2한글");
        new2.setTitleEng("제목2영어");
        new2.setSinger("jururu");
        music2 = musicService.post(new2);
    }


    @Test
    void post() {
        assertThat(musicRepository.count()).isEqualTo(2);
    }

    @Test
    void getAll() {
        assertThat(musicService.getAll().size()).isEqualTo(2);
    }

    @Test
    void getById() {
        assertThat(musicService.getById(music1.getId()).get()).isEqualTo(music1);
        assertThat(musicService.getById(music2.getId()).get()).isEqualTo(music2);
    }

    @Test
    void delete() {
        musicService.delete(music1.getId());
        assertThat(musicService.getAll().size()).isEqualTo(1);
    }
}