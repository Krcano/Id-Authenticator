import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import { REMOVE_SEARCH_INQUIRY } from "../utils/mutations";

const Profile = () => {
  const { data } = useQuery(GET_USER);
  const searchData = data?.user || {};
  const [removeSearchInquiry] = useMutation(REMOVE_SEARCH_INQUIRY);

  console.log(searchData);
  const handleDelete = async (_id) => {
    try {
      const response = await removeSearchInquiry({ variables: _id });

      removeSearchInquiry(_id);
      console.log(response);
    } catch (error) {
      console.log(error);
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

              <button className="button" onClick={() => handleDelete(data._id)}>
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
