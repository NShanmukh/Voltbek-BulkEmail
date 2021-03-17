// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    // apiURL: 'https://localhost:44337/api',
    // apiURL: 'http://192.168.10.127/bmsapi/api',
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
