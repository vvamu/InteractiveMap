import React, { useState, useEffect } from 'react';
import ContentWithPaddings from '../components/common/ContentWithPaddings';
import userService from '../services/userService';
import ButtonIcon from '../components/Common/Buttons/ButtonIcon';
import CompaniesPage from './CompaniesPage';
import Companies from '../components/CompaniesPage/Companies/Companies';
const createIcon = "/create.svg";
import { useParams } from 'react-router-dom';
import ApplicationUrl from '../models/ApplicationUrl';
import CompaniesFilters from '../components/CompaniesPage/CompaniesFilters';
import ActionConfirmationBox from '../components/common/InfoBoxs/ActionConfirmationBox';
import useLocationChangeLogger from "../hooks/useLocationChangeLogger";


const UserPage = ({ currentUser = null }) => {
    const { id } = useParams();
    

    const [returnUrl, setReturnUrl] = useState('');
    const [user, setUser] = useState(null);
    const [filters, setFilters] = useState(null);
    const [companies, setCompanies] = useState([])



    const handleEdit = (id) => {
        document.location = ApplicationUrl.User.app.edit + id 
        console.log("handleEdit")
    }

    const toCreateCompanyPage = () => {
        document.location = ApplicationUrl.Company.app.create
    }


    useEffect(() => {

        const getUser = async (id) => {

            await userService.get(id).then((data) => {
                setUser(data)
            });
        }

        const urlParams = new URLSearchParams(window.location.search);
        const returnUrlParam = urlParams.get('returnUrl');
        if (id) {
            getUser(id);
        } else {

        }
        setReturnUrl(decodeURIComponent(returnUrlParam));
    }, []);

   

    

    return (

        <ContentWithPaddings >

        
            <div className={"boxShadow"} >
        
                <div style={{ display: "flex", justifyContent: "space-between", }}>
                    <div className={"flexContent"}>
                        <svg width={"50px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#1C274C"></path> </g></svg>
                        <div>
                            <div>Логин: <span>{user?.username ?? "-"}</span></div>
                            <div>Имя: <span>{user?.name ?? "-"}</span></div>
                            {user?.dateCreatedArticle != null ? 
                                <div >
                                    Дата регистрации: <span>{user?.dateCreatedArticle?.substring(0, 10)}</span>
                                </div>
                                : null}
                            
                        </div>
                    </div>
                    {currentUser?.username != user?.username ? null :
                        <div className={"flexContent"}>
                           
                            <ButtonIcon src={"/edit.svg"} imgStyle={{   }} onClick={() => { handleEdit(user.id) }} />
                        </div>
                    }
                </div>
               
                   
               
            </div>
            <div      style={{ marginTop: "30px"} }>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                    <div>
                        <h3>Компании</h3>
                        <div className="pageStats coloredText">Созданных компаний :{companies.length}</div>
                    </div>
                    {currentUser?.username != user?.username
                        ?
                            <div> <CompaniesFilters setFilters={setFilters} /></div>
                        :
                            <div className={"flexContent"}>
                                <div >
                                    <CompaniesFilters   setFilters={setFilters} />
                               </div>
                                <ButtonIcon src={createIcon} alt={"создать"} onClick={() => toCreateCompanyPage()} />
                            </div>
                    }
                    
                </div>
                <div style={{ minHeight: "400px", borderRadius: "5px", width: "100%", backgroundSize: "cover", paddingTop: "5px" }}>
                    <Companies withImage={ true} filters={filters} setCompanies={setCompanies} companies={companies } userId={id} />
                </div>
            </div>
                
           
        </ContentWithPaddings>

    );
     

};


export default UserPage;