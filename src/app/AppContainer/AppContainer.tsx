import React from "react";
import './AppContainer.css';
import Header from "../../components/Header/Header";
import NewTask from "../../features/newTask/NewTask/NewTask";
import TaskList from "../../features/taskList/TaskList/TaskList";
import Footer from "../../components/Footer/Footer";

function AppContainer() {
    return (
        <main className='app-container'>
            <div className='app-container__main-part'>
                <Header />
                <NewTask />
                <TaskList />
            </div>
            <Footer />
        </main>
    );
}

export default AppContainer;