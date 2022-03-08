package ms.backend.controller;

import ms.backend.domain.Playlist;
import ms.backend.service.OpenApiService;
import ms.backend.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/openApi")
public class OpenApiController {
    private final OpenApiService openApiService;

    @Autowired
    public OpenApiController(OpenApiService openApiService) {
        this.openApiService = openApiService;
    }

    @GetMapping("/youtube")
    @ResponseBody
    public ResponseEntity<Object> getYoutube() {
        return new ResponseEntity<>(new ResponseForm("OK", "성공", openApiService.getYoutube()), HttpStatus.OK);
    }

    @GetMapping("/twitch/{idol}")
    @ResponseBody
    public ResponseEntity<Object> getTwitch(@PathVariable("idol") String idol) {
        return new ResponseEntity<>(new ResponseForm("OK", "성공", openApiService.getTwitch(idol)), HttpStatus.OK);
    }
}

