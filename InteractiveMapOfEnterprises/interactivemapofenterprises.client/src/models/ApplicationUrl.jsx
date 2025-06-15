export const ApplicationUrl = {
    User: {
        app: {
            get: "/users/",
            create: "/users/edit/",
            edit: "/users/edit/",
            delete: ""
        },
      
       
    },
    Company: {
        app: {
            get: "/companies/",
            create: "/companies/edit/",
            edit: "/companies/edit/",
            delete: ""
        },
    },
    Game: {
        app: {
            get: "/games/",
        },
    }
}

export default ApplicationUrl;


/*

  api: {
            get: "users/",
            create: "users/edit/",
            edit: "users/edit/:id",
            delete: "users/delete/:id"
        }
         api: {
            get: "",
            create: "",
            edit: "",
            delete: ""
        }
        
        */