package ms.backend.service;

import ms.backend.domain.Music;
import ms.backend.domain.MusicSearchDto;
import ms.backend.domain.Playlist;
import ms.backend.repository.MusicRepository;
import ms.backend.repository.PlaylistRepository;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

//@Service
@Transactional
public class PlaylistService {
    private final PlaylistRepository playlistRepository;

    public PlaylistService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public Playlist post(Playlist playlist) {
        playlistRepository.save(playlist);
        return playlist;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void deleteEveryday() {
        List<Playlist> playlists = playlistRepository.findAllWithDateBefore(LocalDate.now().minusDays(1));
        playlists.forEach(playlist -> playlistRepository.deleteById(playlist.getId()));
    }


    public Optional<Playlist> getById(Long id) {
        return playlistRepository.findById(id);
    }

    public void delete(Long id) {
        playlistRepository.deleteById(id);
    }

    public Playlist getByKey(String key) {
        return playlistRepository.findByKey(key);
    }
}
