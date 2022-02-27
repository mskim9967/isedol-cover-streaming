package ms.backend;

import ms.backend.repository.MusicRepository;
import ms.backend.repository.PlaylistRepository;
import ms.backend.service.MusicService;
import ms.backend.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;


@Configuration
@EnableScheduling
public class SpringConfig {

    private final MusicRepository musicRepository;
    private final PlaylistRepository playlistRepository;

    @Autowired
    public SpringConfig(MusicRepository musicRepository, PlaylistRepository playlistRepository) {
        this.musicRepository = musicRepository;
        this.playlistRepository = playlistRepository;
    }

    @Bean
    public MusicService musicService() {
        return new MusicService(musicRepository);
    }

    @Bean
    public PlaylistService playlistService() {
        return new PlaylistService(playlistRepository);
    }
}
