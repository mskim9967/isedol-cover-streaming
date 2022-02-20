package ms.backend;

import ms.backend.repository.JpaMemberRepository;
import ms.backend.repository.MemberRepository;
import ms.backend.repository.MemoryMemberRepository;
import ms.backend.repository.MusicRepository;
import ms.backend.service.MemberService;
import ms.backend.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;
    private final MusicRepository musicRepository;

    @Autowired
    public SpringConfig(MemberRepository memberRepository, MusicRepository musicRepository) {
        this.memberRepository = memberRepository;
        this.musicRepository = musicRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }

    @Bean
    public MusicService musicService() {
        return new MusicService(musicRepository);
    }
}
