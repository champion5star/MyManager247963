import { identity } from '@fullcalendar/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'

const API = customInterIceptors()

//upload document
export async function useUploadDocument(payload) {
    try {
        const { data } = await API.post(ENDPOINTS.UPLOAD_DOCUMENT, payload)
        if (data) {
            if(data.success){
                toast.success('Upload document successfull')
            }
            else{
                toast.error('Document upload failed')
            }
           
        } 
        return data
    } catch (error) {
        toast.error('Your session has been expired. please login again!')
    }
}

//add recipients
export async function addRecipients(payload) {
    const { data } = await API.post(
        ENDPOINTS.ADD_RECIPIENTS + payload.documentId,
        payload
    )
    return data
}

export function useAddRecipients() {
    //const queryClient = useQueryClient()
    return useMutation(addRecipients, {
        onSuccess: () => {
            toast.success('details added successfully')
        },
        onError: () => {
            toast.error('Unable to create recipients')
        }
    })
}

//update recipient
export async function putAddRecipients(id, payload) {
    const { data } = await API.put(ENDPOINTS.ADD_RECIPIENTS + id, payload)

    if (data) {
        toast.success('properties updated successfully')
    }
    return data
}
export async function putSendEmail(id, payload, sendEmail) {
    const { data } = await API.put(
        ENDPOINTS.ADD_RECIPIENTS + id + '?sendEmail=' + sendEmail,
        payload
    )
    if (data) {
        if(sendEmail=true){
            toast.success('Emails sent to all recipients successfully')
        }
        else{
            toast.success('Details added successfully')
        }
        
    }
    return data
}

///api/document/email-link?hashCode=12345
export async function getEmailLink(hashcode) {
    try {
        const data = await API.post(ENDPOINTS.GET_DOC_BY_HASH + hashcode)
        return data
    } catch (error) {
        window.location.href = `/document/email-link/`
    }
}
export async function getDocumentWithToken(token,hashCode) {
    try {
        const {data} = await API.get(ENDPOINTS.GET_DOC_BY_TOKEN + token + "&hashCode="+ hashCode)
        return data
    } catch (error) {
        window.location.href = `/document/email-link/`
    }
}

//api/document/documentId/:id
export async function getDocumentById(id) {
    const data = await API.get(ENDPOINTS.Get_DOCUMENT_BY_ID + id)
    return data
}



