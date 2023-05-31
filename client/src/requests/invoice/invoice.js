import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'

const API = customInterIceptors()

async function fectgetinvoce() {
    const data = await API.get(ENDPOINTS.GET_INVOICE)
    return data
}

export function fetchinvoicedata() {
    return useQuery('get-invoice', fectgetinvoce)
}
//  customer
async function fetchcustomer() {
    const data = await API.get(ENDPOINTS.GET_CUSTOMER)
    return data
}
export function fetchcustomerdata() {
    return useQuery('get-costumer', fetchcustomer)
}

async function Addcustomer(payload) {
    const data = await API.post(ENDPOINTS.GET_CUSTOMER, payload)
    return data
}
export function addcustomer() {
    const queryClient = useQueryClient()
    return useMutation(Addcustomer, {
        onSuccess: () => {
            toast.success('New customer Created Successfully')
            queryClient.invalidateQueries(ENDPOINTS.GET_CUSTOMER)
        },
        onError: () => {
            toast.error('Unable to Create New customer')
        }
    })
}
async function invocedata(payload) {
    const data = await API.post(ENDPOINTS.GET_INVOICE, payload)
    return data
}

export function addinvoicedata() {
    const queryClient = useQueryClient()
    return useMutation(invocedata, {
        onSuccess: () => {
            toast.success('New invoice Created Successfully')
            queryClient.invalidateQueries(ENDPOINTS.GET_INVOICE)
        },
        onError: () => {
            toast.error('Unable to Create New invoice')
        }
    })
}
async function editinvoice(payload) {
    const data = await API.patch(ENDPOINTS.GET_INVOICE+`/${payload?._id}`, payload)
    return data
}

export function editinvoiceres() {
    const queryClient = useQueryClient()
    return useMutation(editinvoice, {
        onSuccess: () => {
            toast.success('New invoice update  Successfully')
            queryClient.invalidateQueries(ENDPOINTS.GET_INVOICE)
        },
        onError: () => {
            toast.error('Unable to update invoice')
        }
    })
}
export async function getsinsgleinvoice(id) {
    const data = await API.get(ENDPOINTS.GET_INVOICE + `/${id}`)
    return data
}


export async function deleteinovice(id) {
    const data = await API.delete(ENDPOINTS.GET_INVOICE + `/${id}`)
    return data
}