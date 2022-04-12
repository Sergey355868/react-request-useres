import React from "react";
import {
    BoxError,
    Button,
    IndicatorScroll,
    InfoBlock,
    BlockInput, ListUsers,
    NotifyButton,
    TopButton, BoxNotification, BoxPagination
} from "./components";
import {TimerAndRequests } from "./components";

import {useSelector} from "react-redux";

function App() {
    let { users, loading, error, links, pages }  = useSelector(state => {
        return state.users
    });
    return (
        <>
            <div className="contaner-buttons-info" style={{ marginTop: "5px" }} >
                <div className="contaner-buttons">
                        <div className="row1">
                            <Button
                                theme="green"
                                arrow = { false }
                                link = "first"
                             > Первая</Button>
                            <NotifyButton
                                theme= "blue"
                                text= "Назад"
                                arrow= { true }
                                direction= "prev"
                            />
                        </div>
                        <div className="row2">
                            <NotifyButton
                                theme= "blue"
                                text= "Вперед"
                                arrow= { true }
                                direction= "next"
                           />
                            <Button
                                link = "last"
                                theme="gray"
                                arrow = { false }
                            >Последняя</Button>
                        </div>
                </div>
                    <TimerAndRequests />
             </div>
            <TopButton around={ true } theme = "blue" arrow = "top" distance= { 100 }  />
            <IndicatorScroll/>
            <BoxNotification className= "root__boxnotification" />
            <BlockInput/>
            <InfoBlock />
             <div  className = "_contaner-users">
                {
                    error ? <BoxError/> : <ListUsers isLoader = { loading } users = { users }/>
                }
            </div>
            {
                !loading && <BoxPagination/>
            }
        </>
    );
}
export default App;
