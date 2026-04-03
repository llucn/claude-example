// package com.example.demo;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
// import org.springframework.test.web.servlet.MockMvc;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// @SpringBootTest
// @AutoConfigureMockMvc
// class SecurityConfigTests {

//     @Autowired
//     private MockMvc mockMvc;

//     @Test
//     void healthEndpoint_withoutToken_shouldReturn200() throws Exception {
//         mockMvc.perform(get("/api/health"))
//             .andExpect(status().isOk())
//             .andExpect(jsonPath("$.status").value("ok"));
//     }

//     @Test
//     void protectedEndpoint_withoutToken_shouldReturn401() throws Exception {
//         mockMvc.perform(get("/api/protected"))
//             .andExpect(status().isUnauthorized());
//     }

//     @Test
//     void protectedEndpoint_withValidJwt_shouldReturn200() throws Exception {
//         mockMvc.perform(get("/api/health")
//                 .with(SecurityMockMvcRequestPostProcessors.jwt()))
//             .andExpect(status().isOk());
//     }

//     @Test
//     void meEndpoint_withJwt_shouldReturnUserInfo() throws Exception {
//         mockMvc.perform(get("/api/me")
//                 .with(SecurityMockMvcRequestPostProcessors.jwt()
//                     .jwt(jwt -> jwt
//                         .subject("user-123")
//                         .claim("preferred_username", "testuser")
//                         .claim("email", "test@example.com"))))
//             .andExpect(status().isOk())
//             .andExpect(jsonPath("$.sub").value("user-123"))
//             .andExpect(jsonPath("$.preferred_username").value("testuser"))
//             .andExpect(jsonPath("$.email").value("test@example.com"));
//     }

//     @Test
//     void meEndpoint_withoutToken_shouldReturn401() throws Exception {
//         mockMvc.perform(get("/api/me"))
//             .andExpect(status().isUnauthorized());
//     }
// }
