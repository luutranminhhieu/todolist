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
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState([]);
    const [completeTaskCount, setCompleteTaskCount] = useState([]);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState('today');
    const [page, setPage] =useState(1);

    useEffect(() => {
        fetchTasks();
    
    },[dateQuery]);

    useEffect(() => {
        setPage(1);

    }, [filter, dateQuery]);

    const fetchTasks = async () => {
        try {
            const response = await api.get(`/tasks?filter=${dateQuery}`);
            setTaskBuffer(response.data.tasks || []);
            setActiveTaskCount(response.data.activeCount || 0);
            setCompleteTaskCount(response.data.completeCount || 0);
            

        } catch (error) {
            console.error("Error occurs when getting tasks", error);
            toast.error("Error occurs");
        } 
    };

    const handleTaskChanged = () => {
        fetchTasks();
    };

    const handleNext = () => {
        if(page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if(page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
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
    });

    const visibleTasks = filteredTasks.slice(
        (page - 1) *visibleTaskLimit,
        page * visibleTaskLimit,
    );

    if (visibleTasks.length === 0 && page > 1) {
        handlePrev();
    };

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
    

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

                <AddTask handleNewTaskAdded={handleTaskChanged}/>

                <StatsandFilters
                    filter ={filter}
                    setFilter = {setFilter} 
                    activeTasksCount={activeTaskCount}
                    completedTasksCount={completeTaskCount}
                />

                <TaskList 
                    filteredTasks={visibleTasks} 
                    filter ={filter}
                    handleTaskChanged={handleTaskChanged}
                />

                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <TaskListPagination
                        handleNext = {handleNext}
                        handlePrev = {handlePrev}
                        handlePageChange = {handlePageChange}
                        page = {page}
                        totalPages = {totalPages}
                    />
                    <DateTimeFilter dateQuery={dateQuery} setDateQuery = {setDateQuery}/>

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
