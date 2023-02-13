package com.crud.serviceImpl;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.crud.service.CaptchaService;
import com.crud.system.RecaptchaResponse;

@Service
public class CaptchaServiceImpl implements CaptchaService {

	@Override
	public boolean verify(String tokenResponse) {

		RestTemplate restTemplate = new RestTemplate();

		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("secret", "6LdkVWYkAAAAADwlSCPBi7XfECkt2poSdcG-hNu0");
		formData.add("response", tokenResponse);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, null);

		RecaptchaResponse apiResponse = restTemplate.postForObject("https://www.google.com/recaptcha/api/siteverify",
				request, RecaptchaResponse.class);

		return apiResponse != null && Boolean.TRUE.equals(apiResponse.isSuccess());
	}

}
