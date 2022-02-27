package ms.backend.repository;

import ms.backend.domain.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long>, MusicRepositoryCustom {
}
