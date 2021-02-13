import React, { useState, useContext, useEffect } from "react"
import { FormContext, initial_task } from "./FormContext"

import tasksApi from "../../apis/tasks"

import "./TaskForm.scss"

// post a task
const TaskForm = () => {
  const formContext = useContext(FormContext)
  const [formData, setFormData] = useState(formContext.form)

  useEffect(() => {
    setFormData(formContext.form)
  }, [formContext.form])

  const handleChange = (event) => {
    if (event.target.id === "star") {
      event.target.value = !event.target.value
    }

    setFormData({ ...formData, [event.target.id]: event.target.value })

    console.log("handleChange in formData= ", formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.id === "") {
      // for new task
      tasksApi
        .post("tasks", formData)
        .then((response) => {
          // initialize formData
          setFormData(initial_task)
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      // for update task
      tasksApi
        .patch(`/tasks/${formData.id}`, formData)
        .then((response) => {
          setFormData(initial_task)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  // TODO: Validate the form and added UUID

  return (
    <div className="task-form-wrap">
      <form className="task-form" autoComplete="off" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            data-testid="title"
            id="title"
            type="text"
            onChange={handleChange}
            value={formData.title}
          />
        </label>

        <span id="star" onClick={handleChange}>
          {formData.star ? "★" : "☆"}
        </span>

        <br />
        <label data-testid="description" htmlFor="">
          Description <br />
          <textarea
            id="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </label>

        <br />
        <button type="submit" value="Submit">
          Add
        </button>
      </form>
    </div>
  )
}
export default TaskForm
