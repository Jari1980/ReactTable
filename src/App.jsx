import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { password } from "./assets/secrets";
import { userName } from "./assets/secrets";
import { URL } from "./assets/secrets";

const App = () => {
  const [advertisements, setAdvertisements] = useState([]);

  
  useEffect(() => {
    fetchAllAdvertisements();
  }, []);

  const fetchAllAdvertisements = async () => {
    await axios
      .get(
        URL,
        {
          auth: {
            password: password,
            username: userName,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setAdvertisements(response.data);
          console.log(response.data)
        } else {
          console.log("mmmm");
        }
      })
      .catch((error) => {
        console.error("error");
      });
  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Created</th>
            </tr>
          </thead>

          {advertisements.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.created}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </>
  );
};

export default App;
