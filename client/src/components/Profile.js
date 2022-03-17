import React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { REMOVE_SEARCH_INQUIRY } from "../utils/mutations";

const Profile = () => {
  const { data } = useQuery(GET_USER);
  // const [ profile ,setProfiles] = useState("")
  // const [deleted, setDeleted] = useState("")

  const searchData = data?.user || {};
  const [removeSearchInquiry] = useMutation(REMOVE_SEARCH_INQUIRY);

  const handleDelete = async (_id) => {
    try {
      const response = await removeSearchInquiry({
        variables: { _id },
      });
      // console.log(_id);

      removeSearchInquiry(_id);
      //  setProfiles([searchData])
       window.location.reload(false)
      console.log(response);
    } catch (error) {
      console.log(error);
      // console.log(JSON.stringify(error, null, 2));
    }
  };
 
  return (
    <div className="profBG">
      <div>
        <h1 className="h1">Person Search Data</h1>
      </div>
      <div className="dataContainer">
        {searchData.searchInquiries?.map((data) => {
          return (
            <div className="border" key={data._id}>
              <h2 className="">
                {data.firstName} {""}
                {data.lastName}
              </h2>

              <h2 className="">Date Of Birth: {data.dateOfBirth}</h2>

              <button
                className="button"
                onClick={() => {
                  handleDelete(data._id);
                  console.log(data._id);
                }}
              >
                Delete Info
              </button>
              {/* need to add update */}
              {/* <button className="button"onClick={() => data}>
                Update Info
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
