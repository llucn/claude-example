package com.example.demo.controller;

import com.example.demo.dto.CreateIssueRequest;
import com.example.demo.entity.Issue;
import com.example.demo.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public List<Issue> listIssues() {
        return issueService.getAllIssues();
    }

    @GetMapping("/{id}")
    public Issue getIssue(@PathVariable Long id) {
        return issueService.getIssueById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Issue createIssue(
            @Valid @RequestBody CreateIssueRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String createdBy = jwt.getClaimAsString("preferred_username");
        if (createdBy == null || createdBy.isBlank()) {
            createdBy = jwt.getSubject();
        }
        return issueService.createIssue(request, createdBy);
    }
}
