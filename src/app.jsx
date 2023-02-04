import React, { useState } from "react";
import Users from "./pages/users";
import { Modal, Button, Input, Card } from "antd";
import "./style.css";
import "antd/dist/antd.css";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState({});
  const [key, setKey] = useState(false);
  const [name, setName] = useState("Add New User");
  const [search, setsearch] = useState("");

  const toggle = () => (key == false ? setKey(true) : setKey(false));

  const cancel = () => {
    toggle();
    setValue({ name: "", age: "", address: "" });
  };

  const submit = () => {
    if (value?.id) {
      axios
        .put("https://crud-table-api-production.up.railway.app/api/users/" + value.id, value)
        .then(() => {
          setValue({ name: "", age: "", address: "" });
        });
    } else {
      axios.post("https://crud-table-api-production.up.railway.app/api/users", value).then(() => {
        setValue({ name: "", age: "", address: "" });
      });
    }
    setName("Add New User");
    toggle();
  };

  return (
    <div>
      <Modal onCancel={cancel} onOk={submit} open={key}>
        <h3>{name}</h3>
        <Input
          type="text"
          value={value.name}
          onChange={(e) => setValue((p) => ({ ...p, name: e.target.value }))}
          className="my-2"
          placeholder="Name"
        />
        <Input
          type="text"
          value={value.age}
          onChange={(e) => setValue((p) => ({ ...p, age: e.target.value }))}
          className="my-2"
          placeholder="Age"
        />
        <Input
          type="text"
          value={value.address}
          onChange={(e) => setValue((p) => ({ ...p, address: e.target.value }))}
          className="my-2"
          placeholder="Address"
        />
      </Modal>

      <div className="block">
        <Card className="header">
          <Input
            type="search"
            placeholder="Search"
            className="search mx-2"
            onKeyUp={(e) => setsearch(e.target.value)}
          />
          <Button className="btn my-3 mx-2" onClick={toggle}>
            + Add User
          </Button>
        </Card>
        <Users
          search={search}
          setValue={setValue}
          submit={submit}
          toggle={toggle}
          setName={setName}
        />
      </div>
    </div>
  );
};
export default App;
