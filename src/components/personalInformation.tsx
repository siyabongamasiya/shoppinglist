import React from "react";
import ProfileButton from "./profileButton";
interface PersonalInformationProps {
  name: string;
  surname: string;
  email: string;
  cellNumber: string;
}

export default function PersonalInformation({
  name,
  surname,
  email,
  cellNumber,
}: PersonalInformationProps) {
  return (
    <div>
      <div>
        <div>
          <p>Personal Information</p>
          <p>Your account details</p>
        </div>
        <div>
          <p>Name</p>
          <p>{name}</p>
        </div>
        <div>
          <p>Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p>Cell Number</p>
          <p>{cellNumber}</p>
        </div>
      </div>
      <div>
        <p>Surname</p>
        <p>{surname}</p>
      </div>
      <ProfileButton src="" alt="" text="Edit Profile"/>
    </div>
  );
}
