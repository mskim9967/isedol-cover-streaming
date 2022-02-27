package ms.backend.repository;

import ms.backend.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Playlist findByKey(String key);

    @Query("select a from Playlist a where a.date < :date")
    List<Playlist> findAllWithDateBefore(@Param("date") LocalDate date);
}
