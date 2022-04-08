import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "./InputField";

interface GroupFormProps {
  groups: any[];
}
const GroupActions = ["create", "delete", "rename"];

export const GroupForm: React.FC<GroupFormProps> = ({
  groups,
}) => {
  return (
    <Formik
      initialValues={{
        action: "",
        group: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ values }) => {
        return (
          <Form>
            <div className=" grid grid-cols-4">
              <div role="group">
                {GroupActions.map((action) => {
                  return (
                    <InputField
                      label={
                        action[0].toUpperCase() + action.slice(1)
                      }
                      name="action"
                      type="radio"
                      value={action}
                    />
                  );
                })}
              </div>
              {["delete", "rename"].includes(values.action) ? (
                <div role="group">
                  {groups.length == 0 ? (
                    <div>no groups...</div>
                  ) : (
                    groups.map((group) => {
                      return (
                        <InputField
                          label={group.name}
                          name="group"
                          type="radio"
                          value={group.id}
                        />
                      );
                    })
                  )}
                </div>
              ) : null}
              {values.action == "delete" ? (
                <InputField
                  label="Are you sure?"
                  name="confirm"
                  type="checkbox"
                />
              ) : values.action == "create" ? (
                <InputField
                  label="New Group Name"
                  name="name"
                  type="text"
                />
              ) : values.action == "rename" ? (
                <InputField
                  label="New Name for Group"
                  name="name"
                  type="text"></InputField>
              ) : null}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
