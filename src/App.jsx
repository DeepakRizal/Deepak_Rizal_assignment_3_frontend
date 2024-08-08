/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import Loader from "./components/loader/Loader";

const App = () => {
  const [users, setUsers] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl + "/api/users");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
        setUsers([]); // Set an empty array to indicate the error state
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  function updateUser(id, updatedData) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, ...updatedData } : user
      )
    );
  }

  async function deleteUser(id) {
    try {
      const response = await fetch(baseUrl + `/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        console.error("Failed to delete user!");
      }
    } catch (error) {
      console.error("An error occurred while deleting the user.", error);
    }
  }

  return (
    <div className="p-4">
      {!users ? (
        <div className="mx-auto">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard
              key={user._id}
              avatar={user.avatar}
              id={user._id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              website={user.website}
              updateUser={updateUser}
              deleteUser={deleteUser}
              url={baseUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
