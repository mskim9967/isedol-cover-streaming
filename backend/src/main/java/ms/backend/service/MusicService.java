package ms.backend.service;

import ms.backend.domain.Music;
import ms.backend.domain.MusicSearchDto;
import ms.backend.repository.MusicRepository;
import org.springframework.data.domain.Sort;

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
        return musicRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    /**
     * get by id
     * @param id
     * @return music
     */
    public Optional<Music> getById(Long id) {
        return musicRepository.findById(id);
    }

    /**git
     * delete by id
     * @param id
     */
    public void delete(Long id) {
        musicRepository.deleteById(id);
    }


    public List<Music> searchMusic(MusicSearchDto musicSearchDto) {
        return musicRepository.getMusicByCustom(musicSearchDto);
    }

    public Music patch(Long id, Music fetchData) {
        Music music = musicRepository.findById(id).get();
        if(fetchData.getTitleKor() != null) music.setTitleKor(fetchData.getTitleKor());
        if(fetchData.getTitleEng() != null) music.setTitleEng(fetchData.getTitleEng());
        if(fetchData.getTitleJpn() != null) music.setTitleJpn(fetchData.getTitleJpn());
        if(fetchData.getSinger() != null) music.setSinger(fetchData.getSinger());
        if(fetchData.getoSingerEng() != null) music.setoSingerEng(fetchData.getoSingerEng());
        if(fetchData.getoSingerJpn() != null) music.setoSingerJpn(fetchData.getoSingerJpn());
        if(fetchData.getoSingerKor() != null) music.setoSingerKor(fetchData.getoSingerKor());
        if(fetchData.getNation() != null) music.setNation(fetchData.getNation());
        if(fetchData.getYoutubeUrl() != null) music.setYoutubeUrl(fetchData.getYoutubeUrl());
        if(fetchData.getFull() != null) music.setFull(fetchData.getFull());
        if(fetchData.getFileName() != null) music.setFileName(fetchData.getFileName());
        if(fetchData.getDate() != null) music.setDate(fetchData.getDate());

        musicRepository.save(music);
        return music;
    }

}
