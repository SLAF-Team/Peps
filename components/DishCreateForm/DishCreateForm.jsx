import { useEffect, useState } from 'react';
import { apiTasks } from '../utilities/operation';

export function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    _createTask();
  }, []);

  function _getTasks() {
    apiTasks.getAll().then((res) => {
      let arr = _parseTasks(res.results.data);
      setTasks(arr);
    });
  }


  function _parseTasks(tasks) {
    return tasks.map((task) => {
      // Parse task information
      return task;
    });
  }

  function _createTask(task) {
    apiTasks.post(task).then((res) => {
      try {
        setTasks(res);
      } catch (err) {
        console.log(err);
      }
    });
  }

  function _updateTask(task) {
    apiTasks.patch(task).then((res) => {
      // state logic
    });
  }

  function _removeTask(id) {
    apiTasks.remove(id).then((res) => {
      // state logic
    });
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
