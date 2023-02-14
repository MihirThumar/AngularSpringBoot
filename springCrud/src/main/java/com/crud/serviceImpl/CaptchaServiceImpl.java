package com.crud.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.crud.config.AppConfig;
import com.crud.service.CaptchaService;
import com.crud.system.RecaptchaResponse;

@Service
public class CaptchaServiceImpl implements CaptchaService {

	@Autowired
	private AppConfig apiConfig;

	@Override
	public boolean verify(String tokenResponse) {

		RestTemplate restTemplate = new RestTemplate();

		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("secret", apiConfig.getSecret());
		formData.add("response", tokenResponse);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, null);

		RecaptchaResponse apiResponse = restTemplate.postForObject(apiConfig.getUri(), request,
				RecaptchaResponse.class);

		return apiResponse != null && Boolean.TRUE.equals(apiResponse.isSuccess());
	}

}
