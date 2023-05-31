import React from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Search } from 'react-feather'
import { InputGroup, InputGroupText, Input } from 'reactstrap'
import { basicColumns } from './data'

const data = [
    {
        "id": 1,
        "formId": "167-161211",
        "name": "New Jersey",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 2,
        "formId": "167-161211",
        "name": "New Jersey",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 3,
        "formId": "167-112071",
        "name": "New York NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 4,
        "formId": "167-178071",
        "name": "Taxes NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 5,
        "formId": "167-878071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 6,
        "formId": "167-168071",
        "name": "New export NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 7,
        "formId": "167-65671",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2022"
    },
    {
        "id": 8,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 9,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 10,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 11,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 12,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "created": "FEB 27 2024"
    },
    {
        "id": 13,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 14,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 15,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 16,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    }]
const FormList = () => {
    return (
        <div className='email-user-list'>
            <div className="d-flex align-content-center justify-content-between w-100">
                <InputGroup className="input-group-merge">
                    <InputGroupText>
                        <Search className="text-muted" size={14} />
                    </InputGroupText>
                    <Input
                        id="email-search"
                        placeholder="Search email"
                    />
                </InputGroup>
            </div>
            <DataTable
                noHeader
                pagination
                selectableRows
                columns={basicColumns}
                paginationPerPage={7}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                data={data}
            />
        </div>
    )
}

export default FormList