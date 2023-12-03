import { HomePage,LoginPage,MemberDetailsPage,UserDetailsPage,SuccessPage,BirthdayDetailsPage,AdminPage,PujaPage,DailyPujaPage,PujaDetailsPage} from "./src/pages"


export const pageRoutes = [
    { path: "*", component: HomePage },
    { path: "/", component: LoginPage },
    {path:"/member",component:MemberDetailsPage},
    {path:"/userdetails",component:UserDetailsPage},
    {path:"/added",component:SuccessPage},
    {path:"/birthday",component:BirthdayDetailsPage},
    {path:"/genereatecode",component:AdminPage},
    {path:"/pujapage",component:PujaPage},
    {path:"/dailypuja",component:DailyPujaPage},
    {path:"/getDetails",component:PujaDetailsPage},
]