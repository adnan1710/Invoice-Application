package com.highradius.implementation;

import com.highradius.model.Invoice;
import java.util.List;

public interface InvoiceDao {
	// Method to return list of invoices
	List<Invoice> getInvoice();

	// Method to insert invoice
	void insertInvoice(Invoice invoice);

	// Method to update invoice
	void updateInvoice(int id, Invoice invoice);

	// Method to delete invoice
	void deleteInvoice(int id);
}
