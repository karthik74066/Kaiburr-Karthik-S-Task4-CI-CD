import React, { useState, useEffect } from "react";
import { Button, Input, Card, List, message, Popconfirm } from "antd";

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
}

const BACKEND_URL = "http://localhost:30080/api/tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [command, setCommand] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(BACKEND_URL);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create new task
  const handleAdd = async () => {
    if (!id || !name || !owner || !command) {
      message.warning("Please fill all fields including ID!");
      return;
    }

    const newTask = { id, name, owner, command };

    try {
      const res = await fetch(BACKEND_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (res.ok) {
        message.success("Task created!");
        setId("");
        setName("");
        setOwner("");
        setCommand("");
        fetchTasks();
      } else {
        message.error("Failed to create task");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error");
    }
  };

  // Delete task
  const handleDelete = async (id: string) => {
    if (!id) {
      message.warning("Cannot delete task with empty ID!");
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        message.success(`Task ${id} deleted!`);
        fetchTasks();
      } else {
        message.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error");
    }
  };

  // Run task (execute command in backend)
  const handleRun = async (id: string) => {
    if (!id) {
      message.warning("Cannot run task with empty ID!");
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/${id}/executions`, {
        method: "PUT",
      });
      if (res.ok) {
        message.success("Task executed!");
        fetchTasks();
      } else {
        message.error("Execution failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error");
    }
  };



  return (
    <div style={{ padding: "2rem", backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Kaiburr Task Manager</h1>

      <Card
        title="Create Task"
        style={{
          margin: "0 auto 20px",
          width: 400,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Input
          placeholder="Task ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" block onClick={handleAdd}>
          Add Task
        </Button>
      </Card>

      <Card
        title="Tasks"
        style={{
          margin: "0 auto",
          width: 650,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <List
          bordered
          dataSource={tasks}
          renderItem={(t) => (
            <List.Item
              actions={[
                <Button
                  key="run"
                  type="primary"
                  disabled={!t.id}
                  onClick={() => handleRun(t.id)}
                >
                  Run
                </Button>,
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => handleDelete(t.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button key="delete" danger disabled={!t.id}>
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <b>{t.id || "(No ID)"}</b> — {t.name} — {t.command} (by {t.owner})
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default App;
