package ms.backend.controller;

public class MusicForm {
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
