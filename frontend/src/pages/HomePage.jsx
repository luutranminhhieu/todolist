import React from 'react';
import {Header} from '@/components/Header';
import AddTask from '@/components/AddTask';
import StatsandFilters from '@/components/StatsandFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState([]);
    const [completeTaskCount, setCompleteTaskCount] = useState([]);
    const [filter, setFilter] = useState(["all"]);

    useEffect(() => {
        fetchTasks();
    
    },[]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/tasks");
            setTaskBuffer(response.data);
            setActiveTaskCount(response.data.activeCount);
            setCompleteTaskCount(response.data.completeCount)
            

        } catch (error) {
            console.error("Error occurs when getting tasks", error);
            toast.error("Error occurs");
        } 
    };

    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active': 
                return task.status === "active";
            case 'completed':
                return task.status === "complete";
            default:
                return true;
        }
    })

    return (
                <div className="min-h-screen w-full bg-[#fff8f0] relative">
        {/* Soft Warm Pastel Texture */}
        <div
            className="absolute inset-0 z-0"
            style={{
            backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(255, 182, 153, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 244, 214, 0.5) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 182, 153, 0.1) 0%, transparent 50%)`,
            }}
        />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto">
            <div className="w-full max-w-2xl -6 mx-auto space-y-6">
                <Header/>

                <AddTask/>

                <StatsandFilters
                    filter ={filter}
                    setFilter = {setFilter} 
                    activeTasksCount={activeTaskCount}
                    completedTasksCount={completeTaskCount}
                />

                <TaskList filteredTasks={filteredTasks} filter ={filter}/>

                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <TaskListPagination/>
                    <DateTimeFilter/>

                </div>

                <Footer
                    activeTaskCount={activeTaskCount}
                    completedTaskCount={completeTaskCount}
                />
            </div>
            
            </div>
        </div>

    );
};

export default HomePage;
