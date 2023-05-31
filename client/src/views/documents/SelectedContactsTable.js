// ** React Imports
import { Fragment, forwardRef } from 'react'

// ** Third Party Components
import Select from 'react-select'

// ** Reactstrap Imports
import { Input, Table } from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className="form-check">
        <Input type="checkbox" ref={ref} {...props} />
    </div>
))

const roleOptions = [
    { value: 'sign', label: 'Sign' },
    { value: 'download', label: 'Download' },
    { value: 'read', label: 'Read' }
]

const onChange = () => {}

const SelectedContactsTable = () => {
    return (
        <Fragment>
            <Table responsive>
                <thead>
                    <tr>
                        <th>
                            <Input type="checkbox" />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Input type="checkbox" />
                        </td>
                        <td>
                            <span className="align-middle fw-bold">
                                Angular Project
                            </span>
                        </td>
                        <td>Peter Charles</td>

                        <td>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className="react-select"
                                classNamePrefix="select"
                                options={roleOptions}
                                value="test"
                                onChange={onChange}
                                style={{ overflow: 'visible' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="checkbox" />
                        </td>
                        <td>
                            <span className="align-middle fw-bold">
                                React Project
                            </span>
                        </td>
                        <td>Ronald Frest</td>

                        <td>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className="react-select"
                                classNamePrefix="select"
                                options={roleOptions}
                                value="test"
                                onChange={onChange}
                                style={{ overflow: 'visible' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="checkbox" />
                        </td>
                        <td>
                            <span className="align-middle fw-bold">
                                Vuejs Project
                            </span>
                        </td>
                        <td>Jack Obes</td>

                        <td>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className="react-select"
                                classNamePrefix="select"
                                options={roleOptions}
                                value="test"
                                onChange={onChange}
                                style={{ overflow: 'visible' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="checkbox" />
                        </td>
                        <td>
                            <span className="align-middle fw-bold">
                                Bootstrap Project
                            </span>
                        </td>
                        <td>Jerry Milton</td>

                        <td>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className="react-select"
                                classNamePrefix="select"
                                options={roleOptions}
                                value="test"
                                onChange={onChange}
                                style={{ overflow: 'visible' }}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    )
}

export default SelectedContactsTable
