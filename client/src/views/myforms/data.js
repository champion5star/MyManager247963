import { Button } from "reactstrap"

// ** Table Zero Config Column

export const basicColumns = [
    {
        name: 'Form Id',
        sortable: true,
        selector: row => row.formId

    },
    {
        name: 'Type',
        sortable: true,
        selector: row => row.type
    },
    {
        name: 'Created',
        sortable: true,
        selector: row => row.created
    },
    {
        name: 'View',
        sortable: true,
        center: true,
        cell: (row) => (
            <>
                <Button
                    color='link'
                >View
                </Button>
            </>
        )

    },
]