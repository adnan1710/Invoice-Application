import React from 'react'
import { Button } from '@material-ui/core';
import Charts from '../popups/Charts'
import './../../styles/analytics.css'

export default function Analytics() {
    return (
        <div className='Analytics'>
            <div className='analyticsQuery'>
                <form>
                    <div className="input-row">
                        <fieldset>
                            <legend>Distribution Channel</legend>
                            <input
                                type="text"
                                name="distributionChannel"
                                // value={editedData.distributionChannel || ''}
                                // onChange={handleInputChange}
                            />
                        </fieldset>
                    </div>
                    <div className="input-row">
                        <fieldset>
                            <legend>Customer Number</legend>
                            <input
                                type="number"
                                name="customerNumber"
                                // value={editedData.customerNumber || ''}
                                // onChange={handleInputChange}
                            />
                        </fieldset>
                    </div>
                    <div className='submitBtn'>
                        <Button variant='outlined' type="submit">View</Button>
                    </div>
                </form>
            </div>
            <div className='chart-container'>
                <Charts />
            </div>
        </div>
    )
}
