import { Card } from './ui/card';
import { Circle } from 'lucide-react';
import React from 'react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card
      className="p-8 text-center border-0 bg-gradient-card shadow-custom-md"
    >
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground"/>

        <div>
          <h3 className='font-medium text-foreground'>
            {
              filter === 'active'?
              "No active task" :
              filter === 'completed' ?
              "No completed task"
              : "No task"
            }
          </h3>

          <p className="tetx-sn text-muted-foreground">
            {filter === "all"
              ? "Add task to start"
              : `Go to All to see all the tasks ${ filter === "active" ? "Done" : "On going"}`
            }
          </p>
          </div>  
      </div>
    </Card>
  );
};

export default TaskEmptyState