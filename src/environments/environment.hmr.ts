export const environment = {
    production: false,
    hmr       : true,
    
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
