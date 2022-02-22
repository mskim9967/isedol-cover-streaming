package ms.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ms.backend.S3Uploader;
import ms.backend.domain.Member;
import ms.backend.domain.Music;
import ms.backend.domain.MusicDto;
import ms.backend.domain.MusicSearchDto;
import ms.backend.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/music")
public class MusicController {
    private final MusicService musicService;
    private final S3Uploader s3Uploader;

    @Value("${post-key}")
    private String postKey;

    @Autowired
    public MusicController(MusicService musicService, S3Uploader s3Uploader) {
        this.musicService = musicService;
        this.s3Uploader = s3Uploader;
    }

    @GetMapping("/streaming/{key}")
    public ResponseEntity<ResourceRegion> getAudio(@PathVariable("key") String key, @RequestHeader HttpHeaders headers) throws IOException {
        Resource audio = s3Uploader.downloadFile(key);
//        UrlResource audio = new UrlResource("https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3");
        ResourceRegion region = resourceRegion(audio, headers);
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).contentType(MediaType.valueOf("audio/mpeg3")).body(region);
    }

    private ResourceRegion resourceRegion(Resource audio, HttpHeaders headers) throws IOException {
        final long chunkSize = 1000000L;
        long contentLength = audio.contentLength();
        HttpRange httpRange;
        if (headers.getRange().stream().findFirst().isPresent()) {
            httpRange = headers.getRange().stream().findFirst().get();
            long start = httpRange.getRangeStart(contentLength);
            long end = httpRange.getRangeEnd(contentLength);
            long rangeLength = Long.min(chunkSize, end - start + 1);
            return new ResourceRegion(audio, start, rangeLength);
        } else {
            long rangeLength = Long.min(chunkSize, contentLength);
            return new ResourceRegion(audio, 0, rangeLength);
        }
    }

    @PostMapping()
    @ResponseBody
    public ResponseEntity<Object> post(@RequestParam String key, Music music, @RequestParam("audio") MultipartFile multipartFile) {
        String fileName;
        if (!key.equals(postKey))
            return new ResponseEntity<>(new ResponseForm("Unauthorized", "인증 실패", null), HttpStatus.UNAUTHORIZED);
        try {
            fileName = s3Uploader.uploadFiles(multipartFile);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        music.setFileName(fileName);
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
        if (!music.isPresent())
            return new ResponseEntity<>(new ResponseForm("Not Found", "해당 id가 없습니다", null), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(new ResponseForm("OK", "성공", music.get()), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> delete(@PathVariable("id") Long id, @RequestParam String key) {
        if (!key.equals(postKey))
            return new ResponseEntity<>(new ResponseForm("Unauthorized", "인증 실패", null), HttpStatus.UNAUTHORIZED);
        Optional<Music> music = musicService.getById(id);
        if (!music.isPresent())
            return new ResponseEntity<>(new ResponseForm("Not Found", "해당 id가 없습니다", null), HttpStatus.NOT_FOUND);
        musicService.delete(id);
        return new ResponseEntity<>(new ResponseForm("OK", "성공", music), HttpStatus.OK);
    }

    @PutMapping("/search")
    @ResponseBody
    public ResponseEntity<Object> search(@RequestBody MusicSearchDto musicSearchDto) {
        return new ResponseEntity<>(new ResponseForm("OK", "success", musicService.searchMusic(musicSearchDto)), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> patch(Music patchData, @PathVariable("id") Long id, @RequestParam String key) {
        if (!key.equals(postKey))
            return new ResponseEntity<>(new ResponseForm("Unauthorized", "인증 실패", null), HttpStatus.UNAUTHORIZED);
        Optional<Music> music = musicService.getById(id);
        if (!music.isPresent())
            return new ResponseEntity<>(new ResponseForm("Not Found", "해당 id가 없습니다", null), HttpStatus.NOT_FOUND);
        Music updatedMusic = musicService.patch(id, patchData);
        return new ResponseEntity<>(new ResponseForm("OK", "성공", updatedMusic), HttpStatus.OK);
    }
}

