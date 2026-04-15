package com.example.demo.service;

import com.example.demo.dto.CreateIssueRequest;
import com.example.demo.entity.Issue;
import com.example.demo.repository.IssueRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Issue getIssueById(Long id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Issue not found"));
    }

    public Issue createIssue(CreateIssueRequest request, String createdBy) {
        Issue issue = new Issue();
        issue.setTitle(request.getTitle());
        issue.setDescription(request.getDescription());
        issue.setLongitude(request.getLongitude());
        issue.setLatitude(request.getLatitude());
        issue.setAddress(request.getAddress());
        issue.setDeadline(request.getDeadline());
        issue.setRecruitCount(request.getRecruitCount());
        issue.setSkillRequirement(request.getSkillRequirement());
        issue.setCreatedBy(createdBy);
        return issueRepository.save(issue);
    }
}
