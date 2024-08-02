import React from "react";
import { formatDate } from "../../utils";
import { deleteEducation } from "../../redux/modules/profiles";

const Education = ({ profile, deleteEducation }) => {
  return (
    <div>
      {profile.education.map((edu) => (
        <div key={edu._id} className="container">
          {deleteEducation !== undefined ? (
           <a href="#!" onClick={() => deleteEducation(edu._id)}>
              <i className="fas fa-trash delete" />"
             
            </a>
          ) : null}
          <p>
            &#127891; {edu.current ? "Studies" : "Studied"} <b>{edu.degree}</b>
            <b>
              {edu.fieldofstudy} at <b>{edu.school}</b>
            </b>
          </p>
          <small>
            from {formatDate(edu.from)} to{" "}
            {edu.current ? "Current" : formatDate(edu.to)}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Education;
