package com.crud.system;

import lombok.Data;

@Data
public class RecaptchaResponse {

	private boolean success;
	private String hostname;

}
