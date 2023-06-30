package com.highradius.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.Type;
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

/**
 * Servlet implementation class DeleteServlet
 */
@WebServlet("/deleteservlet")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DeleteServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doOptions(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, DELETE");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, DELETE");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");

		// Retrieving values from the front end and assigning them to variables
//		int slNo = Integer.parseInt(request.getParameter("slNo"));
//
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

		// Parse the JSON data
		int slNo = Integer.parseInt(data.get("slNo"));
		System.out.println(slNo);

		// Call addInvoice function
		deleteInvoice(slNo);

		response.getWriter().append("Row Deleted");
	}

	// Method addInvoice with void return type to Add Invoice data using InvoiceDao
	protected static void deleteInvoice(int slNo) {

		// Create an instance of InvoiceDao
		InvoiceDao invoiceDao = new InvoiceDaoImpl();

		// insertInvoice method from InvoiceDao
		invoiceDao.deleteInvoice(slNo);

	}

}
