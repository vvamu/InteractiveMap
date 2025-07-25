import ApplicationUrl from "../../../models/ApplicationUrl";
import { Link } from "react-router-dom";



const MenuMainContent = ({ currentUser, changeUser, isOpenStatus, children ,isActive }) => {

    return (
        <>
            <li>
                <Link to="/map" className={isActive('/map') ? 'nav-link-active' : ''} style={{ marginRight: "10px", cursor: "pointer" }}>Компании</Link>
            </li>

            {currentUser?.roles != "Administrator" ? null : <li>
                <Link to={ApplicationUrl.User.app.get} className={isActive(ApplicationUrl.User.app.get) ? 'nav-link-active' : ''}
                    style={{ marginRight: "10px", cursor: "pointer" }}>Пользователи</Link>
            </li>}
            <li class="Link"  className={"flexContent"} style={{ gridGap: "5px", }}>
                <Link to="/games" className={isActive('/games') ? 'nav-link-active flexContent' : 'flexContent'} style={{ marginRight: "20px", cursor: "pointer", gridGap: "3px", width:"65px" }}>
                    Игры  <span ><svg style={{ width: "15px", height: "15px", marginRight: "-15px" }} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml: space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M389.486,226.898H122.515C54.852,226.898,0,281.746,0,349.413c0,67.659,54.852,122.514,122.515,122.514 c42.645,0,80.192-21.812,102.128-54.855h62.711c21.94,33.043,59.491,54.855,102.132,54.855 c67.667,0,122.514-54.855,122.514-122.514C512,281.746,457.153,226.898,389.486,226.898z M176.155,364.052h-37.794v37.778h-32.916 v-37.778H67.659v-32.928h37.786v-37.786h32.916v37.786h37.794V364.052z M358.495,363.774c-7.929,7.929-20.783,7.929-28.716,0 c-7.936-7.929-7.936-20.794,0-28.723c7.933-7.929,20.787-7.929,28.716-0.008C366.424,342.98,366.424,355.846,358.495,363.774z M403.84,409.127c-7.921,7.921-20.779,7.921-28.715-0.008c-7.937-7.929-7.937-20.786,0-28.715 c7.936-7.929,20.794-7.945,28.715-0.016C411.777,388.333,411.777,401.19,403.84,409.127z M403.84,318.422 c-7.921,7.929-20.779,7.929-28.715,0c-7.922-7.929-7.937-20.794,0-28.723c7.936-7.929,20.794-7.929,28.715,0 C411.777,297.627,411.777,310.493,403.84,318.422z M449.193,363.774c-7.921,7.929-20.786,7.929-28.724,0 c-7.937-7.929-7.937-20.794,0-28.723c7.937-7.929,20.802-7.929,28.724,0C457.122,342.98,457.122,355.846,449.193,363.774z"></path> <path class="st0" d="M268.928,110.894c0-2.46,0.49-4.72,1.361-6.802c1.319-3.116,3.548-5.8,6.337-7.69 c2.8-1.89,6.09-2.97,9.753-2.97c2.441,0,4.709,0.494,6.792,1.373c3.112,1.311,5.804,3.533,7.69,6.333 c1.882,2.8,2.97,6.086,2.97,9.756c0,5.893,1.207,11.593,3.39,16.753c3.282,7.744,8.724,14.293,15.588,18.928 c6.849,4.644,15.206,7.374,24.076,7.366c5.912,0,11.612-1.211,16.764-3.394c7.728-3.278,14.285-8.716,18.92-15.58 c4.644-6.857,7.367-15.21,7.367-24.073V40.073h-25.608v70.821c0,2.438-0.478,4.705-1.358,6.78c-1.319,3.124-3.556,5.808-6.333,7.69 c-2.807,1.881-6.093,2.969-9.753,2.969c-2.437,0-4.705-0.486-6.784-1.365c-3.12-1.311-5.804-3.548-7.69-6.333 c-1.886-2.8-2.97-6.1-2.986-9.742c0.016-5.924-1.192-11.616-3.378-16.768c-3.282-7.744-8.72-14.292-15.585-18.928 c-6.864-4.651-15.209-7.374-24.084-7.366c-5.908-0.008-11.604,1.203-16.764,3.394c-7.74,3.263-14.292,8.716-18.932,15.58 c-4.639,6.857-7.358,15.21-7.358,24.088v104.712h25.603V110.894z"></path> </g> </g></svg></span>
                </Link>
            </li>
            <li style={{width:"40%"}}></li>

        </>
    )
}
export default MenuMainContent;