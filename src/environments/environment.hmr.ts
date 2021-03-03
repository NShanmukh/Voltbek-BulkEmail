export const environment = {
    production: false,
    hmr       : true,
    
    apiEndPoints: {
        login: '/TdsCertificate/Login',
        createNewEmailContent: '/TdsCertificate/AddNewTdsCertificate',
        getAllEmailContents: '/TdsCertificate/GetAllTdsCertificate',
        updateEmailContent: '/TdsCertificate/UpdateTdsCertificate',

        uploadEmailContentPdfDocs: '/TdsCertificate/UploadPDFfiles',
        uploadEmailToUserExcel: '/TdsCertificate/UploadExcelFile',

        getAllEmailUserList:'/TdsCertificate/GetAllEmailsList',
        sendEmailToUserList:'/TdsCertificate/TdsCertificateSendMails',
        
        getAllEmailDocsByType: '/TdsCertificate/getTdsEmailDocs',
        deleteEmailDocsByType: '/TdsCertificate/DeletePdfFile',
        deleteEmailUserRecord:'/TdsCertificate/DeleteTdsEmail'
    }
};
