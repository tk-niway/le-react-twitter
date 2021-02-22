import React, { createContext, useContext } from "react"

import useTasks from "../hooks/useTasks"

export const TaskListContext = createContext()

export const TaskListProvider = ({ children }) => {
  const [tasks, setTasks] = useTasks([])

  return (
    <TaskListContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskListContext.Provider>
  )
}

export const TaskListConsumer = TaskListContext.Consumer

export const useTaskList = () => useContext(TaskListContext)