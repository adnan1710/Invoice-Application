package com.highradius.model;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Invoice {
	// Properties
	private int slNo;
	private int customerOrderID;
	private int salesOrg;
	private String distributionChannel;
	private int customerNumber;
	private int companyCode;
	private String orderCurrency;
	private double amountInUSD;
	private double orderAmount;
	private Date orderCreationDate;

	// Parameterized Constructor
	public Invoice(int slNo, int customerOrderID, int salesOrg, String distributionChannel, int customerNumber,
			int companyCode, String orderCurrency, double amountInUSD, double orderAmount, Date orderCreationDate) {
		this.slNo = slNo;
		this.customerOrderID = customerOrderID;
		this.salesOrg = salesOrg;
		this.distributionChannel = distributionChannel;
		this.customerNumber = customerNumber;
		this.companyCode = companyCode;
		this.orderCurrency = orderCurrency;
		this.amountInUSD = amountInUSD;
		this.orderAmount = orderAmount;
		this.orderCreationDate = orderCreationDate;
	}

	@Override
	public String toString() {
		return "Invoice [slNo=" + slNo + ", customerOrderID=" + customerOrderID + ", salesOrg=" + salesOrg
				+ ", distributionChannel=" + distributionChannel + ", customerNumber=" + customerNumber
				+ ", companyCode=" + companyCode + ", orderCurrency=" + orderCurrency + ", amountInUSD=" + amountInUSD
				+ ", orderAmount=" + orderAmount + ", orderCreationDate=" + orderCreationDate + "]\n";
	}

	// Getters and Setters
	public int getSlNo() {
		return slNo;
	}

	public void setSlNo(int slNo) {
		this.slNo = slNo;
	}

	public int getCustomerOrderID() {
		return customerOrderID;
	}

	public void setCustomerOrderID(int customerOrderID) {
		this.customerOrderID = customerOrderID;
	}

	public int getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(int salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getDistributionChannel() {
		return distributionChannel;
	}

	public void setDistributionChannel(String distributionChannel) {
		this.distributionChannel = distributionChannel;
	}

	public int getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(int customerNumber) {
		this.customerNumber = customerNumber;
	}

	public int getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(int companyCode) {
		this.companyCode = companyCode;
	}

	public String getOrderCurrency() {
		return orderCurrency;
	}

	public void setOrderCurrency(String orderCurrency) {
		this.orderCurrency = orderCurrency;
	}

	public double getAmountInUSD() {
		return amountInUSD;
	}

	public void setAmountInUSD(double amountInUSD) {
		this.amountInUSD = amountInUSD;
	}

	public String getOrderCreationDate() {
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		return df.format(orderCreationDate);
	}

	public void setOrderCreationDate(Date orderCreationDate) {
		this.orderCreationDate = orderCreationDate;
	}

	public double getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(double orderAmount) {
		this.orderAmount = orderAmount;
	}
}
