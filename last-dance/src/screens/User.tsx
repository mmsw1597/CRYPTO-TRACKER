import React from "react";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import { users } from "../db";

const User = () => {
  const { userid } = useParams();
  return (
    <div>
      <h1>
        User with id {userid} is named : {users[Number(userid) - 1].name}
      </h1>
      <hr />
      <Link to="followers">See Followers</Link>
      <Outlet
        context={{
          nameOfMyUser: users[Number(userid) - 1].name,
        }}
      />
    </div>
  );
};

export default User;
