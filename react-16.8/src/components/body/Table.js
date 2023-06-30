import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditWindow from './../popups/EditWindow';
import { Button } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import './../../styles/table.css';

const columns = [
    { field: 'slNo', headerName: 'Sl. No', width: 120 },
    { field: 'customerOrderID', headerName: 'Customer Order ID', width: 200 },
    { field: 'salesOrg', headerName: 'Sales Org', width: 150 },
    { field: 'distributionChannel', headerName: 'Distribution Channel', width: 250 },
    { field: 'companyCode', headerName: 'Company Code', width: 200 },
    { field: 'orderCreationDate', headerName: 'Order Creation Date', width: 250 },
    { field: 'orderCurrency', headerName: 'Order Currency', width: 180 },
    { field: 'customerNumber', headerName: 'Customer Number', width: 200 },
    { field: 'amountInUSD', headerName: 'Amount In USD', width: 180 },
    { field: 'orderAmount', headerName: 'Order Amount', width: 180 },
];



export default function Table({ query }) {
    const [pageSize, setPageSize] = useState(5);
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [showDeleteWindow, setShowDeleteWindow] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [rows, setRows] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEditButtonActive, setIsEditButtonActive] = useState(false);
    const [isPredictButtonActive, setIsPredictButtonActive] = useState(false);
    const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(false);

    const handleDataLoading = () => {
        const cancelTokenSource = axios.CancelToken.source();

        axios
            .get('http://localhost:8080/Invoice-Application/dataloadingservlet', {
                cancelToken: cancelTokenSource.token,
            })
            .then((response) => {
                const data = response.data;

                const processedData = data.map((item, index) => ({
                    id: index + 1,
                    ...item,
                    orderCreationDate: moment(item.orderCreationDate).format('DD-MM-YYYY'),
                }));

                if (cancelTokenSource.token.reason == null) { // Check if the request is not cancelled

                    const updatedRows = [...processedData]; // Create a copy of processedData
                    console.log("Query prnt", query)

                    // console.log(processedData)
                    setRows(updatedRows);
                    // console.log(rows);
                    setRefreshData(false); // Reset the refreshData state
                }

                if (query!=='') {
                    handleQuery();
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) { // Check if the error is not due to cancellation
                    console.error('Error fetching data:', error);
                }
            })
            .finally(() => {
                cancelTokenSource.cancel('Request canceled'); // Cancel the request on completion
            });

        return () => {
            cancelTokenSource.cancel('Request canceled'); // Cancel the request on component unmount
        };
    };

    useEffect(() => {
        handleDataLoading();
    }, []);

    useEffect(() => {
        if (refreshData) {
            handleDataLoading();
        }
    }, [refreshData]);

    useEffect(() => {
        if (query !== "") {
            handleQuery();
        };
    }, [query])

    const handleRefreshClick = () => {
        setRows([]);
        setRefreshData(true);
    };

    const handleRowSelection = (selection) => {
        // setSelectedRowObjects(selection.map((selectedIndex) => rows[selectedIndex]));
        setSelectedRows(selection);
        console.log(selection);
        // console.log(selectedRows);
        // console.log(selectedRowData);

        // Update button activation based on the number of selected rows
        setIsEditButtonActive(selection.length === 1);
        setIsPredictButtonActive(selection.length > 0);
        setIsDeleteButtonActive(selection.length > 0);
    };


    const handleEditClick = () => {
        setShowEditWindow(true);
        const selectedRowId = selectedRows[0];
        // console.log(selectedRows[0])
        const selectedRow = rows.find((row) => row.id === selectedRowId);
        // console.log(selectedRow)
        const { id, ...modifiedSelectedRow } = selectedRow;

        setSelectedRowData(modifiedSelectedRow);
        // console.log(`${JSON.stringify(modifiedSelectedRow)} and ${selectedRowId}`)
        // setSelectedRowData(selectedRow);
    };

    const handleCancelEdit = () => {
        setShowEditWindow(false);
    };


    const handleSaveEdit = (editedData) => {
        // Convert the edited data to the format expected by the server
        const updatedData = {
            slNo: editedData.slNo,
            customerOrderID: editedData.customerOrderID,
            salesOrg: editedData.salesOrg,
            distributionChannel: editedData.distributionChannel,
            companyCode: editedData.companyCode,
            orderCreationDate: editedData.orderCreationDate,
            customerNumber: editedData.customerNumber,
            orderCurrency: editedData.orderCurrency,
            amountInUSD: parseFloat(editedData.amountInUSD),
            orderAmount: parseFloat(editedData.orderAmount),
        };

        console.log(JSON.stringify(updatedData))

        // Make an HTTP POST request to the server
        axios.post('http://localhost:8080/Invoice-Application/updateservlet', updatedData)
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                setShowEditWindow(false); // Close the edit window
                handleRefreshClick(); //Refresh the list of rows
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };

    const handleDeleteClick = () => {
        setShowDeleteWindow(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteWindow(false);
    };

    const handleConfirmDelete = () => {

        const slNoList = selectedRows.map((selectedRowId) => {
            const selectedRow = rows.find((row) => row.id === selectedRowId);
            return selectedRow ? selectedRow.slNo : null;
        });

        // console.log(slNoList);

        // Loop through each ID and send a delete request to your Java servlet
        slNoList.forEach((slNo) => {
            axios
                .post('http://localhost:8080/Invoice-Application/deleteservlet', { slNo: slNo })
                .then(() => {
                    console.log(`Deleted row with ID: ${slNo}`);
                    // handleRefreshClick(); //Refresh the list of rows
                })
                .catch((error) => {
                    console.error(`Error deleting row with ID: ${slNo}`, error);
                });
        });

        // Close the delete window
        setShowDeleteWindow(false);
    };


    const handleQuery = () => {
        if (query != '') {
            // console.log("Rows", rows)
            const selectedRow = rows.find((row) => row.customerOrderID == query);
            console.log("SeletedRows", selectedRow)
            if (selectedRow != undefined) {
                setRows([selectedRow])
            }
        }
    }

    const handlePredictClick = () => {

        const predictionRow = selectedRows.map((selectedRowId) => {
            const selectedRow = rows.find((row) => row.id === selectedRowId);
            const { id, ...SelectedRow } = selectedRow;
            // console.log(SelectedRow);
            return SelectedRow
        });

        setSelectedRowData([predictionRow]);
        console.log(predictionRow);

        axios
            .post('http://127.0.0.1:5000/predict', predictionRow)
            .then((response) => {
                const responseData = response.data;
                // Store the response data in a variable or update the state as needed
                console.log(responseData);
            })
            .catch((error) => {
                console.error('Error predicting data:', error);
            });
        // console.log(JSON.stringify(selectedRowData));


    }

    return (
        <div className='table-container'>
            <DataGrid
                style={{ border: '0' }}
                className='grid'
                // autoPageSize={true}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                pagination
                checkboxSelection
                onSelectionModelChange={handleRowSelection}
                // selectionModel={selectedRows.map((row) => row.id)}

                disableSelectionOnClick
                rows={rows}
                columns={columns}
            />
            {/* {console.log(rows.filter((row) => row.customerOrderID === query))} */}
            <div className='footerBtns'>
                <Button variant="contained" className='refreshbtn' onClick={handleRefreshClick} >REFRESH DATA</Button>
                <Button variant="contained" className='editbtn' onClick={handleEditClick} disabled={!isEditButtonActive}>EDIT</Button>
                <Button variant="contained" className='delbtn' onClick={handleDeleteClick} disabled={!isDeleteButtonActive}>DELETE</Button>
                <span className='predictBtn-container'>
                    <Button variant="contained" color="primary" className='predictbtn' onClick={handlePredictClick} disabled={!isPredictButtonActive}>PREDICT</Button>
                </span>
            </div>
            {/* {console.log(selectedRows)} */}
            {showEditWindow && (
                <EditWindow
                    rowData={selectedRowData}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}

            {showDeleteWindow && (
                <div className='delete-window'>
                    <p className='confirm'>Delete Records?</p>
                    <p>Are you sure you want to delete the selected records[s]?</p>
                    <div className='delete-window-buttons'>
                        <Button variant="outlined" onClick={handleConfirmDelete}>Yes</Button>
                        <Button variant="outlined" onClick={handleCancelDelete}>No</Button>
                    </div>
                </div>
            )}
        </div>
    );
};