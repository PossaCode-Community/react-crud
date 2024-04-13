import { useState } from "react";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Task 1",
      isCompleted: false,
    },
    {
      id: "2",
      title: "Task 2",
      isCompleted: true,
    },
  ]);

  const addTask = (content: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: content,
      isCompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => [...prevTasks.filter((task) => task.id !== id)]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;

    const formData = new FormData(formElement);
    const content = formData.get("content") as string;

    if (!content.trim()) return;

    addTask(content);
    formElement.reset();
  };

  return (
    <div className="container space-y-12">
      <h1 className="text-center text-3xl font-semibold">Todo App</h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-prose flex items-center">
        <input
          className="border border-gray-400 outline-none focus:ring-1 "
          type="text"
          name="content"
        />
        <button className="bg-blue-600 border-2 border-blue-600 text-white px-4 py-2">
          Add Task
        </button>
      </form>

      <ul className="space-y-6">
        {tasks.map((task) => {
          return (
            <li key={task.id} className="flex space-x-4 items-center">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleComplete(task.id)}
              />
              <p className={task.isCompleted ? "italic line-through" : ""}>
                {task.title}
              </p>
              <button
                onClick={() => deleteTask(task.id)}
                type="button"
                className="px-2 bg-red-600 text-white">
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
