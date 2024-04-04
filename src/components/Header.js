import react, { useEffect } from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useState } from "react";
import '../DropDownNotification.css';
import './LanguageToogle.css';

import App from "../App";
import { AccountCircle, NotificationsActiveRounded, NotificationsActiveSharp, NotificationsNone, NotificationsOffOutlined, NotificationsOutlined } from "@material-ui/icons";
import Profile from "./Profile";
import { useTranslation } from "react-i18next";
import LanguageToogle from "./LanguageToogle";
import Api from '../API';


function Header({ logout }) {
    const [t, i18n] = useTranslation('common');
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [notificationData, setNotificationData] = useState([])


    //dropdown Notification menu
    //#region notification

    const [dropdownState, setDropdownState] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("");


    const fetchNotificationData = () => {
        console.log("/notification/showNotificationTable")
        Api({
            method: 'post',
            url: '/notification/showNotificationTable',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
                setNotificationData([])
                setNotificationData(response.data.data)
            } else {
                alert("Something went wrong");
            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }

    const setNotificationSeen = (data) => {
        const notificationId = data;
        console.log("NotificationId: " + notificationId)
        console.log("/notification/notificationSeen")
        Api({
            method: 'post',
            url: '/notification/notificationSeen',
            data: {
                NotificationId: notificationId
            }
        }).then(response => {
            if (response.data.success == 1) {
                fetchNotificationData();
            } else {
                alert("Something went wrong");
            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }


    const handleDropdownClick = () => {
        setDropdownState(!dropdownState);
    };
    const handleSetDropdownValue = (value) => {
        if (window.confirm("Mark this notification as 'SEEN'?")) {

            setDropdownValue(value);
            setNotificationSeen(value)
            setDropdownState(!dropdownState);
        }
    };

    const mydata = [
        {
            id: 27,
            title: "Utah Utes Sports",
            parent: 0,
            topic_count: "5,831",
            reply_count: "31,299",
            content: "Ute and Pac-12 Sports",
            type: "category"
        },
        {
            id: 60,
            title: "Football",
            parent: 27,
            topic_count: "4,367",
            reply_count: "24,960",
            content: "",
            type: "forum"
        },
        {
            id: 30,
            title: "Basketball",
            parent: 27,
            topic_count: "1,026",
            reply_count: "4,303",
            content: "",
            type: "forum"
        },
        {
            id: 102,
            title: "Other Ute Sports",
            parent: 27,
            topic_count: "139",
            reply_count: "391",
            type: "forum"
        },
        // {
        //   id: 41,
        //   title: "Pac-12",
        //   parent: 27,
        //   topic_count: "300",
        //   reply_count: "1,645",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 2290,
        //   title: "Misc",
        //   parent: 0,
        //   topic_count: "548",
        //   reply_count: "3,787",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 104,
        //   title: "Professional Sports",
        //   parent: 0,
        //   topic_count: "255",
        //   reply_count: "956",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 110,
        //   title: "MLB",
        //   parent: 104,
        //   topic_count: "14",
        //   reply_count: "47",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 108,
        //   title: "NBA",
        //   parent: 104,
        //   topic_count: "121",
        //   reply_count: "469",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 106,
        //   title: "NFL",
        //   parent: 104,
        //   topic_count: "92",
        //   reply_count: "358",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 1771,
        //   title: "NHL",
        //   parent: 104,
        //   topic_count: "4",
        //   reply_count: "26",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 112,
        //   title: "Soccer",
        //   parent: 104,
        //   topic_count: "6",
        //   reply_count: "9",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 771,
        //   title: "Ute Hub Site",
        //   parent: 0,
        //   topic_count: "342",
        //   reply_count: "2,069",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 119,
        //   title: "Comments and Suggestions",
        //   parent: 771,
        //   topic_count: "189",
        //   reply_count: "1,253",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 775,
        //   title: "How To Use Ute Hub",
        //   parent: 771,
        //   topic_count: "60",
        //   reply_count: "289",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 1777,
        //   title: "Politics",
        //   parent: 0,
        //   topic_count: "196",
        //   reply_count: "2,493",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 121,
        //   title: "byu/tds",
        //   parent: 0,
        //   topic_count: "244",
        //   reply_count: "1,718",
        //   content: "",
        //   type: "forum"
        // }
    ];
    // const forumsFiltered = mydata.filter((item) => item.type !== "category");
    const forumsFiltered = notificationData.filter((item) => item.type !== "category");

    //#endregion


    const openProfileModal = () => {
        console.log("Create Clicked");
        console.log(isProfileOpen);
        setIsProfileOpen(true);
        console.log(isProfileOpen);
    };
    const closeProfileModal = () => {
        setIsProfileOpen(false);
    };



    useEffect(() => {

        fetchNotificationData()


    }, []);

    return (
        <>

            {(localStorage.getItem('isLoggedIn') === "true") ? (
                <>
                    < div >
                        <img
                            className="logo-container-header"
                            src="uxbd_logo.png"
                            alt="UX-BD"
                        />



                        <div className="HeaderDetails">
                            <LanguageToogle />

                            <h6 className="HeaderUserDetails">

                                Welcome, <span>{(JSON.parse(localStorage.getItem('userDetails'))).EmployeeEmail}</span>{" "}

                                <Profile show={isProfileOpen} onHide={closeProfileModal} />
                                <AccountCircle className=" ml-2 " fontSize="large" onClick={openProfileModal} />

                                <NotificationsActiveSharp onClick={handleDropdownClick} className=" ml-4 ">
                                    {dropdownValue === "" ? "Dropdown" : dropdownValue}
                                </NotificationsActiveSharp>
                                <div
                                    className={`dropdown-items ${dropdownState ? "isVisible" : "isHidden"
                                        }`}
                                >


                                    {forumsFiltered.map((data) => (

                                        data.NotificationType == "2" ?
                                            <div className="dropdown-item" key={data.NotificationId}>
                                                <div
                                                    className="dropdown__link"
                                                    onClick={() =>
                                                        handleSetDropdownValue(data.NotificationId)
                                                    }
                                                >
                                                    {data.NotificationId} sent warning for {data.NotificationTime}
                                                </div>
                                            </div>
                                            :
                                            data.NotificationType == "1" ?
                                                <div className="dropdown-item" key={data.NotificationId}>
                                                    <div
                                                        className="dropdown__link"
                                                        onClick={() =>
                                                            handleSetDropdownValue(data.NotificationId)
                                                        }
                                                    >
                                                        {data.NotificationId} sent warning for {data.NotificationTime}
                                                    </div>
                                                </div>
                                                :
                                                <div className="dropdown-item" key={data.NotificationId}>
                                                    <div
                                                        className="dropdown__link"
                                                        onClick={() =>
                                                            handleSetDropdownValue(data.NotificationId)
                                                        }
                                                    >
                                                        {data.NotificationId} requested for {data.NotificationTime}
                                                    </div>
                                                </div>

                                    ))}


                                    {/* {forumsFiltered.map((data) => (
                                        <div className="dropdown-item" key={data.NotificationId}>
                                            <div
                                                className="dropdown__link"
                                                onClick={() => handleSetDropdownValue(data.NotificationId)}
                                            >
                                                {data.NotificationId} sent warning for {data.NotificationTime}
                                            </div>
                                        </div>
                                    ))} */}
                                </div>



                                <button className="buttonClose mx-4" onClick={logout} >Logout</button>
                            </h6>

                        </div>
                    </div >
                </>
            ) : null}
        </>


        // <>
        //     < div className="row justify-content-between">
        //        <div className="col-3">
        //             <img
        //                 className="logo-container-header"
        //                 src="uxbd_logo.png"
        //                 alt="UX-BD"
        //             />
        //        </div>


        //         <div className="col-5 pl-5" >


        //             <div className="d-flex ml-5">
        //                 {/* <div class="dropdown">
        //                     <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                         language
        //                     </button>
        //                     <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        //                         <button class="dropdown-item" type="button"
        //                         onClick={() => i18n.changeLanguage('en')}>English</button>
        //                         <button class="dropdown-item" type="button" 
        //                         onClick={() => i18n.changeLanguage('jap')}>Japanese</button>
        //                     </div>
        //                 </div> */}


        //                 <h6>
        //                     <LanguageToogle className="dropdown-btn"/>

        //                     Welcome, <span>{(JSON.parse(localStorage.getItem('userDetails'))).EmployeeEmail}</span>{" "}


        //                     <Profile show={isProfileOpen} onHide={closeProfileModal} />
        //                     <AccountCircle className="dropdown-btn ml-2 " fontSize="large" onClick={openProfileModal} />
        //                     {/* <NotificationsActiveSharp className=" ml-12 " fontSize="large" onClick={handleDropdownClick} className="dropdown-btn">

        //     </NotificationsActiveSharp> */}

        //                     <NotificationsActiveSharp onClick={handleDropdownClick} className="dropdown-btn">
        //                         {dropdownValue === "" ? "Dropdown" : dropdownValue}
        //                     </NotificationsActiveSharp>
        //                     <div
        //                         className={`dropdown-items ${dropdownState ? "isVisible" : "isHidden"
        //                             }`}
        //                     >

        //                         {forumsFiltered.map((p) => (
        //                             <div className="dropdown-item" key={p.id}>
        //                                 <div
        //                                     className="dropdown__link"
        //                                     onClick={() => handleSetDropdownValue(p.id)}
        //                                 >
        //                                     {p.id} {p.title}
        //                                 </div>
        //                             </div>
        //                         ))}
        //                     </div>

        //                     <button className="buttonClose mx-4" onClick={logout} >Logout</button>
        //                      </h6>

        //             </div>

        //         </div>
        //     </div >
        // </>

    );
}

export default Header;