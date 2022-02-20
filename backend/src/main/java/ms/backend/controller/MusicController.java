package ms.backend.controller;

import ms.backend.domain.Member;
import ms.backend.domain.Music;
import ms.backend.domain.MusicDto;
import ms.backend.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/music")
public class MusicController {
    private final MusicService musicService;

    @Value("${post-key}")
    private String postKey;

    @Autowired
    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @PostMapping()
    @ResponseBody
    public ResponseEntity<Object> post(MusicDto musicDto) {
        if (!musicDto.getKey().equals(postKey))
            return new ResponseEntity<>(new ResponseForm("Unauthorized", "인증 실패", musicService.getAll()), HttpStatus.UNAUTHORIZED);
        Music music = musicDto;
        musicService.post(music);
        return new ResponseEntity<>(new ResponseForm("OK", "success", music), HttpStatus.OK);
    }

    @GetMapping()
    @ResponseBody
    public ResponseEntity<Object> getAll() {
        return new ResponseEntity<>(new ResponseForm("OK", "success", musicService.getAll()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
        Optional<Music> music = musicService.getById(id);
        if(!music.isPresent())
            return new ResponseEntity<>(new ResponseForm("Not Found", "해당 id가 없습니다",null), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(new ResponseForm("OK", "성공",music.get()), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> delete(@PathVariable("id") Long id) {
        Optional<Music> music = musicService.getById(id);
        if(!music.isPresent())
            return new ResponseEntity<>(new ResponseForm("Not Found", "해당 id가 없습니다",null), HttpStatus.NOT_FOUND);
        musicService.delete(id);
        return new ResponseEntity<>(new ResponseForm("OK", "성공", music), HttpStatus.OK);
    }
}

