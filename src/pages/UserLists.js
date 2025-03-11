import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserLists.module.css";

const UserLists = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try{
         const response = await fetch("https://jsonplaceholder.typicode.com/users");
         if(!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const data = await response.json();
         setUsers(data);
      }catch(error) {
         console.error("Error fetching users:",error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.company?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.Grid}>
        {searchQuery === ""
          ? users.map((user) => (
              <div
                key={user.id}
                className={styles.card}
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Company: {user.company.name}</p>
              </div>
            ))
          : filteredUsers.map((user) => (
              <div
                key={user.id}
                className={styles.card}
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Company: {user.company.name}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default UserLists;