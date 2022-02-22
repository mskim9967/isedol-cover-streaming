package ms.backend.repository;

import ms.backend.domain.Music;
import ms.backend.domain.MusicSearchDto;

import java.util.List;
import java.util.Set;

public interface MusicRepositoryCustom {
    List<Music> getMusicByCustom(MusicSearchDto musicSearchDto);
}

