package com.highradius.connection;

import com.highradius.model.Invoice;
import java.util.ArrayList;
import java.util.List;
import java.sql.*;

public class DatabaseConnection {
	// List of Invoices
	private static List<Invoice> invoices = new ArrayList<>();

	// Initializing Properties
	private static Connection connection = null;

	// Database details
	private static final String DBUrl = "jdbc:mysql://localhost:3306/h2h?characterEncoding=utf8";
	private static final String UserId = "root";
	private static final String Pwd = "Adnan@1517";

	// Constructor
	public static Connection Connect() {

		// Connecting to Database
		try {
			// Registering the driver class
			Class.forName("com.mysql.cj.jdbc.Driver");

			// Establishing the connection
			connection = DriverManager.getConnection(DBUrl, UserId, Pwd);

			if (connection != null) {
				System.out.println("Connection to the Database established!");
			}

			return connection;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// Method to return list of invoices
	public static List<Invoice> getInvoices() {
		return invoices;
	}

	// Method to add Invoice to the list
	public static void addInvoice(Invoice invoice) {
		invoices.add(invoice);
	}
	
	// Method to clear the Invoices list
	public static void clearInvoices() {
		invoices.clear();
	}
	
	// Method to check if list is empty

}
