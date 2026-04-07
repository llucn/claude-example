package com.example.demo.service;

import com.example.demo.dto.CreateIssueRequest;
import com.example.demo.entity.Issue;
import com.example.demo.repository.IssueRepository;
import org.springframework.stereotype.Service;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
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
