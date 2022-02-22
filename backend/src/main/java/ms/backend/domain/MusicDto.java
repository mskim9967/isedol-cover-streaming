package ms.backend.domain;

import javax.persistence.Entity;


public class MusicDto extends Music {
    private String key;

    public MusicDto() {
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
