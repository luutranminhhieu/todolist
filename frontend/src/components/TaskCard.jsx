import React from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Calendar, SquarePen, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { useState } from 'react';

const TaskCard = ({task, index, handleTaskChanged}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async(taskId) => {
    console.log("Delete clicked! TaskId:", taskId);
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task has been deleted");
      handleTaskChanged();
    } catch (error) {
      console.error("Error occurs when deleting task", error);
      toast.error("Error occurs when deleting task");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle
      });
      toast.success(`Task name has been changed to ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) { 
      console.error("Error occurs when update task's name", error);
      toast.error("Error occurs when update task's name");
    }
  }

  const toggleTaskCompleteButton = async () => {
    console.log("Toggle button clicked! Task:", task._id);
    try {
      if(task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });
        toast.success(`${task.title} has been completed`)
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`${task.title} has been unchecked`)
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Error occurs when update task", error);
      toast.error("Error occurs when update task");
    }
  }

  const handleKeyPress = (event) => {
    if(event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card className={cn("p-4 bg-gradient border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group", task.status === 'complete' && 'opacity')}
    style={{animationDelay: `${index * 50}ms`}}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className ={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200", task.status === "complete" ? "text-success hover:text-success/80" : "text-mute-foreground hover:text-primary")}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "complete" 
          ? (<CheckCircle2 className="size-5"/>) 
          : (<Circle className="size-5"/>)
          }
        </Button>
          <div className="flex-1 min-w-0">
            {isEditting ? (
              <Input 
                placeholder="What to do?"
                className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                type ="text"
                value = {updateTaskTitle}
                onChange ={(event) => setUpdateTaskTitle(event.target.value)}
                onKeyPress ={handleKeyPress}
                onBlur={()=>{
                  setIsEditting(false);
                  setUpdateTaskTitle(task.title || "")
                }}   
              />
            ):( 
              <p
                className={cn(
                  "text-base transition-all duration-200",
                  task.status === 'complete' ? "line-through text-muted-foreground" : "text-foreground"
                )} 
              >
                {task.title}

              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground"/>
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
             {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground"/>
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
             )}
          </div>
          </div>
          
          <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
             <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
              onClick={() => {
                setIsEditting(true);
                setUpdateTaskTitle(task.title || "");
              }}
             >
              <SquarePen className="size-4"/>
             </Button>
             
             <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteTask(task._id)}
             >
              <Trash2 className="size-4"/>
             </Button>
          </div>
      </div>
    </Card>
  )
}

export default TaskCard