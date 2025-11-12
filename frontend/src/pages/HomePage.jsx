import React from 'react';
import {Header} from '@/components/Header';
import AddTask from '@/components/AddTask';
import StatsandFilters from '@/components/StatsandFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import DateTimeFilter from '@/components/DateTimeFilter';
import Footer from '@/components/Footer';
const HomePage = () => {
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

                <StatsandFilters/>

                <TaskList/>

                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <TaskListPagination/>
                    <DateTimeFilter/>

                </div>

                <Footer/>
            </div>
            
            </div>
        </div>

    );
};

export default HomePage;
