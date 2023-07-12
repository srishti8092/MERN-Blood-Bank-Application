import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";

const Organizations = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find org records

  useEffect(() => {
    const getOrg = async () => {
      try {
        if (user?.role === "donar") {
          const { data } = await API.get("/inventory/get-organization");
          //   console.log(data);
          if (data?.success) {
            setData(data?.organizations);
          }
        }
        if (user?.role === "hospital") {
          const { data } = await API.get(
            "/inventory/get-organization-for-hospital"
          );
          //   console.log(data);
          if (data?.success) {
            setData(data?.organizations);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOrg();
  }, [user]);

  return (
    <Layout>
      <div className="container mt-4">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.organizationName}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Organizations;
