package ms.backend.domain;

import javax.persistence.Entity;
import java.util.List;
import java.util.Set;

public class MusicSearchDto{
    private String searchStr;
    private List<String> singers, nations;
    private Boolean isFull;

    public String getSearchStr() {
        return searchStr;
    }

    public void setSearchStr(String searchStr) {
        this.searchStr = searchStr;
    }

    public List<String> getSingers() {
        return singers;
    }

    public void setSingers(List<String> singers) {
        this.singers = singers;
    }

    public List<String> getNations() {
        return nations;
    }

    public void setNations(List<String> nations) {
        this.nations = nations;
    }

    public Boolean getFull() {
        return isFull;
    }

    public void setFull(Boolean full) {
        isFull = full;
    }
}
