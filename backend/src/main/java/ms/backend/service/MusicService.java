package ms.backend.service;

import ms.backend.domain.Member;
import ms.backend.domain.Music;
import ms.backend.repository.MusicRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

//@Service
@Transactional
public class MusicService {
    private final MusicRepository musicRepository;

    public MusicService(MusicRepository musicRepository) {
        this.musicRepository = musicRepository;
    }

    /**
     * post music
     * @param music
     * @return id
     */
    public Music post(Music music) {
        musicRepository.save(music);
        return music;
    }

    /**
     * get all music
     * @return music list
     */
    public List<Music> getAll() {
        return musicRepository.findAll();
    }

    /**
     * get by id
     * @param id
     * @return music
     */
    public Optional<Music> getById(Long id) {
        return musicRepository.findById(id);
    }

    /**
     * delete by id
     * @param id
     */
    public void delete(Long id) {
        musicRepository.deleteById(id);
    }
}
