package com.crud.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@Getter
public class AppConfig {
	
	@Value("${secret}")
	private String secret;
	
	@Value("${uri}")
	private String uri;
	
}
