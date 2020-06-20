package hackathon.controller;

import hackathon.model.BorrowRequest;
import hackathon.model.EmailReq;
import hackathon.model.LendRequest;
import hackathon.model.NotificationRequest;
import hackathon.model.TestData;
import hackathon.model.ToggleRequest;
import hackathon.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchAutoConfiguration;
import org.springframework.boot.autoconfigure.elasticsearch.rest.RestClientAutoConfiguration;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@CrossOrigin
@RestController
@RequestMapping("rsl") // http://localhost:8080/users
@EnableAutoConfiguration(exclude={ElasticsearchAutoConfiguration.class, RestClientAutoConfiguration.class})
public class UserController {

    Map<String, TestData> users;

    @Autowired
    UserService userService;


    @GetMapping
    public String getUsers(@RequestParam(value="page", defaultValue = "1") int page, @RequestParam(value="limit",defaultValue = "100") int limit){
        return "OK";
    }


    @PostMapping(path = "/lend/retrieve",consumes = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public String retrieveLendRequests(@Valid @RequestBody EmailReq email) throws IOException {
        System.out.println("resived" + email.getEmail());
       return  userService.retrieveLendRequest(email.getEmail());
    }

    @PostMapping(path = "/lend/create",consumes = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public String lendRequest(@Valid @RequestBody LendRequest lendRequest) throws IOException {
        userService.createLendRequest(lendRequest);
        return "{}";
    }

    @PostMapping(path = "/lend/toggle",consumes = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public String toggleRequest(@Valid @RequestBody ToggleRequest toggleRequest) throws IOException, ExecutionException, InterruptedException {
        userService.toggleRequest(toggleRequest.getPostId(),toggleRequest.getStatus());
        return "{}";
    }

    @PostMapping(path = "/borrow/retrieve",consumes = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public String retriveBorrowRequest(@Valid @RequestBody BorrowRequest borrowRequest) throws IOException, ExecutionException, InterruptedException {
        return userService.retrieveBorrowRequest(borrowRequest.getLattitude(),borrowRequest.getLongitude(),borrowRequest.getDistance());
    }

    @PostMapping(path = "/borrow/interested",consumes = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public String notifRequest(@Valid @RequestBody NotificationRequest notifRequest) throws IOException, ExecutionException, InterruptedException {
        userService.sendNotification(notifRequest.getBorrowersEmail(),notifRequest.getLendersEmail(),notifRequest.getPostId());
        return "{}";
    }
}