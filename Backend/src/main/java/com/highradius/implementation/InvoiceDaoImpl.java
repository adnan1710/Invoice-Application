package com.highradius.implementation;

import com.highradius.model.Invoice;
import com.highradius.connection.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class InvoiceDaoImpl implements InvoiceDao {

	// Initializing Properties
	private Connection connection = null;
	private Statement queryStatement = null;
	private PreparedStatement prepStatement = null;
	private ResultSet rs = null;

	// Constructor to establish connection whenever an object is created
	public InvoiceDaoImpl() {

		// Establishing Connection
		connection = DatabaseConnection.Connect();
	}

	@Override
	// Method to call DatabaseConnection addInvoice method
	public void insertInvoice(Invoice invoice) {

		// Creating Statement
		try {

			String query = "INSERT INTO h2h_oap (CUSTOMER_ORDER_ID, SALES_ORG, DISTRIBUTION_CHANNEL, CUSTOMER_NUMBER, COMPANY_CODE, ORDER_CURRENCY, AMOUNT_IN_USD, ORDER_AMOUNT, ORDER_CREATION_DATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

			prepStatement = connection.prepareStatement(query);

			prepStatement.setInt(1, invoice.getCustomerOrderID());
			prepStatement.setInt(2, invoice.getSalesOrg());
			prepStatement.setString(3, invoice.getDistributionChannel());
			prepStatement.setInt(4, invoice.getCustomerNumber());
			prepStatement.setInt(5, invoice.getCompanyCode());
			prepStatement.setString(6, invoice.getOrderCurrency());
			prepStatement.setDouble(7, invoice.getAmountInUSD());
			prepStatement.setDouble(8, invoice.getOrderAmount());
			prepStatement.setString(9, invoice.getOrderCreationDate());

			// Execute the INSERT statement
			prepStatement.executeUpdate();

			// Clearing Invoices list
			DatabaseConnection.clearInvoices();

			// Refreshing the list of invoices
			getInvoice();

			System.out.println("Row added successfully!"); // Displaying row was added
		} catch (Exception e) {

			e.printStackTrace();
		} finally {
			closeResources();
		}
	}

	@Override
	// Method to call DatabaseConnection getInvoices method
	public List<Invoice> getInvoice() {

		if (DatabaseConnection.getInvoices().isEmpty()) {
			try {

				// Creating Statement
				queryStatement = connection.createStatement();

				// Executing Query
				rs = queryStatement.executeQuery("SELECT * FROM h2h_oap");
				int count = 0; // To count the total no of rows added
				boolean flag = true;

				// Iterating through rows of the table
				while (rs.next()) {
					String creationdate = rs.getString(9);
					DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
					Date orderCreationDate = df.parse(creationdate);
					if (flag) {
						System.out.println(orderCreationDate);
					}

					// Creating an Invoice class object with data from table
					Invoice inv = new Invoice(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getString(4), rs.getInt(17),
							rs.getInt(8), rs.getString(15), rs.getInt(18), rs.getInt(13), orderCreationDate);

					// Adding the Invoice object 'inv' to the list of invoices
					if (flag) {
						System.out.println(inv.getOrderCreationDate());
					}
					DatabaseConnection.addInvoice(inv);

					// Incrementing the value of count each time
					count++;
					flag = false;
				}
				System.out.println(count + " rows loaded successfully!"); // Displaying how many total rows were added
			} catch (Exception e) {

				e.printStackTrace();
			} finally {
				closeResources();
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

		}

		return DatabaseConnection.getInvoices();
	}

	// Method to update invoice
	@Override
	public void updateInvoice(int id, Invoice invoice) {

		// Creating Statement
		try {

			String query = "UPDATE h2h_oap SET customer_order_id = ?, sales_org = ?, distribution_channel = ?, customer_number = ?, company_code = ?, order_currency = ?, amount_in_usd = ?, order_amount = ?, order_creation_date = ? WHERE sl_no = ?";

			prepStatement = connection.prepareStatement(query);

			prepStatement.setInt(1, invoice.getCustomerOrderID());
			prepStatement.setInt(2, invoice.getSalesOrg());
			prepStatement.setString(3, invoice.getDistributionChannel());
			prepStatement.setInt(4, invoice.getCustomerNumber());
			prepStatement.setInt(5, invoice.getCompanyCode());
			prepStatement.setString(6, invoice.getOrderCurrency());
			prepStatement.setDouble(7, invoice.getAmountInUSD());
			prepStatement.setDouble(8, invoice.getOrderAmount());
			prepStatement.setString(9, invoice.getOrderCreationDate());
			prepStatement.setInt(10, id);

			// Execute the INSERT statement
			prepStatement.executeUpdate();

			System.out.println("Row modified successfully!"); // Displaying row was modified

			// Clearing Invoices list
			DatabaseConnection.clearInvoices();

			// Refreshing the list of invoices
			getInvoice();
		} catch (Exception e) {

			e.printStackTrace();
		} finally {
			closeResources();
		}
	}

	// Method to delete invoice
	@Override
	public void deleteInvoice(int id) {

		// Creating Statement
		try {

			String query = "DELETE FROM h2h_oap WHERE sl_no=?;";

			prepStatement = connection.prepareStatement(query);

			prepStatement.setInt(1, id);

			// Execute the DELETE statement
			prepStatement.executeUpdate();
			
			System.out.println(id);

			System.out.println("Row deleted successfully!"); // Displaying row was deleted

			// Clearing Invoices list
			DatabaseConnection.clearInvoices();

			// Refreshing the list of invoices
			getInvoice();
		} catch (Exception e) {

			e.printStackTrace();
		} finally {
			closeResources();
		}
	}

	// Method to close all the database resources
	private void closeResources() {
		try {
			if (rs != null) {
				rs.close();
			}
			if (prepStatement != null) {
				prepStatement.close();
			}
			if (queryStatement != null) {
				queryStatement.close();
			}
			if (connection != null) {
				connection.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
