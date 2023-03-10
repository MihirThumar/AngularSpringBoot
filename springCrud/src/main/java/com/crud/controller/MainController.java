package com.crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crud.model.Customer;
import com.crud.model.RecaptchaToken;
import com.crud.service.CustomerService;

@RestController
@CrossOrigin(origins = "*")
public class MainController {

	String errorMessage = "Something wrong in sending request, try sometime later";

	@Autowired
	private CustomerService customerService;

	String token;

	@PostMapping("/recptcha")
	public void getRecaptchaToken(@RequestBody RecaptchaToken recaptchaToken) {
		try {
			token = recaptchaToken.getRecaptchaToken();
		} catch (Exception e) {
			new ResponseEntity<Object>(e.getMessage(), new HttpHeaders(), 404);
		}
	}

	@PostMapping("/add-customer")
	public Object registerCustomer(@RequestBody Customer customer) {
		try {
			return customerService.addCustomer(token, customer);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(), new HttpHeaders(), 404);
		}
	}

	@GetMapping("/view-customer")
	public Object getAllCustomer() {
		try {
			return customerService.getCustomer();
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(), new HttpHeaders(), 404);
		}
	}

	@GetMapping("/view-customer/{id}")
	public Object getCustomerById(@PathVariable int id) {
		try {
			return customerService.getCustomerById(id);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(), new HttpHeaders(), 404);
		}
	}

	@PutMapping("/update-customer/{id}")
	public Object editCustomer(@RequestBody Customer customer, @PathVariable int id) {
		try {
			return customerService.updateCustomer(token, customer, id);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(), new HttpHeaders(), 404);
		}
	}

	@DeleteMapping("/delete-customer/{id}")
	public Object deleteCustomer(@PathVariable int id) {
		try {
			return customerService.deleteCustomer(id);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(), new HttpHeaders(), 404);
		}
	}

}