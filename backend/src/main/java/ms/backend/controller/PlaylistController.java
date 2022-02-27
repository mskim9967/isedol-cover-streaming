package ms.backend.controller;

import ms.backend.S3Uploader;
import ms.backend.domain.Music;
import ms.backend.domain.MusicSearchDto;
import ms.backend.domain.Playlist;
import ms.backend.service.MusicService;
import ms.backend.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/playlist")
public class PlaylistController {
    private final PlaylistService playlistService;

    @Autowired
    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping()
    @ResponseBody
    public ResponseEntity<Object> post(@RequestBody Playlist playlist) {
        UUID uuid = UUID.randomUUID();
        String key = uuid.toString().substring(0, 8).toUpperCase();
        playlist.setKey(key);
        playlist.setDate(LocalDate.now());
        playlistService.post(playlist);

        return new ResponseEntity<>(new ResponseForm("OK", "success", playlist), HttpStatus.OK);
    }

    @GetMapping("/{key}")
    @ResponseBody
    public ResponseEntity<Object> getByKey(@PathVariable("key") String key) {
        Playlist playlist = playlistService.getByKey(key);
        if (playlist == null)
            return new ResponseEntity<>(new ResponseForm("Not Found", "key가 유효하지 않습니다", null), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(new ResponseForm("OK", "성공", playlist), HttpStatus.OK);
    }
}

