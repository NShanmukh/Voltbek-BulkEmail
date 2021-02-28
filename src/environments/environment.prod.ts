export const environment = {
    production: true,
    hmr       : false,
    
    apiURL: 'https://vserveq.voltasworld.com/bulkemailsender/api',

    apiEndPoints: {
        createNewEmailContent: '/TdsCertificate/AddNewTdsCertificate',
        getAllEmailContents: '/TdsCertificate/GetAllTdsCertificate',
        updateEmailContent: '/TdsCertificate/UpdateTdsCertificate',

        uploadEmailContentDocs: '/TdsCertificate/UploadDocuments',
        uploadEmailToUserExcel: '/TdsCertificate/TdsCertificateSendMails',
        
        getAllEmailDocsByType: '/TdsCertificate/getTdsEmailDocs',
        deleteEmailDocsByType: '/TdsCertificate/deleteTdsEmailDocs',
    }
};
