import { HomePage,LoginPage,MemberDetailsPage,UserDetailsPage,SuccessPage,BirthdayDetailsPage,AdminPage } from "./src/pages"


export const pageRoutes = [
    { path: "/home", component: HomePage },
    { path: "/login", component: LoginPage },
    {path:"/member",component:MemberDetailsPage},
    {path:"/userdetails",component:UserDetailsPage},
    {path:"/added",component:SuccessPage},
    {path:"/birthday",component:BirthdayDetailsPage},
    {path:"/genereatecode",component:AdminPage}
]