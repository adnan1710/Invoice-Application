package com.highradius.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.highradius.implementation.InvoiceDao;
import com.highradius.implementation.InvoiceDaoImpl;
import com.highradius.model.Invoice;

/**
 * Servlet implementation class AddServlet
 */
@WebServlet("/addservlet")
public class AddServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public AddServlet() {
		super();
	}

	protected void doOptions(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
		response.addHeader("Access-Control-Allow-Headers",
				"X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Max-Age", "1728000");

		response.getWriter().append("Served at: ").append(request.getContextPath());
//		doPost(request, response);
	}

//	protected void doPost(HttpServletRequest request, HttpServletResponse response)
//			throws ServletException, IOException {
//		
//		response.setContentType("application/json");
//		response.setCharacterEncoding("UTF-8");
//		response.addHeader("Access-Control-Allow-Origin", "*");
//	    response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
//	    response.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
//	    response.addHeader("Access-Control-Max-Age","1728000");
//
//		// Retrieving values from the front end and assigning them to variables
//		int slNo = -1;
//		int customerOrderID = Integer.parseInt(request.getParameter("customerOrderID"));
//		int salesOrg = Integer.parseInt(request.getParameter("salesOrg"));
//		String distributionChannel = request.getParameter("distributionChannel");
//		int customerNumber = Integer.parseInt(request.getParameter("customerNumber"));
//		int companyCode = Integer.parseInt(request.getParameter("companyCode"));
//		String orderCurrency = request.getParameter("orderCurrency");
//		double amountInUSD = Double.parseDouble(request.getParameter("amountInUSD"));
//		double orderAmount = Double.parseDouble(request.getParameter("orderAmount"));
//		String orderCreationDateStr = request.getParameter("orderCreationDate");
//
//		// Parse orderCreationDate string to Date object
//		Date orderCreationDate = null;
//		try {
//			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
//			orderCreationDate = dateFormat.parse(orderCreationDateStr);
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//
//		// Call addInvoice function
//		addInvoice(slNo, customerOrderID, salesOrg, distributionChannel, customerNumber, companyCode, orderCurrency,
//				amountInUSD, orderAmount, orderCreationDate);
//		
//		response.getWriter().append("Row Added!");
//	}
//
//	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
		response.addHeader("Access-Control-Allow-Headers",
				"X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Max-Age", "1728000");

		// Read the JSON data from the request body
		BufferedReader reader = request.getReader();
		StringBuilder jsonBody = new StringBuilder();
		String line;
		while ((line = reader.readLine()) != null) {
			jsonBody.append(line);
		}
		reader.close();

		// Use Gson to parse the JSON data into a Map
		Gson gson = new Gson();
		Type mapType = new TypeToken<Map<String, String>>() {
		}.getType();
		Map<String, String> data = gson.fromJson(jsonBody.toString(), mapType);
		
		int slNo = -1;
		// Retrieve the values from the Map
		int customerOrderID = Integer.parseInt(data.get("customerOrderID"));
		int salesOrg = Integer.parseInt(data.get("salesOrg"));
		String distributionChannel = data.get("distributionChannel");
		int customerNumber = Integer.parseInt(data.get("customerNumber"));
		int companyCode = Integer.parseInt(data.get("companyCode"));
		String orderCurrency = data.get("orderCurrency");
		double amountInUSD = Double.parseDouble(data.get("amountInUSD"));
		double orderAmount = amountInUSD;
		String orderCreationDateStr = data.get("orderCreationDate");

		// Convert the orderCreationDate string to Date using the format "dd-MM-yyyy"
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		Date orderCreationDate = null;
		try {
			orderCreationDate = dateFormat.parse(orderCreationDateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		// Call addInvoice function
		addInvoice(slNo, customerOrderID, salesOrg, distributionChannel, customerNumber, companyCode, orderCurrency,
				amountInUSD, orderAmount, orderCreationDate);

		response.getWriter().append("Row Added!");
	}

	// Method addInvoice with void return type to Add Invoice data using InvoiceDao
		protected static void addInvoice(int slNo, int customerOrderID, int salesOrg, String distributionChannel,
				int customerNumber, int companyCode, String orderCurrency, double amountInUSD, double orderAmount,
				Date orderCreationDate) {
	
			// Create a new object of Invoice and initialize with the specified values
			final Invoice newInvoice = new Invoice(slNo, customerOrderID, salesOrg, distributionChannel, customerNumber,
					companyCode, orderCurrency, amountInUSD, orderAmount, orderCreationDate);
	
			// Create an instance of InvoiceDao
			InvoiceDao invoiceDao = new InvoiceDaoImpl();
	
			// insertInvoice method from InvoiceDao
			invoiceDao.insertInvoice(newInvoice);
	
		}


}
