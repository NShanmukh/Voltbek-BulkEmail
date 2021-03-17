export const environment = {
    production: true,
    hmr       : false,
    
    // apiURL: 'https://vserveq.voltasworld.com/bulkemailsender/api',
    apiURL: 'https://vsmart.voltasworld.com/bulkemailsender/api',

    apiEndPoints: {
        login: '/TdsCertificate/Login',
        createNewEmailContent: '/TdsCertificate/AddNewTdsCertificate',
        getAllEmailContents: '/TdsCertificate/GetAllTdsCertificates',
        updateEmailContent: '/TdsCertificate/UpdateTdsCertificate',

        uploadEmailContentPdfDocs: '/TdsCertificate/UploadPDFfiles',
        uploadEmailToUserExcel: '/TdsCertificate/UploadExcelFile',

        getAllEmailUserList: '/TdsCertificate/GetAllEmailsList',
        sendEmailToUserList: '/TdsCertificate/TdsCertificateSendMails',

        getAllEmailDocsByType: '/TdsCertificate/getTdsEmailDocs',
        deleteEmailDocsByType: '/TdsCertificate/DeletePdfFile',
        deleteEmailUserRecord:'/TdsCertificate/DeleteTdsEmail'
    }
};
