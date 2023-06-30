import React, { useState } from 'react';
import axios from 'axios';
import './../../styles/addData.css';
import { Button } from '@material-ui/core';

export default function AddData() {
    const [formData, setFormData] = useState({
        customerOrderID: '',
        salesOrg: '',
        distributionChannel: '',
        companyCode: '',
        orderCreationDate: '',
        orderCurrency: '',
        customerNumber: '',
        amountInUSD: '',
        orderAmount: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear any previous error for the field
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate customerOrderID
        if (formData.customerOrderID.trim() === '') {
            newErrors.customerOrderID = 'Customer Order ID is required';
            isValid = false;
        }

        // Validate salesOrg
        if (formData.salesOrg.trim() === '') {
            newErrors.salesOrg = 'Sales Org is required';
            isValid = false;
        }

        // Validate distributionChannel
        if (formData.distributionChannel.trim() === '') {
            newErrors.distributionChannel = 'Distribution Channel is required';
            isValid = false;
        }

        // Validate customerNumber
        if (formData.customerNumber.trim() === '') {
            newErrors.customerNumber = 'Customer Number is required';
            isValid = false;
        }

        // Validate companyCode
        if (formData.companyCode.trim() === '') {
            newErrors.companyCode = 'Company Code is required';
            isValid = false;
        }

        // Validate orderCurrency
        if (formData.orderCurrency.trim() === '') {
            newErrors.orderCurrency = 'Order Currency is required';
            isValid = false;
        }

        // Validate amountInUSD
        if (formData.amountInUSD.trim() === '') {
            newErrors.amountInUSD = 'Amount in USD is required';
            isValid = false;
        }

        // Validate orderCreationDate
        if (formData.orderCreationDate.trim() === '') {
            newErrors.orderCreationDate = 'Order Creation Date is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log(JSON.stringify(formData));
            // Valid form, proceed with submitting the data
            axios
                .post('http://localhost:8080/Invoice-Application/addservlet', formData)
                .then((response) => {
                    console.log(response.data); // Handle successful response
                })
                .catch((error) => {
                    console.error(error); // Handle error response
                });

            // fetch('http://localhost:8080/Invoice-Application/addservlet', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            //     .then((response) => {
            //         if (!response.ok) {
            //             throw new Error('Error posting data');
            //         }
            //         return response.json();
            //     })
            //     .then((data) => {
            //         console.log(data); // Handle successful response
            //     })
            //     .catch((error) => {
            //         console.error(error); // Handle error response
            //     });


        }
    };

    const handleClear = () => {
        setFormData({
            customerOrderID: '',
            salesOrg: '',
            distributionChannel: '',
            companyCode: '',
            orderCreationDate: '',
            orderCurrency: '',
            customerNumber: '',
            amountInUSD: '',
            orderAmount: '',
        });
        setErrors({});
    };

    return (
        <div className='form-container'>
            <form className="form" onSubmit={handleSubmit}>
                <div className="grid-row row1">
                    <span className='span1'>
                        <input
                            type="number"
                            name="customerOrderID"
                            placeholder="Customer Order ID"
                            value={formData.customerOrderID}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="salesOrg"
                            placeholder="Sales Org"
                            value={formData.salesOrg}
                            onChange={handleInputChange}
                        />
                    </span>
                    <span className='span2'>
                        <input
                            type="text"
                            name="distributionChannel"
                            placeholder="Distribution Channel"
                            value={formData.distributionChannel}
                            onChange={handleInputChange}
                        />
                    </span>

                </div>
                <div className="grid-row row2">
                    <span className='span3'>
                        <input
                            type="number"
                            name="customerNumber"
                            placeholder="Customer Number"
                            value={formData.customerNumber}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="companyCode"
                            placeholder="Company Code"
                            value={formData.companyCode}
                            onChange={handleInputChange}
                        />
                    </span>
                    <span className='span4'>
                        <input
                            type="text"
                            name="orderCurrency"
                            placeholder="Order Currency"
                            value={formData.orderCurrency}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="amountInUSD"
                            placeholder="Amount in USD"
                            value={formData.amountInUSD}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="orderCreationDate"
                            placeholder="Order Creation Date"
                            value={formData.orderCreationDate}
                            onChange={handleInputChange}
                        />
                    </span>
                </div>

                {/* Display errors */}
                {Object.values(errors).map((error, index) => (
                    <div key={index} className="error-message">
                        {error}
                    </div>
                ))}

                <div className="btns">
                    <span className='submitBtn-Container'>
                        <Button variant="contained" type="submit" className='submitBtn'>
                            Submit
                        </Button>
                    </span>
                    <span className='clrBtn-Container'>
                        <Button variant="contained" type="clear" className='clrBtn' onClick={handleClear}>
                            Clear Data
                        </Button>
                    </span>
                </div>
            </form>
        </div>
    );
};