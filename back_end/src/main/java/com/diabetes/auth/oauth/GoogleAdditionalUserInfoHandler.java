package com.diabetes.auth.oauth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GoogleAdditionalUserInfoHandler {

    // 'resourceName': '/people/me',
    // 'personFields': 'ageRanges, genders' birthdays
    private final String GOOGLE_PEOPLE_URL = "https://people.googleapis.com/v1/people/me"; //
    private final RestOperations restOperations = new RestTemplate();

    public Map<String, List<Map>> getAdditionalUserInfo(String accessToken) {

        HttpMethod httpMethod = HttpMethod.GET;
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("personFields", "genders");
        queryParams.add("personFields", "birthdays");

        String uri = GOOGLE_PEOPLE_URL + "?personFields=genders,birthdays";
//                UriComponentsBuilder.fromUriString(GOOGLE_PEOPLE_URL)
//                .queryParams(queryParams)
//                .build()
//                .encode()
//                .toUri();

        RequestEntity<HttpHeaders> requestEntity = new RequestEntity<>(headers, httpMethod, URI.create(uri));
        ResponseEntity<HashMap> responseEntity = restOperations.exchange(requestEntity, HashMap.class);

        return responseEntity.getBody();
    }
}
