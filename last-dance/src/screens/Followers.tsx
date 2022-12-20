import React from "react";
import { useOutletContext } from "react-router";

interface IFollowersContext {
  nameOfMyUser: string;
}

const Followers = () => {
  const { nameOfMyUser } = useOutletContext<IFollowersContext>();

  return <div>here are {nameOfMyUser}</div>;
};

export default Followers;
