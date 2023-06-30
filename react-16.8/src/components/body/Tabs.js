import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabContext, TabPanel } from '@material-ui/lab';
import Table from './Table';
import './../../styles/tabs.css'
import { Button } from '@material-ui/core';
import AddData from './AddData';
import Analytics from './Analytics';

export default function Tabview() {
    const [value, setValue] = useState('datagrid');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        if (searchQuery === "") {
            setShowSearchResults(false)
            setValue('datagrid')
        };
    }, [searchQuery])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        setValue('searchresults');
        setShowSearchResults(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearchQuery(event.target.value);
            if (searchQuery!=='') {
                console.log(searchQuery);
                handleSearch();
            }
        }
    }

    return (
        <div className='Tabview'>
            <div className='search'>
                <input
                    type='number'
                    name='search'
                    placeholder='Search Customer Orderd ID'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                >

                </input>
                <Button variant='contained'>ADVANCED SEARCH</Button>
            </div>
            <TabContext value={value}>
                <Tabs style={{ padding: 5 }} value={value} onChange={handleChange} TabIndicatorProps={{ style: { background: '#ffffff' } }}>
                    <Tab label="HOME PAGE" value={'datagrid'} />
                    <Tab label="ADD DATA" value={'addData'} />
                    <Tab label="ANALYTICS VIEW" value={'analytics'} />
                    {showSearchResults && <Tab label="SEARCH RESULTS" value={'searchresults'} />}
                </Tabs>
                <TabPanel style={{ padding: '3' }} value={'datagrid'} index={0}>
                    <Table query={''} />
                </TabPanel>
                <TabPanel value={'addData'} index={1}>
                    <AddData />
                </TabPanel>
                <TabPanel value={'analytics'} index={2}>
                    <Analytics/>
                </TabPanel>
                {showSearchResults && (
                    <TabPanel value={'searchresults'} index={3}>
                        {/* 971991639 */}
                        {/* {console.log("IN TAB FILE", searchQuery)} */}
                        <Table query={searchQuery} />
                    </TabPanel>
                )}
            </TabContext>
        </div>
    );
}
