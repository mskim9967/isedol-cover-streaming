package ms.backend.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.Date;


@Entity
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titleKor;
    private String titleEng;
    private String titleJpn;
    private String singer;
    private String oSingerKor;
    private String oSingerEng;
    private String oSingerJpn;
    private String nation;
    private String youtubeUrl;
    private Boolean isFull;
    @DateTimeFormat(pattern = "yyMMdd")
    private LocalDate date;
    private String fileName;

    public Music(Long id, String titleKor, String titleEng, String titleJpn, String singer, String oSingerKor, String oSingerEng, String oSingerJpn, String nation, String youtubeUrl, Boolean isFull, LocalDate date, String fileName) {
        this.id = id;
        this.titleKor = titleKor;
        this.titleEng = titleEng;
        this.titleJpn = titleJpn;
        this.singer = singer;
        this.oSingerKor = oSingerKor;
        this.oSingerEng = oSingerEng;
        this.oSingerJpn = oSingerJpn;
        this.nation = nation;
        this.youtubeUrl = youtubeUrl;
        this.isFull = isFull;
        this.date = date;
        this.fileName = fileName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Music() {
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getId() {
        return id;
    }

    public String getTitleKor() {
        return titleKor;
    }

    public void setTitleKor(String titleKor) {
        this.titleKor = titleKor;
    }

    public String getTitleEng() {
        return titleEng;
    }

    public void setTitleEng(String titleEng) {
        this.titleEng = titleEng;
    }

    public String getTitleJpn() {
        return titleJpn;
    }

    public void setTitleJpn(String titleJpn) {
        this.titleJpn = titleJpn;
    }

    public String getSinger() {
        return singer;
    }

    public void setSinger(String singer) {
        this.singer = singer;
    }

    public String getoSingerKor() {
        return oSingerKor;
    }

    public void setoSingerKor(String oSingerKor) {
        this.oSingerKor = oSingerKor;
    }

    public String getoSingerEng() {
        return oSingerEng;
    }

    public void setoSingerEng(String oSingerEng) {
        this.oSingerEng = oSingerEng;
    }

    public String getoSingerJpn() {
        return oSingerJpn;
    }

    public void setoSingerJpn(String oSingerJpn) {
        this.oSingerJpn = oSingerJpn;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }

    public Boolean getFull() {
        return isFull;
    }

    public void setFull(Boolean full) {
        isFull = full;
    }
}
