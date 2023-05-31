// ** React Import
import {  useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Third Party Components
import { useDropzone } from 'react-dropzone'

// ** Reactstrap Imports
import { Button, Label, Form, Input, ListGroupItem } from 'reactstrap'
import { DownloadCloud, FileText, X } from 'react-feather'


const AddProductSidebar = ({ open, toggleSidebar}) => {
    return (
        <Sidebar
            width={500}
            open={open}
            title="Create New Product"
            headerClassName="mb-1"
            contentClassName="pt-0"
            toggleSidebar={toggleSidebar}
        >
            <Form>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="fullName"
                        id="fullName"
                        placeholder="John Doe"
                    />
                </div>

                <Button
                    type="submit"
                    className="me-1"
                    color="primary"
                >
                    Submit
                </Button>
                <Button
                    type="reset"
                    color="secondary"
                    outline
                    onClick={toggleSidebar}
                >
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default AddProductSidebar
