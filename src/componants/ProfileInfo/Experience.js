import React from "react";
import { formatDate } from "../../utils";
import { deleteExperience } from "../../redux/modules/profiles";

const Experience = ({ profile, deleteExperience }) => {
  return (
    <div>
      {profile.experience.map((exp) => (
        <div key={exp._id} className="container">
          {deleteExperience !== undefined ? (
            <a href="#!" onClick={() => deleteExperience(exp._id)}>
              <i className="fas fa-trash delete" />"
            </a>
          ) : null}
          <p>
            &#127891; {exp.current ? "Works" : "Worked"} <b>{exp.title}</b>
            <b>
              {exp.company} at <b>{exp.company}</b>
            </b>
          </p>
          <small>
            from {formatDate(exp.from)} to{" "}
            {exp.current ? "Current" : formatDate(exp.to)}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Experience;
