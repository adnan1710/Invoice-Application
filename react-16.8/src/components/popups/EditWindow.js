import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './../../styles/editwindow.css'

export default function EditWindow({ rowData, onSave, onCancel }) {
    const [editedData, setEditedData] = useState(rowData);

    useEffect(() => {
        setEditedData(rowData);
    }, [rowData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="edit-window">
            <p>Edit</p>
            <div className="input-row">
                <fieldset>
                    <legend>Customer Order ID</legend>
                    <input
                        type="text"
                        name="customerOrderID"
                        value={editedData.customerOrderID || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="input-row">
                <fieldset>
                    <legend>Sales Org</legend>
                    <input
                        type="text"
                        name="salesOrg"
                        value={editedData.salesOrg || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="input-row">
                <fieldset>
                    <legend>Distribution Channel</legend>
                    <input
                        type="text"
                        name="distributionChannel"
                        value={editedData.distributionChannel || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="input-row">
                <fieldset>
                    <legend>Company Code</legend>
                    <input
                        type="text"
                        name="companyCode"
                        value={editedData.companyCode || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="input-row">
                <fieldset>
                    <legend>Order Creation Date</legend>
                    <input
                        type="text"
                        name="orderCreationDate"
                        value={editedData.orderCreationDate || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="input-row">
                <fieldset>
                    <legend>Order Currency</legend>
                    <input
                        type="text"
                        name="orderCurrency"
                        value={editedData.orderCurrency || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="input-row">
                <fieldset>
                    <legend>Customer Number</legend>
                    <input
                        type="text"
                        name="customerNumber"
                        value={editedData.customerNumber || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="input-row">
                <fieldset>
                    <legend>Order Amount</legend>
                    <input
                        type="text"
                        name="orderAmount"
                        value={editedData.orderAmount || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
            </div>
            <div className="edit-window-buttons">
                <Button variant="outlined" onClick={() => {
                    console.log(JSON.stringify(editedData));
                    onSave(editedData);
                }
                }>Save</Button>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    );
};