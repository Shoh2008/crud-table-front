import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Card, Switch } from "antd";

const Users = ({ setValue, submit, toggle, setName, search }) => {
  const [user, setUser] = useState([]);

  const deleteUser = (id) => {
    axios.delete("https://crud-table-api.onrender.com/api/users/" + id).then(() => get());
  };

  const get = () => {
    axios.get("https://crud-table-api.onrender.com/api/users").then((res) => {
      setUser(res.data);
    });
  };

  const put = (event, id) => {
    user.map((item) => {
      if (item.id == id) {
        axios
          .put("https://crud-table-api.onrender.com/api/users/" + id, {
            ...user[id],
            id: item.id,
            name: item.name,
            age: item.age,
            address: item.address,
            check: event,
          })
          .then(() => {
            setValue({ name: "", age: "", address: "" });
          });
      }
    });
  };

  const edit = (item) => {
    setValue(item);
    setName("Edit User");
    toggle();
  };

  useEffect(() => {
    get();
  }, [submit]);

  const columns = [
    { title: "№", render: (e, r, i) => <>{i + 1}</> },
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    { title: "Address", dataIndex: "address" },
    {
      title: "Active",
      render: (item) => (
        <Switch
          type="checkbox"
          checked={item.check}
          onChange={(e) => put(e, item.id)}
        />
      ),
    },
    {
      title: "Actions",
      render: (item) => (
        <>
          <Button onClick={() => edit(item)} className="btn mx-2">
            ✍
          </Button>
          <Button onClick={() => deleteUser(item.id)} className="btn mx-2">
            🗑
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card style={{ width: "95%", margin: "auto" }}>
      <Table
        columns={columns}
        dataSource={user.filter((item) =>
          item.name
            ? item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
            : item
        )}
        pagination={false}
      />
    </Card>
  );
};

export default Users;
