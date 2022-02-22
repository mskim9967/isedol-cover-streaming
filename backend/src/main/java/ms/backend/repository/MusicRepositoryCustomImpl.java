package ms.backend.repository;

import ms.backend.domain.Music;
import ms.backend.domain.MusicSearchDto;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class MusicRepositoryCustomImpl implements MusicRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Music> getMusicByCustom(MusicSearchDto musicSearchDto) {
        String searchStr = "%" + musicSearchDto.getSearchStr() + "%";
        List<String> singers = musicSearchDto.getSingers();
        List<String> nations = musicSearchDto.getNations();
        Boolean isFull = musicSearchDto.getFull();

        System.out.println(searchStr);
        System.out.println(singers);
        System.out.println(nations);
        System.out.println(isFull);

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Music> query = cb.createQuery(Music.class);

        Root<Music> music = query.from(Music.class);
        List<Predicate> totalPds = new ArrayList<>();

        // title, origin singer
        if(musicSearchDto.getSearchStr() != null) {
            Path<String> titleKor = music.get("titleKor");
            Path<String> titleEng = music.get("titleEng");
            Path<String> titleJpn = music.get("titleJpn");
            Path<String> oSingerKor = music.get("oSingerKor");
            Path<String> oSingerEng = music.get("oSingerEng");
            Path<String> oSingerJpn = music.get("oSingerJpn");

            List<Predicate> titlePds = new ArrayList<>();
            titlePds.add(cb.like(cb.upper(titleKor), searchStr.toUpperCase()));
            titlePds.add(cb.like(cb.upper(titleEng), searchStr.toUpperCase()));
            titlePds.add(cb.like(cb.upper(titleJpn), searchStr.toUpperCase()));
            titlePds.add(cb.like(cb.upper(oSingerKor), searchStr.toUpperCase()));
            titlePds.add(cb.like(cb.upper(oSingerEng), searchStr.toUpperCase()));
            titlePds.add(cb.like(cb.upper(oSingerJpn), searchStr.toUpperCase()));
            totalPds.add(cb.or(titlePds.toArray(new Predicate[titlePds.size()])));
        }

        // singer
        if(singers != null) {
            Path<String> dbSinger = music.get("singer");
            List<Predicate> singerPds = new ArrayList<>();
            for (String singer : singers)
                singerPds.add(cb.like(dbSinger, singer));
            totalPds.add(cb.or(singerPds.toArray(new Predicate[singerPds.size()])));
        }
        // nation
        if(nations != null) {
            Path<String> dbNation = music.get("nation");
            List<Predicate> nationPds = new ArrayList<>();
            for (String nation : nations)
                nationPds.add(cb.like(dbNation, nation));
            totalPds.add(cb.or(nationPds.toArray(new Predicate[nationPds.size()])));
        }
        // isFull
        if(isFull != null) totalPds.add(cb.equal(music.get("isFull"), isFull));

        query.select(music)
                .where(cb.and(totalPds.toArray(new Predicate[totalPds.size()])));

        return entityManager.createQuery(query)
                .getResultList();
    }
}
