package com.crud.service;

import java.util.List;
import java.util.Map;

import com.crud.model.Customer;

public interface CustomerService {

	// adding customer
	public Customer addCustomer(String captcha, Customer customer);

	// getting list of all customer adding customer
	public List<Customer> getCustomer();

	// get customer by id
	public Customer getCustomerById(int id);

	// updating customer
	public Customer updateCustomer(String token, Customer customer, int id);

	// deleting customer
	public Map<String, Boolean> deleteCustomer(Integer id);

}