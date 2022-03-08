package ms.backend.service;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

//@Service
@Transactional
public class OpenApiService {
    private HashMap<String, String> youtubeId = new HashMap<>(), twitchId = new HashMap<>();

    @Value("${twitch.id}")
    private String twitchClientId;
    @Value("${twitch.token}")
    private String twitchToken;
    @Value("${youtube.key}")
    private String youtubeKey;

    private RestTemplate template = new RestTemplate();
    private HashMap<String, Object> youtubeRes = new HashMap<>(), twitchRes = new HashMap<>();
    private UriComponentsBuilder youtubeUri, twitchUri;
    private HttpHeaders headers = new HttpHeaders();


    Map<String, String> youtubeParams = new HashMap<>();

    public OpenApiService() {
        youtubeId.put("ine", "UCroM00J2ahCN6k-0-oAiDxg");
        youtubeId.put("jingburger", "UCHE7GBQVtdh-c1m3tjFdevQ");
        youtubeId.put("lilpa", "UC-oCJP9t47v7-DmsnmXV38Q");
        youtubeId.put("jururu", "UCTifMx1ONpElK5x6B4ng8eg");
        youtubeId.put("gosegu", "UCV9WL7sW6_KjanYkUUaIDfQ");
        youtubeId.put("viichan", "UCs6EwgxKLY9GG4QNUrP5hoQ");

        twitchId.put("ine", "vo_ine");
        twitchId.put("jingburger", "jingburger");
        twitchId.put("lilpa", "lilpaaaaaa");
        twitchId.put("jururu", "cotton__123");
        twitchId.put("gosegu", "gosegugosegu");
        twitchId.put("viichan", "viichan6");

        youtubeUri = UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/youtube/v3/activities")
                .queryParam("part", "contentDetails")
                .queryParam("maxResults", "10")
                .queryParam("order", "date");

        twitchUri = UriComponentsBuilder.fromHttpUrl("https://api.twitch.tv/helix/streams");
    }

    @Scheduled(cron = "0 0/5 * * * *")
    public void updateYoutube() {
        try {
            for (String idol : youtubeId.keySet()) {
                String uri = youtubeUri.cloneBuilder().queryParam("key", youtubeKey).queryParam("channelId", youtubeId.get(idol)).toUriString();
                ResponseEntity<Object> res = template.exchange(uri, HttpMethod.GET, new HttpEntity<>(new HttpHeaders()), Object.class);
                youtubeRes.put(idol, res.getBody());
            }
        } catch (HttpStatusCodeException e) {
            System.out.println(e);
        }
    }

    public Object getYoutube() {
        if (youtubeRes.size() == 0)
            updateYoutube();
        return youtubeRes;
    }

    public Object getTwitch(String idol) {
        try {
            headers.set("Authorization", "Bearer " + twitchToken);
            headers.set("Client-id", twitchClientId);
            String uri = twitchUri.cloneBuilder().queryParam("user_login", twitchId.get(idol)).toUriString();
            ResponseEntity<Object> res = template.exchange(uri, HttpMethod.GET, new HttpEntity<>(headers), Object.class);
            return res.getBody();
        } catch (HttpStatusCodeException e) {
            System.out.println(e);
        }
        return null;
    }

}
